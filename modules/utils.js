import constants from "./constants.js"

export function getNow() {
    let date = new Date();

    let day = ("0" + date.getDate()).slice(-2)

    // current month
    let month = ("0" + (date.getMonth() + 1)).slice(-2)

    // current year
    let year = date.getFullYear()

    // current hours
    let hours = date.getHours()

    // current minutes
    let minutes = date.getMinutes()

    // current seconds
    let seconds = date.getSeconds()

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function getBaseUrl(page = 1){
    return constants.urls.base.replace(':page', page)
}

export function getBaseSearcUrl(search = ``, page = 1){
    return constants.urls.search.replace(':s', search).replace(':page', page)
}

export function getCategoryUrl(category = ``, page = 1) {
    return constants.urls.categories.replace(':category', category).replace(':page', page)
}

export function getTagUrl(tag = ``, page = 1) {
    return constants.urls.tags.replace(':tag', tag).replace(':page', page)
}

export function getCallbackDataArray(){
    return constants.tags.flatMap(row => row).map(t => t.callback_data)
}

export function getInlineKeyboards() {
    return constants.tags
}

export function getGif(data) {
    const gifs = data.match(/data-gif="(.*?)"/gm)

    const i = Math.floor(Math.random() * gifs.length)
    
    const gif = gifs[i]

    return gif.replace(/data-gif="(.*?)"/gm, '$1')
}