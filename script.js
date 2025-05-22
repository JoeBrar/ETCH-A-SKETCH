// Three.js initialization
let scene, camera, renderer; // Already global
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let hoveredCube = null;
const defaultColor = 0xff0000; // Red
const hoverColor = 0x0000ff; // Blue
let controls; // Declare controls globally

function initThreeJS() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25; // Adjusted for a 16x16 grid with spacing
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer();
    // const gridContainerElement = document.querySelector(".grid-container"); // Already available as global gridContainer
    gridContainer.innerHTML = ''; // Clear placeholder content
    renderer.setSize(gridContainer.clientWidth, gridContainer.clientHeight); // Set size based on container's actual dimensions
    gridContainer.appendChild(renderer.domElement);

    // Event Listener for hover
    renderer.domElement.addEventListener('mousemove', onMouseMove);

    // Initialize OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; 
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.enableZoom = true;
    // controls.minDistance = 5;
    // controls.maxDistance = 50;
    // controls.maxPolarAngle = Math.PI / 2; 

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // white light, half intensity
    scene.add(ambientLight);

    // Render loop
    function animate() {
        requestAnimationFrame(animate);
        
        if (controls && controls.enableDamping) {
            controls.update(); // only required if controls.enableDamping or controls.autoRotate are set to true
        }
        
        renderer.render(scene, camera);
    }
    animate();
}

// initThreeJS(); // Call after gridContainer is sized

// Global array to store cube references
let cubes = [];

// Existing code
let gridSize=16;
let gridContainer=document.querySelector(".grid-container");
// let square=document.createElement("div"); // No longer needed
// let clearDiv=document.createElement("div"); // No longer needed
let viewPortWidth;
let viewPortHeight;
let changeGridBtn=document.querySelector(".ChangeGrid button");
let gridSizeText=document.querySelector(".ChangeGrid div");

if (typeof window.innerWidth != 'undefined') {
    viewPortWidth = window.innerWidth,
    viewPortHeight = window.innerHeight
}
if (viewPortHeight<=viewPortWidth){
    totaldim=viewPortHeight;
}
else{
    totaldim=viewPortWidth;
}
usablewidth=totaldim-0.2*totaldim;
gridContainer.style.width=`${usablewidth}px`;
gridContainer.style.height = `${usablewidth}px`; // Set height to make it square
console.log(viewPortHeight+"   "+viewPortWidth);

initThreeJS(); // Call initThreeJS after gridContainer is sized
onWindowResize(); // Call once to set initial size correctly

// clearDiv.classList.add("clear"); // No longer needed
// square.classList.add("square"); // No longer needed
// square.setAttribute("onmouseover","changeColor(this)"); // No longer needed

// function changeColor(item){ // This function will need to be adapted for 3D objects later
//     // item.style.backgroundColor="blue"; 
// } // Removed as per instruction

function generateGrid(size){
    // Clear existing cubes
    cubes.forEach(cube => scene.remove(cube));
    cubes = [];

    const cubeSize = 1;
    const spacing = 1.1;
    const offset = (size * spacing - spacing) / 2; // Calculate offset to center the grid

    for(let i=0; i<size; i++){ // Loop from 0 to size-1 for easier positioning
        for(let j=0; j<size; j++){ // Loop from 0 to size-1
            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            const material = new THREE.MeshBasicMaterial({ color: defaultColor }); // Use defaultColor
            const cube = new THREE.Mesh(geometry, material);

            cube.position.set(j * spacing - offset, i * spacing - offset, 0);
            
            scene.add(cube);
            cubes.push(cube);
        }
    }
}
generateGrid(gridSize);

function changeGridFunc(){
    let x = parseInt(prompt("Enter no. of rows and columns (max 40): "));
    while(x > 40 || x <= 0 || isNaN(x)){ // Added more robust validation
        x = parseInt(prompt("Please enter a valid number between 1 and 40 for rows and columns: "));
    }
    gridSizeText.innerText=`Grid Size: ${x}x${x}`;
    // gridContainer.innerHTML=""; // No longer needed, generateGrid handles clearing
    generateGrid(x);
}

function onWindowResize() {
    const container = gridContainer;
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (renderer && camera) { // Ensure they are initialized
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
}
window.addEventListener('resize', onWindowResize);


function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(cubes);

    if (intersects.length > 0) {
        // If there's a new hovered cube and it's different from the old one
        if (hoveredCube !== intersects[0].object) {
            // Reset the old hovered cube's color if it exists
            if (hoveredCube) {
                hoveredCube.material.color.set(defaultColor);
            }
            // Set the new hovered cube and change its color
            hoveredCube = intersects[0].object;
            hoveredCube.material.color.set(hoverColor);
        }
    } else {
        // No intersection, reset the old hovered cube if it exists
        if (hoveredCube) {
            hoveredCube.material.color.set(defaultColor);
        }
        hoveredCube = null;
    }
}
