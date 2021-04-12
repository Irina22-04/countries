export function apiCountries(request: string) {
    return fetch('https://countries.trevorblades.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: request
        }),
    })
}