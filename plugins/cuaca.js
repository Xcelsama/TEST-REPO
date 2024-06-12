import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Usage:\n${usedPrefix + command} <teks>\n\nExample:\n${usedPrefix + command} Dhaka`
    let res = await fetch(API('https://api.openweathermap.org', '/data/2.5/weather', {
        q: text,
        units: 'metric',
        appid: '060a6bcfa19809c2cd4d97a212b19273'
    }))
    if (!res.ok) throw 'location not found'
    let json = await res.json()
    if (json.cod != 200) throw json
    m.reply(`
🌎Location: ${json.name}
🌎Country: ${json.sys.country}
🌜The weather: ${json.weather[0].description}
🌦Current temperature: ${json.main.temp} °C
🌬The highest temperature: ${json.main.temp_max} °C
❄Lowest temperature: ${json.main.temp_min} °C
🌈Humidity: ${json.main.humidity} %
💨The wind: ${json.wind.speed} km/jam
    `.trim())
}

handler.help = ['cuaca']
handler.tags = ['internet']
handler.command = /^(cuaca|<country>)$/i

export default handler