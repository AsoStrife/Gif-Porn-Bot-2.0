import { getNow } from './utils.js'

export default class Log {

    constructor() {
    }

    log(str, ctx = undefined) {
        console.log(`${this.prefix(ctx)}${str}`) 
    }

    info(str, ctx = undefined) {
        console.info(`${this.prefix(ctx)}${str}`) 
    }

    error(str, ctx = undefined) {
        console.error(`${this.prefix(ctx)}${str}`) 
    }

    debug(str, ctx = undefined) {
        console.debug(`${this.prefix(ctx)}${str}`) 
    }

    prefix(ctx = undefined) {
        return (ctx == undefined) ? `[${getNow()}] ` : `[${getNow()}] ${this.sender(ctx)}`
    }

    sender(ctx = undefined) {
        if(ctx == undefined)
            return ``
            
        const id = ctx?.from?.id ? `[${ctx?.from?.id}] ` : ``
        const name = ctx?.from?.first_name ? `${ctx?.from?.first_name} ` : ``
        const last_name = ctx?.from?.last_name ? `${ctx?.from?.last_name} ` : ``
        const username = ctx?.from?.username ? `(@${ctx.from.username}) ` : ``

        return `${id}${name}${last_name}${username}`
    }

}