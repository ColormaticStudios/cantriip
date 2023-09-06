var nodes = new Set();
var characters = new Set();


class vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  distance_to(other_vector) {
    var distance = Math.sqrt((Math.pow(other_vector.x-this.x,2))+(Math.pow(other_vector.y-this.y,2)));
    return distance;
  }
  rotation_to(other_vector) {
    var rotation = Math.atan2((other_vector.y-this.y), (other_vector.x-this.x)) + (Math.PI * 0.5);
    return rotation;
  }
  add(other_vector) {
    this.x += other_vector.x;
    this.y += other_vector.y;
  }
  rotate(rad) {
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    //this.x = Math.round(10000*(this.x*cos-this.y*sin))/10000;
    //this.y = Math.round(10000*(this.x*sin+this.y*cos))/10000;
    this.x = this.x*cos-this.y*sin;
    this.y = this.x*sin+this.y*cos;
  }
}

class node {
  constructor(position, rotation, radius, size, type) {
    this.position = position;
    this.rotation = rotation;
    this.radius = radius;
    this.size = size;
    this.type = type;

    nodes.add(this);
  }
  translate(translate_vector) {
    this.position.add(translate_vector);
  }
  destroy() {
    nodes.delete(this);
  }
}

class character {
  constructor(position, rotation, variant, username, socket=null) {
    this.position = position;
    this.rotation = rotation;
    this.radius = 40;
    this.scale = 1;
    this.variant = variant;
    this.username = username;
    this.socket = socket;
    this.max_health = 100;
    this.health = 100;
    this.max_stamina = 100;
    this.stamina = 100;

    characters.add(this);
  }
  translate(translate_vector) {
    this.position.add(translate_vector);
  }
  scale(scale) {
    this.scale *= scale;
  }
  destroy() {
    characters.delete(this);
  }
}

function collide(object_1, object_2) { //object_2 gets moved
  let min_distance = object_1.radius + object_2.radius;
  if (object_1.position.distance_to(object_2.position) < min_distance) {
    let move = object_1.position.distance_to(object_2.position) - min_distance;
    if (object_1.position.x < object_2.position.x) {
      object_2.position.x -= move;
    }
    else {
      object_2.position.x += move;
    }
    if (object_1.position.y < object_2.position.y) {
      object_2.position.y -= move;
    }
    else {
      object_2.position.y += move;
    }
  }
}

function create_id() {
	let ID = "";
	let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	for (var i = 0; i < 12; i++) {
		ID += characters.charAt(Math.floor(Math.random() * 36));
	}
	return ID;
}

if (typeof module === "undefined") { //if this is running in the browser, it doesn't need the module.exports.
  var module = new Object();
}

module.exports = { create_id, collide, character, node, vector };
