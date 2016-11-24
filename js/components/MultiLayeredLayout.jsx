define([
    'react','three','OrbitControls'
], function(React,THREE) {
var MultiLayeredLayout = React.createClass({
  getInitialState:function(){

  return {};
  },
  componentDidMount:function(){

			var container,cameraControls;
			var camera, scene, renderer;
			var plane, cube;
			var mouse, raycaster, isShiftDown = false;
			var rollOverMesh, rollOverMaterial;
			var cubeGeo, cubeMaterial;
			var objects = [];
function init() {
  container = document.createElement( 'div' );
  document.getElementById('multilayered').appendChild( container );
  var width = $(window).width();
  width= (width * 75) / 100 - 25;
    var height = $(window).height();
  height= (height - 93);
   camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
   camera.position.z = 30;

  scene = new THREE.Scene();
// adding two planes
var plane1Postion={x:-10,y:5,z:0};
var plane2Postion={x:-10,y:-5,z:0};

var cube1Postion={x:0,y:7,z:0}
var cube2Postion={x:2,y:-3,z:0}
var cube3Postion={x:-10,y:7,z:0}
var cube4Postion={x:-19,y:-3,z:0}
var cube5Postion={x:-6,y:7,z:0}

var geometry = new THREE.PlaneGeometry( 10, 30, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xf0f0f0, side: THREE.DoubleSide} );
var plane1 = new THREE.Mesh( geometry, material );
var plane2 = new THREE.Mesh( geometry, material );
plane1.rotation.z = Math.PI / 2;
plane1.rotation.x = -Math.PI / 5;
plane1.position.x = plane1Postion.x;
plane1.position.y = plane1Postion.y;

plane2.position.y = plane2Postion.y;
plane2.position.x = plane2Postion.x;
plane2.rotation.z = Math.PI / 2;
plane2.rotation.x = -Math.PI / 5;

scene.add( plane1 );
scene.add( plane2 );

// adding two cubes
var textureFB = THREE.ImageUtils.loadTexture("css/images/ciscoicons/forwarding%20box.png",{}, function() {
  render()
});
var textureOS = THREE.ImageUtils.loadTexture("css/images/ciscoicons/optical%20switch.png",{}, function() {
render()
});


var geometryCube = new THREE.BoxGeometry( 2.5, 2.5, 2.5 );
var materialFb = new THREE.MeshBasicMaterial( {color: 0x049FD9,map:textureFB} );
var materialOs = new THREE.MeshBasicMaterial( {color: 0x049FD9,map:textureOS} );

var cube1 = new THREE.Mesh( geometryCube, materialFb );
scene.add( cube1 );
cube1.rotation.z = Math.PI / 2;
cube1.rotation.x = -Math.PI / 5;

cube1.position.y = cube1Postion.y;

var cube2 = new THREE.Mesh( geometryCube, materialFb );
scene.add( cube2 );
cube2.position.x = cube2Postion.x;
cube2.position.y = cube2Postion.y;
cube2.rotation.z = Math.PI / 2;
cube2.rotation.x = -Math.PI / 5;

var cube3 = new THREE.Mesh( geometryCube,  materialOs);
scene.add( cube3 );
cube3.position.y = cube3Postion.y;
cube3.position.x = cube3Postion.x;

cube3.rotation.z = Math.PI / 2;
cube3.rotation.x = -Math.PI / 5;


var cube4 = new THREE.Mesh( geometryCube, materialOs );
scene.add( cube4);
cube4.rotation.z = Math.PI / 2;
cube4.rotation.x = -Math.PI / 5;
cube4.position.x = cube4Postion.x;
cube4.position.y = cube4Postion.y;

var cube5 = new THREE.Mesh( geometryCube, materialFb);
scene.add( cube5 );
cube5.rotation.z = Math.PI / 2;
cube5.rotation.x = -Math.PI / 5;
cube5.position.x = cube5Postion.x;
cube5.position.y = cube5Postion.y;

// linkTooltipContentClass

var materialLine = new THREE.LineBasicMaterial({
	color: 0x049FD9
});

var geometryLine1 = new THREE.Geometry();
geometryLine1.vertices.push(
	new THREE.Vector3( cube1Postion.x,cube1Postion.y,0),
	new THREE.Vector3(cube2Postion.x,cube2Postion.y,0)
);

var geometryLine2 = new THREE.Geometry();
geometryLine2.vertices.push(
	new THREE.Vector3( cube2Postion.x,cube2Postion.y,0),
	new THREE.Vector3(cube3Postion.x,cube3Postion.y,0)
);

var geometryLine3 = new THREE.Geometry();
geometryLine3.vertices.push(
	new THREE.Vector3( cube3Postion.x,cube3Postion.y,0),
	new THREE.Vector3(cube4Postion.x,cube4Postion.y,0)
);

var geometryLine4 = new THREE.Geometry();
geometryLine4.vertices.push(
	new THREE.Vector3( cube4Postion.x,cube4Postion.y,0),
	new THREE.Vector3(cube5Postion.x,cube5Postion.y,0)
)
var geometryLine5 = new THREE.Geometry();
geometryLine5.vertices.push(
	new THREE.Vector3( cube5Postion.x,cube5Postion.y,0),
	new THREE.Vector3(cube1Postion.x,cube1Postion.y,0)
)
var line1 = new THREE.Line( geometryLine1, materialLine );
var line2 = new THREE.Line( geometryLine2, materialLine );
var line3 = new THREE.Line( geometryLine3, materialLine );
var line4 = new THREE.Line( geometryLine4, materialLine );
var line5 = new THREE.Line( geometryLine5, materialLine );

scene.add( line1 ).add(line2).add(line3).add(line4).add(line5);


renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setClearColor( 0xffffff );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );
cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
      cameraControls.target.set( 0, 0, 0 );
      cameraControls.addEventListener( 'change', render );


  // roll-over helpers  //
  window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function render() {
  renderer.render( scene, camera );
}
init();
render();

  },
animate:function(){



},
  render: function() {
    return(
<div className="layout-flex " id="multilayered">

</div>)

}
});
return MultiLayeredLayout;

});
