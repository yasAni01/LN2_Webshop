import db from "$lib/db.js";

export async function load() {
    const items = await db.getItems();

    items.forEach(item => {
        if (item.locationsID) {
            item.locationsID = item.locationsID.map(id => id.toString());
        }
    });

    return {
        items
    };
}