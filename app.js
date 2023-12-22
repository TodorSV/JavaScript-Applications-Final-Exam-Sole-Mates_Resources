import page from "./node_modules/page/page.mjs";
import {render} from "./node_modules/lit-html/lit-html.js";
import { userService } from "./src/userService.js";
import { userHelper } from "./src/userHelper.js";
import { showHome } from "./src/views/home.js";
import { showRegister } from "./src/views/register.js";
import { showLogin } from "./src/views/login.js";
import { showAdd } from "./src/views/add.js";
import { showDashboard } from "./src/views/dashboard.js";
import { showDetails } from "./src/views/details.js";
import { showEdit } from "./src/views/edit.js";
import { showSearch } from "./src/views/search.js";

const root = document.querySelector("main");
const logUser = document.querySelector('.user');
const guestUser = document.querySelector('.guest');

page(decorationContext);
page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/dashboard', showDashboard);
page('/search' , showSearch);
page('/add', showAdd);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page("/logout", logout);



page.start();
updateNav();

async function logout() {
    await userService.logout();
    updateNav();
    goTo("/");
}

function renderer(template) {
    render(template, root);
}

function updateNav() {

    const userData = userHelper.getUserData();

    if (userData) {
        logUser.style.display = "block";
        guestUser.style.display = "none";
    } else {
        logUser.style.display = "none";
        guestUser.style.display = "block";
    }
}

function goTo(path) {
    page.redirect(path);
}

function decorationContext(ctx, next) {
    ctx.render = renderer;
    ctx.updateNav = updateNav;
    ctx.goTo = goTo;

    next();
}