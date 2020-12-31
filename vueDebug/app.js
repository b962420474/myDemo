import auth from './auth.js'
export default {
  template: `<div>
    <h1>Auth Flow</h1>
    <div> {{ message }} </div>
    <ul>
      <li>
        <router-link v-if="loggedIn" to="/logout">Log out</router-link>
        <router-link v-if="!loggedIn" to="/login">Log in</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/dashboard">Dashboard</router-link>
        (authenticated)
      </li>
    </ul>
    <template v-if="$route.matched.length">
      <router-view></router-view>
    </template>
    <template v-else>
      <p>You are logged {{ loggedIn ? 'in' : 'out' }}</p>
    </template></div>`,
  data() {
    return {
      loggedIn: auth.loggedIn(),
      message: "mmm"
    }
  },
  created() {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn
    }
  },
  mounted() {
    this.message = "xxx";
    //window.addEventListener("keydown", this.throttle(this.keybord,1000))
    window.addEventListener("keydown", this.keybord)
    console.log();
  },
  methods: {
    keybord(e) {
      console.log("-------------------"+String.fromCharCode(e.which))
      if(String.fromCharCode(e.which)=="Q"){
        this.$router.push({path: '/about'})
      }
      else if(String.fromCharCode(e.which)=="W"){
        this.$router.push({path: '/dashboard'})
      }
      else if(String.fromCharCode(e.which)=="E"){
        this.$router.push({path: '/login'})
      }
    },
    throttle(fn,delay){
      var t=Date.now();
      var num=0;
      return (e)=>{
        var n=Date.now()
        if(n-t<delay){
          num++;
          return;
        }
        t=n;
        console.log(num);
        num=0;
        fn.call(this,e);
      }
    }
  }
}