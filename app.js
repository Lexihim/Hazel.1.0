// CONFIGURATION: Replace with your Render/Railway URL once deployed
const API_URL = "https://your-hazel-backend.onrender.com/api/chat";

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

async function askHazel() {
    const prompt = userInput.value.trim();
    if (!prompt) return;

    // 1. Render User Message
    appendMessage('user', prompt);
    userInput.value = '';

    // 2. Render Loading State
    const tempId = 'loading-' + Date.now();
    appendMessage('hazel', '...', tempId);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        
        // 3. Update UI with AI Response
        document.getElementById(tempId).innerText = data.reply;
    } catch (error) {
        document.getElementById(tempId).innerText = "Hazel encountered a connection error.";
        console.error("System Error:", error);
    }
}

function appendMessage(role, text, id = null) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}-msg`;
    if (id) msgDiv.id = id;
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
