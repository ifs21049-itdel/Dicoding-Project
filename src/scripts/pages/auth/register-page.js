import { renderRegisterForm } from "../../view/register-view.js";
import RegisterPresenter from "../../presenter/auth/register-presenter.js";

export default class RegisterPage {
  async render() {
    return `
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
  }

  async afterRender() {
    new RegisterPresenter();
  }
}
