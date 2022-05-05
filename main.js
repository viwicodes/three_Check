import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
})

const geometry = new THREE.BoxGeometry(2, 2, 2);
const edges = new THREE.EdgesGeometry(geometry)
const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
const lines = new THREE.LineSegments(edges, material)
// const cube = new THREE.Mesh( geometry, material );
scene.add( lines )

camera.position.z = 5;
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

renderer.render(scene, camera);

// const background = new THREE.TextureLoader().load('assets/dp.jpg')
// scene.background = background;
const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.x = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera()

function animate() {
  requestAnimationFrame(animate);
  lines.rotation.x += 0.01
  lines.rotation.y += 0.01
  lines.rotation.z += 0.01
  controls.update();
  renderer.render(scene, camera)
}

animate()