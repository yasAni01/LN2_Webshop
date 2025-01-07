import db from "$lib/dbLocation.js";

export async function load() {
  const locations = await db.getLocations();

  return {
    locations
  };
}