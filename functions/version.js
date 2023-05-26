import Package from '../package-lock.json';

export async function handle({ request, env }) {
    return new Response(Package.version, {headers: {'Content-Type': 'text/plain'}});
}

export async function onRequest({ request, env }) {
	return await handle({ request, env });
}