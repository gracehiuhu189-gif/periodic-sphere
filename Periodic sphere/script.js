let camera, scene, renderer, controls;

let objects = [];
let targets = {
sphere: [],
helix: [],
grid: []
};

/* First 60 elements (expandable to 118) */

const elements = [

["H","Hydrogen"],
["He","Helium"],
["Li","Lithium"],
["Be","Beryllium"],
["B","Boron"],
["C","Carbon"],
["N","Nitrogen"],
["O","Oxygen"],
["F","Fluorine"],
["Ne","Neon"],
["Na","Sodium"],
["Mg","Magnesium"],
["Al","Aluminium"],
["Si","Silicon"],
["P","Phosphorus"],
["S","Sulfur"],
["Cl","Chlorine"],
["Ar","Argon"],
["K","Potassium"],
["Ca","Calcium"],
["Sc","Scandium"],
["Ti","Titanium"],
["V","Vanadium"],
["Cr","Chromium"],
["Mn","Manganese"],
["Fe","Iron"],
["Co","Cobalt"],
["Ni","Nickel"],
["Cu","Copper"],
["Zn","Zinc"],
["Ga","Gallium"],
["Ge","Germanium"],
["As","Arsenic"],
["Se","Selenium"],
["Br","Bromine"],
["Kr","Krypton"],
["Rb","Rubidium"],
["Sr","Strontium"],
["Y","Yttrium"],
["Zr","Zirconium"],
["Nb","Niobium"],
["Mo","Molybdenum"],
["Tc","Technetium"],
["Ru","Ruthenium"],
["Rh","Rhodium"],
["Pd","Palladium"],
["Ag","Silver"],
["Cd","Cadmium"],
["In","Indium"],
["Sn","Tin"],
["Sb","Antimony"],
["Te","Tellurium"],
["I","Iodine"],
["Xe","Xenon"],
["Cs","Cesium"],
["Ba","Barium"],
["La","Lanthanum"],
["Ce","Cerium"],
["Pr","Praseodymium"],
["Nd","Neodymium"]

];

init();
animate();

function init() {

camera =
new THREE.PerspectiveCamera(
40,
window.innerWidth /
window.innerHeight,
1,
10000
);

camera.position.z = 3000;

scene = new THREE.Scene();

createElements();
createTargets();

renderer =
new THREE.CSS3DRenderer();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document
.getElementById("container")
.appendChild(renderer.domElement);

controls =
new THREE.TrackballControls(
camera,
renderer.domElement
);

document
.getElementById("sphere")
.onclick =
() => transform(targets.sphere);

document
.getElementById("helix")
.onclick =
() => transform(targets.helix);

document
.getElementById("grid")
.onclick =
() => transform(targets.grid);

}

/* Create Element Cards */

function createElements() {

for (let i = 0; i < elements.length; i++) {

let element =
document.createElement("div");

element.className = "element";

element.innerHTML =

"<div class='number'>"
+ (i+1) +
"</div>"

+ "<div class='symbol'>"
+ elements[i][0] +
"</div>"

+ "<div class='name'>"
+ elements[i][1] +
"</div>";

let object =
new THREE.CSS3DObject(element);

scene.add(object);

objects.push(object);

}

}

/* Create Layouts */

function createTargets() {

let radius = 800;

/* Sphere */

for (let i = 0; i < objects.length; i++) {

let phi =
Math.acos(-1 +
(2 * i) /
objects.length);

let theta =
Math.sqrt(objects.length * Math.PI) * phi;

let object =
new THREE.Object3D();

object.position.x =
radius *
Math.cos(theta) *
Math.sin(phi);

object.position.y =
radius *
Math.sin(theta) *
Math.sin(phi);

object.position.z =
radius *
Math.cos(phi);

targets.sphere.push(object);

}

/* Helix */

for (let i = 0; i < objects.length; i++) {

let object =
new THREE.Object3D();

let theta = i * 0.175;
let y = -(i * 20) + 450;

object.position.x =
900 * Math.sin(theta);

object.position.y = y;

object.position.z =
900 * Math.cos(theta);

targets.helix.push(object);

}

/* Grid */

for (let i = 0; i < objects.length; i++) {

let object =
new THREE.Object3D();

object.position.x =
((i % 5) * 400) - 800;

object.position.y =
(-(Math.floor(i / 5) % 5) * 400) + 800;

object.position.z =
(Math.floor(i / 25)) * 1000 - 2000;

targets.grid.push(object);

}

}

/* Transform */

function transform(targetsArray) {

for (let i = 0; i < objects.length; i++) {

objects[i].position.copy(
targetsArray[i].position
);

}

}

/* Animate */

function animate() {

requestAnimationFrame(animate);

controls.update();

renderer.render(scene, camera);

}
