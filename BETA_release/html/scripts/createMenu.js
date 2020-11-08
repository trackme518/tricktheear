//CREATE MAIN MENU - circular 360 text based menu around user
AFRAME.registerComponent('createmenu', {  
  init:function() {

    content = ["EXPERIMENT\nAlexandra Cihanska Machova", "CLASSIC\nGary Rushton", "EXPERIMENT  Ian Mykiska", "TECHNO\nBratri", "CINEMATIC\nSusanne Hardt", "?\nComing soon"];  

    //this completely removes previously loaded models--------------
     var myNode = document.getElementById("currmodels");
     myNode.innerHTML = '';
     //delete all decorations from previous scene
     myNode = document.getElementById('scenedeco');
     myNode.innerHTML = '';
    //------------------------------------------
     document.getElementById('VR_scene').setAttribute('background','color: #000');
     document.getElementById('VR_scene').removeAttribute("fog");
     //document.getElementById('VR_scene').setAttribute('fog','false;');
    //-------------------------------------------------

    var r = 3;
    for(var i = 0; i < content.length; i++) {
        var x = 0 + r * Math.cos(2 * Math.PI * i / content.length);
        var y = 0 + r * Math.sin(2 * Math.PI * i / content.length);   
    
        x = Math.round((x + Number.EPSILON) * 100) / 100
        y = Math.round(y*100)/100;
    
        entity = document.createElement('a-entity');
        entity.setAttribute('position', x+' 2 '+y ); 
        
        entity.setAttribute('look-at', '#center' ); //using lookAt component! you can also use look-at="[camera]" to always face player - ie billboard   
        //console.log(entity);  
        document.querySelector("#mainmenu").append(entity);
        
        clickArea = document.createElement('a-plane'); //create clickable invisible plane to act as button (otherwise it might be hard to click on text shapes...)
        clickArea.setAttribute('loadscene', 'id: '+i+';' ); 
        
        if(i==0 || i==2 || i==3){ //enable only finished scenes
            clickArea.setAttribute('class', 'clickable' );
            currFont = 'font: https://cdn.aframe.io/fonts/mozillavr.fnt; value: '+content[i]+'; align: center; color: white; wrapCount: 12; width: 2;';
        }else{
            currFont = 'font: https://cdn.aframe.io/fonts/mozillavr.fnt; value: '+content[i]+'; align: center; color: grey; wrapCount: 12; width: 2;'; 
        }
        entity.setAttribute('text', currFont );
        
        clickArea.setAttribute('height', '2' ); 
        clickArea.setAttribute('width', '2' ); 
        clickArea.setAttribute('visible', 'false' ); 
        
        entity.append(clickArea); //make clickable plane child of font 
    }//end for loop


  }
});