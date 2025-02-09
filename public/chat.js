const sendButton = document.getElementById('send-button');
const userMessageField = document.getElementById('user-message');
const responseDiv = document.getElementById('response');
console.log("Chat script loaded!");


sendButton.addEventListener('click', async () => {
  console.log('Send button clicked'); // Check if this logs when you click the button
  const userMessage = userMessageField.value;

  if (!userMessage.trim()) {
    responseDiv.innerHTML = 'Please enter a message.';
    return;
  }
  console.log('Sending message:', userMessage); // Add this log to see the message

  try {
    const response = await fetch('/get-chat-completion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    console.log('Response received:', response); // Log the response object
    const data = await response.json();
    console.log('Parsed response:', data); // Log the parsed data

    responseDiv.innerHTML = `<strong>Response:</strong> ${data.response || "No response"}`;
  } catch (error) {
    console.error('Error:', error); // Log any errors
    responseDiv.innerHTML = 'Error: ' + error.message;
  }
});