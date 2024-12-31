import db from "$lib/db.js";

export async function POST({ request }) {
    const { _id } = await request.json();

    try {
        const item = await db.getitem(_id);
        if (!item) {
            return new Response(JSON.stringify({ success: false, error: 'Item not found' }), {
                status: 404,
            });
        }

        item.cart = false; // Mark the item as removed from the cart

        await db.updateitem(item);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error updating item:', error.message);
        return new Response(JSON.stringify({ success: false, error: 'Failed to remove item from cart' }), {
            status: 500,
        });
    }
}