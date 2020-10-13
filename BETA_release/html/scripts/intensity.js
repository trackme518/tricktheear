AFRAME.registerComponent('audio-vol-light', {
  schema: {
    analyserEl: {type: 'selector'},
    multiplier: {type: 'number', default: 1}
  },

  tick: function () {
    
    var analyserEl =  this.data.analyserEl || this.el; //not efficient should be called once but than i cant check if new element is created...
    if(!analyserEl){return;}
        
    this.analyser = analyserEl.components.audioanalyser || this.el.components.audioanalyser;
    if(!this.analyser){return;}
    //console.log(this.analyser.volume);
    var volume = this.analyser.volume * this.data.multiplier;
    this.el.setAttribute('intensity', volume );
 
  }
});