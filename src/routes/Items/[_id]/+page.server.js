import db from "$lib/db.js";

export async function load({ params }) {
    try {
        const item = await db.getitem(params._id);  // Change this line to db.getitem
        if (!item) {
            return { status: 404, error: new Error('Item not found') };
        }

        return {
            item: {
                name: item.name,
                description: item.description,
                price: item.price,
            }
        };
    } catch (error) {
        console.error(error); // Log the error for debugging
        return { status: 500, error: new Error('Failed to fetch item') };
    }
}
