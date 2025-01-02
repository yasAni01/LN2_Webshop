import db from "$lib/db.js";

export async function DELETE({ params }) {
    const { id } = params;

    try {
        const result = await db.deleteitem(id);
        if (result.deletedCount === 1) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false, error: 'Item not found' }), { status: 404 });
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        return new Response(JSON.stringify({ success: false, error: 'Failed to delete item' }), { status: 500 });
    }
}