let scene, camera, renderer, model;
let mouseX = 0, mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Load the Bugatti 3D model
    const loader = new THREE.GLTFLoader();
    loader.load('bugatti.glb', function (gltf) {
        model = gltf.scene;
        scene.add(model);
    }, undefined, function (error) {
        console.error('Error loading model:', error);
    });

    // Handle mouse movement for rotation
    document.addEventListener('mousemove', onDocumentMouseMove);

    animate();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.y = mouseX * 0.001; // Rotate based on mouse movement
        model.rotation.x = mouseY * 0.001;
    }

    renderer.render(scene, camera);
}

// Mouse movement
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

// Resize handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize the scene
init();
