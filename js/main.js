import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, sphere, controls, skybox;
let skyboxImage = "space";


const sdBtn = document.querySelector(".sd");
const hdBtn = document.querySelector(".hd");

sdBtn.onclick = () => changeTextQuality("low");
hdBtn.onclick = () => changeTextQuality("high");

function createPathStrings(filename) {
  const basePath = "../img/skybox/";
  
  const baseFilename = basePath + filename;
  const fileType = ".png";
  const fileType1 = ".mp4";
  const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
  const pathStrings = sides.map((side) => {
    return baseFilename + "_" + side + fileType;
  });
  return pathStrings;
}

function createMaterialArray(filename) {
  const skyboxImagepaths = createPathStrings(filename);
  const materialArray = skyboxImagepaths.map((image) => {
    let texture = new THREE.TextureLoader().load(image);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide }); // <---
  });
  return materialArray;
}

function setSkyBox() {
  const materialArray = createMaterialArray(skyboxImage);
  let skyboxGeo = new THREE.BoxGeometry(200, 200, 200);
  skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  setSkyBox();
  loadTexture("../img/earth_texture.jpg");
  scene.add(sphere);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.id = "c";

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 5;
  controls.maxDistance = 50;
  camera.position.z = 20;
}

function loadTexture(texture) {
  const geometry = new THREE.SphereGeometry(5, 32, 32);
  const loader = new THREE.TextureLoader();
  const earthTexture = loader.load(texture);
  const material = new THREE.MeshBasicMaterial({ map: earthTexture });

  sphere = new THREE.Mesh(geometry, material);
}

function changeTextQuality(quality) {
  switch (quality) {
    case "high":
      scene.remove(sphere);
      loadTexture("../img/Mars_Map.png");
      scene.add(sphere);
      break;
    case "low":
      scene.remove(sphere);
      loadTexture("../img/earth_texture.jpg");
      scene.add(sphere);
      break;
    default:
      console.log("error must choose between values: high / low");
  }
}

function animate() {
  requestAnimationFrame(animate);
  //  videoTexure.needsUpdate = true;
  sphere.rotation.y += 0.002;
  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
// videoTexure.minFilter = THREE.LinearFilter;
// videoTexure.magfilter = THREE.LinearFilter;

// var movieMaterial = new THREE.MeshBasicMaterial({

//   map: videoTexure,
//   side: THREE.Forntside,
//   toneMapped:false,

// }); 
// let movieGeometry = new THREE.PlaneGeometry(800,400);
// let moviePlanescreen = new THREE.Mesh(movieGeometry,movieMaterial);

// moviePlanescreen.position.set(0,50,0);
// scene.add(moviePlanescreen);

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();


// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sa/544083.beat-spacestation.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});

init();
animate();
