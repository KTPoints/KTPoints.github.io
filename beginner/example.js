// instantiate Vue 
let example = new Vue({
  // Where to attach
  // Only things within example can be changed 
  // # applies to IDs
  el: "#example",

  // variables
  data: {
    input: '',
    text: '',
    isCenter: false,
  },

  // functions
  methods: {
    changeText: function(){
      // use this to access our data
      this.text = "My Name Is " + this.input;
    },

    centerText: function(){
      // toggle
      this.isCenter = !this.isCenter;
    }
  },

  // There are a TON of other things too on top of el, data, and methods (such as computed, mounted, watch etc.)
  // The Vue documentation is pretty good at providing examples for all these things
})