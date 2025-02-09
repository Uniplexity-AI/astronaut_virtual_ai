import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a light source
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Initialize the GLTFLoader
const loader = new GLTFLoader();

// Load the GLB model
loader.load('human.glb', function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    inspectModel(model);
}, undefined, function (error) {
    console.error('An error occurred while loading the model:', error);
});

// Function to inspect the model
function inspectModel(model) {
    model.traverse((node) => {
        console.log('Node:', node.name);
        console.log('Type:', node.type);
        if (node.isMesh) {
            console.log('Geometry:', node.geometry);
            console.log('Material:', node.material);
            if (node.morphTargetDictionary) {
                console.log('Morph Targets:', node.morphTargetDictionary);
            }
        }
        console.log('--------------------------');
    });
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
