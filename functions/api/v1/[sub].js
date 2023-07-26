export async function handle({ request, env }) {
    let subject = new URL(request.url).pathname.replace('/api/v1/', '').toLowerCase().trim();
    return new Response('Redirecting', {status: 301, headers: {
        'Location': `/api/v1/email/${subject}`
    }});
}

export async function onRequest({ request, env }) {
	return await handle({ request, env });
}