let reportBugHandler = async (m, { conn, text }) => {
    if (!text) throw 'Please provide a description of the bug or error to report.';
    
    const promptMessage = "An error occurred. Do you want to report it to the developer?";
    const confirmationMessage = "Bug/error reported to the developer.";
    const rejectionMessage = "Bug/error not reported to the developer.";

    try {
        // Prompt the user to report the error
        const report = await conn.sendMessage(m.chat, promptMessage, MessageType.text);

        // Listen for the user's response
        const response = await conn.waitForMessage(m.chat, {
            sender: m.sender,
            quotedMessageId: report.id,
            content: ["yes", "no"],
            contentType: MessageType.text
        });

        if (response.message.conversation.toLowerCase() === "yes") {
            // User chose to report the error
            await conn.sendMessage("2347045035241@s.whatsapp.net", `Error Report:\n\n${text}`, MessageType.text); // Send error report to specific number
            await conn.sendMessage(m.chat, confirmationMessage, MessageType.text);
        } else {
            // User chose not to report the error
            await conn.sendMessage(m.chat, rejectionMessage, MessageType.text);
        }
    } catch (err) {
        console.error("Error occurred while reporting the error to the developer:", err);
        throw "An error occurred while processing your request.";
    }
};

reportBugHandler.command = 'report';
reportBugHandler.help = ['report <description>', 'report a bug or error to the developer'];
reportBugHandler.tags = ['info'];

export default handler;