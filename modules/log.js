import { getNow } from './utils.js'

export default class Log {

    constructor() {
    }

    log(str, ctx = undefined) {
        ctx == undefined ? console.log(`${str}`) : console.log(`${this.prefix(ctx)}${str}`) 
    }

    info(str, ctx = undefined) {
        ctx == undefined ? console.info(`${str}`) : console.info(`${this.prefix(ctx)}${str}`) 
    }

    error(str, ctx = undefined) {
        ctx == undefined ? console.error(`${str}`) : console.error(`${this.prefix(ctx)}${str}`) 
    }

    debug(str, ctx = undefined) {
        ctx == undefined ? console.debug(`${str}`) : console.debug(`${this.prefix(ctx)}${str}`) 
    }

    prefix(ctx) {
        return `[${getNow()}] ${this.sender(ctx)}`
    }

    sender(ctx) {
        const id = ctx?.from?.id ? `[${ctx?.from?.id}] ` : ``
        const name = ctx?.from?.first_name ? `${ctx?.from?.first_name} ` : ``
        const last_name = ctx?.from?.last_name ? `${ctx?.from?.last_name} ` : ``
        const username = ctx?.from?.username ? `(@${ctx.from.username}) ` : ``

        return `${id}${name}${last_name}${username}`
    }

}