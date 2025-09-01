import { createConnection } from '$lib/db/mysql';


export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const description = formData.get('description');
		const price = formData.get('price');

        let connection  = await createConnection();
        await connection.execute(
            'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
            [name, description, price]
        );

		return {
			success: true,
			message: 'Product created successfully'
		};
	}
}