let optical_centre = 367.5 // Absolute
let fl = 85 // Relative
let f = (optical_centre - fl) * -1 // Absolute
let u = (optical_centre - obj.x) * -1 // Absolute
let v = optical_centre + (1 / ((1 / fl) + (1 / (u*-1) ))) // Absolute
let speed = 2.5
let img_height;
let img_x;
let img_y1;
let img_y2;
let allowObj_inf = false;
let showObj_x = false;

function setup() {
	createCanvas(1200, 600);
	w = width;
}

function calcDist() {
	u = (optical_centre - obj.x) * -1 ;// Absolute
	v = optical_centre + (1 / ((1 / fl) + (1 / u))); // Absolute

	img_height = obj.height * (v - optical_centre) / u;
	img_x = v;
	img_y1 = 300;
	img_y2 = img_y1 - img_height;

}


function drawPA(){
	stroke(0, 120);
	strokeWeight(2);
	line(pa.x1, pa.y1, pa.x2, pa.y2)
}

function drawPoints() {
	stroke(255);
	fill(250, 150);
	//F's
	ellipse((f*-1), 300, 10, 10)
	ellipse(optical_centre + fl, 300, 10, 10)
	//2F's
	ellipse((f*-1) - fl, 300, 10, 10)
	ellipse((optical_centre +  2*fl), 300, 10, 10)
	//optical_centre
	ellipse(optical_centre, 300, 10, 10)
}

function drawObj(x1, y1, x2, y2){
	fill(204, 102, 0);
	stroke(204, 102, 0)
	strokeWeight(3);
	line(x1, y1, x2, y2);
}

function drawLens(){
	fill(255, 255, 255, 125);
	strokeWeight(0);
	angleMode(DEGREES);
	arc(lens.x1, lens.y, lens.radius, lens.radius,  140, 220, OPEN)
	arc(lens.x2, lens.y, lens.radius, lens.radius,  320, 400, OPEN)
}

function drawImg() {
	fill(48, 252, 3);
	stroke(48, 252, 3)
	strokeWeight(3);
	line(img_x, img_y1, img_x, img_y2);
}

function move(){
		if (keyIsDown(RIGHT_ARROW)){
			obj.x += speed
		}
		if (keyIsDown(LEFT_ARROW)){
			obj.x -= speed
		}
		if (!allowObj_inf) obj.x = constrain(obj.x, 15, 320);
		if (showObj_x) console.log(obj.x);
		//img_x = constrain(img_x, optical_centre, width)
}

function draw() {
    background(51);
		drawLens();

		drawPoints();
		calcDist();
		move();
		drawPA();
		drawObj(obj.x, obj.y1, obj.x, obj.y2);
		drawImg();
		//drawImg(img_x, img_y1, img_x, img_y2);
}
