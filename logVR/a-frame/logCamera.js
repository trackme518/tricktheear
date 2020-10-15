//read local position and rotation of camera:
var ws = null;
  
AFRAME.registerComponent('rotation-reader', {
  schema: {
   position: {default: true},  //if we should track position
   rotation: {default: true},  //if we should track rotation
   interval: { type: 'number', default: 100}, //how often to track in milliseconds
   lastsend: {type: 'number', default: 0 }, //last time we send the message over websocket
   lastconnected: {type: 'number', default: 0 }, //last attempt to connect
   connected: {default: false},
   connecting: {default: false},
   ip: {default: 'ws://10.0.0.18:8025/track'},
   pos3: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
   rot3: { type: 'vec3', default: { x: 0, y: 0, z: 0 } }    
  },
  
  init: function(){
   //this.data.pos3 = this.el.object3D.position;
   //console.log(this.data.pos3); 
  },
  
  tick: function (time, timeDelta) {
  var currState = this.data;
  var currIp = this.data.ip;
  var currTime = 0;
    
    if( !isNaN(time) ){
      currTime = parseInt(time);
    //console.log(currTime);      
    }
    
  if(!this.data.connected && !this.data.connecting){
    this.data.connecting = true;
    console.log('connecting to host with websocket');    
    ws = new WebSocket(this.data.ip);
    this.data.lastconnected = currTime; //save the last attempt

  }
   
   if(!ws){ return; }
    ws.onopen = function() {       
        currState.connected = true;
        currState.connecting = false;
        console.log("connected to websocket");
        };
    
   ws.onclose = function() {       
       console.log("websocket connection closed");
       currState.connected = false;
       currState.connecting = true;      
          if( currTime > currState.lastconnected + 3 ){ //try to connect every x second
              ws = new WebSocket(currIp);
              currState.lastconnected = currTime; //save the last attempt
              console.log('connecting to host with websocket');
          }
       };
                
    if(currState.connected){ 

        if( currTime > this.data.lastsend + this.data.interval ){ //  this.data.lastsend + this.data.interval
          //console.log( parseInt(time) - this.data.lastsend ); //debug real time interval
          this.data.lastsend = currTime; //reset timer
          //--------------------------
            var posChanged = false;
            var rotChanged = false;
            
            if( this.data.position ){
                //check if position changed and save last state
                if( (this.data.pos3.x != this.el.object3D.position.x) || (this.data.pos3.y != this.el.object3D.position.y) || (this.data.pos3.z != this.el.object3D.position.z) ){
                    //console.log('position changed');
                    posChanged = true;
                    this.data.pos3 = new THREE.Vector3(this.el.object3D.position.x, this.el.object3D.position.y, this.el.object3D.position.z);
                }
            }
            
             if( this.data.rotation ){
                //check if rotation changed and save last state
                if( (this.data.rot3.x != this.el.object3D.rotation.x) || (this.data.rot3.y != this.el.object3D.rotation.y) || (this.data.rot3.z != this.el.object3D.rotation.z) ){
                    rotChanged = true;
                    this.data.rot3 = new THREE.Vector3(this.el.object3D.rotation.x, this.el.object3D.rotation.y, this.el.object3D.rotation.z);
                }
            }
          
            if( posChanged || rotChanged){ //if variables changed and interval passed send new data
                ws.send( this.el.object3D.position.x+';'+this.el.object3D.position.y+';'+this.el.object3D.position.z+';'+this.el.object3D.rotation.x+';'+this.el.object3D.rotation.y+';'+this.el.object3D.rotation.z+';'+currTime );
            }
          //------------------------
        }
        
   
      // `rotation` is a three.js Euler using radians. `quaternion` also available.
      //console.log(this.el.object3D.rotation);
      // `position` is a three.js Vector3.
      //console.log(this.el.object3D.position);
    }
  }//end tick fce
});

// <a-entity camera rotation-reader="ip: ws://10.0.0.18:8025/track; position: true, rotation: true; interval: 100;"></a-entity>
