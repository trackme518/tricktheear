//hide on click
AFRAME.registerComponent('welcomeMsg', {  
  init:function() {
    let toggleVisible = true;
         
     this.el.addEventListener('click', () => { 
      toggleVisible = !toggleVisible;
      this.el.setAttribute('visible', toggleVisible);
     });
  }
});