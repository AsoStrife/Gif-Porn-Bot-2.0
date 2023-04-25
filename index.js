import { Telegraf } from 'telegraf'

import * as dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

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

    console.log(`Performing request at: ${url}`)

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

    try {
        await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, responseQuery, { next_offset: next_offset })
    } catch (e) {
        if (e?.response)
            console.log(e.response.status)
    }
})

bot.launch()