import db from "$lib/db.js";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        // Validate required fields
        if (!data.has('name') || !data.has('price')) {
            return { success: false, error: 'Missing required fields' };
        }

        const item = {
            name: data.get('name'),
            price: parseFloat(data.get('price')),
            description: data.get('description') || '',
            warnings: data.get('warnings') ? [data.get('warnings')] : [], // Convert to array
            reviews: [], // Start with an empty array
            image_file_path: data.get('image_file_path') || '/images/placeholder.jpg'
        };

        try {
            await db.createitem(item); // Correct function name
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, error: 'Database error' };
        }
    }
};