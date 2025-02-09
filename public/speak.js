document.addEventListener("DOMContentLoaded", function() {
  let synth;  // Declare the speech synthesis variable globally to stop speech if needed

  async function fetchAndSpeak() {
      const userQuestion = document.getElementById("user-message").value;
      console.log('Fetching text for question:', userQuestion);

      try {
          const response = await fetch(`http://localhost:3000/speak?question=${encodeURIComponent(userQuestion)}`);
          const text = await response.text();
          
          console.log('Text fetched:', text);  // Log the fetched text in the browser console

          if (text && text !== "No response from AI") {
              synth = window.speechSynthesis;
              const utterance = new SpeechSynthesisUtterance(text);
              utterance.lang = "en-US"; // Set language to English (US)
              synth.speak(utterance);
          } else {
              console.error("No valid text fetched for speech.");
          }

      } catch (error) {
          console.error('Error fetching or speaking the text:', error);
      }
  }

  // Function to stop speech synthesis if it's currently speaking
  function stopSpeech() {
      if (synth && synth.speaking) {
          console.log('Stopping speech...');
          synth.cancel();  // Stop the speech
      }
  }

  // Event listeners
  document.getElementById("speakBtn").addEventListener("click", fetchAndSpeak);
  document.getElementById("stopBtn").addEventListener("click", stopSpeech);  // Add stop button listener
});
