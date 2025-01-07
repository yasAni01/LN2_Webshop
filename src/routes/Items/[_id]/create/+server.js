import db from "$lib/db.js";

export async function POST({ request, params }) {
    const data = await request.formData();

    const review = {
        username: data.get('username'),
        rating: parseInt(data.get('rating')),
        text: data.get('text'),
    };

    const itemId = params._id;

    const item = await db.getitem(itemId);

    item.reviews = item.reviews || [];
    item.reviews.push(review);

    const updatedItem = {
        ...item,
        reviews: item.reviews
    };

    await db.updateitem(updatedItem);

    return new Response(JSON.stringify({ success: true }), {
    });
}
