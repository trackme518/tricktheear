AFRAME.registerComponent('color-on-beat', {
  schema: {
    analyserEl: {type: 'selector'},
    counter: {type: 'number', default: 255}
  },

  init: function () {
    var analyserEl = this.data.analyserEl || this.el;
    var myel = this.el;
    this.counter = this.data.counter;

    analyserEl.addEventListener('audioanalyserbeat', function () {
    //console.log("beat");
      //console.log(myel.id);
      //this.counter = 255;
      myel.setAttribute('color-on-beat', 'counter', '255');
      //myel.components.color-on-beat.counter = 255;
      //el.setAttribute('material', 'color', '#' + new THREE.Color(0, 0, this.counter).getHexString()); 
    myel.setAttribute('material', 'emissive', 'rgb(255,255,255)'); 
      //el.setAttribute('material', 'emissive', '#' + new THREE.Color(
        //Math.random(), Math.random(), Math.random()
      //).getHexString());
    });
  },

    tick: function () {
          
      if(this.data.counter>9){
        this.data.counter = this.data.counter-10;
        //console.log(this.counter);
        //this.counter = this.counter-0.05;
        this.el.setAttribute('material', 'emissive', 'rgb('+this.data.counter+','+this.data.counter+','+this.data.counter+')');
        //this.el.setAttribute('material', 'color', '#' + new THREE.Color( 0, 0,  this.counter).getHexString()); 
      }
    }
    
});