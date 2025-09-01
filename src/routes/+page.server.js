import { redirect } from '@sveltejs/kit';
export async function load({ locals }) {
	console.log(locals.user);
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	return {};
}
