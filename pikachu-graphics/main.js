import './style.css'

import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const loader = new GLTFLoader();
renderer.setClearColor( 0xffffff,1)


//SKY

var skyGeo = new THREE.SphereGeometry(100000, 25, 25); 
var textureLoader  = new THREE.TextureLoader(),
  texture = textureLoader.load( "textures/sky.jpg" );

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3,4);

var material = new THREE.MeshPhongMaterial({ 
    map: texture,
});

var sky = new THREE.Mesh(skyGeo, material);
sky.material.side = THREE.BackSide;
scene.add(sky);

camera.position.z = 5;


loader.load('/pikachu/scene.gltf', function (gltf) {		
	gltf.scene.scale.set( 1, 1, 1 );			   
	gltf.scene.position.x = 0;				    //Position (x = right+ left-) 
        gltf.scene.position.y = 0;				    //Position (y = up+, down-)
	gltf.scene.position.z = 0;				    //Position (z = front +, back-)
	
	scene.add( gltf.scene );
  scene.add(gltf.scene);

}, undefined, function (error) {

  console.error(error);

});

loader.load('/pokeball/scene.gltf', function (gltf) {			
	gltf.scene.scale.set( 0.4, 0.4, 0.4 );			   
	gltf.scene.position.x = 0;				    //Position (x = right+ left-) 
        gltf.scene.position.y = -1;				    //Position (y = up+, down-)
	gltf.scene.position.z = 0;				    //Position (z = front +, back-)
	

	scene.add( gltf.scene );
  scene.add(gltf.scene);

}, undefined, function (error) {

  console.error(error);

});

var ambient = new THREE.AmbientLight(0xffffff, 0.6);

scene.add(ambient);
const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
	render();
	requestAnimationFrame( animate );
	}

function render() {
	renderer.render( scene, camera );
	}

render();
animate();


