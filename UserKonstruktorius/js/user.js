export class User {
    constructor(email, name) {
      this.email = email;
      this.name = name;
      this.isLoggedIn = false;
    }
  
    toggleLoginStatus() {
      this.isLoggedIn = !this.isLoggedIn;
    }
  
    login() {
      return `Welcome, ${this.name}`;
    }
  
    logout() {
      return 'See ya next time!';
    }
  }