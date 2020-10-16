# Trick The Ear
Music in VR implemented in A-frame framework

More information at: https://tricktheear.eu/download/

If you are here for Camera logging component for tracking user movement and rotation in VR and sending the data over websocket you can use it like this:

```html
<html>
<head>
<script src="https://cdn.jsdelivr.net/gh/trackme518/tricktheear/logVR/a-frame/logCamera.js"></script>
</head>
<body>
<a-scene>
<a-entity camera look-controls wasd-controls rotation-reader="ip: ws://10.0.0.18:8025/track; position: true, rotation: true; interval: 100;"></a-entity>
<a-scene>
</body>
</html>
```

To recieve the data and log the in text file you need another app. It can also be a-frame web based app or anything else that can handle parsing websockets. The incoming data look like this:

```
-0.31928554801974135;1.6;-0.11819450292053287;0.024000000000000195;0.28200000000000036;0;12681
```

All values are split by delimeter ";". First three values are x,y,z component of position and another three are x,y,z components of rotation. The last parameter is a timestamp in miliseconds since the program started. 
