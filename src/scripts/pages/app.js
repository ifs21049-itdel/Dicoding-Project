import routes from "../routes/routes.js";
import { getActiveRoute } from "../routes/url-parser.js";
import { isLoggedIn } from "../data/api.js";

class App {
  #content = null;

  constructor({ content }) {
    this.#content = content;
  }

  async renderPage() {
    const token = isLoggedIn();
    let url = getActiveRoute();
    if (url === "/add-story" && !token) {
      window.location.hash = "/login";
      url = "/login";
    }
    const page = routes[url] || routes["/"];
    this.#content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
