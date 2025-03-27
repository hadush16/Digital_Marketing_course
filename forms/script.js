const form = document.getElementById('data-form');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => response.text())
  .then(data => {
    alert('Form submitted successfully!');
    form.reset();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  });
});

document.getElementById("data-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    let formData = new FormData(this);
    let googleFormUrl = "https://script.google.com/macros/s/AKfycbyOjVhXpkOIJl9OpMTtqpamSHpIEnRB4wLtzP913MMn/dev";

    fetch(googleFormUrl, {
      method: "POST",
      body: formData,
      mode: "no-cors"
    })
    .then(response => {
      // Display success message
      document.getElementById("response-message").innerHTML =
        '<div class="alert alert-success">Message sent successfully! Redirecting...</div>';
      
      // Reload page after 3 seconds
      setTimeout(() => {
        location.reload();
      }, 3000);
    })
    .catch(error => {
      // Display error message
      document.getElementById("response-message").innerHTML =
        '<div class="alert alert-danger">Failed to send message. Try again!</div>';
    });
  });