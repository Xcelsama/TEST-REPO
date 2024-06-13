let handler = m => m
handler.all = async function (m, conn) {
    var vn = "https://github.com/Xcelsama/STAR-V2/blob/main/Assets/mp3/STAR.mp3"
    let url = "https://whatsapp.com/channel/0029VaBcXo4JJhzW9c1uVD2X"
    let murl = "https://whatsapp.com/channel/0029VaBcXo4JJhzW9c1uVD2X"
    let hash = global.starbot
    let img = "https://i.imgur.com/8ltcrED.jpeg"
    let num = "2347045035241"

    let doc = {
        audio: {
          url: vn
        },
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform: [0,99,0,99,0,99,0],
        fileName: "Guru",

        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
          title: "↺ |◁   II   ▷| ♡",
          body: hash,
          thumbnailUrl: img,
          sourceUrl: url,
          mediaType: 2,
          mediaUrl: murl,
         // renderLargerThumbnail: true,
          showAdAttribution: true
          }}
      };

    let phoneNumber = '';
    if (m.mentionedJid && m.mentionedJid[0]) {
        phoneNumber = m.mentionedJid[0].replace(/[^0-9]/g, '');
        if (phoneNumber === num) {
          return this.sendMessage(m.chat, doc, { quoted: m });
        }
      } else {
        return
      }
}
export default handler