AFRAME.registerComponent('audioanalyser-volume-intensity', {
  schema: {
    analyserEl: {type: 'selector'},
    multiplier: {type: 'number', default: 1}
  },

  tick: function () {
    var analyserEl = this.data.analyserEl || this.el;
    var analyserComponent;
    var el = this.el;
    var volume;

    analyserComponent = analyserEl.components.audioanalyser;
    if (!analyserComponent.analyser) { return; }
    
    volume = analyserComponent.volume * this.data.multiplier;
    el.setAttribute('intensity', volume );
    //el.setAttribute('intensity', 30.0 );
     //el.intensity = 30.0;      
  }
});