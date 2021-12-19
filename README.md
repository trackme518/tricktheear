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

If you are on windows64bit you can simply just downlaod latest build of our reciever and run logVR.exe - no installation is needed:

https://github.com/trackme518/tricktheear/tree/master/logVR/BUILD

You can start recording the incoming data by pressing "r" on keyboard. You will end recording by pressing "r" again. Data will be saved in data folder with current date in the file name. We have also added heatmap image as an output - it is generated automatically when recording.

## Licence - MIT, open source
Copyright 2020 Vojtěch Leischner

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
