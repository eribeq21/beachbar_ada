import { redirect } from '@sveltejs/kit';
import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

   const connection = await createConnection(); // Create a connection to the MySQL database


    let [products] = await connection.execute('SELECT * FROM products');
    console.log(products);

    return {
        user: locals.user,
        products
    };
}


export const actions = {
    delete: async ({ request, locals }) => {
        if (!locals.user) {
            throw redirect(302, '/login');
        }

        let formData = await request.formData();
        const id = formData.get('id');

        const connection = await createConnection();

        await connection.execute('DELETE FROM products WHERE id = ?', [id]);

        return {
            success: true
        };
    }
};

