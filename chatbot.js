// chatbot.js

let chatbotScript = null;
let isChatOpen = false;

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("openChatBtn");
  const container = document.getElementById("chatbotContainer");

  button.addEventListener("click", function () {
    if (isChatOpen) {
      closeChatbot();
    } else {
      openChatbot();
    }
  });

  function openChatbot() {
    // Remove manual chatbot if present
    const oldChat = document.querySelector(".manual-chat");
    if (oldChat) oldChat.remove();

    chatbotScript = document.createElement("script");
    chatbotScript.src = "https://www.noupe.com/embed/019873ff82f372318899d9c37dceff70d073.js";
    chatbotScript.async = true;

    container.innerHTML = "";
    container.style.display = "block";
    container.appendChild(chatbotScript);

    isChatOpen = true;
    button.innerHTML = "❌ Close Chat";

    // Watch for user input inside the iframe (Noupe bot loads in one)
    const checkBotInteraction = setInterval(() => {
      const iframe = container.querySelector("iframe");
      if (iframe) {
        try {
          const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
          const input = innerDoc.querySelector("input, textarea");
          if (input) {
            input.addEventListener("keydown", function (e) {
              if (e.key === "Enter") {
                // Auto close after delay
                setTimeout(() => {
                  closeChatbot();
                  button.classList.add("pulse");
                }, 5000); // 5 seconds after user message
              }
            });
          }
          clearInterval(checkBotInteraction);
        } catch (err) {
          // iframe is on a different domain; we can't access its content
          clearInterval(checkBotInteraction);
        }
      }
    }, 500);
  }

  function closeChatbot() {
    if (chatbotScript) {
      chatbotScript.remove();
      chatbotScript = null;
    }
    container.innerHTML = "";
    container.style.display = "none";
    isChatOpen = false;
    button.innerHTML = "💬";
    button.classList.add("pulse");
  }
});


// Add styles
const style = document.createElement("style");
style.textContent = `
  #openChatBtn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #4e57d4;
    color: white;
    padding: 14px 20px;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    z-index: 9999;
    transition: all 0.3s ease;
  }

  #openChatBtn:hover {
    background-color: #3c46ac;
    transform: scale(1.05);
  }

  .pulse {
    animation: pulseGlow 1.5s infinite;
  }

  @keyframes pulseGlow {
    0% {
      box-shadow: 0 0 0px rgba(255, 255, 255, 0.5);
    }
    50% {
      box-shadow: 0 0 14px rgba(255, 255, 255, 0.8);
    }
    100% {
      box-shadow: 0 0 0px rgba(255, 255, 255, 0.5);
    }
  }

  #chatbotContainer {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 370px;
    max-width: 95vw;
    z-index: 9998;
    display: none;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    #chatbotContainer {
      width: 100vw;
      right: 0;
      bottom: 0;
    }
  }
`;
document.head.appendChild(style);
