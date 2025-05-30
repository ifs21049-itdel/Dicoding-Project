// src/scripts/view/error-view.js
export const renderError = (message) => {
  const content = document.querySelector("#main-content");
  content.innerHTML = `
    <section class="error-section" aria-labelledby="error-heading">
      <h2 id="error-heading">Error</h2>
      <p>${message}</p>
      <a href="#/" class="back-home">Back to Home</a>
    </section>
  `;
};
