    AFRAME.registerComponent("modify-materials", {
         schema: {
            analyserEl: {type: 'selector'}
        },
        init: function() {
        this.analyser = this.data.analyserEl.components.audioanalyser || this.el.components.audioanalyser;
          //this.analyser = document.getElementById('soundReactive').components.audioanalyser;
          this.currOffset = 0;
          
          var el = this.el;
          this.counter = 0;
          let self = this; // used to reference the component, within the listener fuction
          var mesh;
          
          var numLoaded = 0;

          this.el.addEventListener("model-loaded", allLoaded);
          
          this.el.addEventListener('materialtextureloaded', allLoaded);
         
         function allLoaded(){
         numLoaded++;
            if(numLoaded == 2){
            console.log("model mesh and texture are loaded");
          
              const obj = el.getObject3D("mesh");
              obj.traverse(node => {
                if (node.name.indexOf("model") !== -1) {
                  //models has to be named "model" !!!
                  node.material.color.set("rgb(100, 100, 100)");
                  node.material.map.offset = new THREE.Vector2(0.2, 0);
                }
              });//end traverse node
              
            }//all assets loaded
         }     
              
        },
        tick: function() {

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
          
            this.counter++;
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