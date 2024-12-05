// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

import { Box3, BoxHelper, Vector3 } from 'three';


// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models
import { FirstPersonControls } from "../modules/FirstPersonControls.js";

//Rapier stuff ====================================================


const playerHeightOffset = -2; // Adjust this value for your needs
// ~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~~~~~~
let scene,renderer, camera;
let fpsControls;
let sceneContainer = document.querySelector("#scene-container");

//global objects for reference...
let lionChild;

//global objects
let coinModel, neighborhood;
let coinMixer, actionCoinSpin;
let coinBoundingBox;

//object materials
let televisionMaterials = [];

//coin
let coinCount = 0;

let coinFlag = false;

//for animations 
const clock = new THREE.Clock();

//lion animations
let lionMixer;
let actionLionWalk, actionLionRun, actionLionIdle;

//House collisions
let houseCollided1 = false;

// ~~~~~~~~~~~~~~ Intialize function ~~~~~~~~~~~~~~~~~

function initialize() {
    // ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~
    scene = new THREE.Scene();
    scene.background = new THREE.Color().setRGB(0, 0.6, 0.8);

    //lighting
    const light = new THREE.DirectionalLight();
    light.color.set(new THREE.Color().setRGB(241, 197, 247));
    light.position.set(0, 80, 60);
    light.intensity = 0.002;
    scene.add(light);

    const sunlight = new THREE.AmbientLight();
    light.color.set(new THREE.Color().setRGB(241, 197, 247));
    light.position.set(0,100,10);
    light.intensity = 0.03;
    scene.add(sunlight);

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

// FPS Controls =======================================================

if(!camera){
    console.error('no camera');
}else{
    fpsControls = new FirstPersonControls(camera, document.getElementById('scene-container'));
}

/* Box player Collider */
const boxPlayer = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({color: 0x0000ff})
);

boxPlayer.position.set(0,5,3);

let boxPlayerBB = new THREE.Box3();
boxPlayerBB.setFromObject(boxPlayer);

/*neighborhood house collider */

const house1 = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshPhongMaterial({color: 0x000000, transparent: true, opacity: 0.3})
);
house1.position.set(-15, -3, -105);

scene.add(house1);
let house1BB = new THREE.Box3();
house1BB.setFromObject(house1);

animate();

// ~~~~~~~~~~~~~~~~ added models ~~~~~~~~~~~~~~~~
//const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader(); // to load 3d models


/*coin object */
loader.load('assets/gameModels/coin.glb', function (gltf){
    coinModel = gltf.scene;
    coinModel.position.set(4,-6,-32);
 
    coinModel.scale.set(1,1,1);

    
       coinBoundingBox = new Box3().setFromObject(coinModel);

 
       const boxHelper = new BoxHelper(coinModel, 0xff0000);
      // scene.add(boxHelper);
 

    scene.add(coinModel);


    coinMixer = new THREE.AnimationMixer(coinModel);
    const clips = gltf.animations; //holding animations from glb with object var

    const clipCoin = THREE.AnimationClip.findByName(clips, "coinSpin");
    actionCoinSpin = coinMixer.clipAction(clipCoin);
    actionCoinSpin.play();
})


/* neighborhood */
loader.load('assets/gameModels/neighborhood.glb', function (gltf){
    neighborhood = gltf.scene;
    neighborhood.position.set(0,-6,0);
    neighborhood.scale.set(1,1,1);

    scene.add(neighborhood);



})



fpsControls.lookSpeed = 0.0005;
fpsControls.movementSpeed = 0.2;
fpsControls.rotationSpeed = 3000;
fpsControls.lookVertical = false;



function animate() {
    const deltaTime = clock.getDelta();

    if(coinMixer){
        coinMixer.update(deltaTime);
    }
   
    fpsControls.update(1.0);

    //Coin collisions =====================*/

     boxPlayer.position.copy(camera.position);
     boxPlayer.position.y += playerHeightOffset;

     if(boxPlayer){
        boxPlayerBB.setFromObject(boxPlayer);
     }

     if(coinBoundingBox && !coinFlag && boxPlayerBB.intersectsBox(coinBoundingBox)){
        console.log("You got a coin!");
        coinFlag = true;
        coinSpawner();
        coinCount++;
     }

    document.getElementById('coinCounter').textContent = `Coins: ${coinCount}`;

     /* house collisions ==================*/

     if(house1BB && !houseCollided1 && boxPlayerBB.intersectsBox(house1BB)){
        houseCollided1 = true;
        showPriceWindow();
        console.log("house price");
     }
     if (!boxPlayerBB.intersectsBox(house1BB)) {
       houseCollided1 = false;
      
    }
    console.log(houseCollided1);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


/* coin functionality  ================================= */


function coinSpawner(){
    console.log('Collision detected! Timer started.');
    scene.remove(coinModel);
  

  
    setTimeout(() => {
        spawnCoin();
    }, 10000); 
}

function spawnCoin(){
   scene.add(coinModel);
    coinFlag = false;
}

/* house functionality ================================== */
function showPriceWindow() {
    const popup = document.getElementById("popup");
    popup.style.display = "flex"; 
}

//Close the window
document.getElementById("close-popup-button").addEventListener("click", () => {
    const popup = document.getElementById("popup");
    popup.style.display = "none"; // Hide the popup
});



//renderer.setAnimationLoop( animate );