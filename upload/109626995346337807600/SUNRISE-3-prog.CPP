#include<stdio.h>

#include<conio.h>

#include<graphics.h>

void main()

{

int gd=DETECT,gm;

initgraph(&gd,&gm,"C:\\TC\\BGI");

setbkcolor(WHITE);

setcolor(DARKGRAY);

line(0,80,680,80);

/*draw mountains*/

line(0,80,80,10);

line(80,10,160,80);

line(160,80,240,10);

line(240,10,320,80);

line(320,80,400,10);

line(400,10,480,80);

line(480,80,560,10);

line(560,10,640,80);

/*draw the Sun*/

arc(321,45,0,180,40);

setfillstyle(SOLID_FILL,LIGHTCYAN);

floodfill(20,60,DARKGRAY);

/*Fill color in mountains*/

setfillstyle(SOLID_FILL,RED);

floodfill(70,50,DARKGRAY);

floodfill(230,50,DARKGRAY);

floodfill(260,50,DARKGRAY);

floodfill(380,50,DARKGRAY);

floodfill(555,50,DARKGRAY);

/*Fill color in Sun*/

setfillstyle(SOLID_FILL,YELLOW);

floodfill(340,50,DARKGRAY);



getch();

closegraph();

}


