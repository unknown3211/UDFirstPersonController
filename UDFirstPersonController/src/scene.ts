import * as THREE from 'three';

export var scene: THREE.Scene;

export default function Scene() {
    if (scene) {
        return;
    }

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x292930);

    // DEFAULT GROUND
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    scene.add(ground);

    // PCG CUBE TEST
    for (let i = 0; i < 10; i++) {
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(
            (Math.random() - 0.5) * 50,
            0.5,
            (Math.random() - 0.5) * 50
        );
        scene.add(cube);
    }
}