import db from "$lib/db.js";

export async function POST({ request }) {
    const { _id } = await request.json();

    const item = await db.getitem(_id);

    item.cart = false; 

    await db.updateitem(item);

    return new Response(JSON.stringify({ success: true }), {
    });
}
