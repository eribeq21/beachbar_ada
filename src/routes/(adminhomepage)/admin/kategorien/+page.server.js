import { redirect, error } from '@sveltejs/kit';
import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const connection = await createConnection();
	const [categories] = await connection.execute('SELECT * FROM categories ORDER BY name');

	return {
		categories
	};
}

export const actions = {
	createCategory: async ({ request, locals }) => {
		if (!locals.user) throw redirect(302, '/login');

		const formData = await request.formData();
		const name = formData.get('name');

		if (!name) {
			throw error(400, { message: 'Missing name.' });
		}

		const connection = await createConnection();
		await connection.execute('INSERT INTO categories (name) VALUES (?)', [name]);

		return { success: true, action: 'createCategory' };
	},

	deleteCategory: async ({ request, locals }) => {
		if (!locals.user) throw redirect(302, '/login');

		const formData = await request.formData();
		const id = formData.get('id');

		const connection = await createConnection();
		await connection.execute('DELETE FROM products WHERE category_id = ?', [id]);
		await connection.execute('DELETE FROM categories WHERE id = ?', [id]);

		return { success: true, action: 'deleteCategory' };
	}
};
