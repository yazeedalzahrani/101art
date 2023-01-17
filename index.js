import * as THREE from './Js/three.module'

const canvas = document.querySelector('.webgl')
const scene = THREE.Scene()
 const geometry= new THREE.BoxGeometry(1,1,1)
 const material = new THREE.MeshBasicMaterial({

    color: 0x00ff00
 })

const boxMesh = new THREE.Mesh(geometry,material)
add.scene(boxMesh)
//plate code 

const sizes ={
    width : window.innerWidth,
   height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height,0.1 ,100)
camera.gposition.set(0,1,2)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: camera
})
renderer.setSize(sizes.width, sizes.height )
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.ShadowMap.enabled = true
renderer.gammaOuput= true
renderer.render(scene, camera)
