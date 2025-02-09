
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

// Load GLTF model
const loader = new GLTFLoader();
let model, skeleton, rightArm;

loader.load('human.glb', (gltf) => {
    model = gltf.scene;
    scene.add(model);

    // Position and scale model
    model.position.set(0, -1, 0);
    model.scale.set(1, 1, 1);

    // Extract the skeleton
    skeleton = new THREE.SkeletonHelper(model);
    scene.add(skeleton);

    // Find bones for waving animation
    model.traverse((object) => {
        if (object.isBone) {
            if (object.name.includes("RightArm")) rightArm = object; // Find right arm bone
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

    // Waving animation (right arm moves up and down)
    if (rightArm) {
        rightArm.rotation.z = Math.sin(time * 4) * 0.5; // Adjust speed and amplitude
    }

    renderer.render(scene, camera);
}

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 5);
controls.update();

// Start animation
animate();




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

// Load GLTF model
const loader = new GLTFLoader();
let model, skeleton, leftArm, rightArm, leftLeg, rightLeg;

loader.load('human.glb', (gltf) => {
    model = gltf.scene;
    scene.add(model);

    // Position and scale model
    model.position.set(0, -1, 0);
    model.scale.set(1, 1, 1);

    // Extract the skeleton
    skeleton = new THREE.SkeletonHelper(model);
    scene.add(skeleton);

    // Find bones for arms and legs
    model.traverse((object) => {
        if (object.isBone) {
            if (object.name.includes("LeftArm")) leftArm = object;
            if (object.name.includes("RightArm")) rightArm = object;
            if (object.name.includes("LeftLeg")) leftLeg = object;
            if (object.name.includes("RightLeg")) rightLeg = object;
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

    // Arm swinging animation
    if (leftArm && rightArm) {
        leftArm.rotation.x = Math.sin(time * 3) * 0.5;  // Move back and forth
        rightArm.rotation.x = -Math.sin(time * 3) * 0.5;
    }

    // Leg movement for walking
    if (leftLeg && rightLeg) {
        leftLeg.rotation.x = -Math.sin(time * 3) * 0.5; // Move legs in opposite directions
        rightLeg.rotation.x = Math.sin(time * 3) * 0.5;
    }

    // Move model forward (walking motion)
    if (model) {
        model.position.z -= 0.01; // Adjust speed
    }

    renderer.render(scene, camera);
}

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 5);
controls.update();

// Start animation
animate();
