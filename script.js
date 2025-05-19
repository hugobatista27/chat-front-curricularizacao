// Elementos do DOM
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const usernameInput = document.getElementById('username');
const sendButton = document.getElementById('sendButton');
const connectionStatus = document.getElementById('connectionStatus');

// Enviar mensagem
function sendMessage() {
    const username = usernameInput.value.trim() || 'Anônimo';
    const message = messageInput.value.trim();
    
    if (message) {
        const data = {
            type: 'user',
            username: username,
            message: message
        };
        
        messageInput.value = '';
        
        // Exibir a mensagem enviada localmente
        displayMessage({
            ...data,
            timestamp: new Date().toISOString(),
            isOwnMessage: true
        });
    }
}

// Exibir mensagem na interface
function displayMessage(data) {
    const messageElement = document.createElement('div');
    
    // Determinar o tipo de mensagem (usuário, sistema)
    let messageClass = data.type;
    if (data.type === 'user') {
        messageClass = data.isOwnMessage ? 'user' : 'other';
    }
    
    messageElement.className = `message ${messageClass}`;
    
    // Formatar a data
    const timestamp = new Date(data.timestamp);
    const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Adicionar conteúdo da mensagem
    if (data.type === 'system') {
        messageElement.innerHTML = `
            <div class="message-content">${data.message}</div>
            <div class="timestamp">${formattedTime}</div>
        `;
    } else {
        messageElement.innerHTML = `
            <div class="username">${data.username}</div>
            <div class="message-content">${data.message}</div>
            <div class="timestamp">${formattedTime}</div>
        `;
    }
    
    // Adicionar ao container de mensagens
    chatMessages.appendChild(messageElement);
    
    // Rolar para a mensagem mais recente
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listeners
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Para facilitar o teste, permitir que o usuário pressione Enter no campo de usuário
usernameInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        messageInput.focus();
    }
});