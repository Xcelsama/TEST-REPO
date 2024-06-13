// Import the database module
// import db from '../lib/database.js'

let reg = 40;

// Define an asynchronous handler function
let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Define a message for requesting the bet amount
    let fa = `
How much do you want to bet? 

📌 Example:
*${usedPrefix + command}* 100`.trim();
    
    // Check if the argument for the bet amount is provided and is a number
    if (!args[0]) throw fa;
    if (isNaN(args[0])) throw fa;
    
    // Parse the bet amount as an integer
    let bet = parseInt(args[0]);
    
    // Get user data from the global database
    let users = global.db.data.users[m.sender];
    
    // Check if the user is allowed to bet (cooldown of 10 seconds)
    let time = users.lastslot + 10000;
    if (new Date - users.lastslot < 10000) throw `⏳ Wait *${msToTime(time - new Date())}* to use again`;
    
    // Check if the bet amount is at least 100
    if (bet < 100) throw '✳️ Minimum bet is *100 XP*';
    
    // Check if the user has enough experience points (XP)
    if (users.exp < bet) {
        throw `✳️ You don't have enough *XP*`;
    }

    // Define available emojis for the slot machine
    let emojis = ["🕊️", "🦀", "🦎"];
    
    // Randomly select emojis for the slot machine
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    
    let x = [], y = [], z = [];
    for (let i = 0; i < 3; i++) {
        x[i] = emojis[a];
        a++;
        if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
        y[i] = emojis[b];
        b++;
        if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
        z[i] = emojis[c];
        c++;
        if (c == emojis.length) c = 0;
    }
    
    // Determine the result of the bet
    let end;
    if (a == b && b == c) {
        end = `🎁 YOU WON\n *+${bet + bet} XP*`;
        users.exp += bet + bet;
    } else if (a == b || a == c || b == c) {
        end = `🔮 Almost there, keep trying :) \nTake *+${reg} XP*`;
        users.exp += reg;
    } else {
        end = `😔 You lost *-${bet} XP*`;
        users.exp -= bet;
    }
    
    // Update the last slot time for the user
    users.lastslot = new Date * 1;
    
    // Reply with the slot machine result
    return await m.reply(
        `
       🎰 ┃ *SLOTS* 
     ───────────
       ${x[0]} : ${y[0]} : ${z[0]}
       ${x[1]} : ${y[1]} : ${z[1]}
       ${x[2]} : ${y[2]} : ${z[2]}
     ───────────
        🎰┃🎰┃ 🎰

${end}`
    ); 
};

// Define help, tags, and command for the handler
handler.help = ['slot <bet>'];
handler.tags = ['game'];
handler.command = ['slot'];

export default handler;

// Function to convert milliseconds to a human-readable time format
function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return seconds + " Second(s)";
}