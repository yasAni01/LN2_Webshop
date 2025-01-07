import db from "$lib/db.js";
import dbL from "$lib/dbLocation.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
    console.log("Loading item with ID:", params._id);
    const item = await db.getitem(params._id); 
    const locations = await dbL.getLocations(); 

    if (item.locationsID) {
        item.locationsID = item.locationsID.map(id => id.toString());
    }
    return {
        item,
        locations
    };
}
export const actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        await db.deleteitem(data.get("id"));
        throw redirect(303, "/");
    },
    addToCart: async ({ request }) => {
        let data = await request.formData();
        let id = data.get("id");
        let item = { 
            _id: id,
            cart: true
        };
        await db.updateitem(item);
    },
    removeFromCart: async ({ request }) => {
        let data = await request.formData();
        let id = data.get("id");
        let item = { 
            _id: id,
            cart: false
        };
        await db.updateitem(item);
    }
};
