import isEmail from 'validator/lib/isEmail';
import isFQDN from 'validator/lib/isFQDN';
import Data from '../../public/list.json';

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

    let email = new URL(request.url).pathname.replace('/api/', '');
    if (!isEmail(email)) {
        resp.success = false;
        resp.message = `It does not appear that you provided a valid e-mail address to check`
        return new Response(JSON.stringify(resp), {status: 400, headers: headers});
    }

    // Next, we get the domain, by splitting the e-mail
    let domain = email.split('@')[1];
    if (!isFQDN(domain)) {
        resp.success = false;
        resp.message = `It does not appear that you provided a valid e-mail address to check`
        return new Response(JSON.stringify(resp), {status: 400, headers: headers});
    }

    // Now, we see if the data is in our array and confirming if the domain is a throwaway
    resp.isDisposable = false;
    if (Data.includes(domain)) {
        resp.isDisposable = true;
    }

    return new Response(JSON.stringify(resp), {status: status, headers: headers});
}

export async function onRequest({ request, env }) {
	return await handle({ request, env });
}