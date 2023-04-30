import { Telegraf } from 'telegraf'

import * as dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs-extra'

import * as utils from './modules/utils.js'
import Log from './modules/log.js'

const bot = new Telegraf(process.env.BOT_TOKEN)
const log = new Log() 

// Handle /start command
bot.start((ctx) => {
    log.info(`has started the bot`, ctx)

    fs.readFile('./md/start.md', 'utf8')
    .then((file) => ctx.replyWithMarkdown(file))
    .catch(err => log.error(`Error reading ./md/start.md`))
})

// Handle /info command
bot.command('info', (ctx) => {
    log.info(`has typed \`/info\``, ctx)

    fs.readFile('./md/info.md', 'utf8')
    .then((file) => ctx.replyWithMarkdown(file))
    .catch(err => log.error(`Error reading ./md/info.md`))
})

// Tags handler
bot.action(utils.getCallbackDataArray(), async(ctx) => {
    const tag = ctx.callbackQuery.data

    const page = parseInt(Math.random() * process.env.TAGS_RANDOM_TOP)

    const url = utils.getTagUrl(tag, page)

    log.info(`has clicked the tag '${tag}' and is searching at: ${url}`, ctx)

    try {
        const response = await axios.get(url)

        const gif = utils.getGif(response.data)

        log.info(`is receiving the following gif: ${gif}`, ctx)

        ctx.replyWithAnimation(gif)
        ctx.answerCbQuery(``)
    }
    catch (e) {
        if (e?.response){
            log.error(`The following request at ${url} returned the following status: ${e.response.status}`)   
        }

        ctx.answerCbQuery(`The gif could not be retrieved. Please try again.`)
    }
})

// Random Gif with `pls porn`
bot.hears('pls porn', async (ctx) => {
    try {
        const page = parseInt(Math.random() * process.env.BASE_RANDOM_TOP)

        const url = utils.getBaseUrl( page)

        log.info(`has typed 'pls porn' and is searching at: ${url}`, ctx)

        const response = await axios.get(url)

        const gif = utils.getGif(response.data)

        log.info(`is receiving the following gif: ${gif}`, ctx)

        ctx.replyWithAnimation(gif)
    }
    catch (e) {
        if (e?.response){
            log.error(`The following request at ${url} returned the following status: ${e.response.status}`)
        }
    }
})

// Handle inline query search
bot.on('inline_query', async (ctx) => {

    const offset = Number.isNaN(parseInt(ctx.inlineQuery.offset)) ? 1 : parseInt(ctx.inlineQuery.offset)
    const nextOffset = offset + 1

    const url = utils.getBaseSearcUrl(ctx.inlineQuery.query, offset)

    log.info(`is searching at: ${url}`, ctx)

    try {
        const response = await axios.get(url)

        const gifs = response.data.match(/data-gif="(.*?)"/gm)

        const responseQuery = gifs.map(g => ({
            type: 'gif',
            gif_url: g.replace(/data-gif="(.*?)"/gm, '$1'),
            id: uuidv4(),
            url: g.replace(/data-gif="(.*?)"/gm, '$1'),
            thumb_url: g.replace(/data-gif="(.*?)"/gm, '$1'),
            thumb_mime_type: 'image/gif'
        }))

        await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, responseQuery, { next_offset: nextOffset })

    } catch (e) {
        if (e?.response){
            log.error(`The following request at ${url} returned the following status: ${e.response.status}`)
        }
    }
})

// Show the tag keyboard
const showTags = async (ctx) => {
    log.info(`has requested the tag keyboard`, ctx)

    let inline_keyboard = utils.getInlineKeyboards()

        ctx.reply("Choose a tag:", {
            reply_markup: {
                inline_keyboard: inline_keyboard
            }
        })
}

// Handle the category command
const handleCategory = async (ctx) => {
    const category = ctx.message.text.replace("/", "")

    const page = parseInt(Math.random() * process.env.CATEGORIES_RANDOM_TOP)

    const url = utils.getCategoryUrl(category, page)

    log.info(`has clicked the '/${category}' command and is searching at: ${url}`, ctx)

    try {
        const response = await axios.get(url)

        const gif = utils.getGif(response.data)

        log.info(`is receiving the following gif: ${gif}`, ctx)

        ctx.replyWithAnimation(gif)
    }
    catch (e) {
        if (e?.response){
            log.error(`The following request at ${url} returned the following status: ${e.response.status}`)
        }
    }
}

// Handle multiple commands for categories and tags
const commandsHandler = Telegraf.compose([
    Telegraf.hears('/anal', handleCategory),
    Telegraf.hears('/blowjob', handleCategory),
    Telegraf.hears('/boobs', handleCategory),
    Telegraf.hears('/cumshot', handleCategory),
    Telegraf.hears('/interracial', handleCategory),
    Telegraf.hears('/lesbian', handleCategory),

    Telegraf.hears('/tags', showTags)
])

bot.use(commandsHandler)

if(process.env.DEBUG == 'true') {
    log.info(`Starting the bot in development mode`)
    bot.launch()
}
else {
    log.info(`Starting the bot in production mode`)
    bot.launch({
        webhook: {
            // Public domain for webhook; e.g.: example.com
            domain: webhookDomain,
            // Port to listen on; e.g.: 8080
            port: port,
        }
    })
}