define([
    'react','three','jquery','jsx!components/BootstrapLink','Detector','OrbitControls'
], function(React,THREE,$,BootstrapLink) {
var MultiLayeredLayout = React.createClass({
  getInitialState:function(){

  return {
modalHeading:"Nodata",
  };
  },
  componentDidMount:function(){
    self=this;

    var targetList =[];
    var SCREEN_WIDTH = parseInt($("#multilayered").width());
    var SCREEN_HEIGHT = parseInt($("#multilayered").height());
    // standard global variables
    var container, scene, camera, renderer, controls, stats;
    var clock = new THREE.Clock();

    // custom global variables
    var cube1,cube2,cube3,cube4,cube5;
    var projector, mouse = { x: 0, y: 0 }, INTERSECTED;
    var sprite1;
    var canvas1, context1, texture1;


    // FUNCTIONS
    function init()
    {
    	// SCENE
    	scene = new THREE.Scene();
    	// CAMERA

    	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    	scene.add(camera);
    	camera.position.set(50,150,400);
    	camera.lookAt(scene.position);
    	// RENDERER
    	if ( Detector.webgl )
    		renderer = new THREE.WebGLRenderer( {antialias:true} );
    	else
    		renderer = new THREE.CanvasRenderer();
    	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    	container = document.getElementById( 'multilayered' );
    	container.appendChild( renderer.domElement );
    	// EVENTS
    	// CONTROLS
    	controls = new THREE.OrbitControls( camera, renderer.domElement );
    	// STATS
      //	stats = new Stats();
    	// stats.domElement.style.position = 'absolute';
    	// stats.domElement.style.bottom = '0px';
    	// stats.domElement.style.zIndex = 100;
    	// container.appendChild( stats.domElement );
    	// LIGHT
    	var light = new THREE.PointLight(0xffffff);
    	light.position.set(0,250,0);
    	scene.add(light);
    	// FLOOR
    	// adding two planes
    	var plane1Postion={x:-5,y:5,z:0};
    	var plane2Postion={x:-10,y:-5,z:0};

    	var cube1Postion={x:0,y:13,z:0}
    	var cube2Postion={x:70,y:13,z:0}
    	var cube3Postion={x:-50,y:113,z:0}
    	var cube4Postion={x:50,y:113,z:0}
    	var cube5Postion={x:-70,y:13,z:0}

    	var material1 = new THREE.MeshBasicMaterial( {color: 0xcccccc, side: THREE.DoubleSide} );
    	var floorGeometry1 = new THREE.PlaneGeometry(250, 100, 10, 10);
    	var floor1 = new THREE.Mesh(floorGeometry1, material1);
    	floor1.position.y = -0.5;
    	floor1.rotation.x = Math.PI / 2;
    	floor1.name = "Plane 1";
    	scene.add(floor1);

    		var material2 = new THREE.MeshBasicMaterial( {color: 0xcccccc, side: THREE.DoubleSide} );
    		var floorGeometry2 = new THREE.PlaneGeometry(250, 100, 10, 10);
    	var floor2 = new THREE.Mesh(floorGeometry2, material2);
    	floor2.position.y = -0.5;
    	floor2.position.y= 100;

    	floor2.rotation.x = Math.PI / 2;
    	floor2.name = "Plane 2";
    	scene.add(floor2);

    	// SKYBOX/FOG
    	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
    	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.BackSide } );
    	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    	scene.add(skyBox);

    	////////////
    	// CUSTOM //
    	////////////

      // adding two cubes
      var textureFB = THREE.ImageUtils.loadTexture("css/images/ciscoicons/forwarding%20box.png",{}, function() {
        render()
      });
      var textureOS = THREE.ImageUtils.loadTexture("css/images/ciscoicons/optical%20switch.png",{}, function() {
      render()
      });


    	var cubeGeometry1 = new THREE.CubeGeometry( 25, 25, 25 );
    	var cubeMaterial1 = new THREE.MeshBasicMaterial( {color: 0x049FD9,map:textureOS});
    	cube1 = new THREE.Mesh( cubeGeometry1, cubeMaterial1 );
    	cube1.position.set(cube1Postion.x,cube1Postion.y,0);
    	cube1.name = "Optical Switch 1";
    	scene.add(cube1);
    	var cubeGeometry2 = new THREE.CubeGeometry( 25, 25, 25 );
    	var cubeMaterial2 = new THREE.MeshBasicMaterial( {color: 0x049FD9,map:textureFB});

    	cube2 = new THREE.Mesh( cubeGeometry2, cubeMaterial2 );
    	cube2.position.set(cube2Postion.x,cube2Postion.y,0);
    	cube2.name = "Forwarding Box 1";

    	scene.add(cube2);

    	var cubeGeometry3 = new THREE.CubeGeometry( 25, 25, 25 );
    	var cubeMaterial3 = new THREE.MeshBasicMaterial({color: 0x049FD9,map:textureOS});
    	cube3 = new THREE.Mesh( cubeGeometry3, cubeMaterial3 );
    	cube3.position.set(cube3Postion.x,cube3Postion.y,0);
    	cube3.name = "Optical Switch 2";
    	scene.add(cube3);

    	var cubeGeometry4 = new THREE.CubeGeometry( 25, 25, 25 );
    	var cubeMaterial4 = new THREE.MeshBasicMaterial( {color: 0x049FD9,map:textureFB});

    	cube4 = new THREE.Mesh( cubeGeometry4, cubeMaterial4 );
    	cube4.position.set(cube4Postion.x,cube4Postion.y,0);
    	cube4.name = "Forwarding Box 2";
    	scene.add(cube4);
    	var cubeGeometry5 = new THREE.CubeGeometry( 25, 25, 25 );
    	var cubeMaterial5 = new THREE.MeshBasicMaterial({color: 0x049FD9,map:textureOS});

    	cube5 = new THREE.Mesh( cubeGeometry5, cubeMaterial5 );
    	cube5.position.set(cube5Postion.x,cube5Postion.y,0);
    	cube5.name = "Optical Switch 3";
    	scene.add(cube5);
    targetList.push(cube1)
    targetList.push(cube2)
    targetList.push(cube3)
    targetList.push(cube4)
    targetList.push(cube5)
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

    	scene.add( line1 );scene.add(line2);scene.add(line3);scene.add(line4);scene.add(line5);


    	// initialize object to perform world/screen calculations

    	// when the mouse moves, call the given function
    	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    	document.addEventListener( 'mousedown', onDocumentMouseDown, false );

    	/////// draw text on canvas /////////

    	// create a canvas element
    	canvas1 = document.createElement('canvas');
    	context1 = canvas1.getContext('2d');
    	context1.font = "Bold 20px Arial";
    	context1.fillStyle = "rgba(0,0,0,0.95)";
        context1.fillText('Hello, world!', 0, 20);

    	// canvas contents will be used for a texture
    	////////////////////////////////////////

    	//////////////////////////////////////////

    }


    function leftMenuWidth(){
      var width=0;
      if($(".left-menu").css('display')!="none"){
      width=  parseInt($(".left-menu").width())
      }
      return width;
    }
    function onDocumentMouseMove( event )
    {
    	// the following line would stop any other event handler from firing
    	// (such as the mouse's TrackballControls)
    	// event.preventDefault();

    	// update sprite position

    	// update the mouse variable
      var x=event.clientX-leftMenuWidth()-50;
var y=event.clientY-110;
      mouse.x = ( x/ SCREEN_WIDTH) * 2 - 1;

    	mouse.y = - ( y /SCREEN_HEIGHT) * 2 + 1;
    }

    function animate()
    {
        requestAnimationFrame( animate );
    	render();
    	update();
    }
    function onDocumentMouseDown( event )
    {
    	// the following line would stop any other event handler from firing
    	// (such as the mouse's TrackballControls)
    	// event.preventDefault();



      var x=event.clientX-leftMenuWidth()-50;
      var y=event.clientY-110;
      mouse.x = ( x/ SCREEN_WIDTH) * 2 - 1;

    	mouse.y = - ( y /SCREEN_HEIGHT) * 2 + 1;
  // update the mouse variable

    	// find intersections

    	// create a Ray with origin at the mouse position
    	//   and direction into the scene (camera direction)
    	var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
      vector.unproject(camera)
      var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

    	// create an array containing all objects in the scene with which the ray intersects
    	var intersects = ray.intersectObjects( targetList );

    	// if there is one (or more) intersections
    	if ( intersects.length > 0 )
    	{

self.setState({"modalHeading":intersects[0].object.name})
self.refs["modal"].openModal();
      }

    }

    function update()
    {

    	// create a Ray with origin at the mouse position
    	//   and direction into the scene (camera direction)

    	var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
    	vector.unproject(  camera );
    	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

    	// create an array containing all objects in the scene with which the ray intersects
    	var intersects = ray.intersectObjects( targetList);

    	// INTERSECTED = the object in the scene currently closest to the camera
    	//		and intersected by the Ray projected from the mouse position

    	// if there is one (or more) intersections
    	if ( intersects.length > 0 )
    	{
    		// if the closest object intersected is not the currently stored intersection object
    		if ( intersects[ 0 ].object != INTERSECTED )
    		{
    		    // restore previous intersection object (if it exists) to its original color
    			if ( INTERSECTED )
    				INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
    			// store reference to closest object as current intersection object
    			INTERSECTED = intersects[ 0 ].object;
    			// store color of closest object (for later restoration)
    			INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
    			// set a new color for closest object
    			INTERSECTED.material.color.setHex( 0xffff00 );

    			// update text, if it has a "name" field.
    			if ( intersects[ 0 ].object.name )
    			{
    			    context1.clearRect(0,0,640,480);
    				var message = intersects[ 0 ].object.name;
    				var metrics = context1.measureText(message);
    				var width = metrics.width;
    				context1.fillStyle = "rgba(0,0,0,0.95)"; // black border
    				context1.fillRect( 0,0, width+8,20+8);
    				context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
    				context1.fillRect( 2,2, width+4,20+4 );
    				context1.fillStyle = "rgba(0,0,0,1)"; // text color
    				context1.fillText( message, 4,20 );
    			//	texture1.needsUpdate = true;
    			}
    			else
    			{
    				context1.clearRect(0,0,300,300);
    			//	texture1.needsUpdate = true;
    			}
    		}
    	}
    	else // there are no intersections
    	{
    		// restore previous intersection object (if it exists) to its original color
    		if ( INTERSECTED )
    			INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
    		// remove previous intersection object reference
    		//     by setting current intersection object to "nothing"
    		INTERSECTED = null;
    		context1.clearRect(0,0,300,300);
    	}


    	controls.update();
    	// stats.update();
    }

    function render()
    {
    	renderer.render( scene, camera );
    }
    init();
    animate();

  },
animate:function(){



},
  render: function() {
    return(
      <div>
        <h3> Multi layered mode</h3>
        <div className="layout-flex " id="multilayered" className="multilayered">

        </div>
        <BootstrapLink  ref="modal" data= {this.state.modalHeading}  className= "hideLink" template={"MultiLayeredTopologyDetails"} addRow={this.addRow}/>

      </div>
)

}
});
return MultiLayeredLayout;

});
