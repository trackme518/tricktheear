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
           
 while (myNode.firstChild) {//remove all created childs
   myNode.removeChild(myNode.lastChild);
 }

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
    scenes.push( new vrScene( 0, 15,['1.5 1.5 1.5', '1.5 1.5 1.5', '1.5 1.5 1.5', '1.5 1.5 1.5'], ['0 0 -4', '-4 0 0', '0 0 4', '4 0 0'], ['0 0 0', '0 90 0', '0 180 0', '0 270 0'], ['models/sasa/trpelivost.glb', 'models/sasa/lehkomyslnost.glb', 'models/sasa/laska.glb', 'models/sasa/lstivost.glb'],['audio/sasa/trpelivost.ogg', 'audio/sasa/lehkomyslnost.ogg', 'audio/sasa/laska.ogg', 'audio/sasa/lstivost.ogg'] )  );
    //1=gary
    scenes.push( new vrScene( 1, 8,['1.0 1.0 1.0', '1.0 1.0 1.0', '1.0 1.0 1.0', '1.0 1.0 1.0'], ['0 0 -4', '-4 0 0', '0 0 4', '4 0 0'], ['0 0 0', '0 90 0', '0 180 0', '0 270 0'], ['models/laska.glb', 'models/lenost.glb', 'models/laska.glb', 'models/laska.glb'],['audio/gary/cello.ogg', 'audio/gary/viola.ogg', 'audio/gary/violin.ogg', 'audio/gary/violin2.ogg'] )  );
    //2=ian
    scenes.push( new vrScene( 2, 10,['1.0 1.0 1.0', '1.0 1.0 1.0', '1.0 1.0 1.0', '1.0 1.0 1.0'],['0 0 -4', '-4 0 0', '0 0 4', '4 0 0'], ['0 0 0', '0 90 0', '0 180 0', '0 270 0'], ['models/ian/nadeje6k.glb', 'models/ian/lenost.glb',  'models/ian/vira7ksmalltex.glb', 'models/laska.glb'],['audio/ian/RB.ogg', 'audio/ian/LB.ogg', 'audio/ian/LF.ogg', 'audio/ian/RF.ogg'] )  );
    //3=bratri
    scenes.push( new vrScene( 3, 11,['1.0 1.0 1.0', '1.0 1.0 1.0', '1.0 1.0 1.0', '1.0 1.0 1.0'],['0 0 -4', '-4 0 0', '0 0 4', '4 0 0'], ['0 0 0', '0 90 0', '0 180 0', '0 270 0'], ['models/bratri/stridmost4.obj', 'models/bratri/lakomstvi2.obj', 'models/bratri/pile2.obj', 'models/bratri/pomluva2.obj'],['audio/bratri/stridmost.ogg','audio/bratri/lakomstvi.ogg', 'audio/bratri/pile.ogg', 'audio/bratri/pomluva.ogg'] )  );
    //4=sussanne
    scenes.push( new vrScene( 1, 8,['1.0 1.0 1.0', '1.0 1.0 1.0', '1.0 1.0 1.0', '1.0 1.0 1.0'], ['0 0 -4', '-4 0 0', '0 0 4', '4 0 0'], ['0 0 0', '0 90 0', '0 180 0', '0 270 0'], ['models/sussanne/podvod.glb', 'models/sussanne/uprimnost.glb', 'models/sussanne/zavist.glb', 'models/sussanne/moudrost.glb'],['audio/gary/click1.ogg', 'audio/gary/click2.ogg', 'audio/gary/click3.ogg', 'audio/gary/click4.ogg'] )  );
    //num of assets: 4 mesh models(4 statues) + 4 sound components + ( 4textures if .obj ) + a-sky texture / floor texture + dressing elements models -> just check the console!  
    if( parseInt(currScene) > scenes.length-1 ){
    console.log('wrong scene id -> select scene in range')
    currScene = 0;
    }

//------------------------------------------------
    var scenemodels = document.getElementById('currmodels');
    var decoEl =  document.getElementById('scenedeco'); //dressing assets
    var myAssets =  document.getElementById('myassets');
    
    for (i = 0; i < 4; i++) {
      var currId = 'model'+i;

      var thisAudio = 'audioreact'+i;
      addEntity(myAssets, ['src='+scenes[currScene].modSound[i],'id='+thisAudio], 'audio', null);
      var setAnalyser = 'audioanalyser=src: #'+thisAudio+';  beatDetectionThrottle: 50; enableBeatDetection: true; enableLevels: false; enableWaveform: false; beatDetectionMinVolume: 0.1; fftSize: 128;';
      
      //scene specific code-----------------
      if( scenes[currScene].modId == 3){ //BRATRI
      addEntity(myAssets, ['src=images/circle.jpg','id=tex_circle'], 'img', null);
      addEntity(myAssets, ['src=images/lines.jpg','id=tex_lines'], 'img', null);
      addEntity(myAssets, ['src=images/symbols.jpg','id=tex_symbols'], 'img', null);
      addEntity(myAssets, ['src=images/strip.jpg','id=tex_strip'], 'img', null);
           
       switch(i) {                                                                                                                                //'obj-model=obj: '+scenes[currScene].modSrc[i]+';' //gltf-model=models/deco/skeleton.glb //'material=src: #tex_symbols; color: grey; offset: 0 0; repeat: 5 5;'
        case 0:                                                                                                                                                                                                                                                                                                                                                                                                                                                    //analyserEl: #sound_reactive1;
          addEntity(scenemodels,  ['class=model',setAnalyser,'id='+currId,'scale='+scenes[currScene].modScale[i],'shadow=cast:false; receive: false;', 'obj-model=obj: '+scenes[currScene].modSrc[i]+';','material=src: #tex_lines ; color: grey; offset: 0 0; repeat: 13 13;','position='+scenes[currScene].modPos[i],'rotation='+scenes[currScene].modRot[i],'sound=src: #'+thisAudio+'; volume: 3.5; autoplay: false; distanceModel: exponential; rolloffFactor: 2;', 'ring-on-beat','color-on-beat=counter: 255;'], 'a-entity', null );
        break;
        case 1:
          addEntity(scenemodels, ['class=model',setAnalyser,'id='+currId,'scale='+scenes[currScene].modScale[i],'shadow=cast:false; receive: false;', 'obj-model=obj: '+scenes[currScene].modSrc[i]+';','material=src: #tex_circle; color: grey; offset: 0 0; repeat: 5 5;','position='+scenes[currScene].modPos[i],'rotation='+scenes[currScene].modRot[i],'sound=src: #'+thisAudio+'; volume: 3.5; autoplay: false; distanceModel: exponential; rolloffFactor: 2;', 'color-on-beat=counter: 255;'], 'a-entity', null );
        break;
        case 2:
          addEntity(scenemodels, ['class=model',setAnalyser,'id='+currId,'scale='+scenes[currScene].modScale[i],'shadow=cast:false; receive: false;', 'obj-model=obj: '+scenes[currScene].modSrc[i]+';','material=src: #tex_symbols; color: grey; offset: 0 0; repeat: 5 5;','position='+scenes[currScene].modPos[i],'rotation='+scenes[currScene].modRot[i],'sound=src: #'+thisAudio+'; volume: 3.5; autoplay: false; distanceModel: exponential; rolloffFactor: 2;', 'color-on-beat=counter: 255;'], 'a-entity', null );
        break;
        default:
          addEntity(scenemodels, ['class=model',setAnalyser,'id='+currId,'scale='+scenes[currScene].modScale[i],'shadow=cast:false; receive: false;', 'obj-model=obj: '+scenes[currScene].modSrc[i]+';','material=src: #tex_strip; color: grey; offset: 0 0; repeat: 50 50;','position='+scenes[currScene].modPos[i],'rotation='+scenes[currScene].modRot[i],'sound=src: #'+thisAudio+'; volume: 3.5; autoplay: false; distanceModel: exponential; rolloffFactor: 2;', 'modify-materials'], 'a-entity', null );
        }
     
      }else{                                                                                     //,'material=color: #000000'
        addEntity(scenemodels, ['class=model', setAnalyser, 'id='+currId,'scale='+scenes[currScene].modScale[i],'shadow=cast: false; receive: false;', 'gltf-model='+scenes[currScene].modSrc[i],'position='+scenes[currScene].modPos[i],'rotation='+scenes[currScene].modRot[i],'sound=src: #'+thisAudio+'; volume: 3.5; autoplay: false; distanceModel: exponential; rolloffFactor: 2;'], 'a-entity', null ); 
      }

    }//end load models      
    
    switch( scenes[currScene].modId ) { //add dressing elements based on scene id
      case 0://sasa
        document.getElementById('VR_scene').setAttribute('fog','type: linear; color: #AAB; far: 35; near: 0');
        addEntity(decoEl, ['gltf-model=models/deco/skeleton.glb','id=skeleton','position=0.0 0.0 -20.0','scale=2.0 2.0 2.0', 'shadow=cast:true'], 'a-entity', null);
        addEntity(myAssets, ['src=images/sky0.jpg','id=skytex'], 'img', null);
        addEntity(decoEl, ['src=#skytex','id=scene_sky','material=fog:false'], 'a-sky', null);
        //a-ocean-plane
        addEntity(myAssets, ['src=images/waternormals.jpg','id=waternorm'], 'img', null);//waternormals.jpg
        addEntity(myAssets, ['src=images/water_tex.jpg','id=watertex'], 'img', null);
        addEntity(decoEl, ['id=scene_floor', 'wobble-normal', 'rotation=-90 0 0', 'width=10000', 'height=10000', 'material=color: #000000; transparent: true; metalness: 1; roughness: 0.2; normalMap: #waternorm; sphericalEnvMap: #watertex; normalTextureRepeat: 50 50; normalTextureOffset: 0 0; normalScale: 0.5 0.5; opacity: 0.8; shader: standard;' ], 'a-plane', null);      
        //add light reacting to first music track
        addEntity(decoEl, ['id=target_1','position=-0 0 0'], 'a-entity', null);                 
        addEntity(decoEl, ['id=sound_light','color=orange','type=spot','angle=45', 'intensity=1.0', 'castShadow=false', 'position=-20.0 50.0 -20.0', 'rotation=-90 0 0', 'target=#target_1', 'audio-vol-light=multiplier: 0.1; analyserEl: #model0;'], 'a-light', null);
        //add another track for ambient with no spatiality :-/ bummer
        addEntity(myAssets, ['src=audio/sasa/ambient.ogg','id=ambient'], 'audio', null);//add source to assets to load immedietly
        addEntity(myAssets, ['sound=src: #ambient; volume: 0.1; autoplay: false; positional: false;','id=ambientTrack'], 'a-entity', null);//add entity to start playback
       break;
      case 2: //ian
        document.getElementById('VR_scene').setAttribute('fog','type: linear; color: #AAB; far: 15; near: 0');
        document.getElementById('VR_scene').setAttribute('background','color: #AAB');
        
        addEntity(decoEl, ['gltf-model=models/deco/ian_scene_compressed2.glb','id=ruins','position=0.0 0.0 0.0','scale=1.0 1.0 1.0', 'shadow=cast:true; recieve: true;'], 'a-entity', null);
        //addEntity(decoEl, ['gltf-model=models/deco/car.glb','id=car','rotation=0.0 45.0 0.0','position=0.0 0.0 10.0','scale=0.5 0.5 0.5', 'shadow=cast:true'], 'a-entity', null);
        //addEntity(decoEl, ['gltf-model=models/deco/panelak.glb','id=panelak','position=0.0 0.0 -20.0','scale=1.0 1.0 1.0', 'shadow=cast:true'], 'a-entity', null);
        addEntity(myAssets, ['src=images/concrete_floor_diff_1k.jpg','id=tex_floor'], 'img', null);
        addEntity(myAssets, ['src=images/concrete_floor_Nor_1k.jpg','id=tex_floor_n'], 'img', null);
        addEntity(decoEl, ['id=scene_floor','position=0 0 0', 'height=100', 'width=100', 'src=#tex_floor', 'material=repeat: 20 20; normalMap: #tex_floor_n', 'shadow=receive: false;', 'rotation=-90 0 0'], 'a-plane', null);       
         //add light reacting to first music track
        addEntity(decoEl, ['id=target_1','position=-0 0 0'], 'a-entity', null);                 
        addEntity(decoEl, ['id=sound_light','color=white','type=spot','angle=45', 'intensity=1.0', 'castShadow=false', 'position=-20.0 50.0 -20.0', 'rotation=-90 0 0', 'target=#target_1'], 'a-light', null);
        break;  
      case 3://bratri
        //document.getElementById('VR_scene').removeAttribute('fog');
        document.getElementById('VR_scene').setAttribute('fog','type: linear; color: black; far: 30; near: 0');
        addEntity(myAssets, ['src=images/glitch512bw.jpg','id=tex_floor'], 'img', null);
        addEntity(decoEl, ['id=scene_floor','position=0 0 0', 'height=100', 'width=100', 'src=#tex_floor', 'material=repeat: 20 20;', 'shadow=receive: false;', 'rotation=-90 0 0'], 'a-plane', null);
        //add light reacting to first music track
        addEntity(decoEl, ['id=target_1','position=-0 0 0'], 'a-entity', null);                 
        addEntity(decoEl, ['id=sound_light','color=orange','type=spot','angle=45', 'intensity=1.0', 'castShadow=true', 'position=-20.0 50.0 -20.0', 'rotation=-90 0 0', 'target=#target_1', 'audio-vol-light=multiplier: 0.1; analyserEl: #model1;'], 'a-light', null);
        break;
      default:
        // code block
    }
    //-----------------------------------------------------------------------------------
    //settign attributes to entities so repeptitive so I wrote a function to do it for me: 
    function addEntity(elParent, htmlString, htmlTag, currEl){
    
    var _append = false;
    
        if(!currEl){ //if the element is null it does not exists yet so create it:
        currEl = document.createElement(htmlTag);
        _append = true;
        }else{

        }
      
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
        
        if(_append){
        elParent.appendChild(currEl); //appned created entity to given parent
        }
        
        //currEl.addEventListener( 'loaded', checkLoaded ); //attach event listener for loaded event
        
        if(htmlTag === 'a-sky' || textureModel  || htmlTag === 'a-ocean-plane'){
        //currEl.addEventListener('materialtextureloaded', function(){ console.log('texture for sky loaded!'); });
            currEl.addEventListener( 'materialtextureloaded', checkLoaded );
        }else if (htmlTag === 'audio' ||  htmlTag === 'img'){
          //do not add event listener - we are already checking with sound components respectively, besides it does not work reliably :-)
        } else{
            currEl.addEventListener( 'loaded', checkLoaded ); //attach event listener for loaded event
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
       var ambientEnable = false;//check if we have besides positional audio also flat stereo audio for the scene
      
      function checkLoaded(){  
      //not that sound-loaded event will fire only once per resource even it it is attached to multiple entities - therefore it wont trigger if you would have 4entities with same src for sound component
      //we have different sound for every entitiy so it is ok  
       
       if( event.type === 'loaded' || event.type === 'sound-loaded' || event.type === 'materialtextureloaded'){
         numLoaded++;
         event.target.removeEventListener(event.type, checkLoaded);
         getCurrTime(event.target.id, numLoaded+'/'+scenes[currScene].assetCount+' '+event.type+' finished'); //log current time in console
            
            if(event.target.id == 'ambientTrack'){
                ambientEnable = true;
                console.log('ambient music track present');
            }
       }
       
       //console.log(event.target.id+' loaded '+numLoaded+' out of '+scenes[currScene].assetCount+' type: '+ event.type ); //debug
        
        if(numLoaded == scenes[currScene].assetCount) { // we want all models and sounds ready before starting the playback
        numLoaded = 0; //reset assests loaded num count
        
            document.getElementById('fade').emit('fadein');
            document.getElementById('msg').emit('fadein');
            
            //var webaudio = document.getElementById('audioreact0');  //start <audio> - first track hooked to non spatial audio tag
            //webaudio.volume = 0.01; //set almost inaudible volume -> audio analyser needs basic non spatial audio source
            //webaudio.play(); //start the non spatial audio playback - analyser will react with light intensity to it
            
            if(ambientEnable){
              var ambientTrack = document.getElementById('ambientTrack');
              ambientTrack.components.sound.playSound();
              console.log('ambient audio started');
            }
           
            for (x = 0; x < 4; x++) {
                if(loadedModels.length>3){
                    var webaudio = document.getElementById('audioreact'+x);
                    //console.log('this ID '+webaudio.id);
                    webaudio.volume = 0.01;
                    webaudio.play();
                    loadedModels[x].components.sound.playSound();
                }
           }//end for all models
         console.log('webaudio playback started');   
         ambientEnable = false; //reset
           
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