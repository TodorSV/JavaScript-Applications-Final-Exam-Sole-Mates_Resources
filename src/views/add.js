import{html} from '../../node_modules/lit-html/lit-html.js';

import { dataService } from '../dataService.js';

const addCharacterTemplate = () => html`
<section id="create">
          <div class="form">
            <h2>Add item</h2>
            <form class="create-form" @submit=${submitHandler}>
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

let context = null;
export function showAdd(ctx){
    context = ctx;
    context.render(addCharacterTemplate());
   
}

async function submitHandler(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const brand = formData.get('brand');
    const model = formData.get('model');
    const imageUrl = formData.get('imageUrl');
    const release = formData.get('release');
    const designer = formData.get('designer');
    const value = formData.get('value');



    if (!brand || !model || !imageUrl || !release || !designer || !value) {
        return window.alert('Fields are required');
    }

    await dataService.addCharacter({brand, model, imageUrl, release, designer, value}); 
    context.goTo('/dashboard');

}