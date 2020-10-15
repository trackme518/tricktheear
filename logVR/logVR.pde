import peasy.PeasyCam; //3d camera
PeasyCam cam;

import websockets.*;//websockets
WebsocketServer ws;

PVector position = new PVector(0, 0, 0);
PVector rotation = new PVector(0, 0, 0);

PShape user;
int step = 40;
int gridSize = 640;

PrintWriter output;
boolean recording = false;

void setup() {
  size(1080, 1080, P3D);
  cam = new PeasyCam(this, 400);
  lights();
  ws= new WebsocketServer(this, 8025, "/track");
  user = loadShape("unicorn3.obj");
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
    }
  }
  
}
