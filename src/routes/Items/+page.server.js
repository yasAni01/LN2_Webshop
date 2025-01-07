import db from "$lib/db.js";

export async function load() {
    const items = await db.getItems();

    return {
        items
    };
}