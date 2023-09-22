var canvas;
var canvas_center = new vector(0, 0);
var mouse_position = new vector(0, 0);
var camera = new vector(0, 0);
var lastupdate = Date.now();

function load_image(path) {
  let image = new Image();
  image.src = path;
  return image;
}

function global_to_canvas(pos) {
	let tempx = -camera.x + pos.x + canvas_center.x;
	let tempy = -camera.y + pos.y + canvas_center.y;
	return new vector(tempx, tempy);
}

function resize_canvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas_center.x = canvas.width / 2;
  canvas_center.y = canvas.height / 2;
}

function clear() {
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function init() {
	canvas = document.getElementById("main_canvas");
	resize_canvas();
	document.onkeydown = key_down;
	document.onkeyup = key_up;
	game_init();
}

function tick() {
    let now = Date.now();
    let delta = now - lastupdate;
    lastupdate = now;

	resize_canvas(canvas);
	game_tick(delta);
}

function game_ready() {
	setInterval(tick, 1000 / fps);
}
