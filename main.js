// Contact form thank you message logic
document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('contact-form');
  var message = document.getElementById('form-message');
  if (form && message) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      message.style.display = 'block';
      form.reset();
      setTimeout(function() {
        message.style.display = 'none';
      }, 5000);
    });
  }
});
