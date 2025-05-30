import HomePresenter from "../../presenter/home-presenter.js";

export default class HomePage {
  async render() {
    return `
      <section class="story-section" aria-labelledby="stories-heading">
        <h2 id="stories-heading" class="sr-only">Latest Stories</h2>
        <div id="story-content"></div>
      </section>
    `;
  }

  async afterRender() {
    new HomePresenter();
  }
}
