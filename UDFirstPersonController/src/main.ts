import * as THREE from 'three';
import { GameName } from './settings';
import Scene, { scene } from './scene';
import { InitPlayer, updatePlayerMovement, updateCameraRotation, renderer, camera, mouseLocked } from './player';

const clock = new THREE.Clock();

function Init() {
    document.title = GameName;
    Scene();

    if (!scene) {
        console.error("Scene is not initialized");
        return;
    }
    InitPlayer();
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    const deltaTime = clock.getDelta();
    updatePlayerMovement(deltaTime);
    updateCameraRotation(deltaTime);

    renderer.render(scene, camera);

    if (mouseLocked) {
        renderer.domElement.requestPointerLock();
    }
}

Init();