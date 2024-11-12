import * as THREE from 'three';
import { camera } from './main';
//import Stargate from './assets/Stargate.mp3';

export default function BackgroundAudio(audio: string) { // Plays Background Music, Can Be Edited To Work To Play On Certain Objects And Have A Distance
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const sound = new THREE.Audio(listener);
    const loader = new THREE.AudioLoader();
    loader.load(audio, (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(0.5);
        sound.play();
    })
}