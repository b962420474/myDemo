import auth from '../auth.js'
export default {
    template: `<div>
    <h2>Login</h2>
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    <form @submit.prevent="login">
      <label><input v-model="email" placeholder="email"></label>
      <label><input v-model="pass" placeholder="password" type="password"></label> (hint: password1)<br>
      <button type="submit">login</button>
      <p v-if="error" class="error">Bad login information</p>
    </form>
  </div>`,
    data() {
        return {
            email: 'joe@example.com',
            pass: '',
            error: false
        }
    },
    created(){
        console.log("created.....");
    },
    methods: {
        login() {
            auth.login(this.email, this.pass, loggedIn => {
                if (!loggedIn) {
                    this.error = true
                } else {
                    this.$router.replace(this.$route.query.redirect || '/')
                }
            })
        }
    }
}