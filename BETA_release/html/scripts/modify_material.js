  AFRAME.registerComponent('modify-materials', {        

        init: function () {
        this.counter = 0;
          // Wait for model to load.
          this.el.addEventListener('model-loaded', () => {
            // Grab the mesh / scene.
            const obj = this.el.getObject3D('mesh');

            // Go over the submeshes and modify materials we want.
            obj.traverse(node => {
              if (node.name.indexOf('model') !== -1) {   //models has to be named "model" !!!
                //node.material.color.set('rgb(100, 100, 100)');
                //node.material.emissive.set('rgb(0, , 0)');
                
                //node.material.normalMap.set('images/waternormals.jpg');
                //node.material.normalMap.set('url{images/waternormals.jpg}');
                //normalMap: images/waternormals.jpg;
              }
            });
          });
        },
        
       //-----------------------
      tick: function () {
       // var analyserEl = this.data.analyserEl || this.el;
      var analyserEl = document.getElementById('soundReactive');
      var analyserComponent;
       var volume;
       analyserComponent = analyserEl.components.audioanalyser;

       if (!analyserComponent.analyser) { return; }
       volume = analyserComponent.volume;
       //el.setAttribute('intensity', volume );
         const obj = this.el.getObject3D('mesh');       
         if(obj != null){

                     }

              // Go over the submeshes and modify materials we want.
                obj.traverse(node => {
                  if (node.name.indexOf('model') !== -1) {   //models has to be named "model" !!!
                    /*
                    if(volume>0.2){
                    node.material.color.set('rgb(255,0,0)');
                    //node.material.emissive.set('rgb(255,255,255)');
                    }
                    */                     
                    var mapVolume = parseInt(volume*100 + 0);
                    var currCol = 'rgb('+mapVolume+','+mapVolume+','+mapVolume+')';
                    node.material.emissive.set(currCol);
                  }
                });
        }      
       }//end tick fce
     
      });