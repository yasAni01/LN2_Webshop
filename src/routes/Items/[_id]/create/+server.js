import db from "$lib/db.js";

export async function POST({ request, params }) {
    const data = await request.formData();

    const review = {
        username: data.get('username'),
        rating: parseInt(data.get('rating')),
        text: data.get('text'),
    };

    const itemId = params._id;  // Get the item ID from the URL params

    try {
        const item = await db.getitem(itemId);
        if (!item) {
            return new Response(JSON.stringify({ success: false, error: 'Item not found' }), {
                status: 404,
            });
        }

        item.reviews = item.reviews || [];
        item.reviews.push(review);

        // Update the full item
        const updatedItem = {
            ...item,
            reviews: item.reviews
        };

        await db.updateitem(updatedItem);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: 'Failed to update item' }), {
            status: 500,
        });
    }
}