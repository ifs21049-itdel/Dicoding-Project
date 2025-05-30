import { login } from "../../data/api.js";
import { renderLoginForm } from "../../view/login-view.js";

export default class LoginPresenter {
  constructor() {
    renderLoginForm(this.handleLogin.bind(this));
  }

  async handleLogin(email, password) {
    try {
      const { loginResult } = await login(email, password);
      localStorage.setItem("authToken", loginResult.token);
      localStorage.setItem("userName", loginResult.name);
      alert("Login successful!");
      return { success: true, redirect: "/" };
    } catch (error) {
      alert(`Login failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
}
