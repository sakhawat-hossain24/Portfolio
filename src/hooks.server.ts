import { error } from '@sveltejs/kit';

export async function handleHttpError({ request, status }: { request: Request; status: number }) {
	if (status === 404 && request.url.includes('/app.css')) {
		return null;
	}
	
	return error(status, 'Not found');
}
