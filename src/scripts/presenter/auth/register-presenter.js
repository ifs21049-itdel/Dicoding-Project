import { register } from "../../data/api.js";
import { renderRegisterForm } from "../../view/register-view.js";

export default class RegisterPresenter {
  constructor() {
    renderRegisterForm(this.handleRegister.bind(this));
  }

  async handleRegister(name, email, password) {
    try {
      await register(name, email, password);
      alert("Registration successful! Please login.");
      return { success: true, redirect: "/login" };
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
}
