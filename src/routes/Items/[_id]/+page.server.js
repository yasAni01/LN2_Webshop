import db from "$lib/db.js";
import dbL from "$lib/dbLocation.js";

export async function load({ params }) {
    console.log("Loading item with ID:", params._id); // Added console log
    const item = await db.getitem(params._id); // Fetch the item by ID
    const locations = await dbL.getLocations(); // Fetch all locations

    // Convert locationsID to strings
    if (item.locationsID) {
        item.locationsID = item.locationsID.map(id => id.toString());
    }

    return {
        item,
        locations
    };
}

