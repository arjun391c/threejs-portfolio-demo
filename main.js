import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

/* scene = container which contain camera and renderer */
const scene = new THREE.Scene()

/*camera through which user views */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

/* Renderer to render the graphics to scene */
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

//Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
/* material to give the shape color and other properties */
// const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true})
const material = new THREE.MeshStandardMaterial({color: 0xFF6347})
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight,  ambientLight)

//herpers present in threejs
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper )

/* To use mouse controller to move through the space */
const controls = new OrbitControls(camera, renderer.domElement)

/* add random stars */
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))/* random no betwwen -100 and 100 */
  
  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpeg')
scene.background = spaceTexture

const picTexture = new THREE.TextureLoader().load('img.jpeg')

const pic = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: picTexture})
)

scene.add(pic)

//Moon
const moonTexture = new THREE.TextureLoader().load('moon.png')
const normalTexture = new THREE.TextureLoader().load('normal.jpeg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)

scene.add(moon)

moon.position.z = 30;
moon.position.setX(-10);

pic.position.z = -5;
pic.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  pic.rotation.y += 0.01;
  pic.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

moveCamera();
//animation loop
function animate(){
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  controls.update()
  renderer.render(scene, camera)
}

animate()