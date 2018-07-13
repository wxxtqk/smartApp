import fetch from '../utils/fetch.js'
export function personalInfo(data) {
    let url = 'https://dsn.apizza.net/mock/198f9600070e6d58394193f636384159/personal'
    return fetch({
        url,
        method: 'POST',
        data
    })
}