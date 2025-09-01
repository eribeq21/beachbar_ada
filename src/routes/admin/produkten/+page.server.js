// src/routes/products/+page.server.js
import { redirect, error } from '@sveltejs/kit';
import { createConnection } from '$lib/db/mysql';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { put } from '@vercel/blob';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const connection = await createConnection();
	const [products] = await connection.execute('SELECT * FROM products ORDER BY created_at DESC');

	return {
		user: locals.user,
		products
	};
}

export const actions = {
	create: async ({ request, locals }) => {
		if (!locals.user) throw redirect(302, '/login');

		const formData = await request.formData();
		const name = formData.get('name');
		const description = formData.get('description');
		const price = formData.get('price');
		const category = formData.get('category');
		const uploadedImage = formData.get('image');

		if (!name || !price || !category) {
			throw error(400, { message: 'Missing required fields.' });
		}

		let imageUrl = null;
		if (uploadedImage && uploadedImage.size > 0) {
			const filePath = `products/${Date.now()}-${uploadedImage.name}`;
			const { url } = await put(filePath, uploadedImage, {
				access: 'public',
				token: BLOB_READ_WRITE_TOKEN
			});
			imageUrl = url;
		}

		const connection = await createConnection();
		await connection.execute(
			`INSERT INTO products (name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)`,
			[name, description, price, category, imageUrl]
		);

		return { success: true, action: 'create' };
	},

	update: async ({ request, locals }) => {
		if (!locals.user) throw redirect(302, '/login');

		const formData = await request.formData();
		const id = formData.get('id');
		const name = formData.get('name');
		const description = formData.get('description');
		const price = formData.get('price');
		const category = formData.get('category');
		const uploadedImage = formData.get('image');

		if (!id || !name || !price || !category) {
			throw error(400, { message: 'Missing required fields.' });
		}

		let imageUrl = formData.get('current_image'); 
		if (uploadedImage && uploadedImage.size > 0) {
			const filePath = `products/${Date.now()}-${uploadedImage.name}`;
			const { url } = await put(filePath, uploadedImage, {
				access: 'public',
				token: BLOB_READ_WRITE_TOKEN
			});
			imageUrl = url;
		}

		const connection = await createConnection();
		await connection.execute(
			`UPDATE products SET name=?, description=?, price=?, category=?, image_url=? WHERE id=?`,
			[name, description, price, category, imageUrl, id]
		);

		return { success: true, action: 'update' };
	},

	delete: async ({ request, locals }) => {
		if (!locals.user) throw redirect(302, '/login');

		const formData = await request.formData();
		const id = formData.get('id');

		const connection = await createConnection();
		await connection.execute('DELETE FROM products WHERE id = ?', [id]);

		return { success: true, action: 'delete' };
	}
};
