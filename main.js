import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';


// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// create a new renderer by instating the canvas element in our HTML // file
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
const geometry = new THREE.BoxGeometry(10, 10, 10);

// Textures
const libraryTexture = new THREE.TextureLoader().load('threed-images/library.jpg');
const wowTexture = new THREE.TextureLoader().load('threed-images/warofworldswordcloud.png');
const msTexture = new THREE.TextureLoader().load('threed-images/msImage.png');
const smaugTexture = new THREE.TextureLoader().load('threed-images/tolkien-smaug-artwork-2.jpg');

//set the color of the basic material in the object parameters `{}`

const material = new THREE.MeshStandardMaterial( { color:0x6347FF, map:smaugTexture} );

const cube = new THREE.Mesh( geometry, material );
cube.position.z = -25;
cube.position.x = 8;
cube.rotation.x = 2;
cube.rotation.y = .8;


const ico = new THREE.IcosahedronGeometry(15, 1);
const icoMaterial = new THREE.MeshPhongMaterial({ color:0x33AADD, map:msTexture, shininess:75});

const icoMesh = new THREE.Mesh(ico, icoMaterial);
// object.position.set ( x, y, z );
icoMesh.position.set(30, 10, -20)
// icoMesh.position.z= -20;
// icoMesh.position.x= 30;

const sphereGeo = new THREE.SphereGeometry( 20, 32, 16 );
const sphereMaterial = new THREE.MeshBasicMaterial( { map:wowTexture } );
const sphere = new THREE.Mesh( sphereGeo, sphereMaterial ); scene.add( sphere );
// object.position.set ( x, y, z );
sphere.position.set(-30,5,-45)


// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-1, -10, -10);

const pointLight2 = new THREE.PointLight(0xffffff, 7);
pointLight2.position.set(50, 30, -20);

const pointLight3 = new THREE.PointLight(0xffffff);
pointLight3.position.set(200, -100, 50);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(25, -15, -400);


scene.add(pointLight);
scene.add(pointLight2);
scene.add(pointLight3);
scene.background = libraryTexture;
scene.add(cube);
scene.add(ambientLight);
scene.add(icoMesh);
scene.add(sphere)


//Render the scene:
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);
camera.position.setY(10);
renderer.render(scene, camera);

function animate() {
    requestAnimationFrame( animate );
    // slowly rotate the cube:
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // rotate the icosahedron a little faster in the opposite direction:
    icoMesh.rotation.x += -0.001
    icoMesh.rotation.z += -0.001
    sphere.rotation.x += -0.001
    sphere.rotation.z += -0.001

    renderer.render( scene, camera );
}

animate();


// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `
//
// setupCounter(document.querySelector('#counter'))
