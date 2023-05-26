import Data from '../../public/list.json';

export async function handle({ request, env }) {
    let resp = {
        'success': true,
        'isDisposable': false
    }
    let email = new URL(request.url).pathname.replace('/api/', '');

    // Next, we get the domain, by splitting the e-mail
    let domain = email.split('@')[1];

    // Now, we see if the data is in our array
    if (Data.includes(domain)) {
        resp.isDisposable = true;
    
    }
    return new Response(JSON.stringify(resp), {headers: {'Content-Type': 'application/json'}});
}

export async function onRequest({ request, env }) {
	return await handle({ request, env });
}