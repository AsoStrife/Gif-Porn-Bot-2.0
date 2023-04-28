export function getNow() {
    let date = new Date();

    let day = ("0" + date.getDate()).slice(-2);

    // current month
    let month = ("0" + (date.getMonth() + 1)).slice(-2);

    // current year
    let year = date.getFullYear();

    // current hours
    let hours = date.getHours();

    // current minutes
    let minutes = date.getMinutes();

    // current seconds
    let seconds = date.getSeconds();

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}