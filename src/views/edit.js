import {html} from '../../node_modules/lit-html/lit-html.js';

import { dataService } from '../dataService.js';

const editTemplate = (data) => html`
 <section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form class="edit-form" @submit=${submitHandler}>
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                value="${data.brand}"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                value="${data.model}"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                value="${data.imageUrl}"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                value="${data.release}"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                value="${data.designer}"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                value="${data.value}"
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

let context = null;

export async function showEdit(ctx){
    context = ctx;
    
    const id = context.params.id;
    const data = await dataService.getSingleCharacter(id);
    context.render(editTemplate(data));
}

async function submitHandler(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const model = formData.get('model');
    const brand = formData.get('brand');
    const imageUrl = formData.get('imageUrl');
    const release = formData.get('release');
    const designer = formData.get('designer');
    const value = formData.get('value');



    if (!brand || !model || !imageUrl || !release || !designer || !value) {
        return window.alert('Fields are required');
    }

    const id = context.params.id;
    await dataService.updateCharacter(id, {brand, model, imageUrl, release, designer, value});
    context.goTo(`/details/${id}`);

}