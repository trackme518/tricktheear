//read local position and rotation of camera:
var ws = null;
  
AFRAME.registerComponent('rotation-reader', {
  schema: {
  connected: {
        default: false
      },
   connecting: {
        default: false
      },
   ip: {
   default: 'ws://10.0.0.18:8025/track'
   }   
  },
  
  tick: function () {
  var currState = this.data;
  var currIp = this.data.ip;

  if(!this.data.connected && !this.data.connecting){
    this.data.connecting = true;
    console.log('connecting to host with websocket');
    ws = new WebSocket(this.data.ip);
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
       console.log('connecting to host with websocket');
       ws = new WebSocket(currIp);
       };
                
    if(currState.connected){
       ws.send( this.el.object3D.position.x+';'+this.el.object3D.position.y+';'+this.el.object3D.position.z+';'+this.el.object3D.rotation.x+';'+this.el.object3D.rotation.y+';'+this.el.object3D.rotation.z );
      // `rotation` is a three.js Euler using radians. `quaternion` also available.
      //console.log(this.el.object3D.rotation);
      // `position` is a three.js Vector3.
      //console.log(this.el.object3D.position);
    }
  }//end tick fce
});

// <a-entity camera rotation-reader="ip: ws://10.0.0.18:8025/track;"></a-entity>
