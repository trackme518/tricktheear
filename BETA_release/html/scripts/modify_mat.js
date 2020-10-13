    AFRAME.registerComponent("modify-materials", {
         //dependencies: ['b'],
         schema: {
            analyserEl: {type: 'selector'}
        },        
        tick: function() {
        
        var analyserEl =  this.data.analyserEl || this.el; //not efficient should be called once but than i cant check if new element is created...
        if(!analyserEl){return;}
        
        this.analyser = analyserEl.components.audioanalyser || this.el.components.audioanalyser;
        if(!this.analyser){return;}

        function map_range(value, low1, high1, low2, high2) {
            return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
        }

        var currCol;
        var volume = 0;
        if (this.analyser.analyser) { 
            volume = this.analyser.volume;
            //var mapVolume = parseInt(volume*100 + 0);
            //var mapVolume =  Math.min(Math.max(parseInt(volume*100), 0), 500) ; //constrain number between 0-500
            var mapVolume =  Math.min(Math.max(volume, 0), 5) ;
            //console.log(mapVolume);
            mapVolume = parseInt( map_range(volume, 0, 5, 0, 255) );
            currCol = 'rgb('+mapVolume+','+mapVolume+','+mapVolume+')';
        }
       
          const obj = this.el.getObject3D("mesh");
          if (obj != null) {

            obj.traverse(node => {
              if (node.name.indexOf("model") !== -1) {
                if(node.material.map){
                    //node.material.map.offset = new THREE.Vector2(Math.sin(this.counter * 0.03) * 0.25,0);
                     node.material.map.offset = new THREE.Vector2(volume,0);
                     //console.log(volume);
                     node.material.emissive.set(currCol);
                     //if(volume>0.8){
                    //}else{
                    //}
                }
              }
            }); //end traverse node
            
          }//end obj is not null
        }
      });