import * as THREE from 'three'
import gsap from 'gsap'

function webgl()
{
    // Canvas
    const canvas = document.querySelector('canvas.webgl')
        
    // Scene
    const scene = new THREE.Scene()
    
    // Sizes
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    
    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    
        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
    
        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    
    // Geometries
    const material = new THREE.MeshNormalMaterial()
    
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        material
    )
    
    const cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 1.5, 16),
        material
    )
    
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 32, 16),
        material
    )
    
    cube.position.set(0, 0, -5)
    cylinder.position.set(-6, 0, -5)
    sphere.position.set(6, 0, -5)
    
    scene.add(cube, cylinder, sphere)
    
    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(0, 0, 0)
    scene.add(camera)

    function cameraAnimation()
    {

        let page = sessionStorage.getItem('page')
        
        let homeTl = gsap.timeline({ paused: true })
        .to(camera.position, {
            x: 0,
            duration: 3,
            ease: 'Quart.easeInOut'
        })

        let aboutTl = gsap.timeline({ paused: true })
        .to(camera.position, {
            x: -6,
            duration: 3,
            ease: 'Quart.easeInOut'
        })

        let contactTl = gsap.timeline({ paused: true })
        .to(camera.position, {
            x: 6,
            duration: 3,
            ease: 'Quart.easeInOut'
        })

        switch (page)
        {

            case 'home':
                homeTl.play()
                break

            case 'about':
                aboutTl.play()
                break

            case 'contact':
                contactTl.play()
                break

        }

    }

    cameraAnimation()

    let links = document.querySelectorAll('.header__link')
    links.forEach(link => {

        link.addEventListener('click', () => {

            setTimeout(() => {
                cameraAnimation()
            }, 150)

        })

    })
    

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // Animate
    const clock = new THREE.Clock()
    let lastElapsedTime = 0
    
    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
        const deltaTime = elapsedTime - lastElapsedTime
        lastElapsedTime = elapsedTime
    
        // Render
        renderer.render(scene, camera)
    
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    
    tick()

}

export default webgl