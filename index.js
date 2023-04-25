import { Telegraf } from 'telegraf'

import * as dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import getNow from './utils.js'
import { message } from 'telegraf/filters'

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
    let message = `Ciao!`
    ctx.reply(message)
})


bot.command('pls_porn', async (ctx) => {
    try {

    } catch (e) {
    }
})

bot.on('inline_query', async (ctx) => {

    const offset = parseInt(ctx.inlineQuery.offset)

    const url = Number.isNaN(offset) ?
        `${process.env.GIF_PROVIDER}?s=${ctx.inlineQuery.query}` :
        `${process.env.GIF_PROVIDER}/page/${offset}/?s=${ctx.inlineQuery.query}`

    const next_offset = Number.isNaN(offset) ? 2 : offset + 1

    const username = ctx.from.username ? `(@${ctx.from.username}) ` : ''
    console.log(`${getNow()} [${ctx.from.id}] ${ctx.from.first_name} ${ctx.from.last_name} ${username}is searching at: ${url}`)

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


        await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, responseQuery, { next_offset: next_offset })
    } catch (e) {
        if (e?.response)
            console.log(`The following request at ${url} returned the following status: ${e.response.status}`)
    }
})


const echoCommand = async (ctx) => {
    const category = ctx.message.text.replace("/", "")

    const page = parseInt(Math.random() * 100)

    const url = `https://porngipfy.com/category/${category}/page/${page}`

    const username = ctx.from.username ? `(@${ctx.from.username}) ` : ''

    console.log(`${getNow()} [${ctx.from.id}] ${ctx.from.first_name} ${ctx.from.last_name} ${username}is searching at: ${url}`)

    try {
        const response = await axios.get(url)

        const gifs = response.data.match(/data-gif="(.*?)"/gm)

        var i = Math.floor(Math.random() * gifs.length)
        var gif = gifs[i]
        gif = gif.replace(/data-gif="(.*?)"/gm, '$1')


        ctx.replyWithAnimation(gif)
    }
    catch(e){
        if (e?.response)
            console.log(`The following request at ${url} returned the following status: ${e.response.status}`)
        
            console.log(e)
    }
  }
  
  // Utilizzo del middleware di composizione per gestire i comandi
  const commandsHandler = Telegraf.compose([
    Telegraf.hears('/anal', echoCommand),
    Telegraf.hears('/blowjob', echoCommand),
    Telegraf.hears('/boobs', echoCommand),
    Telegraf.hears('/cumshot', echoCommand),
    Telegraf.hears('/interracial', echoCommand),
    Telegraf.hears('/lesbian', echoCommand)
  ]);


bot.use(commandsHandler)

bot.launch()