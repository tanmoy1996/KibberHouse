export type Room = {
  id: string;
  name: string;
  count: number;
  bathroom: "attached";
  occupancy: "double";
  extraBed: "available on request";
};
export type Activity = {
  id: string;
  name: string;
  season?: string;
  subjects?: readonly string[];
};
