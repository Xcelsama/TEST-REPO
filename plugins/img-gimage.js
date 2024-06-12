import { googleImage } from '@bochilteam/scraper'
var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} Minecraft`
    const res = await googleImage(text)
    let image = res.getRandom()
    let link = image
    conn.sendFile(m.chat, link, 'google.jpg', `| *©𝚂𝚃𝙰𝚁-𝙼𝙳-𝚅𝟸* | 

|https://github.com/Xcelsama/STAR-MD-V2|
🔎 *Result:* ${text}
🌎 *Source:* Google 
`,m)
}
handler.help = ['img <query>', 'image <query>']
handler.tags = ['internet']
handler.command = /^(img|image)$/i

export default handler