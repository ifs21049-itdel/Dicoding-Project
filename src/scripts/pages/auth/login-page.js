import { renderLoginForm } from "../../view/login-view.js";
import LoginPresenter from "../../presenter/auth/login-presenter.js";

export default class LoginPage {
  async render() {
    return `
      <section class="auth-section" aria-labelledby="login-heading">
        <h2 id="login-heading">Login</h2>
        <form id="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required aria-required="true">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required aria-required="true">
          </div>
          <button type="submit"><i data-feather="log-in"></i> Login</button>
          <p>Don't have an account? <a href="#/register">Register here</a></p>
        </form>
      </section>
    `;
  }

  async afterRender() {
    new LoginPresenter();
  }
}
