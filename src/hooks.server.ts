/**
 * Server-side hooks for handling HTTP errors
 * This file runs on the server and can intercept requests/responses
 */
import { error } from '@sveltejs/kit';

/**
 * Handle HTTP errors with custom logic
 * @param request - The incoming request object
 * @param status - The HTTP status code
 * @returns Response object or error
 */
export async function handleHttpError({ request, status }: { request: Request; status: number }) {
	// Special handling for CSS file 404 errors during development
	// This prevents unnecessary error pages for missing CSS files
	if (status === 404 && request.url.includes('/app.css')) {
		return null;
	}
	
	// Default error handling for other cases
	return error(status, 'Not found');
}
