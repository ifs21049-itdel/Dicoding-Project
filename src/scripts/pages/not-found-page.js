export default class NotFoundPage {
  async render() {
    return `
      <section class="error-section" aria-labelledby="not-found-heading">
        <h2 id="not-found-heading">Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <a href="#/" class="back-home">Back to Home</a>
      </section>
    `;
  }

  async afterRender() {
    feather.replace();
  }
}
