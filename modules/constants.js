import * as dotenv from 'dotenv'
dotenv.config()

let constants = {
    urls: {
        base: `${process.env.GIF_PROVIDER}page/:page/`,
        search: `${process.env.GIF_PROVIDER}page/:page/?s=:s`,
        categories: `${process.env.GIF_PROVIDER}category/:category/page/:page`,
        tags: `${process.env.GIF_PROVIDER}tag/:tag/page/:page`
    },
    categories: ['anal', 'blowjob', 'boobs', 'cumshot', 'interracial', 'lesbian'],
    tags: [
        [
            { text: 'Agfe', callback_data: 'agfe' },
            { text: 'Anal Fuck', callback_data: 'anal-fuck' },
            { text: 'Asian', callback_data: 'asian' }
        ],
        [
            { text: 'Bbc', callback_data: 'bbc' },
            { text: 'Big Dick', callback_data: 'big-dick' },
            { text: 'Big Tits', callback_data: 'big-tits' }
        ],
        [
            { text: 'Boobs', callback_data: 'boobs' },
            { text: 'Butthole', callback_data: 'butthole' },
            { text: 'Couple Sex', callback_data: 'couple-sex' },
        ],
        [
            
            { text: 'Creampie', callback_data: 'creampie' },
            { text: 'Cum', callback_data: 'cum' },
            { text: 'Cumshot', callback_data: 'cumshot' },
        ],
        [
            { text: 'Deepthroat', callback_data: 'deepthroat' },
            { text: 'Erotic', callback_data: 'erotic' },
            { text: 'Fucking', callback_data: 'fucking' },
        ],
        [
            { text: 'Interacial', callback_data: 'inter-racial' },
            { text: 'Lesbian', callback_data: 'lesbian' },
            { text: 'Oral pleasure', callback_data: 'oral-pleasure' },
        ],
        [
            { text: 'Orgy', callback_data: 'orgy' },
            { text: 'Pussy', callback_data: 'pussy' },
            { text: 'Threesome', callback_data: 'threesome' }
        ]
    ]
}

export default constants