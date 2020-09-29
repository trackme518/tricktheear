//FADE OUT/IN playing audio - effectively turning ON/OFF individual sound tracks that are atteched to models
AFRAME.registerComponent('audiohandler', {  
dependencies: ['sound'], //wait for sound component to be ready - otherwise it does not make sense    
  init:function() {
     //let playing = false;     
     //let firstRun = true;
    let firstRun = false;
    let playing = true;
         
     this.el.addEventListener('click', () => {
         //this.el.components.sound.   loaded - asset?
          if(!playing) {
            if(firstRun){
            this.el.components.sound.stopSound();
            this.el.components.sound.playSound();
            firstRun = false;
            }else{
            this.el.emit('fadeIn');
            }

            //var currId = this.el.getAttribute('data-dat');
            //alert(currId);
            //this.el.emit('fadeOut');
           } else {
            //var currId = this.el.getAttribute('data-dat');
            //alert(currId);
            this.el.emit('fadeOut');
            }
           playing = !playing;
      
     });
  }
});