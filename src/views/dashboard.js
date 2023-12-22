import { html } from "../../node_modules/lit-html/lit-html.js";

import { dataService } from "../dataService.js";

const dashboardTemplate = (data) => html`
  <section id="dashboard">
    <h2>Characters</h2>
    ${data.length > 0
      ? html`<section id="characters">
          ${data.map(x => characterCard(x))
          }`
      : html`<h2>There are no items added yet.</h2>`}
  </section>
`;

const characterCard = (item) => html`
  <h2>Collectibles</h2>
  <ul class="card-wrapper">
    <li class="card">
      <img src="${item.imageUrl}" alt="travis" />
      <p><strong>Brand: </strong><span class="brand">${item.brand}</span></p>
      <p><strong>Model: </strong><span class="model">${item.model}</span></p>
      <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
      <a class="details-btn" href="/details/${item._id}">Details</a>
    </li>
  </ul>
`;


let context = null;
export async function showDashboard(ctx) {
  context = ctx;
  const data = await dataService.getAllCharacters();
  context.render(dashboardTemplate(data));
}
