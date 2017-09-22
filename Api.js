export default function Api(url, method) {

    return fetch(url, {
        'method': method,
        'Access-Control-Allow-Origin':'*',
    })
        .then(response => {
            console.log('Make request');
            return response.json()
        })
        .catch(e => e);
    
}