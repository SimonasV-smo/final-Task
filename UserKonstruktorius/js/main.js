import { User } from './user.js';
import { form, messageDiv } from './domElements.js';

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = form.elements['email'].value;
  const name = form.elements['name'].value;

  const user = new User(email, name);
  user.toggleLoginStatus();

  displayMessage(user);

  form.reset();
});

function displayMessage(user) {
  messageDiv.innerHTML = '';

  const h1 = document.createElement('h1');
  const button = document.createElement('button');

  if (user.isLoggedIn) {
    h1.textContent = user.login();
    button.textContent = 'Logout';
    button.addEventListener('click', () => {
      user.toggleLoginStatus();
      h1.textContent = user.isLoggedIn ? user.login() : user.logout();
      if (!user.isLoggedIn) {
        button.remove();
      }
    });
  } else {
    h1.textContent = user.logout();
  }

  messageDiv.appendChild(h1);
  if (user.isLoggedIn) {
    messageDiv.appendChild(button);
  }
}