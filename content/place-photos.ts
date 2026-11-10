import { photos } from "./media";

// Photos shown in the route map's place descriptions. Kibber and Key Monastery
// use our own photographs; the rest are from Wikimedia Commons under the licence
// shown, resized to 720px. Keep the credit and source link with each photo, and
// swap in our own pictures (with `credit` left out) whenever we have them.
export type PlacePhoto = {
  src: string;
  alt: string;
  /** Photographer and licence, for third-party photos. */
  credit?: { author: string; license: string; source: string };
};

const commons = (
  slug: string,
  alt: string,
  author: string,
  license: string,
  file: string,
): PlacePhoto => ({
  src: `/media/places/${slug}.jpg`,
  alt,
  credit: { author, license, source: `https://commons.wikimedia.org/wiki/File:${file}` },
});

export const placePhotos: Record<string, PlacePhoto> = {
  Kibber: { src: String(photos.exteriorSnow.src), alt: photos.exteriorSnow.alt },
  "Key Monastery": { src: String(photos.keyMonastery.src), alt: photos.keyMonastery.alt },

  Chandigarh: commons("chandigarh", "The Open Hand monument in Chandigarh", "Raakesh Blokhra", "CC BY-SA 2.0", "Open_Hand_monument,_Chandigarh.jpg"),
  Shimla: commons("shimla", "Shimla's houses spread across the hillside", "Navneet Sharma", "CC BY-SA 4.0", "Landscape_of_Shimla_,_Himachal_Pradesh.jpg"),
  Narkanda: commons("narkanda", "Layered blue ridges seen from Narkanda", "Manjeet44877", "CC BY-SA 4.0", "NARKANDA.jpg"),
  "Rampur Bushahr": commons("rampur-bushahr", "Rampur Bushahr on the green slopes above the Sutlej", "Harpreetsinghmohali", "CC BY 4.0", "Rampur_Bushahr_City_Satluj_River_Angle3.jpg"),
  "Reckong Peo": commons("reckong-peo", "Shops along the main street of Reckong Peo", "John Hill", "CC BY-SA 3.0", "Main_street,_Reckong_peo_2010.jpg"),
  Nako: commons("nako", "Nako village above its green fields", "Sumita Roy Dutta", "CC BY-SA 4.0", "Nako_Village.jpg"),
  Tabo: commons("tabo", "The entrance gate of Tabo Monastery", "Arup1981", "CC BY-SA 4.0", "Tabo_Monjastery_Entrance.jpg"),
  Kaza: commons("kaza", "The Spiti river beneath bare, layered slopes at Kaza", "Gerd Eichmann", "CC BY-SA 4.0", "Kaza-20-Spiti-gje.jpg"),
  Losar: commons("losar", "Losar village on the floor of the Spiti valley", "Timothy Gonsalves", "CC BY-SA 4.0", "Losar_Jun18_D72_7824.jpg"),
  "Kunzum Pass": commons("kunzum-pass", "Prayer flags and parked jeeps on Kunzum Pass beneath snow peaks", "John Hill", "CC BY-SA 3.0", "Kunzum_Pass_between_Lahaul_%26_Spiti_28-6-04.jpg"),
  Batal: commons("batal", "The braided Chandra river in the valley at Batal", "Timothy Gonsalves", "CC BY-SA 4.0", "NH505_Chandra_River_Batal_Chhatru_Jun18_D72_8028.jpg"),
  Chhatru: commons("chhatru", "Travellers stopped among the boulders at Chhatru", "Gerd Eichmann", "CC BY 4.0", "Chhatru-05-Raststaette-2016-gje.jpg"),
  Gramphu: commons("gramphu", "The rough road through the Chandra valley towards Gramphu", "Gerd Eichmann", "CC BY 4.0", "NH_505-K-Chhatru_to_Gramphu-09-2016-gje.jpg"),
  "Atal Tunnel": commons("atal-tunnel", "A car driving through the lit Atal Tunnel", "Vinayaraj", "CC BY-SA 4.0", "Atal_Tunnel_vrtmrgmpksk_(2).jpg"),
  Manali: commons("manali", "Manali beneath snow-dusted ridges", "Neerajsinghazm", "CC BY-SA 4.0", "Manali_City.jpg"),
  Kullu: commons("kullu", "Snow peaks above the Beas valley near Kullu", "Biswarup Ganguly", "CC BY 3.0", "Beas_Valley_-_Palchan_-_Kullu_2014-05-10_2275.JPG"),
  Mandi: commons("mandi", "Mandi town on the banks of the Beas", "Mystic nishant99", "Public domain", "Mandi_town.jpg"),
  Bilaspur: commons("bilaspur", "The Gobind Sagar reservoir near Bilaspur", "Ambuj Mishra", "CC BY-SA 4.0", "Gobind_Sagar_Lake_Ambuj.jpg"),

  Chitkul: commons("chitkul", "A carved wooden temple in Chitkul", "Kaiho", "CC BY-SA 3.0", "Temple_at_Chitkul.JPG"),
  Kalpa: commons("kalpa", "Kalpa village with the Kinner Kailash range behind", "Gerd Eichmann", "CC BY-SA 4.0", "Kalpa-14-Kinnaur_Kailash-gje.jpg"),
  Gue: commons("gue", "The painted monastery at Gue", "Rodmantyler", "CC BY-SA 4.0", "Gue_Village_Monastery.jpg"),
  "Dhankar Monastery": commons("dhankar-monastery", "Dhankar village and monastery on their ridge", "John Hill", "CC BY-SA 4.0", "Dhankar_Gompa_and_village.jpg"),
  "Pin Valley": commons("pin-valley", "Green slopes of the Pin valley under a deep blue sky", "Ra.manimtech", "CC BY-SA 4.0", "Morning_scene_in_Thuskeo_Dhar.jpg"),
  Komic: commons("komic", "Ochre hills and snow peaks around Komic", "Sumita Roy Dutta", "CC BY-SA 4.0", "Komic_village.jpg"),
  Hikkim: commons("hikkim", "Hikkim village and its fields on the mountainside", "Sumita Roy Dutta", "CC BY-SA 4.0", "Hikkim_Village_and_water_reservoir_used_for_irrigation_spiti_India.jpg"),
  Langza: commons("langza", "Langza village beneath a snow-capped peak", "Madhumita Das", "CC BY-SA 4.0", "Langza_Village,_Himachal_Pradesh.jpg"),
  "Chicham Bridge": commons("chicham-bridge", "The yellow towers of Chicham Bridge", "Nrr1729", "CC BY-SA 4.0", "Chicham_Bridge_in_Spiti.jpg"),
  "Chandratal Lake": commons("chandratal-lake", "Snow peaks reflected in Chandratal Lake", "Lodhra", "CC BY-SA 3.0", "Chandratal_1.JPG"),
};
