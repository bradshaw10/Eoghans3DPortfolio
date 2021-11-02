import './style.css';
import * as THREE from 'three' 
import { OrbitControls } from 'three-orbitcontrols-ts'
const scene = new THREE.Scene();

//will show all with these settings
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);



const geomatry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geomatry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

const ambientLight = new THREE.PointLight(0xffffff);


scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement)

function addStar(){
  const geomatry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
  const star = new THREE.Mesh(geomatry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const retailTexture = new THREE.TextureLoader().load('retail.jpg');

const retail = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: retailTexture})
);

scene.add(retail);

const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

retail.position.z = -5;
retail.position.x = 2;

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  retail.rotation.z += 0.01;
  retail.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera
moveCamera();


function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;


  moon.rotation.x += 0.005;

  //controls.update();

  renderer.render(scene, camera);
}

animate();


