export async function handle({ request, env }) {
    return new Response(new URL(request.url).pathname);
}

export async function onRequest({ request, env }) {
	return await handle({ request, env });
}