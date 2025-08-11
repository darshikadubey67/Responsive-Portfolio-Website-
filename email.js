// js/email.js
emailjs.init("NKKBDuTx8j8yC_ehn"); // Replace with your real public key from EmailJS

function sendEmail(form) {
  event.preventDefault();
  const status = document.getElementById("form-status");
  status.textContent = "Sending...";

  // Auto-reply to user
  const autoReply = emailjs.sendForm("service_08m0mep", "template_2v39piz", form);

  // Direct message to you
  const notifyMe = emailjs.sendForm("service_08m0mep", "template_f34rgvs", form);

  Promise.all([autoReply, notifyMe])
    .then(() => {
      status.textContent = "Thank you! I will reach out to you soon.";
      form.reset();
      setTimeout(() => {
        status.textContent = "";
      }, 4000);
    })
    .catch((error) => {
      status.textContent = "Oops! Something went wrong.";
      console.error("EmailJS Error:", error);
    });

  return false;
}
