 #include <Servo.h>
Servo servo;
//int a = 200;
int a;
int s1 = A0;
int s2 = A1;
int s3 = A2;
int s4 = A3;
int s5 = A4;



void setup()
{
   pinMode(s1,INPUT);
   pinMode(s2,INPUT);
   pinMode(s3,INPUT);
   pinMode(s4,INPUT);
   pinMode(s5,INPUT);
   servo.attach(9);
   
  
}

void loop()
{  
 a = (analogRead(s1)+analogRead(s2)+analogRead(s3)+analogRead(s4)+analogRead(s5))/5; 
  
 if(analogRead(s1) > a && analogRead(s2) > a && analogRead(s3) > a && analogRead(s4) > a && analogRead(s5) < a)
 {
   servo.write(40);
   delay(10);
 }
 else if(analogRead(s1) > a && analogRead(s2) > a && analogRead(s3) > a && analogRead(s4) < a && analogRead(s5) < a)
 {
   servo.write(60);
   delay(10);
 }
  else if((analogRead(s1) > a) && (analogRead(s2) > a) && (analogRead(s3) < a) && (analogRead(s4) > a) && (analogRead(s5) > a))
 {
   servo.write(90);
   delay(10);
 }
  else if((analogRead(s1) > a) && (analogRead(s2) > a) && (analogRead(s3) > a) && (analogRead(s4) < a) && (analogRead(s5) > a))
 {
   servo.write(65);
   delay(10);
 }
  else if((analogRead(s1) > a) && (analogRead(s2) < a) && (analogRead(s3) > a) && (analogRead(s4) > a) && (analogRead(s5) > a))
 {
   servo.write(110);
   delay(10);
 }
  else if((analogRead(s1) < a) && (analogRead(s2) < a) && (analogRead(s3) > a) && (analogRead(s4) > a) && (analogRead(s5) > a))
 {
   servo.write(100);
   delay(10);
 }
 /* else if((analogRead(s1) > a) && (analogRead(s2) > a) && (analogRead(s3) < a) && (analogRead(s4) < a) && (analogRead(s5) < a))
 {
   servo.write(115);
 }*/
  else if((analogRead(s1) > a) && (analogRead(s2) > a) && (analogRead(s3) < a) && (analogRead(s4) < a) && (analogRead(s5) > a))
 {
   servo.write(85);
   delay(10);
 }
  else if((analogRead(s1) > a) && (analogRead(s2) < a) && (analogRead(s3) < a) && (analogRead(s4) > a) && (analogRead(s5) > a))
 {
   servo.write(95);
   delay(10);
 }
  else if((analogRead(s1) < a) && (analogRead(s2) > a) && (analogRead(s3) > a) && (analogRead(s4) > a) && (analogRead(s5) > a))
  {
   servo.write(110);
   delay(10);
 }
 else if((analogRead(s1) > a) && (analogRead(s2) > a) && (analogRead(s3) > a) && (analogRead(s4) > a) && (analogRead(s5) > a))
 {
   servo.write(130);
   delay(1000);
 }
 
 
  
}
