import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);




    // Add some lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Function to inspect the model's hierarchy and log parts
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
        if (node.isSkinnedMesh) {
          console.log('Bones:', node.skeleton.bones.map(bone => bone.name));
        }
        console.log('--------------------------');
      });
    }

    // Load the GLB model
    const loader = new GLTFLoader();
    loader.load('human.glb', (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      console.log("Model loaded successfully:");
      inspectModel(model);

      // Example: Move the arms if available.
      // Adjust the names to match your model (e.g., "ArmLeft", "ArmRight").
      model.traverse((node) => {
        // Check for the left arm
        if (node.name.toLowerCase().includes("armleft") && node.isMesh) {
          console.log("Moving left arm:", node.name);
          // Move the left arm 1 unit to the right
          node.position.x += 1;
        }
        // Check for the right arm
        if (node.name.toLowerCase().includes("armright") && node.isMesh) {
          console.log("Moving right arm:", node.name);
          // Move the right arm 1 unit to the left
          node.position.x -= 1;
        }
      });
    },
    undefined,
    (error) => {
      console.error('An error occurred while loading the model:', error);
    });

    // Render the scene continuously
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // Update camera and renderer on window resize
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }


