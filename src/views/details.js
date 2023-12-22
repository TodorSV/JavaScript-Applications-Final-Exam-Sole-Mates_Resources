
import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../dataService.js";
import { userHelper } from "../userHelper.js";




const detailsTemplate = (item, isOwner) => html`
  <section id="details">
  <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="${item.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${item.brand}</span></p>
              <p>Model: <span id="details-model">${item.model}</span></p>
              <p>Release date: <span id="details-release">${item.release}</span></p>
              <p>Designer: <span id="details-designer">${item.designer}</span></p>
              <p>Value: <span id="details-value">${item.value}</span></p>
            </div>
        <!-- Edit and Delete only for creator -->
        ${isOwner ?
           html`
           <div id="action-buttons">
              <a href="/edit/${item._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click=${deleteShoe}>Delete</a>
            </div>
            `:  nothing
        }
        </div>
    </div>
  </section>
`;


let context = null;

export async function showDetails(ctx) {
        context = ctx; 
        const id = ctx.params.id;
        const data = await dataService.getSingleCharacter(id);
        const isOwner = userHelper.getUserID() === data._ownerId;
        ctx.render(detailsTemplate(data, isOwner));
      }
      
      async function deleteShoe(e) {
        e.preventDefault();
        const id = context.params.id;
        const choice = confirm("Are you sure you want to delete this motorcycle?");
        
       if(choice){
        await dataService.deleteCharacter(id);
        context.goTo("/dashboard");
       }
      }
