//LOAD SCENES DYNAMICALLY 
AFRAME.registerComponent('loadscene', {  
   schema: {
    id: {type: 'number', default: 0}
  },
  init:function() {
     var currScene =  parseInt(this.data.id); //get scene selector
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
 myNode.innerHTML=''; //this is more effecient than traversing childs

//---------------------------------------------------- 
   console.log('selected scene: '+currScene);
     
   //scene constructor----------------------------------  
    function vrScene (modId, assetCount, modScale, modPos, modRot, modSrc, modSound) {
    this.modScale = modScale;
    this.modPos = modPos;
    this.modRot = modRot;
    this.modSrc = modSrc;
    this.modSound = modSound;
    this.modId = modId;
    this.assetCount = assetCount;
    }
    //creating new instances of scene object
    //0=sasa 1=gary 2=ian 3=bratri 
    scenes.push( new vrScene( 0, 13,['1.5 1.5 1.5', '1.5 1.5 1.5', '1.5 1.5 1.5', '1.5 1.5 1.5'], ['0 0 -4', '-4 0 0', '0 0 4', '4 0 0'], ['0 0 0', '0 90 0', '0 180 0', '0 270 0'], ['models/sasa/trpelivost.glb', 'models/sasa/lehkomyslnost4.glb', 'models/sasa/laska.glb', 'models/sasa/lstivost4.glb'],['audio/sasa/Kontrabas.ogg', 'audio/sasa/Saxofon.ogg', 'audio/sasa/Trombon.ogg', 'audio/sasa/Violoncello.ogg'] )  );
    scenes.push( new vrScene( 1, 8,['1.0 1.0 1.0', '1.0 1.0 1.0', '1.0 1.0 1.0', '1.0 1.0 1.0'], ['0 0 -4', '-4 0 0', '0 0 4', '4 0 0'], ['0 0 0', '0 90 0', '0 180 0', '0 270 0'], ['models/laska.glb', 'models/lenost.glb', 'models/laska.glb', 'models/laska.glb'],['audio/gary/click1.ogg', 'audio/gary/click2.ogg', 'audio/gary/click3.ogg', 'audio/gary/click4.ogg'] )  );
    scenes.push( new vrScene( 2, 8,['1.0 1.0 1.0', '1.0 1.0 1.0', '1.0 1.0 1.0', '1.0 1.0 1.0'],['0 0 -4', '-4 0 0', '0 0 4', '4 0 0'], ['0 0 0', '0 90 0', '0 180 0', '0 270 0'], ['models/laska.glb', 'models/lenost.glb', 'models/laska.glb', 'models/laska.glb'],['audio/ian/noise0.ogg', 'audio/ian/noise1.ogg', 'audio/ian/noise2.ogg', 'audio/ian/noise3.ogg'] )  );
    //scenes.push( new vrScene( 3, 8, ['0 0 -4', '-4 0 0', '0 0 4', '4 0 0'], ['0 0 0', '0 90 0', '0 180 0', '0 270 0'], ['models/lakomstvi.glb', 'models/pile.glb', 'models/pomluva.glb', 'models/stridmost.glb'],['audio/bratri/lakomstvi.ogg', 'audio/bratri/pile.ogg', 'audio/bratri/pomluva.ogg', 'audio/bratri/stridmost.ogg'] )  );
    scenes.push( new vrScene( 3, 15,['1.0 1.0 1.0', '1.0 1.0 1.0', '1.0 1.0 1.0', '1.0 1.0 1.0'],['0 0 -4', '-4 0 0', '0 0 4', '4 0 0'], ['0 0 0', '0 90 0', '0 180 0', '0 270 0'], ['models/bratri/stridmost.obj', 'models/bratri/lakomstvi.obj', 'models/bratri/pile.obj', 'models/bratri/pomluva.obj'],['audio/bratri/stridmost.ogg','audio/bratri/lakomstvi.ogg', 'audio/bratri/pile.ogg', 'audio/bratri/pomluva.ogg'] )  );
    //num of assets: 4 mesh models(4 statues) + 4 sound components + ( 4textures if .obj ) + a-sky texture / floor texture + dressing elements models -> just check the console!  
    if( parseInt(currScene) > scenes.length-1 ){
    console.log('wrong scene id -> select scene in range')
    currScene = 0;
    }

//------------------------------------------------
    var scenemodels = document.getElementById('currmodels');
    
    for (i = 0; i < 4; i++) {
      var currId = 'model'+i;
      //set static params-----------------
      if( scenes[currScene].modId == 3){
      //obj-model="obj: #tree-obj; mtl: #tree-mtl"
       //default for all statues
       //var statuesStats =  ['class=model','id='+currId,'scale=1.0 1.0 1.0','shadow=cast:true', 'obj-model=obj: '+scenes[currScene].modSrc[i]+';','material=src: url(images/pattern1.jpg); color: grey; offset: 0 0; repeat: 20 20;','position='+scenes[currScene].modPos[i],'rotation='+scenes[currScene].modRot[i],'sound=src: url('+scenes[currScene].modSound[i]+'); volume: 3.5; autoplay: false; distanceModel: exponential; rolloffFactor: 2;'];
       //'ring-on-beat=analyserEl: #sound_reactive'
       switch(i) {
        case 0:  //+scenes[currScene].modScale[i]
          addEntity(scenemodels,  ['class=model','id='+currId,'scale='+scenes[currScene].modScale[i],'shadow=cast:true', 'obj-model=obj: '+scenes[currScene].modSrc[i]+';','material=src: url(images/circle.jpg); color: grey; offset: 0 0; repeat: 13 13;','position='+scenes[currScene].modPos[i],'rotation='+scenes[currScene].modRot[i],'sound=src: url('+scenes[currScene].modSound[i]+'); volume: 3.5; autoplay: false; distanceModel: exponential; rolloffFactor: 2;', 'ring-on-beat=analyserEl: #sound_reactive','color-on-beat=analyserEl: #sound_reactive; counter: 255;'], 'a-entity' );
        break;
        case 1:
          addEntity(scenemodels, ['class=model','id='+currId,'scale='+scenes[currScene].modScale[i],'shadow=cast:true', 'obj-model=obj: '+scenes[currScene].modSrc[i]+';','material=src: url(images/lines.jpg); color: grey; offset: 0 0; repeat: 5 5;','position='+scenes[currScene].modPos[i],'rotation='+scenes[currScene].modRot[i],'sound=src: url('+scenes[currScene].modSound[i]+'); volume: 3.5; autoplay: false; distanceModel: exponential; rolloffFactor: 2;', 'color-on-beat=analyserEl: #sound_reactive; counter: 255;'], 'a-entity' );
        break;
        case 2:
          addEntity(scenemodels, ['class=model','id='+currId,'scale='+scenes[currScene].modScale[i],'shadow=cast:true', 'obj-model=obj: '+scenes[currScene].modSrc[i]+';','material=src: url(images/symbols.jpg); color: grey; offset: 0 0; repeat: 5 5;','position='+scenes[currScene].modPos[i],'rotation='+scenes[currScene].modRot[i],'sound=src: url('+scenes[currScene].modSound[i]+'); volume: 3.5; autoplay: false; distanceModel: exponential; rolloffFactor: 2;', 'color-on-beat=analyserEl: #sound_reactive; counter: 255;'], 'a-entity' );
        break;
        default:
          addEntity(scenemodels, ['class=model','id='+currId,'scale='+scenes[currScene].modScale[i],'shadow=cast:true', 'obj-model=obj: '+scenes[currScene].modSrc[i]+';','material=src: url(images/strip.jpg); color: grey; offset: 0 0; repeat: 50 50;','position='+scenes[currScene].modPos[i],'rotation='+scenes[currScene].modRot[i],'sound=src: url('+scenes[currScene].modSound[i]+'); volume: 3.5; autoplay: false; distanceModel: exponential; rolloffFactor: 2;', 'modify-materials=analyserEl: #sound_reactive'], 'a-entity' );
        }
     
      }else{
      addEntity(scenemodels, ['class=model','id='+currId,'scale='+scenes[currScene].modScale[i],'material=color: #000000','shadow=cast: true', 'gltf-model='+scenes[currScene].modSrc[i],'position='+scenes[currScene].modPos[i],'rotation='+scenes[currScene].modRot[i],'sound=src: url('+scenes[currScene].modSound[i]+'); volume: 3.5; autoplay: false; distanceModel: exponential; rolloffFactor: 2;'], 'a-entity' );
      }
      
      if(i == 0){ //set first track as source for audio analyser in scene -> it is hooked up to dynamic light intensity in the scene //check against scene id: scenes[currScene].id
        var webaudio = document.getElementById("audioreact");
        webaudio.setAttribute('src', scenes[currScene].modSound[i] );
        webaudio.addEventListener( 'loaded', checkLoaded ); //attach event listener for loaded event
      }

    }//end load models
    
    var decoEl =  document.getElementById('scenedeco'); //dressing assets
    switch( scenes[currScene].modId ) { //add dressing elements based on scene id
      case 0://sasa
        document.getElementById('VR_scene').setAttribute('fog','type: linear; color: #AAB; far: 35; near: 0');
        addEntity(decoEl, ['gltf-model=models/deco/skeleton.glb','id=skeleton','position=0.0 0.0 -20.0','scale=2.0 2.0 2.0', 'shadow=cast:true'], 'a-entity');
        addEntity(decoEl, ['src=images/sky0.jpg','id=scene_sky','material=fog:false'], 'a-sky');
        addEntity(decoEl, ['id=scene_floor','position=0 0 0'], 'a-ocean-plane');
        break;
      case 3://bratri
        //document.getElementById('VR_scene').removeAttribute('fog');
        document.getElementById('VR_scene').setAttribute('fog','type: linear; color: black; far: 30; near: 0');
        addEntity(decoEl, ['id=scene_floor','position=0 0 0', 'height=100', 'width=100', 'src=images/glitch512bw.jpg', 'material=repeat: 20 20;','rotation=-90 0 0'], 'a-plane');
        addEntity(decoEl, ['src=images/strip.jpg','material=repeat: 1 1;','id=scene_sky'], 'a-sky');
        break;
      default:
        // code block
    }
    //-----------------------------------------------------------------------------------
    //settign attributes to entities so repeptitive so I wrote a function to do it for me: 
    function addEntity(elParent, htmlString, htmlTag){
      var currEl = document.createElement(htmlTag);
      var soundPar = false;
      var textureModel = false;
         for(var r=0; r < htmlString.length; r++ ){
           var getArs = htmlString[r].split('='); 
             if(getArs.length==2){//we have pair
                currEl.setAttribute(getArs[0],getArs[1]); //set parsed attribute
                    if(getArs[0] === 'sound'){
                    soundPar = true;
                    }
                    
                    if(getArs[0] === 'obj-model'){
                        textureModel = true;
                    }
                    
                //console.log(getArs[0]+'='+getArs[1]);
             }
             if(getArs.length==1){//only solo argument - hey might be component
                currEl.setAttribute(getArs[0],''); //set parsed attribute
             }
         }
        elParent.appendChild(currEl); //appned created entity to given parent
        currEl.addEventListener( 'loaded', checkLoaded ); //attach event listener for loaded event
        
        if(htmlTag === 'a-sky' || textureModel  || htmlTag === 'a-ocean-plane'){
        //currEl.addEventListener('materialtextureloaded', function(){ console.log('texture for sky loaded!'); });
        currEl.addEventListener( 'materialtextureloaded', checkLoaded );
        }
        
        if(soundPar){//if there is also sound component add another listener
        currEl.addEventListener( 'sound-loaded', checkLoaded );
        currEl.addEventListener('sound-ended', createMenu );
        loadedModels.push(currEl); //save reference to whole entity with sound comp.
        //console.log(currEl);
        }
        
         getCurrTime(currEl.id, numLoaded+'/'+scenes[currScene].assetCount+' started'); //log current time in console
      }
      
      function getCurrTime(timeEl, comment){
        var myDate = new Date(); // for now
        var m = addZero(myDate.getMinutes(), 2);
        var s = addZero(myDate.getSeconds(), 2);
        var ms = addZero(myDate.getMilliseconds(), 3); 
        console.log(comment+' loading: '+timeEl+' at '+m+':'+s+':'+ms ); 
      }
      
      function addZero(x,n) {
        while (x.toString().length < n) {
          x = "0" + x;
        }
        return x;
      }
      
        //------------------------------------------------------------------------
      //function checkLoaded(whatEle, typeEle){
      function checkLoaded(){  
      //not that sound-loaded event will fire only once per resource even it it is attached to multiple entities - therefore it wont trigger if you would have 4entities with same src for sound component
      //we have different sound for every entitiy so it is ok  
       if( event.type === 'loaded' || event.type === 'sound-loaded' || event.type === 'materialtextureloaded'){
         numLoaded++;
         event.target.removeEventListener(event.type, checkLoaded);
        getCurrTime(event.target.id, numLoaded+'/'+scenes[currScene].assetCount+' '+event.type+' finished'); //log current time in console
       }
       
       //console.log(event.target.id+' loaded '+numLoaded+' out of '+scenes[currScene].assetCount+' type: '+ event.type ); //debug
        
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