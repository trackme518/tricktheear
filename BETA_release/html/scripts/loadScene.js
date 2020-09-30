//LOAD SCENES DYNAMICALLY

  
AFRAME.registerComponent('loadscene', {  
   schema: {
    id: {type: 'number', default: 0}
  },
  init:function() {
     var currScene =  this.data.id; //get scene selector
     var numLoaded = 0; //keep track how many essential assets are loaded - ie models + audio
     var assetCount = 0; //how many addtional assets needs to be loaded - differs scene to scene
     var triggered = false;
     var musicEnded = 0; //keep track when all the tracks ends - iterate 
    var loadedModels = []; //array to hold entities created
     var scenes = [];
  
this.el.addEventListener('click', startFade ); //add event listener for mouse click

function startFade(){
//start by fading out the screen:
document.querySelector('#fade').emit('fadeout');
document.querySelector('#msg').emit('fadeout');
document.querySelector('#fade').addEventListener( 'animationcomplete', loadScene ); //once the black out finishes start to load the scene!
}
   
   function loadScene(){
    musicEnded = 0; //reset music tracks ended count
   
   document.getElementById('fade').removeEventListener("animationcomplete", loadScene);  //detach the listener - we are already loading!
 //this completely removes all menu elements--------------
 var myNode = document.getElementById("mainmenu");
 myNode.removeAttribute("createmenu"); //remove js component
           
 while (myNode.firstChild) {//remove all created childs
   myNode.removeChild(myNode.lastChild);
 }

//---------------------------------------------------- 
   console.log('selected scene: '+currScene);
     
   //scene constructor----------------------------------  
    function vrScene (modId, assetCount, modPos, modRot, modSrc, modSound) {
    this.modPos = modPos;
    this.modRot = modRot;
    this.modSrc = modSrc;
    this.modSound = modSound;
    this.modId = modId;
    this.assetCount = assetCount;
    }
    //creating new instances of scene object 
    scenes.push( new vrScene( 0, 11, ['0 0 -4', '-4 0 0', '0 0 4', '4 0 0'], ['0 0 0', '0 90 0', '0 180 0', '0 270 0'], ['models/laska.glb', 'models/lenost.glb', 'models/laska.glb', 'models/laska.glb'],['audio/1_AIVA_bass.ogg', 'audio/noise1.ogg', 'audio/noise2.ogg', 'audio/noise3.ogg'] )  ); 
    scenes.push( new vrScene( 1, 8, ['0 0 -4', '-4 0 0', '0 0 4', '4 0 0'], ['0 0 0', '0 90 0', '0 180 0', '0 270 0'], ['models/laska.glb', 'models/lenost.glb', 'models/laska.glb', 'models/laska.glb'],['audio/noise0.ogg', 'audio/noise1.ogg', 'audio/noise2.ogg', 'audio/noise3.ogg'] )  );
       
    if( parseInt(currScene) > scenes.length-1 ){
    console.log('wrong scene id -> select scene in range')
    currScene = 0;
    currId = 0; 
    }

//------------------------------------------------

    var scenemodels = document.getElementById('currmodels');
    
    for (i = 0; i < 4; i++) {
      var currId = 'model'+i;
      var currEl = document.getElementById(currId);
      var entity;
      if(currEl == null) { //first time we are creating the model
        entity = document.createElement('a-entity');
      } else{  //model already exists
        entity = currEl;        
      }  
      //set static params-----------------         
        entity.setAttribute("class", "model");
        entity.setAttribute("id", currId);
        entity.setAttribute('scale', '1.0 1.0 1.0 ');
        entity.setAttribute('shadow', 'cast: true');
        
       //set dynamic params from class-----------------    
        entity.setAttribute('gltf-model',scenes[currScene].modSrc[i])  //it is easier to assign texture dynamically to .obj than to .glb - you have to traverse three.js internal loader for that
        //entity.setAttribute('material', 'src: models/molten/diffX.jpg; normalMap: models/molten/normal.jpg;'); //assign texture - can be changed dynamically
        entity.setAttribute('position',scenes[currScene].modPos[i]);
        entity.setAttribute('rotation',scenes[currScene].modRot[i]);
        
        currSoundpar =  'src: url('+scenes[currScene].modSound[i]+'); volume: 0.3; autoplay: false; distanceModel: inverse;';
        entity.setAttribute('sound', currSoundpar );
        
        if(i == 0){ //set first track as source for audio analyser in scene -> it is hooked up to dynamic light intensity in the scene //check against scene id: scenes[currScene].id
           var webaudio = document.querySelector('#audioreact');
           webaudio.setAttribute('src', scenes[currScene].modSound[i] );
        }
        
        //loadedModels[i] = entity; //save created entitites into array for later use
        loadedModels.push(entity);
        console.log('pushed '+entity.id);
                   
       //check if loaded----------------------------------
        console.log('what id: '+ entity.id);
        entity.addEventListener( 'loaded', checkLoaded   ); //add event listener for loaded - triggered by model mesh loaded
        entity.addEventListener( 'sound-loaded', checkLoaded ); //add event listener for loaded  - triggered by sound ready to play
        entity.addEventListener('sound-loaded', ()=> {console.log('adad sound loaded')});
        entity.addEventListener('sound-ended', createMenu );
      //------------------     
      if(currEl == null) { //first time we are creating the model
        scenemodels.appendChild(entity); //append created element to scene
      }     
    }//end load models
    
       //dressing assets
    switch( scenes[currScene].modId ) { //add dressing elements based on scene id
      case 0:
        // <a-entity id="skeleton" gltf-model="#skeleton" position="0 0 -20" rotation="0 0 0" scale="2.0 2.0 2.0" src="tex.jpg" shadow="cast: true"></a-entity>
        var decoEl = document.querySelector('#scenedeco');
        var entity = document.createElement('a-entity');

        var decoSrc =  'models/deco/skeleton.glb';
        //entity.setAttribute("id", "skeleton");
        entity.setAttribute('id','skeleton');
        entity.setAttribute('gltf-model',decoSrc);
        entity.setAttribute('position','0 0 -20');
        entity.setAttribute('scale','2.0 2.0 2.0');
        entity.setAttribute('shadow', 'cast: true');
        decoEl.appendChild(entity);
       
        entity.addEventListener( 'loaded', checkLoaded ); //add event listener for loaded
        
        // <a-sky  src="#sky" material="fog: false"></a-sky>

        var decoSrc =  'images/sky0.jpg';
        entity = document.createElement('a-sky');
        entity.setAttribute('id','scene_sky'); 
        entity.setAttribute('src', 'images/sky0.jpg');
        entity.setAttribute('material','fog: false');
        decoEl.appendChild(entity);
      
        entity.addEventListener( 'loaded', checkLoaded ); //add event listener for loaded
        
        //<a-ocean-plane material="normalMap: #water-normal; sphericalEnvMap: #waterTex;" position="0 0 0" ></a-ocean-plane>  

        entity = document.createElement('a-ocean-plane'); //see oceanShader.js component for more 
        entity.setAttribute('id','scene_floor');
        entity.setAttribute('position','0 0 0');
        decoEl.appendChild(entity);
        
        entity.addEventListener( 'loaded', checkLoaded ); //add event listener for loaded
       
        break;
      case 1:
        // code block
        break;
      default:
        // code block
    }
    //------------------------------------------------------ 


     //-----------------------------------------------------
      //function checkLoaded(whatEle, typeEle){
      function checkLoaded(){  
      //not that sound-loaded event will fire only once per resource even it it is attached to multiple entities - therefore it wont trigger if you would have 4entities with same src for sound component
      //we have different sound for every entitiy so it is ok  
       if( event.type === 'loaded' || event.type === 'sound-loaded' ){
         numLoaded++;
         event.target.removeEventListener(event.type, checkLoaded);
       }
       
       console.log(event.target.id+' loaded '+numLoaded+' out of '+assetCount+' type: '+ event.type ); //debug
        
        if(numLoaded == scenes[currScene].assetCount) { // we want all models and sounds ready before starting the playback
        numLoaded = 0; //reset assests loaded num count
        
            document.getElementById('fade').emit('fadein');
            document.getElementById('msg').emit('fadein');
            var webaudio = document.getElementById('audioreact');  //start <audio> - first track hooked to non spatial audio tag
            webaudio.volume = 0.01; //set almost inaudible volume -> audio analyser needs basic non spatial audio source
            webaudio.play(); //start the non spatial audio playback - analyser will react with light intensity to it

            for (x = 0; x < 4; x++) {
                if(loadedModels.length>3){
                loadedModels[x].components.sound.playSound();
                }
           }//end for all models
        loadedModels = []; //reset array with loaded entities
        }//end all four models loaded
      }

     //-----------------------------------------------------
    function createMenu(){
    musicEnded++;
      if(musicEnded==4){ //all tracks ended playing
          console.log('All audio tracks finished. Creating menu scene...');
          document.getElementById('fade').emit('fadeout'); //start blackOut
          document.getElementById('fade').addEventListener( 'animationcomplete', buildNewMenu ); //once the black out finishes start to load the scene!
      }  
    }
    //----------------------------------------------------- 
    function buildNewMenu(){
    document.getElementById('fade').removeEventListener("animationcomplete", buildNewMenu);  //detach the listener - we are already loading!
    document.getElementById("mainmenu").setAttribute("createmenu", ""); //create menu again
    document.getElementById('fade').emit('fadein'); //fade back in the menu
    }
    //-----------------------------------------------------

   }//end loadScene


  } //end init function

});