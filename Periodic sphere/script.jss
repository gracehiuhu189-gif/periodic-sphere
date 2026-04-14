let camera, scene, renderer;

let objects = [];

let targets = {
table: [],
sphere: [],
helix: [],
grid: []
};

init();
animate();

function init() {

camera = new THREE.PerspectiveCamera(
40,
window.innerWidth / window.innerHeight,
1,
10000
);

camera.position.z = 3000;

scene = new THREE.Scene();

createElements();

renderer =
new THREE.CSS3DRenderer();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document
.getElementById("container")
.appendChild(renderer.domElement);

createSphere();

document
.getElementById("sphere")
.onclick = () => transform(targets.sphere);

document
.getElementById("grid")
.onclick = () => transform(targets.grid);

document
.getElementById("helix")
.onclick = () => transform(targets.helix);

}

function createElements() {

for (let i = 1; i <= 100; i++) {

let element =
document.createElement("div");

element.className = "element";

element.innerHTML = i;

let object =
new THREE.CSS3DObject(element);

scene.add(object);

objects.push(object);

}

}

function createSphere() {

let radius = 800;

for (let i = 0; i < objects.length; i++) {

let phi =
Math.acos(-1 + (2 * i) / objects.length);

let theta =
Math.sqrt(objects.length * Math.PI) * phi;

let object =
new THREE.Object3D();

object.position.x =
radius * Math.cos(theta) * Math.sin(phi);

object.position.y =
radius * Math.sin(theta) * Math.sin(phi);

object.position.z =
radius * Math.cos(phi);

targets.sphere.push(object);

}

}

function transform(targetsArray) {

for (let i = 0; i < objects.length; i++) {

let object = objects[i];

let target = targetsArray[i];

object.position.copy(target.position);

}

}

function animate() {

requestAnimationFrame(animate);

scene.rotation.y += 0.002;

renderer.render(scene, camera);

}
