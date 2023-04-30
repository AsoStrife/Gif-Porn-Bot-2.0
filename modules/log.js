import * as dotenv from 'dotenv'
dotenv.config()

import { getNow } from './utils.js'
import fs from 'fs-extra'

export default class Log {

    constructor() {
        fs.ensureFile(process.env.LOG_PATH, (err) => {
            if (err) {
                console.log(`Error creating log file: ${err}`);
            }
        })
    }

    log(str, ctx = undefined) {
        const log = `${this.prefix(ctx)}${str}`
        console.log(log) 
        this.fileAppend(log)
    }

    info(str, ctx = undefined) {
        const log = `${this.prefix(ctx)}${str}`
        console.info(log)
        this.fileAppend(log)
    }

    error(str, ctx = undefined) {
        const log = `${this.prefix(ctx)}${str}`
        console.error(log)
        this.fileAppend(str) 
    }

    debug(str, ctx = undefined) {
        const log = `${this.prefix(ctx)}${str}`
        console.debug(log) 
        this.fileAppend(str)
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

    fileAppend(str = ``) {
        const log = str + `\n`
        fs.appendFile(process.env.LOG_PATH, log, (err) => {
            if (err) {
                console.error(`Failed to write ${str} inside the log file. Error: ${err}`);
            }
        })
    }
}