/**
 * Kibber House booking-sheet bridge.
 *
 * Script properties required:
 *   SPREADSHEET_ID
 *   BOOKING_API_SECRET
 *
 * Run setupBookingSheet() once, then deploy as a Web app that executes as you
 * and is accessible to anyone. The shared secret is checked on every request.
 */

const BOOKINGS_SHEET = "Bookings";
const INVENTORY_SHEET = "Inventory";

const BOOKING_HEADERS = [
  "booking_id",
  "status",
  "guest_name",
  "phone",
  "email",
  "check_in",
  "check_out",
  "adults",
  "children",
  "room_type",
  "rooms",
  "meal_preference",
  "special_requests",
  "source",
  "created_at",
  "updated_at",
];

const INVENTORY_HEADERS = ["room_type", "total_rooms"];

function setupBookingSheet() {
  const spreadsheet = getSpreadsheet_();
  const bookings = getOrCreateSheet_(spreadsheet, BOOKINGS_SHEET);
  const inventory = getOrCreateSheet_(spreadsheet, INVENTORY_SHEET);

  if (bookings.getLastRow() === 0) {
    bookings.appendRow(BOOKING_HEADERS);
    bookings.setFrozenRows(1);
  }

  if (inventory.getLastRow() === 0) {
    inventory.getRange(1, 1, 3, 2).setValues([
      INVENTORY_HEADERS,
      ["Deluxe", 5],
      ["Super Deluxe", 1],
    ]);
    inventory.setFrozenRows(1);
  }

  const statusColumn = BOOKING_HEADERS.indexOf("status") + 1;
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Enquiry", "Held", "Confirmed", "Cancelled"], true)
    .setAllowInvalid(false)
    .build();
  bookings
    .getRange(2, statusColumn, Math.max(bookings.getMaxRows() - 1, 1), 1)
    .setDataValidation(statusRule);

  bookings.autoResizeColumns(1, BOOKING_HEADERS.length);
  inventory.autoResizeColumns(1, INVENTORY_HEADERS.length);
}

function doGet(event) {
  try {
    authorize_(event.parameter.secret);
    if (event.parameter.action !== "availability") {
      return json_({ ok: false, message: "Unknown action." });
    }

    const checkIn = parseIsoDate_(event.parameter.checkIn);
    const checkOut = parseIsoDate_(event.parameter.checkOut);
    if (checkOut.getTime() <= checkIn.getTime()) {
      throw new Error("Check-out must be after check-in.");
    }

    return json_(availability_(checkIn, checkOut));
  } catch (error) {
    return json_({ ok: false, message: String(error.message || error) });
  }
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || "{}");
    authorize_(payload.secret);
    if (payload.action !== "createEnquiry") {
      return json_({ ok: false, message: "Unknown action." });
    }

    const checkIn = parseIsoDate_(payload.checkIn);
    const checkOut = parseIsoDate_(payload.checkOut);
    if (checkOut.getTime() <= checkIn.getTime()) {
      throw new Error("Check-out must be after check-in.");
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getSpreadsheet_().getSheetByName(BOOKINGS_SHEET);
      if (!sheet) throw new Error("Run setupBookingSheet() first.");

      const now = new Date();
      const bookingId = `KH-${Utilities.formatDate(now, "UTC", "yyyyMMdd-HHmmss")}`;
      sheet.appendRow([
        bookingId,
        "Enquiry",
        clean_(payload.name),
        clean_(payload.phone),
        clean_(payload.email),
        formatIsoDate_(checkIn),
        formatIsoDate_(checkOut),
        number_(payload.adults, 1),
        number_(payload.children, 0),
        clean_(payload.roomPreference || "Any"),
        1,
        clean_(payload.mealPreference),
        clean_(payload.requests),
        "Website",
        now,
        now,
      ]);

      return json_({ ok: true, bookingId: bookingId });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    return json_({ ok: false, message: String(error.message || error) });
  }
}

function availability_(checkIn, checkOut) {
  const spreadsheet = getSpreadsheet_();
  const inventorySheet = spreadsheet.getSheetByName(INVENTORY_SHEET);
  const bookingsSheet = spreadsheet.getSheetByName(BOOKINGS_SHEET);
  if (!inventorySheet || !bookingsSheet) {
    throw new Error("Run setupBookingSheet() first.");
  }

  const inventory = rowsAsObjects_(inventorySheet).map(function (row) {
    return { roomType: clean_(row.room_type), total: number_(row.total_rooms, 0) };
  });
  const occupied = {};

  rowsAsObjects_(bookingsSheet).forEach(function (booking) {
    if (["Held", "Confirmed"].indexOf(clean_(booking.status)) === -1) return;

    const bookingStart = parseSheetDate_(booking.check_in);
    const bookingEnd = parseSheetDate_(booking.check_out);
    if (!(bookingStart < checkOut && bookingEnd > checkIn)) return;

    const roomType = clean_(booking.room_type);
    const rooms = number_(booking.rooms, 1);
    if (roomType === "Any") {
      return;
    }
    occupied[roomType] = (occupied[roomType] || 0) + rooms;
  });

  const rooms = inventory.map(function (item) {
    const booked = occupied[item.roomType] || 0;
    return {
      roomType: item.roomType,
      total: item.total,
      booked: booked,
      available: Math.max(item.total - booked, 0),
    };
  });

  return {
    checkIn: formatIsoDate_(checkIn),
    checkOut: formatIsoDate_(checkOut),
    rooms: rooms,
    available: rooms.some(function (room) { return room.available > 0; }),
  };
}

function rowsAsObjects_(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0];
  return values.slice(1).filter(function (row) {
    return row.some(function (cell) { return cell !== ""; });
  }).map(function (row) {
    return headers.reduce(function (record, header, index) {
      record[header] = row[index];
      return record;
    }, {});
  });
}

function getSpreadsheet_() {
  const id = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (!id) throw new Error("SPREADSHEET_ID is not configured.");
  return SpreadsheetApp.openById(id);
}

function getOrCreateSheet_(spreadsheet, name) {
  return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

function authorize_(provided) {
  const expected = PropertiesService.getScriptProperties().getProperty("BOOKING_API_SECRET");
  if (!expected || provided !== expected) throw new Error("Unauthorized.");
}

function parseIsoDate_(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) {
    throw new Error("Invalid date.");
  }
  const parts = String(value).split("-").map(Number);
  const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  if (
    date.getUTCFullYear() !== parts[0] ||
    date.getUTCMonth() !== parts[1] - 1 ||
    date.getUTCDate() !== parts[2]
  ) throw new Error("Invalid date.");
  return date;
}

function parseSheetDate_(value) {
  if (value instanceof Date) {
    return parseIsoDate_(Utilities.formatDate(value, "UTC", "yyyy-MM-dd"));
  }
  return parseIsoDate_(String(value));
}

function formatIsoDate_(date) {
  return Utilities.formatDate(date, "UTC", "yyyy-MM-dd");
}

function clean_(value) {
  const text = String(value == null ? "" : value).trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function number_(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function json_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

