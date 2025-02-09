import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.149.0/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, mixer, model, actions = {};

init();
animate();

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.5, 3);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lights
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Load Model
    const loader = new GLTFLoader();
    loader.load('human.glb', function (gltf) {
        model = gltf.scene;
        scene.add(model);

        // Animation Mixer
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
            actions[clip.name] = mixer.clipAction(clip);
        });

        // Idle Animation (Default)
        actions["Idle"]?.play();
    });

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Resize Event
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Animate Function
function animate() {
    requestAnimationFrame(animate);
    if (mixer) mixer.update(0.02);
    renderer.render(scene, camera);
}

// Function to Make Avatar Talk
function talk() {
    if (actions["Talk"]) {
        actions["Talk"].reset().play();
        setTimeout(() => actions["Talk"].fadeOut(0.5), 2000);
    }
}

// Function for Gesture
function waveHand() {
    if (actions["Wave"]) {
        actions["Wave"].reset().play();
        setTimeout(() => actions["Wave"].fadeOut(0.5), 2000);
    }
}

// Trigger Talk on Click
document.addEventListener("click", talk);

// Trigger Gesture on Key Press
document.addEventListener("keydown", (e) => {
    if (e.key === "g") waveHand();
});
