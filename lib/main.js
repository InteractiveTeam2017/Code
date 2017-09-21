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

var objects = [];
var intersected;

// Renderer the canvas
var renderer = new THREE.WebGLRenderer();
renderer.setSize( WIDTH, HEIGHT);
renderer.setClearColor( 0x1A1A1A, 1);
renderer.shadowMap.enable = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

document.getElementById('u135228').appendChild(renderer.domElement);

//resize window

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}



//add ambientlight
//scene.add(new THREE.AmbientLight(0x71ABEF));

// create a point light (goes in all directions)
var pointLight = new THREE.PointLight(0xffffff, 0.8);
// set its position
pointLight.position.x = 20;
pointLight.position.y = 50;
pointLight.position.z = 1000;
pointLight.shadowRadius = 0.1;
camera.add(pointLight);



var spotLight = new THREE.SpotLight(0xffffff, 1.2, 90000, Math.PI/70, 1, 1);
	spotLight.position.set( 100, 1000, 100 );
	
	camera.add( spotLight );




// Create a sphere to make visualization easier.
var geometry = new THREE.SphereGeometry(40,100,100);
var material = new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load('./assets/textures/earthtwo.jpeg'),
	color: 0xDDDDDD,
	wireframe: false,
	transparent: true
});
 

var geometryglow = new THREE.SphereGeometry(1,50,50);
var materialglow = new THREE.MeshPhongMaterial({
	
	color: 0x1A1A1A,
	wireframe: false,
	transparent: true
});

// glow effect


	mesh = new THREE.Mesh( geometryglow, materialglow );
	mesh.position.set(0,0,0);
	scene.add(mesh);
	


	// SUPER SIMPLE GLOW EFFECT
	// use sprite because it appears the same from all angles
	var spriteMaterial = new THREE.SpriteMaterial( 
	{ 
		
		map: new THREE.TextureLoader().load('./assets/textures/glow.png'),
		//useScreenCoordinates: false, 
		//alignment: THREE.SpriteAlignment.center,
		color: 0xffffff, transparent: false, blending: THREE.AdditiveBlending
	});
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(135, 135, 1.0);
	mesh.add(sprite); // this centers the glow at the mesh





var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
//sphere.castShadow = true;
//sphere.receiveShadow = true;



 // create particle system.
//particle system
var particleMat = new THREE.PointsMaterial({
		//color: 'rgb(255, 255, 255, 0)',
		size: 2.5,
        //add material
	    map: new THREE.TextureLoader().load('./assets/textures/particle002.png'),
		transparent: true,
		blending: THREE.AdditiveBlending,
		depthWrite: false,

 		//light:true
	//opacity: 1
	});

	var particleGeo1 = new THREE.SphereGeometry(10, 2, 2);



// add particle 

/*
// x=41 y=0 z=0    
    function addPosition1(){
		var vex = particleGeo1.vertices[0];
		// 0-90
	    var degreex = 0;
		var degreey = Math.PI/2;
		vex.x = Math.cos(degreex)*Math.sin(degreey)*41;
		vex.y = Math.sin(degreex)*Math.sin(degreey)*41;
		vex.z = Math.cos(degreey)*41;
}
    addPosition1();



// x=0 y=0 z=41
    function addPosition2(){
		var vex = particleGeo1.vertices[1];
		// 0-90
	    var degreex = 0;
		var degreey = 0;
		vex.x = Math.cos(degreex)*Math.sin(degreey)*41;
		vex.y = Math.sin(degreex)*Math.sin(degreey)*41;
		vex.z = Math.cos(degreey)*41 ;
}
    addPosition2();
	*/

// Sudan
    function addPosition3(){
		var vex = particleGeo1.vertices[2];
		// 0-90
	    var degreex = Math.PI/32*2;
		var degreey = Math.PI/32*21;
		vex.x = Math.cos(degreex)*Math.sin(degreey)*41;
		vex.y = Math.sin(degreex)*Math.sin(degreey)*41;
		vex.z = Math.cos(degreey)*41;
}
    addPosition3();




	var particleSystem1 = new THREE.Points(
		particleGeo1,
		particleMat
	);
	particleSystem1.name = "particleSystem1";
    particleSystem1.link = 'lightbox1';
    particleSystem1.material.color.setHex( 0xE2283E );

scene.add(particleSystem1);

// add particle system to objects
    objects.push(particleSystem1);




////////////////////////////////////////////////////////////////////////////////////////particlesystem2

var particleGeo2 = new THREE.SphereGeometry(10, 1, 1);

function addPosition4(){
		var vex = particleGeo2.vertices[0];
		// 0-90
	    var degreex = 0;
		var degreey = Math.PI/8;
		vex.x = Math.cos(degreex)*Math.sin(degreey)*41;
		vex.y = Math.sin(degreex)*Math.sin(degreey)*41;
		vex.z = Math.cos(degreey)*41;
	    
}
    addPosition4();

var particleSystem2 = new THREE.Points(
		particleGeo2,
		particleMat
	);
	particleSystem2.name = "particleSystem2";
    particleSystem2.link = 'lightbox2';

scene.add(particleSystem2);

objects.push(particleSystem2);




////////////////////////////////////////////////////////////////////////////////////////





    

// define raycaster and mouse
    var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();





//Set the camera position
camera.position.z = 50;  
//add camera to scene
scene.add(camera);

//Enable controls using orbitcontrols here

/*controls = new THREE.TrackballControls(camera,renderer.domElement);
controls.userRotateSpeed = 1.5;
controls.minDistance = 80; // how far can you zoom in
controls.maxDistance = 70; // how far can you zoom out

// Slow down zooming
controls.zoomSpeed = 0.1;
*/



	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.autoRotate = true;
	controls.autoRotateSpeed = 1;
	controls.minDistance = 80; // how far can you zoom in
	controls.maxDistance = 70; // how far can you zoom out

    // disable two finger move
    controls.enablePan = false;


//Render the image
function render() {
  controls.update();
  requestAnimationFrame(render);    
  renderer.render(scene, camera);
 }

document.addEventListener( 'mousedown', onDocumentMouseDown, false );



function getLink(a){
	//window.location.assign("http://groupwebsitetest.businesscatalyst.com/climate-change.html");	
	
	document.getElementById(a).style.display="block";
	controls.autoRotate = false;
	}

function closeLightbox(a){
	document.getElementById(a).style.display="none";
	controls.autoRotate = true;
}


function onDocumentMouseDown( event ) {
	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( objects );

	if ( intersects.length > 0 ) {

		if(intersects[0].object != intersected){
			if(intersected)
				closeLightbox(intersected.link);
			intersected = intersects[0].object;
			getLink(intersects[ 0 ].object.link);
		}
		else{
			if(intersected)
				closeLightbox(intersected.link);
			intersected = null;
		}
		

        }
}







render();
