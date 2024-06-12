let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `To suggest new commands or features, use this format:\n\n${usedPrefix + command} <your suggestion>\n\nExample:\n${usedPrefix + command} I suggest adding a command to check weather updates.`
    if (text.length < 10) throw `⚠️ Text length should be more than 10 characters ⚠️`
    if (text.length > 1000) throw `The maximum character limit is 1000. Please shorten your suggestion.`
    
    let teks = `*${command.toUpperCase()} SUGGESTION!*\n\nFrom: *@${m.sender.split`@`[0]}*\n\nSuggestion: ${text}\n`
    await conn.reply('2347045035241@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {
        contextInfo: {
            mentionedJid: [m.sender]
        }
    })
    
    m.reply(`Your suggestion has been sent to the owner.`)
}

handler.help = ['suggest'].map(v => v + ' <suggestion>')
handler.tags = ['info']
handler.command = /^(suggest)$/i

export default handler