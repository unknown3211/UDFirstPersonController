import * as THREE from 'three';
import { moveSpeed, turnSpeed, keybinds } from './settings';
import Scene, { scene } from './scene';

export var camera: THREE.PerspectiveCamera;
const renderer = new THREE.WebGLRenderer();
const clock = new THREE.Clock();
const keysPressed: { [key: string]: boolean } = {};
let playerCube: THREE.Mesh;

function Init() {
    Scene();

    if (!scene) {
        console.error("Scene is not initialized");
        return;
    }

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5).normalize();
    scene.add(directionalLight);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    playerCube = new THREE.Mesh(geometry, material);
    playerCube.position.set(0, 0.5, 0);
    scene.add(playerCube);

    camera.position.set(0, 1, 0);
    playerCube.add(camera);

    window.addEventListener('keydown', (e) => (keysPressed[e.key.toLowerCase()] = true));
    window.addEventListener('keyup', (e) => (keysPressed[e.key.toLowerCase()] = false));
}

function updatePlayerMovement(deltaTime: number) {
    const direction = new THREE.Vector3(0, 0, 0);

    if (keysPressed[keybinds.forward]) {
        direction.z -= moveSpeed * deltaTime;
    }
    if (keysPressed[keybinds.backward]) {
        direction.z += moveSpeed * deltaTime;
    }

    if (keysPressed[keybinds.left]) {
        direction.x -= moveSpeed * deltaTime;
    }
    if (keysPressed[keybinds.right]) {
        direction.x += moveSpeed * deltaTime;
    }

    playerCube.position.add(playerCube.localToWorld(direction).sub(playerCube.position));
}

function updateCameraRotation(deltaTime: number) {
    if (keysPressed[keybinds.turnLeft]) {
        playerCube.rotation.y += turnSpeed * deltaTime;
    }
    if (keysPressed[keybinds.turnRight]) {
        playerCube.rotation.y -= turnSpeed * deltaTime;
    }
}

function animate() {
    const deltaTime = clock.getDelta();
    updatePlayerMovement(deltaTime);
    updateCameraRotation(deltaTime);
    renderer.render(scene, camera);
}

Init();