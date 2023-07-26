import isFQDN from 'validator/lib/isFQDN';
import Data from '../../../../public/list.json';

let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token, cf-access-client-id, cf-access-client-secret'
}

export async function handle({ request, env }) {
    let resp = {
        'success': true
    }

    let domain = new URL(request.url).pathname.replace('/api/v1/domain/', '').toLowerCase().trim();

    // Are they asking about a domain?
    if (!isFQDN(domain)) {
        resp.success = false;
        resp.message = `It does not appear that you provided a valid domain name to check`
        return new Response(JSON.stringify(resp), {status: 400, headers: headers});
    }
    
    // Now, the fun bit, the check
    // we see if the data is in our array and confirming if the domain is a throwaway
    resp.isDisposable = false;
    if (Data.includes(domain)) {
        resp.isDisposable = true;
    }

    return new Response(JSON.stringify(resp), {headers: headers});
}

export async function onRequest({ request, env }) {
	return await handle({ request, env });
}