import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('./base_basic_shaded_astronault.glb', function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    inspectModel(model);
});

function inspectModel(model) {
    model.traverse((node) => {
        console.log(node.name, node);
    });
}
