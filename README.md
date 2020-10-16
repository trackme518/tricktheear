# tricktheear
Music in VR implemented in A-frame framework

More information at: https://tricktheear.eu/download/

If you are just for Camera logging component for tracking user movement and rotation in VR and sending the data over websocket you can use it like this:

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
