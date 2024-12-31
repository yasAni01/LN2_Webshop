import db from "$lib/dbLocation.js";


export async function load() {
  const locations = await db.getLocations();
  console.log(locations); // Add this line to log the locations

  return {
    locations
  };
}