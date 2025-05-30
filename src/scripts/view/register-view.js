export const renderRegisterForm = (onSubmit) => {
  const content = document.querySelector("#main-content");
  content.innerHTML = `
    <section class="auth-section" aria-labelledby="register-heading">
      <h2 id="register-heading">Register</h2>
      <form id="register-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required aria-required="true">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required aria-required="true">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required aria-required="true" minlength="8">
        </div>
        <button type="submit"><i data-feather="user-plus"></i> Register</button>
        <p>Already have an account? <a href="#/login">Login here</a></p>
      </form>
    </section>
  `;

  document
    .getElementById("register-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const result = await onSubmit(name, email, password);
      if (result && result.success && result.redirect) {
        window.location.hash = result.redirect;
      }
    });

  feather.replace();
};
