import * as THREE from 'three';
import { scene } from './scene';
import { characterColor, characterDirectionalLightColor, characterPosition, characterAmbientLightColor, moveSpeed, turnSpeed, keybinds } from './settings';

export let camera: THREE.PerspectiveCamera;
export let renderer: THREE.WebGLRenderer;
export let mouseLocked = true;

const keysPressed: { [key: string]: boolean } = {};
let playerCube: THREE.Mesh;

export function InitPlayer() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(characterAmbientLightColor, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
        characterDirectionalLightColor,
        1
    );
    directionalLight.position.set(5, 10, 5).normalize();
    scene.add(directionalLight);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: characterColor });
    playerCube = new THREE.Mesh(geometry, material);
    playerCube.position.set(0, 0.5, 0);
    scene.add(playerCube);

    camera.position.set(characterPosition.x, characterPosition.y, characterPosition.z);
    playerCube.add(camera);

    window.addEventListener('keydown', (e) => (keysPressed[e.key.toLowerCase()] = true));
    window.addEventListener('keyup', (e) => (keysPressed[e.key.toLowerCase()] = false));

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

export function updatePlayerMovement(deltaTime: number) {
    const direction = new THREE.Vector3();

    if (keysPressed[keybinds.forward]) {
        direction.z -= moveSpeed * deltaTime;
    }
    if (keysPressed[keybinds.backward]) {
        direction.z += moveSpeed * deltaTime;
    }

    const worldDir = playerCube.localToWorld(direction.clone()).sub(playerCube.position);
    playerCube.position.add(worldDir);
}

export function updateCameraRotation(deltaTime: number) {
    if (keysPressed[keybinds.turnLeft]) {
        playerCube.rotation.y += turnSpeed * deltaTime;
    }
    if (keysPressed[keybinds.turnRight]) {
        playerCube.rotation.y -= turnSpeed * deltaTime;
    }
}

window.addEventListener('pointerlockchange', () => {
    mouseLocked = document.pointerLockElement === renderer.domElement;
});

window.addEventListener('mousemove', (event: MouseEvent) => {
    if (!mouseLocked) return;

    const sensitivity = 0.002;
    const deltaX = event.movementX || 0;
    const deltaY = event.movementY || 0;

    playerCube.rotation.y -= deltaX * sensitivity;
    camera.rotation.x -= deltaY * sensitivity;
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
});