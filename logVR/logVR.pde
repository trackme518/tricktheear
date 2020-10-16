import peasy.PeasyCam; //3d camera
PeasyCam cam;

import websockets.*;//websockets
WebsocketServer ws;

PVector position = new PVector(0, 0, 0);
PVector rotation = new PVector(0, 0, 0);
PVector bounds = new PVector(720, 720); //heatmap bounds

PShape user;
int step = 40;
int gridSize = 640;

PrintWriter output;
boolean recording = false;

PGraphics heatmap;

void setup() {
  size(720, 720, P3D);
  cam = new PeasyCam(this, 400);
  lights();
  ws= new WebsocketServer(this, 8025, "/track");
  user = loadShape("unicorn3.obj");

  heatmap = createGraphics( int(bounds.x), int(bounds.y), P2D);
  heatmap.beginDraw();
  heatmap.noStroke();
  heatmap.blendMode(ADD);
  heatmap.background(0);
  heatmap.endDraw();
}

void draw() {
  background(0);

  cam.beginHUD();
  if (recording) {
    fill(255, 0, 0, 255);
  } else {
    fill(150, 150, 150, 255);
  }
  circle(width-50, 50, 30);
  cam.endHUD();

  stroke(255);
  pushMatrix();
  rotateX(radians(90));
  for (int i = 0; i < gridSize*2 / step; i++ ) {
    line(i*step - gridSize, -gridSize, i*step - gridSize, gridSize);
    line(0 - gridSize, i*step -gridSize, gridSize, i*step - gridSize);
  } 
  popMatrix();

  lights();

  pushMatrix();
  translate(position.x*100, -position.y*100, position.z*100);
  rotateX(rotation.x*-1);
  rotateY(rotation.y);
  rotateZ(rotation.z);
  scale(5.0);
  shape(user, 0, 0);
  popMatrix();

  if (recording) { //record data to image as well
    heatmap.beginDraw();
    heatmap.blendMode(ADD);
    color c = heatmap.get(int(position.x*100), int(position.z*100) );  

    if (blue(c)<255) {
      heatmap.fill(0, 0, 1);
    } else if (green(c)<255) {
      heatmap.fill(0, 1, 0);
    } else {
      heatmap.fill(1, 0, 0);
    }

    //heatmap.fill(255);
    heatmap.circle( bounds.x/2 + position.x*20, bounds.y/2 + position.z*20, 10);
    heatmap.endDraw();
  }
  //image(heatmap,0,0);
}

void webSocketServerEvent(String msg) {
  //println(msg);
  String[] list = split(msg, ';');
  if (list.length > 5) {
    position = new PVector( float(list[0]), float(list[1]), float(list[2]) );

    rotation = new PVector( float(list[3]), float(list[4]), float(list[5]) );
    if (recording) {
      output.println(msg); // Write the coordinates to the file
    }
  }
}

void keyPressed() {

  if (key == 'r') {
    recording = !recording;
    if (recording) {
      output = createWriter(dataPath( "positions_"+year()+"_"+month()+"_"+day()+"_"+minute()+"_"+second()+".txt" ) );
      println("recording started");
    } else {
      println("recording ended");
      output.flush(); // Writes the remaining data to the file
      output.close(); // Finishes the file
      //save heatmap as jpg in data folder
      heatmap.save( dataPath( "heatmap"+year()+"_"+month()+"_"+day()+"_"+minute()+"_"+second()+".jpg" ) );
      heatmap.beginDraw();
      heatmap.background(0); //reset heatmap buffer image
      heatmap.endDraw();
    }
  }
}
