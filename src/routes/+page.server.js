import { createConnection } from '$lib/db/mysql';

export async function load() {
	const connection = await createConnection();
	const [products] = await connection.execute(
		'SELECT p.*, c.name AS category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.available = TRUE ORDER BY c.name, p.name'
	);

	return {
		products
	};
}
