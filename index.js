import { Telegraf } from 'telegraf'

import * as dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import crypto from 'crypto'

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
    let message = `Ciao!`
    ctx.reply(message)
})


bot.command('pls_porn', async (ctx) => {
    try {
        ctx.reply('Generating image, Please wait !!!')
        
        const query = "dick"

        const response = await axios.get(`${process.env.GIF_PROVIDER}?s=${query}`,{
            headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0'}
        })

        const videosHtmlContent = response.data.match(/data-gif="(.*?)"/gm)

        console.log(videosHtmlContent)
    } catch (error) {
        console.log('error', error)
        ctx.reply('error sending image')
    }
})

bot.on('inline_query', async (ctx) => {
    
    console.log(`Searched query: ${ctx.inlineQuery.query}`)

    try {
    
        const response = await axios.get(`${process.env.GIF_PROVIDER}?s=${ctx.inlineQuery.query}`,{
            headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0'}
        })

        const gifs = response.data.match(/data-gif="(.*?)"/gm)

        const responseQuery = gifs.map(g => ({
            type: 'gif',
            gif_url: g.replace(/data-gif="(.*?)"/gm,'$1'),
            id: uuidv4(),
            url: g.replace(/data-gif="(.*?)"/gm,'$1'),
            thumb_url: g.replace(/data-gif="(.*?)"/gm,'$1'),
            thumb_mime_type: 'image/gif',
        }))

        await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, responseQuery)
        

    }catch(err){
        console.error(err)
    }
})

bot.launch()