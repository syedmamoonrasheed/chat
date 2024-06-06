// Create and append the CSS
const style = document.createElement('style');
style.innerHTML = `
body {
    font-family: 'Roboto', sans-serif;
    background: white;
    margin: 0;
    padding: 0;
}

.centered-heading {
    text-align: center;
    margin-bottom: 20px;
}

.centered-heading h1 {
    font-size: 2.5em;
    color: #333;
    margin: 0;
}

.centered-heading p {
    font-size: 1.2em;
    color: #666;
    margin: 5px 0 0;
}

.chat-icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #007bff;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: background 0.3s, transform 0.3s;
}

.chat-icon:hover {
    background: #0056b3;
    transform: scale(1.1);
}

.chat-icon img {
    width: 30px;
    height: 30px;
}

.chat-popup {
    display: none;
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 360px;
    max-width: 100%;
    height: 500px;
    max-height: 80%;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    flex-direction: column;
    overflow: hidden;
}

.chat-popup header {
    background: #007bff;
    color: white;
    padding: 15px;
    text-align: center;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.chat-popup header button {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
}

.chat-body {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    background: #f9f9f9;
}

.chat-body p {
    padding: 10px 15px;
    border-radius: 20px;
    margin: 10px 0;
    max-width: 80%;
    line-height: 1.4;
    word-wrap: break-word;
}

.chat-body .user {
    background: #007bff;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 0;
}

.chat-body .assistant {
    background: #e1f0ff;
    color: black;
    align-self: flex-start;
    border-bottom-left-radius: 0;
}

.chat-popup form {
    display: flex;
    border-top: 1px solid #ddd;
    padding: 15px;
    background: #fff;
}

.chat-popup input[type="text"] {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 16px;
    margin-right: 10px;
}

.chat-popup button {
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    background: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
}

.chat-popup button:hover {
    background: #0056b3;
}
`;
document.head.appendChild(style);

// Create and append the HTML structure
const container = document.createElement('div');
container.innerHTML = `

<div class="chat-icon" onclick="openChat()">
    <img src="https://img.icons8.com/ios-filled/50/ffffff/chat.png" alt="Chat">
</div>

<div class="chat-popup" id="chatPopup">
    <header>
        <span>Appointment Booking Chatbot</span>
        <button onclick="closeChat()">&times;</button>
    </header>
    <div class="chat-body" id="chatBody">
        <p class="assistant">Hello! How can I help you today?</p>
    </div>
    <form id="chatForm">
        <input type="text" id="question" name="question" placeholder="Type your message...">
        <button type="submit">Send</button>
    </form>
</div>
`;
document.body.appendChild(container);

// JavaScript for handling the chat popup
function openChat() {
    document.getElementById('chatPopup').style.display = 'flex';
}

function closeChat() {
    document.getElementById('chatPopup').style.display = 'none';
}

document.getElementById('chatForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const question = document.getElementById('question').value;
    const chatBody = document.getElementById('chatBody');

    if (question.trim() === '') return;

    const userMessage = document.createElement('p');
    userMessage.className = 'user';
    userMessage.textContent = question;
    chatBody.appendChild(userMessage);
    document.getElementById('question').value = '';

    const response = await fetch('https://4c2d-3-82-61-35.ngrok-free.app/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    });

    const data = await response.json();
    const assistantMessage = document.createElement('p');
    assistantMessage.className = 'assistant';
    assistantMessage.textContent = data.response;
    chatBody.appendChild(assistantMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
});
