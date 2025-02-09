import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.2/+esm';

// Create a Three.js scene
const scene = new THREE.Scene();

// Load the background texture
const loaderTexture = new THREE.TextureLoader();
loaderTexture.load('space.png', function (texture) {
    scene.background = texture;
});

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(1, 0, 5); // Adjust camera position
camera.fov = 30; // Decrease the FOV to zoom in
camera.updateProjectionMatrix();

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting (Important for GLTF models)
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Load the GLTF model
const loader = new GLTFLoader();
let model; // Variable to store the loaded model

loader.load('human.glb', function (gltf) {
    model = gltf.scene;
    model.position.set(0, -1, 0); // Center the model
    scene.add(model);
    animateMovement(); // Start movement animation
}, undefined, function (error) {
    console.error("Error loading GLTF model:", error);
});

// Animate movement (simulate human talking motion)
function animateMovement() {
    if (!model) return;
    gsap.to(model.position, { x: 0.2, duration: 2, yoyo: true, repeat: -1, ease: "power1.inOut" }); // Left-Right movement
    gsap.to(camera.position, { z: 4.5, duration: 2, yoyo: true, repeat: -1, ease: "power1.inOut" }); // Zoom in and out
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();











// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.2/+esm'; // Correct Import

// // Create a Three.js scene
// const scene = new THREE.Scene();

// // Set up the camera
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(1, 0, 5); // Adjust camera position
// // camera.position.set(-1, 2, 5); // Adjust X to move left, Y to move up
// // model.position.set(-1, 0, 0); // Adjust X to move left, Y to move up
// camera.fov = 30; // Decrease the FOV to zoom in
// camera.updateProjectionMatrix();

// // Set up the renderer
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Add lighting (Important for GLTF models)
// const light = new THREE.AmbientLight(0xffffff, 1);
// scene.add(light);

// // Load the GLTF model
// const loader = new GLTFLoader();
// let model; // Variable to store the loaded model

// loader.load('human.glb', function (gltf) {
//     model = gltf.scene;
//     model.position.set(0, -1, 0); // Center the model
//     scene.add(model);
//     animateMovement(); // Start movement animation
// }, undefined, function (error) {
//     console.error("Error loading GLTF model:", error);
// });

// // Animate movement (simulate human talking motion)
// function animateMovement() {
//     if (!model) return;

//     gsap.to(model.position, { x: 0.2, duration: 2, yoyo: true, repeat: -1, ease: "power1.inOut" }); // Left-Right movement
//     gsap.to(camera.position, { z: 4.5, duration: 2, yoyo: true, repeat: -1, ease: "power1.inOut" }); // Zoom in and out
// }

// // Animation loop
// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }

// animate();