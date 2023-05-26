import isEmail from 'validator/lib/isEmail';
import isFQDN from 'validator/lib/isFQDN';
import Data from '../../public/list.json';

export async function handle({ request, env }) {
    let resp = {
        'success': true
    }

    let email = new URL(request.url).pathname.replace('/api/', '');
    if (!isEmail(email)) {
        resp.success = false;
        resp.message = `It does not appear that you provided a valid e-mail address to check`
        return new Response(JSON.stringify(resp), {headers: {'Content-Type': 'application/json'}});
    }

    // Next, we get the domain, by splitting the e-mail
    let domain = email.split('@')[1];
    if (!isFQDN(domain)) {
        resp.success = false;
        resp.message = `It does not appear that you provided a valid e-mail address to check`
        return new Response(JSON.stringify(resp), {headers: {'Content-Type': 'application/json'}});
    }

    // Now, we see if the data is in our array and confirming if the domain is a throwaway
    resp.isDisposable = false;
    if (Data.includes(domain)) {
        resp.isDisposable = true;
    }
    return new Response(JSON.stringify(resp), {headers: {'Content-Type': 'application/json'}});
}

export async function onRequest({ request, env }) {
	return await handle({ request, env });
}