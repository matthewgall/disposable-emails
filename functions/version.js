import Package from '../package-lock.json';
import Version from '../public/version.json'

let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token, cf-access-client-id, cf-access-client-secret'
}

export async function handle({ request, env }) {
    let v = Version;
    v.tag = Package.version;
    return new Response(JSON.stringify(v), {headers: headers});
}

export async function onRequest({ request, env }) {
	return await handle({ request, env });
}