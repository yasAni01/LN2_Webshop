import db from "$lib/db.js";


        export async function load({ params }) {
            return {
                item : await db.getitem(params._id),
            };
        }
