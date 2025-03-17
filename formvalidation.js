document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting immediately

    let isValid = true;
    
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    // Reset errors
    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("subject-error").textContent = "";
    document.getElementById("message-error").textContent = "";

    // Name validation
    if (name === "") {
        document.getElementById("name-error").textContent = "Name is required.";
        isValid = false;
    }

    // Email validation
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("email-error").textContent = "Enter a valid email.";
        isValid = false;
    }

    // Subject validation
    if (subject === "") {
        document.getElementById("subject-error").textContent = "Subject is required.";
        isValid = false;
    }

    // Message validation
    if (message === "") {
        document.getElementById("message-error").textContent = "Message cannot be empty.";
        isValid = false;
    }

    // If all fields are valid, submit the form via AJAX
    if (isValid) {
        let formData = new FormData(this);
        
        fetch("contact.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById("success-message").textContent = data;
            document.getElementById("contact-form").reset(); // Clear the form
        })
        .catch(error => console.error("Error:", error));
    }
});
