import db from "$lib/dbLocation.js";


export async function load() {
  const locations = await db.getLocations();
  console.log(locations); 

  return {
    locations
  };
}