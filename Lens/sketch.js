// Sanjay Bhat
let optical_centre = 367.5 // Absolute
let fl = 100 // Relative
let f = (optical_centre - fl) * -1 // Absolute
let u = (optical_centre - obj.x) * -1 // Absolute
let v = optical_centre + (1 / ((1 / fl) + (1 / (u * -1)))) // Absolute
let allowObj_inf = false;
let speed = 2.5;
let img_x, img_y1, img_y2, img_height;
let slider, times, psv, pox;

function setup() {
  createCanvas(800, 600);
  slider = createSlider(17.5, 320, obj.x, 2.5);
  slider.position(17.5, height + 10);
  slider.style('width', '302.5px')
  times = 0;
  psv = slider.value();
  pox = obj.x;
  createP("Move the above slider to move the object").position(25, height + 20);
  checkbox = createCheckbox('Use Mouse/Touch', false).position(330, height + 13.5);
  //frameRate(120);
}

function roundTo(n, d) {
  if (n == floor(n)) return n;
  // num = floor(n);
  // diff = n % (10 ** -d);
  // r_num = n - diff
  r_num = n;
  r_num *= 10 ** d;
  r_num = floor(r_num);
  r_num /= 10 ** d;
  return r_num;
}

function sliderSet() {
  let pSliderVal = psv;
  let pObj_x = pox;

  if (times > 0) {
    psv = slider.value();
    pox = obj.x;
    if (pSliderVal != slider.value()) obj.x = slider.value();
    else if (pObj_x != obj.x) slider.elt.value = obj.x;
  }
  times += 1;
}

function calcDist() {
  u = (optical_centre - obj.x) * -1; // Absolute
  v = optical_centre + (1 / ((1 / fl) + (1 / u))); // Absolute

  img_height = obj.height * (v - optical_centre) / u;
  img_x = v;
  if (img_height >= 0) img_y1 = 298;
  else img_y1 = 302;
  img_y2 = img_y1 - img_height;
}

function drawData() {
  textSize(22);
  fill(255);
  stroke(255)
  strokeWeight(0.01);
  text(("f :  " + fl), width - 260, 40)
  text(("v :  " + (roundTo((v - optical_centre), 2))), width - 260, 70)
  text(("u :  " + u), width - 260, 100)
  text(("h :  " + obj.height), width - 125, 40)
  text(("h' :  " + roundTo(img_height, 2)), width - 125, 70);

  textSize(40);
  text("Lens Simulation", 22, 50);
  strokeWeight(0.001);
  textSize(20);
  fill(255, 215);
  text("Created By: Sanjay Bhat", width - 225, height - 7.5);

  textSize(12.5);
  strokeWeight(0.01);
  text("F", (f * -1) - 4.75, pa.y1 + 17.5);
  text("2F", (f * -1) - fl - 9, pa.y1 + 17.5);
  text("F", (optical_centre + fl) - 4.75, pa.y1 + 17.5);
  text("2F", (optical_centre + 2 * fl) - 9, pa.y1 + 17.5);
  textSize(8);
  text("1", (f * -1) + 1.2, pa.y1 + 20);
  text("1", (f * -1) - fl + 4, pa.y1 + 20);
  text("2", (optical_centre + fl) + 1.5, pa.y1 + 20);
  text("2", (optical_centre + 2 * fl) + 4.5, pa.y1 + 20);
}

function drawPA() {
  stroke(0, 120);
  strokeWeight(2);
  line(pa.x1, pa.y1, pa.x2, pa.y2)
}

function drawPoints() {
  stroke(255);
  fill(250, 150);
  //F's
  ellipse((f * -1), 300, 10, 10)
  ellipse(optical_centre + fl, 300, 10, 10)
  //2F's
  ellipse((f * -1) - fl, 300, 10, 10)
  ellipse((optical_centre + 2 * fl), 300, 10, 10)
  //optical_centre
  ellipse(optical_centre, 300, 10, 10)
}

function drawObj() {
  fill(204, 102, 0);
  stroke(204, 102, 0)
  strokeWeight(3);
  line(obj.x, obj.y1, obj.x, obj.y2);
}

function drawLens() {
  fill(255, 255, 255, 125);
  strokeWeight(0);
  angleMode(DEGREES);
  arc(lens.x1, lens.y, lens.radius, lens.radius, 140, 220, OPEN)
  arc(lens.x2, lens.y, lens.radius, lens.radius, 320, 400, OPEN)
}

function drawImg() {
  fill(48, 252, 3);
  stroke(48, 252, 3)
  strokeWeight(3);
  line(img_x, img_y1, img_x, img_y2);
}

function move() {
  if (keyIsDown(RIGHT_ARROW)) {
    obj.x += speed
  }
  if (keyIsDown(LEFT_ARROW)) {
    obj.x -= speed
  }
  if (mouseY <= height && mouseX <= width && checkbox.checked() == true) obj.x = mouseX + 0.5;
  if (!allowObj_inf) {
    obj.x = constrain(obj.x, 17.5, 320);
  } else {
    obj.x = constrain(obj.x, -Infinity, 320);
  }

}

function setSpeed() {
  if (allowObj_inf) {
    if (count < 1) console.log("Speed also set to 600 from" + speed);
    speed = 600;
    count++;
  } else {
    speed = 2.5;
  }
}

function draw() {
  background(51);
  drawLens();

  drawPoints();
  calcDist();
  move();
  drawPA();
  drawObj();
  drawImg();
  drawData()
  setSpeed();
  sliderSet();
}
