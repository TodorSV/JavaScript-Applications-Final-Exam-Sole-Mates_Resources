import{html} from '../../node_modules/lit-html/lit-html.js';

 import { userService } from '../userService.js';

const registerTemplate = () => html`
 <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="login-form" @submit=${submitHandler}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`;

let context = null; 
export function showRegister(ctx){
    context = ctx;
    context.render(registerTemplate());
    console.log('showRegister');
}

async function submitHandler(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword= formData.get('re-password');
 
    if (!email || !password || !repeatPassword || password !== repeatPassword) {
        return window.alert('Fields are required');
    }
 
    try {
      await userService.register(email, password, repeatPassword);
      context.updateNav();
      context.goTo('/');
    } catch (error) {
      window.alert(error.message);
    }
  
}