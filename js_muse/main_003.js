// Render GeoJSON features on a spherical object.
// Create Three.js scene, camera, & light
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;
 
var angle = 75,
    aspect = WIDTH / HEIGHT,
    near = 0.5,
    far = 1000;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(angle, aspect, near, far);

// Renderer the canvas
var renderer = new THREE.WebGLRenderer();
renderer.setSize( WIDTH, HEIGHT);
renderer.setClearColor( 0x555555, 1);
document.getElementById('u135228').appendChild(renderer.domElement);

// create a point light (goes in all directions)
scene.add(new THREE.AmbientLight(0x71ABEF));
var pointLight = new THREE.PointLight(0x666666);

// set its position
pointLight.position.x = 20;
pointLight.position.y = 50;
pointLight.position.z = 1000;
scene.add(pointLight);

// Create a sphere to make visualization easier.
var geometry = new THREE.SphereGeometry(30,62,62);
var material = new THREE.MeshPhongMaterial({
	map: new THREE.ImageUtils.loadTexture("/images/earthmap.jpg"),
	color: 0xDDDDDD,
	wireframe: false,
	transparent: true
});
 
 // create particle system.
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
sphere.castShadow = true;
sphere.receiveShadow = true;

var particleMat = new THREE.PointsMaterial({
		color: 'rgb(255, 255, 255)',
		size: 2,

		transparent: true,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});

	var particleGeo = new THREE.SphereGeometry(10, 6, 3);

	particleGeo.vertices.forEach(function(vertex){
		var degreex = (Math.random() - 0.5)*180;
		var degreey = (Math.random() - 0.5)*180;
		vertex.x = Math.cos(degreex)*Math.sin(degreey)*31;
		vertex.y = Math.sin(degreex)*Math.sin(degreey)*31;
		vertex.z = Math.cos(degreey)*31 ;
	})

	var particleSystem = new THREE.Points(
		particleGeo,
		particleMat
	);
	particleSystem.name = 'particleSystem';

	scene.add(particleSystem);

//Set the camera position
camera.position.z = 50;  


//Enable controls
controls = new THREE.TrackballControls(camera,renderer.domElement);
controls.userRotateSpeed = 1.5;
controls.minDistance = 80; // how far can you zoom in
controls.maxDistance = 70; // how far can you zoom out

// Slow down zooming
controls.zoomSpeed = 0.1;
// disable two finger move
controls.noPan = true;


//Render the image
function render() {
  controls.update();
  requestAnimationFrame(render);    
  renderer.render(scene, camera);
 }

render();