import isEmail from 'validator/lib/isEmail';
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

    let email = new URL(request.url).pathname.replace('/api/v1/email/', '').toLowerCase().trim();

    // Are they asking about an e-mail address?
    if (!isEmail(email)) {
        resp.success = false;
        resp.message = `It does not appear that you provided a valid e-mail address to check`
        return new Response(JSON.stringify(resp), {status: 400, headers: headers});
    }

    // We do that by splitting on the @
    let domain = email.split('@')[1];
    // And now validating that the FQDN left is actually valid
    if (!isFQDN(domain)) {
        resp.success = false;
        resp.message = `It does not appear that you provided a valid e-mail address to check`
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