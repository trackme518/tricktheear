import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import peasy.PeasyCam; 
import websockets.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class logVR extends PApplet {

 //3d camera
PeasyCam cam;

//websockets
WebsocketServer ws;

PVector position = new PVector(0, 0, 0);
PVector rotation = new PVector(0, 0, 0);

PShape user;
int step = 40;
int gridSize = 640;

PrintWriter output;
boolean recording = false;

public void setup() {
  
  cam = new PeasyCam(this, 400);
  lights();
  ws= new WebsocketServer(this, 8025, "/track");
  user = loadShape("unicorn3.obj");
}

public void draw() {
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
  scale(5.0f);
  shape(user, 0, 0);
  popMatrix();
}

public void webSocketServerEvent(String msg) {
  //println(msg);
  String[] list = split(msg, ';');
  if (list.length > 5) {
    position = new PVector( PApplet.parseFloat(list[0]), PApplet.parseFloat(list[1]), PApplet.parseFloat(list[2]) );
    rotation = new PVector( PApplet.parseFloat(list[3]), PApplet.parseFloat(list[4]), PApplet.parseFloat(list[5]) );
    if (recording) {
      output.println(msg); // Write the coordinates to the file
    }
  }
}

public void keyPressed() {

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

  public void settings() {  size(1080, 1080, P3D); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "logVR" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
