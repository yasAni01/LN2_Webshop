import db from "$lib/db.js";

export const actions = {
  
  create: async ({ request }) => {
    const data = await request.formData();
   
    let item = {
        name: data.get('name'),
        price: parseFloat(data.get('price')),
        description: data.get('description') || '',
        warnings: data.get('warnings') ? [data.get('warnings')] : [],
        reviews: [], 
        image_file_path: data.get('image_file_path') || '/images/placeholder.jpg'
    };
    
    await db.createitem(item); 
    return { success: true };
  },
};
