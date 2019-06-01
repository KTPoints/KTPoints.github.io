let authenticate = new Vue({
  el: '#authenticate',
  data: {
    uniqname: '',
    password: '',
    loggedin: false,
    button_name: ['Sign in', 'Sign up'],
    link_name: ["Sign up now!", "Have an account?"],
    button_index: 0,
    payload: {
      major: "",
      meetings_left: 0,
      firstname: "",
      lastname: "",
      pledge_class: "", 
      points: 0,
      standing: '',
      uniqname: '',
      year: ''
    },
    disablePledgeClass: false
  },
  computed: {
    email: function(){
      return this.uniqname + "@umich.edu"
    }
  },
  methods: {
    login: function(){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log('we made it');
        this.loggedin = true;
        window.location.href = './landing.html';
      })
      .catch(function(error) {
        console.log('BAD');
        console.log(error);
      });      
    },

    signup: function(){
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log("new user " + this.email + " signed up")
        this.addInfo();
      })
      .catch(function(error) {
        console.log('bad signup');
        console.log(error);
      });      
    },

    addInfo: function(){
      let db = firebase.firestore();
      db.collection("users").doc(this.uniqname).set({
        name: this.payload.firstname + " " + this.payload.lastname,
        pledge_class: this.payload.pledge_class,
        standing: this.payload.standing,
        uniqname: this.uniqname,
        year: this.payload.year,
        major: "CS",
        points: 0,
        meetings_left: 0,
      })
      .then(function() {
          console.log("Document successfully written!");
          window.location.href = './landing.html';
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    },

    toggleButton: function(){
      this.button_index = 1 - this.button_index;
    },

    authenticate: function(){
      if (this.button_index === 0){
        this.login();
      }
      else if (this.button_index === 1){
        this.signup();
      }
    },
  },
  watch: {
    'payload.standing': function(){
      if (this.payload.standing == 'Rushee'){
        this.disablePledgeClass = true;
        this.payload.pledge_class = '';
      }
      else{
        this.disablePledgeClass = false;
      }
    },
  },
})
