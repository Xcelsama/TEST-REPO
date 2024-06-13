import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, 'Please enter username', m)

  await m.reply('Searching...')
  try {
    let res = await fetch(`https://api.github.com/users/${text}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    let json = await res.json()
    if (res.status !== 200) throw await res.text()
    
    let thumb = await (await fetch(json.avatar_url)).buffer()
    let hasil = `*── 「 GITHUB STALK 」 ──*

➸ *Bio*: ${json.bio || 'N/A'}
➸ *Enterprise*: ${json.company || 'N/A'}
➸ *Email:* ${json.email || 'N/A'}
➸ *Twitter:* ${json.twitter_username || 'N/A'}
➸ *Public Repos:* ${json.public_repos}
➸ *Public Gists:* ${json.public_gists}
➸ *Followers:* ${json.followers}
➸ *Following:* ${json.following}
➸ *Location:* ${json.location || 'N/A'}
➸ *Type:* ${json.type}
`

    conn.sendFile(m.chat, thumb, 'githubstalk.jpg', hasil, m)
  } catch (error) {
    conn.reply(m.chat, 'Error: ' + error, m)
  }
}

handler.help = ['githubstalk'].map(v => v + ' <query>')
handler.tags = ['tools']
handler.command = /^(githubstalk)$/i

export default handler