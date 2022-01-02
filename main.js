import './styles.scss';
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


const controls = new OrbitControls(camera, renderer.domElement)

// var mySignature = document.getElementById('signature');


function addStar(){
  const geomatry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
  const star = new THREE.Mesh(geomatry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('/assets/space.jpg');
scene.background = spaceTexture;

const retailTexture = new THREE.TextureLoader().load('/assets/me.jpg');

const retail = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: retailTexture})
);

scene.add(retail);

const itbTexture = new THREE.TextureLoader().load('/assets/itb.jpg');

const itb = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: itbTexture})
);

scene.add(itb);

const queensTexture = new THREE.TextureLoader().load('/assets/queens.jpg');

const queens = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: queensTexture})
);

scene.add(queens);



const moonTexture = new THREE.TextureLoader().load('/assets/moon2.jpg')
const normalTexture = new THREE.TextureLoader().load('/assets/normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);
scene.add(moon);

const earthTexture = new THREE.TextureLoader().load('/assets/earth.jpg');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(6, 64, 64),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture
  })
);;
scene.add(earth);

const sunTexture = new THREE.TextureLoader().load('/assets/sun2.jpg');
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(12, 120, 120),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture
  })
);;
scene.add(sun);

const marsTexture = new THREE.TextureLoader().load('/assets/mars2.png');
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(6, 64, 64),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture
  })
);;
scene.add(mars);

const marsMaterial = new THREE.MeshStandardMaterial({ color: 0xbdb76b });

const marsGeomatry = new THREE.TorusGeometry(10, 1, 10, 200);
const Marstorus = new THREE.Mesh(marsGeomatry, marsMaterial);
scene.add(Marstorus);

moon.position.z = 25;
moon.position.setX(-20);
moon.position.y = 10;


earth.position.z = -25;
earth.position.setX(-10);
earth.position.y = 10;

sun.position.z = -100;
sun.position.setX(20);
sun.position.y = -20;

mars.position.z = 0;
mars.position.setX(50);
mars.position.y = 30;

Marstorus.position.z = 0;
Marstorus.position.setX(50);
Marstorus.position.y = 30;

retail.position.z = -5;
retail.position.x = 2;

itb.position.z = 20;
itb.position.x = -5;

queens.position.z = 30;
queens.position.x = 10;

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  retail.rotation.z += 0.01;
  retail.rotation.z += 0.01;

  itb.rotation.z += 0.01;
  itb.rotation.z += 0.01;

  queens.rotation.z += 0.01;
  queens.rotation.z += 0.01;

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

  Marstorus.rotation.y += 0.02;
  Marstorus.rotation.x += 0.02;

  moon.rotation.x += 0.005;
  earth.rotation.y += 0.020;
  sun.rotation.x += 0.05;
  sun.rotation.y += 0.05;
  mars.rotation.z += 0.03; 

  //controls.update();

  renderer.render(scene, camera);
}

animate();


