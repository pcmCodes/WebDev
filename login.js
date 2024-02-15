const container = document.querySelector(".container"),
  pwShowHide = document.querySelectorAll(".showHidePw"),
  pwFields = document.querySelectorAll(".password"),
  signUp = document.querySelector(".signup-link"),
  login = document.querySelector(".login-link"),
  flipCheckbox = document.getElementById("flip");

// js code to show/hide password and change icon
pwShowHide.forEach(eyeIcon => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach(pwField => {
      if (pwField.type === "password") {
        pwField.type = "text";

        pwShowHide.forEach(icon => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        });
      } else {
        pwField.type = "password";

        pwShowHide.forEach(icon => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Function to register a new user
  function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      return { success: false, message: "User already exists." };
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true, message: "Registration successful." };
  }

  // Function to authenticate a user
  function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      return { success: true, message: "Login successful." };
    } else {
      return { success: false, message: "Invalid email or password." };
    }
  }

  // Event listener for registration
  document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector('input[name="signup-name"]').value;
    const email = document.querySelector('input[name="signup-username"]').value;
    const password = document.querySelector('input[name="signup-password"]').value;

    // Validate the registration form
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const registrationResult = registerUser(name, email, password);
    alert(registrationResult.message);

    // If registration is successful, flip back to the login form
    if (registrationResult.success) {
      container.classList.remove("active");
      flipCheckbox.checked = false; // Uncheck the flip checkbox
    }
  });

  // Event listener for login
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Validate the login form
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const loginResult = loginUser(email, password);

    if (loginResult.success) {
      alert(loginResult.message);
      // Redirect to the account.html or perform other actions after successful login
      window.location.href = "index.html";
    } else {
      alert(loginResult.message);
    }
  });
});


function redirectToLogin() {
  window.location.href = "login.html";
}
