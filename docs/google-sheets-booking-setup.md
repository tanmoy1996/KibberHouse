# Google Sheets booking setup

Kibber House uses a private Google Sheet as a lightweight booking ledger. The
website never talks to Google Sheets directly: its server routes call a Google
Apps Script web app, so the integration secret is not included in browser code.

## 1. Create the sheet

1. Create a blank Google Sheet named **Kibber House Bookings**.
2. Copy the spreadsheet ID from the URL between `/d/` and `/edit`.
3. Open **Extensions → Apps Script** from that sheet.
4. Replace the editor contents with `google-apps-script/Code.gs` from this repo.
5. In Apps Script, open **Project Settings → Script properties** and add:
   - `SPREADSHEET_ID`: the ID copied above.
   - `BOOKING_API_SECRET`: a long random value (at least 32 characters).
6. Run `setupBookingSheet` once and approve the requested Google permissions.

This creates:

- **Bookings** — every website enquiry is appended here.
- **Inventory** — starts with five Deluxe and one Super Deluxe room; edit these
  totals if the room inventory changes.

## 2. Deploy the Apps Script bridge

1. Select **Deploy → New deployment → Web app**.
2. Set **Execute as** to **Me**.
3. Set **Who has access** to **Anyone**.
4. Deploy and copy the `/exec` web-app URL.

Although the web app is reachable publicly, every read and write requires the
shared secret. Do not put the secret in a `NEXT_PUBLIC_` environment variable.

## 3. Configure the website

Copy `.env.example` to `.env.local` and set:

```env
BOOKING_SHEET_WEB_APP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
BOOKING_SHEET_SECRET=the-same-secret-from-script-properties
```

Add the same two server-side variables to the production hosting environment.
Restart the development server after changing local environment variables.

## Daily workflow

New website submissions appear in **Bookings** with status `Enquiry`. Review a
request and change its status to:

- `Held` — temporarily removes its rooms from website availability.
- `Confirmed` — removes its rooms from website availability.
- `Cancelled` — releases its rooms.

Set `room_type` to `Deluxe` or `Super Deluxe` and set `rooms` to the number of
rooms reserved before marking a row Held or Confirmed. Rows left as `Enquiry`
do not block inventory. Dates use hotel-night overlap rules: a guest checking
out on the next guest's check-in date does not create a conflict.

When Apps Script code changes, create a new deployment version (or edit the
existing deployment) so the live `/exec` URL runs the latest code.


## Visitor logging

Update Apps Script with `google-apps-script/Code.gs`, run `setupBookingSheet()`
again, and update the existing web-app deployment to a new version. Setup preserves
existing bookings and inventory. The **Visitors** tab is also created automatically
on the first logged visit. Deploy the updated website using the existing server
variables; no new credentials are needed.

Each initial page load and client-side page navigation records a row with server
time, anonymous tab-session ID, page path, referring page URL (without query strings), utm_source,
utm_medium, utm_campaign, device category, language, and timezone. URL query strings
(other than those three campaign tags), IP addresses, and names are not collected.
Names remain in booking enquiries only. Do Not Track is respected. Sessions are
anonymous browsing groups, not verified people; browser blocking, bots and disabled
JavaScript can affect counts. Failed writes are not retried. Manage retention by
periodically removing old rows from Visitors.

Verify after deployment: open a page with `?utm_source=test&utm_campaign=launch`,
navigate to another page, and confirm two rows in Visitors with the same session ID.
Confirm booking enquiries still land in Bookings.

The referrer column captures the source page URL up to 300 characters, excluding
query strings and fragments. Browsers often limit cross-site referrers to the
origin, and apps or direct visits may supply none. UTM tags are captured separately
from the destination URL, even when the referrer is unavailable.
