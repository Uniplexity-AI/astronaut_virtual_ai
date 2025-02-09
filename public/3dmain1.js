import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create a Three.js scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5); // Adjust camera position

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting (Important for GLTF models)
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Load the GLTF model
const loader = new GLTFLoader();
loader.load('./base_basic_shaded.glb', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error("Error loading GLTF model:", error);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
