// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

//Rapier stuff ====================================================

import('@dimforge/rapier3d').then(RAPIER => {

    //Use the rapier module here.
    let gravity = {x: 0.0, y: -9.81, z:0.0};
    let world = new RAPIER.World(gravity);

    //Add phyiscal bodys=====================================
    //Examples here--------------------
    /*
    //Dynamic body - affected by everything, for projectiles and other fun objects
    const dynamicBody = RAPIER.RigidBodyDesc.dynamic();

    //Static/Fixed body - affects dynamic bodies but isn't acted on by forces; for ground and walls
    const staticBody = RAPIER.RigidBodyDesc.fixed();

    //Kinetmatic/moveable body - not affected by physical forces but can be moved. For playerController and moving platforms
    const kinematicPositionBody = RAPIER.RigidBodyDesc.kinematicPositionBased();
    const kinematicVelocityBody = RAPIER.RigidBodyDesc.kinematicVelocityBased();
    */
    //End of Exampples -----------------



    //Game Loop.
    let gameLoop = () => {
        //Step the simulation forward.
        world.step();
        setTimeout(gameLoop, 16);
    };

    gameLoop();
})



// ~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~~~~~~
let scene, camera, renderer;
let sceneContainer = document.querySelector("#scene-container");

//global objects
let gameController, television, lionChild;
//object materials
let televisionMaterials = [];

//for animations 
const clock = new THREE.Clock();

//lion animations
let lionMixer;
let actionLionWalk, actionLionRun, actionLionIdle;


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



//RAPIER 3D EXAMPLE CODE =======================================================
//dummey box model
const box = {hx: 0.5, hy: 0.5, hz: 0.5};

const threeMesh = new THREE.Mesh(
    new THREE.BoxBufferGeometry(box.hx * 2, box.hy * 2, box.hz * 2),
    new MeshPhongMaterial({color:'red'})
);
scene.add(threeMesh);

//Rapier add box
const bodyType = RAPIER.RigidBodyDesc.dynamic();
const rigidBody = world.createRigidBody(bodyType);
const colliderType = RAPIER.ColliderDesc.cuboid(box.hx, box.hy, box.hz);
world.createCollider(colliderType, rigidBody.handle);

//store pairs
//const bodys: {rigid: RigidBody, mesh: THREE.Mesh}


//End of EXAMPLE CODE ==========================================================



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
}) */

loader.load('assets/lion-child.glb', function (gltf){
    lionChild = gltf.scene;
    lionChild.position.set(0,-5,-20);
 
    lionChild.scale.set(10,10,10);
    scene.add(lionChild);


    lionMixer = new THREE.AnimationMixer(lionChild);
    const clips = gltf.animations; //holding animations from glb with object var
    
    // load + play animation
    
    //Earlier Example 
    //const clipFlap = THREE.AnimationClip.findByName(clips, "Idle"); //select which animation we want
    //const actionFlap = mixer.clipAction(clipFlap); //convert clip to playable action for us
    //actionFlap.play();//call play on the action
    
    const clipLion1 = THREE.AnimationClip.findByName(clips, "Idle");
    const clipLion2 = THREE.AnimationClip.findByName(clips, "Walk");
    const clipLion3 = THREE.AnimationClip.findByName(clips, "Run");
    actionLionIdle = lionMixer.clipAction(clipLion1);
    actionLionWalk = lionMixer.clipAction(clipLion2); 
    actionLionRun = lionMixer.clipAction(clipLion3);  
   

    /*
    //playing all the actions at once
    clips.forEach(function(clip) {
        const action = mixer.clipAction(clip);
        action.play();
    })
*/
    
})

/* NOT USING THESE MODELS ===================== */

loader.load('assets/game-controller.glb', function (gltf) {
    gameController = gltf.scene;
    gameController.position.set(0, -3.5, -4);
    gameController.scale.set(1, 1, 1);
    gameController.rotation.x = -1.6;


    //scene.add(gameController);
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

    //scene.add(television);
})





function animate() {
    //Get the time passed since the last frame
    const deltaTime = clock.getDelta();

    //necessary if statement because the load is asychonous so mixer needs to be fulfilled before actually calling it.
    if (lionMixer) {
        lionMixer.update(deltaTime);
    }

    requestAnimationFrame(animate);
    //lionMixer.update(clock.getDelta()); //handles looping the animation

    //let scrollY = window.scrollY
    //camera.position.z = scrollY * 0.01;



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