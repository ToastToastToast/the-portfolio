// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~~~~~~
let scene, camera, renderer;
let sceneContainer = document.querySelector("#scene-container");

//global objects
let gameController, television;
//object materials
let televisionMaterials = [];

//for animations 
let mixer;
const clock = new THREE.Clock();
//let actionFlap;


// ~~~~~~~~~~~~~~ Intialize function ~~~~~~~~~~~~~~~~~

function initialize() {
    // ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~
    scene = new THREE.Scene();
    scene.background = new THREE.Color().setRGB(0, 0, 0);

    //lighting
    const light = new THREE.DirectionalLight();
    light.color.set(new THREE.Color().setRGB(241, 197, 247));
    light.position.set(0, 80, 60);
    light.intensity = 0.002;
    scene.add(light);

    const helper = new THREE.DirectionalLightHelper(light, 4);
    //scene.add(helper);


    camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);



    sceneContainer.appendChild(renderer.domElement);
    camera.position.z = 0;
}



function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
}

window.addEventListener('resize', onWindowResize, false);



//call the initialize methods
initialize();
animate();

// ~~~~~~~~~~~~~~~~ added models ~~~~~~~~~~~~~~~~
//const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader(); // to load 3d models

/*
loader.load('assets/log.glb', function (gltf){
    log = gltf.scene;
    log.position.set(30, -5, -25);
    log.scale.set(2,2,2);
    scene.add(log);
})

loader.load('assets/tree2.glb', function (gltf){
    const tree = gltf.scene;
    tree.position.set(-5, 0, 0);
    scene.add(tree);
})

loader.load('assets/red-robin.glb', function (gltf){
    redRobin = gltf.scene;
    redRobin.position.set(-30, -5, -25);
    redRobin.rotation.y = -150;
    redRobin.scale.set(20,20,20);
    scene.add(redRobin);


    mixer = new THREE.AnimationMixer(redRobin);
    const clips = gltf.animations; //holding animations from glb with object var
    
    // load + play animation
    
    //Earlier Example 
    //const clipFlap = THREE.AnimationClip.findByName(clips, "Idle"); //select which animation we want
    //const actionFlap = mixer.clipAction(clipFlap); //convert clip to playable action for us
    //actionFlap.play();//call play on the action
    
    const clipFlap = THREE.AnimationClip.findByName(clips, "Idle");
    actionFlap = mixer.clipAction(clipFlap); 
   


    //playing all the actions at once
    /*clips.forEach(function(clip) {
        const action = mixer.clipAction(clip);
        action.play();
    })

    
})*/

loader.load('assets/game-controller.glb', function (gltf) {
    gameController = gltf.scene;
    gameController.position.set(0, -3.5, -4);
    gameController.scale.set(1, 1, 1);
    gameController.rotation.x = -1.6;


    scene.add(gameController);
})

loader.load('assets/television.glb', function (gltf) {
    television = gltf.scene;
    television.position.set(0, -6, -2);
    television.scale.set(1, 1, 1);

    //modifying opacity


    television.traverse((child) => {
        if (child.isMesh) {
            const materials = Array.isArray(child.material) ? child.material : [child.material];
    
            materials.forEach((material) => {
                material.transparent = true;
                material.opacity = material.opacity || 1; // Default to opaque
                //material.depthWrite = false; // Uncomment if sorting issues arise
                televisionMaterials.push(material); // Collect material references
            });
    
            // Optionally set render order to ensure visibility
            child.renderOrder = 1;
        }
    });

    scene.add(television);
})

// ~~~~~~~~~~~~~~~ Event Listener ~~~~~~~~~~~~~~~~

let mouseIsDown = false;
/*
document.querySelector("body").addEventListener("mousedown", () => {
    actionFlap.play();
    actionFlap.paused = false;
    mouseIsDown = true;
    console.log("mouse down");
})

document.querySelector("body").addEventListener("mouseup", () => {
    actionFlap.paused = true;
    mouseIsDown = false;
    //or actionFlap.stop()
    console.log("mouse up");
})

document.querySelector("body").addEventListener("mousemove", () => {
    actionFlap.paused = true;
    if(mouseIsDown){

          console.log("mouse up");
    }
    //or actionFlap.stop()
})
*/

function animate() {
    //Get the time passed since the last frame
    const deltaTime = clock.getDelta();

    //necessary if statement because the load is asychonous so mixer needs to be fulfilled before actually calling it.
    if (mixer) {
        mixer.update(deltaTime);
    }

    requestAnimationFrame(animate);
    //mixer.update(clock.getDelta()); //handles looping the animation

    //let scrollY = window.scrollY
    //camera.position.z = scrollY * 0.01;

    /*
    if(redRobin){
        redRobin.position.y = redRobin.position.y * (scrollY * 0.01);
    }*/




    renderer.render(scene, camera);
}


//Camera scrolling functionality

function moveCamera() {

    const t = document.body.getBoundingClientRect().top;

    const cameraZ = t * 0.02;

    if (cameraZ >= -15.7) {
        camera.position.z = cameraZ;
    }
    else {
        camera.position.z = -15.7
    }

    if (televisionMaterials) {
        televisionMaterials.forEach((material) => {

            const fadeStart = -600;
            const fadeEnd = -1000;

            if(t >= fadeStart){
                material.opacity = 1;
            }
            else if(t <= fadeEnd){
                material.opacity = 0;
            }
            else{
                material.opacity = (t-fadeEnd) / (fadeStart - fadeEnd);
            }
            //material.opacity = t >= -600 ? 1 : 0; // Change opacity at scroll point
        });
    }


    console.log('Camera z position:', camera.position.z);
    console.log("t: " + t);
}

document.body.onscroll = moveCamera;




//renderer.setAnimationLoop( animate );