import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.149.0/examples/jsm/controls/OrbitControls.js";

// Set up scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// Load background texture
const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load('3DChatbotbg.png'); // Path to your PNG background image
scene.background = backgroundTexture; // Set the background texture of the scene

// Load GLTF model
const loader = new GLTFLoader();
let model, rightArm, leftArm, head, mouth;

loader.load('human.glb', (gltf) => {
    model = gltf.scene;
    scene.add(model);

    // Position and scale model
    model.position.set(0, -1, 0);
    model.scale.set(1, 1, 1);

    // Extract bones for mouth, arms, and head
    model.traverse((object) => {
        if (object.isBone) {
            if (object.name.includes("RightArm")) rightArm = object;
            if (object.name.includes("LeftArm")) leftArm = object;
            if (object.name === "Head") head = object;
            if (object.name === "Jaw") mouth = object;
        }
    });
}, undefined, (error) => {
    console.error(error);
});

// Animate movement
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Arm movement (simulating talking gestures)
    if (rightArm && leftArm) {
        // Right arm gestures (moving up and down)
        rightArm.rotation.z = Math.sin(time * 2) * 0.6;
        
        // Left arm gestures (mimicking a slight wave or gesture)
        leftArm.rotation.z = Math.cos(time * 2) * 0.6;
    }

    // Lip Sync (mouth/jaw movement)
    if (mouth) {
        mouth.rotation.x = Math.sin(time * 2) * 0.5; // Mouth opening and closing (simulating talking)
    }

    // Head movement (slight rotation for expression)
    if (head) {
        head.rotation.y = Math.sin(time * 0.5) * 0.5; // Subtle head movement to add expressiveness
    }

    renderer.render(scene, camera);
}

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 5);
controls.update();

// Start animation
animate();
