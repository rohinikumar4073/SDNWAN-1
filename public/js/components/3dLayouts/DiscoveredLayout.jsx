define([
    'react',
    'jquery',
    'jsx!components/BootstrapLink',
    'services/ThreeDService',
    'three',
    'Detector',
    'OrbitControls'
], function(React, $, BootstrapLink, threeDservices, THREE) {
    var SCREEN_WIDTH;
    var SCREEN_HEIGHT;
    // standard global variables
    var targetList = [];
    var container,
        scene,
        camera,
        renderer,
        controls,
        stats;
    var clock = new THREE.Clock();

    // custom global variables

    var projector,
        mouse = {
            x: 0,
            y: 0
        },
        INTERSECTED;
    var sprite1;
    var canvas1,
        context1,
        texture1;
    var xValueFB = -175;

    var DiscoveredLayout = React.createClass({
        animate: function() {
            requestAnimationFrame(this.animate);
            this.renderScene();
            this.update();
        },
        renderScene: function() {
            renderer.render(scene, camera);

        },
        onDocumentMouseMove: function(event) {
          var boundaries={x:{min:(25+SCREEN_WIDTH),max:2*SCREEN_WIDTH},y:{min:(SCREEN_HEIGHT+190),max:(2*SCREEN_HEIGHT+190)}}


          if( event.clientX < boundaries.x.min || event.clientX > boundaries.x.max  || event.clientY < boundaries.y.min || event.clientY > boundaries.y.max){
            this.setState({"notInOurZone":true});
            return false;

        }
         this.setState({"notInOurZone":false});
         this.setState({position:{top:event.clientY-80 ,left:event.clientX-25}})

          mouse.x = ( (event.clientX-55-SCREEN_WIDTH) / (SCREEN_WIDTH) ) * 2 - 1;
          mouse.y = - (( event.clientY-(SCREEN_HEIGHT+190)) / SCREEN_HEIGHT) * 2 + 1;
          //console.log("mouse"+mouse)
        //  console.log("event"+mouse)

       },
        update: function() {

            // create a Ray with origin at the mouse position
            //   and direction into the scene (camera direction)

            var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
            vector.unproject(camera);
            var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

            // create an array containing all objects in the scene with which the ray intersects
            var intersects = ray.intersectObjects(targetList);

            // INTERSECTED = the object in the scene currently closest to the camera
            //		and intersected by the Ray projected from the mouse position

            // if there is one (or more) intersections
            if (intersects.length > 0) {
                // if the closest object intersected is not the currently stored intersection object
                if (intersects[0].object != INTERSECTED) {
                    // restore previous intersection object (if it exists) to its original color
                    if (INTERSECTED)
                        INTERSECTED.material.color.setHex(INTERSECTED.currentHex);

                    // store reference to closest object as current intersection object
                    INTERSECTED = intersects[0].object;
                    // store color of closest object (for later restoration)
                    INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                    // set a new color for closest object
                    INTERSECTED.material.color.setHex(0xffff00);

                    // update text, if it has a "name" field.
                    if (intersects[0].object.name) {
                        context1.clearRect(0, 0, 640, 480);
                        var message = intersects[0].object.name;
                        var dataObjectValue = {}
                        if (intersects[0].object.dataObjectValue) {
                            dataObjectValue = intersects[0].object.dataObjectValue
                        }
                        console.log(intersects[0].object.name)

                        this.props.setParentState({"parentClass": "discovered-on", "heading": message, "data": dataObjectValue,position:this.state.position})
                        var metrics = context1.measureText(message);
                        var width = metrics.width;
                        context1.fillStyle = "rgba(0,0,0,0.95)"; // black border
                        context1.fillRect(0, 0, width + 8, 20 + 8);
                        context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
                        context1.fillRect(2, 2, width + 4, 20 + 4);
                        context1.fillStyle = "rgba(0,0,0,1)"; // text color
                        context1.fillText(message, 4, 20);
                        //	texture1.needsUpdate = true;
                    } else {
                        context1.clearRect(0, 0, 300, 300);
                        //	texture1.needsUpdate = true;
                    }
                }
            } else { // there are no intersections
                // restore previous intersection object (if it exists) to its original color
                if (INTERSECTED)
                    INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
                    if (!this.state.notInOurZone)
                        this.props.setParentState({"parentClass": "discovered-off"})
                // remove previous intersection object reference
                //     by setting current intersection object to "nothing"
                INTERSECTED = null;
                context1.clearRect(0, 0, 300, 300);
            }

            controls.update();
            // stats.update();

        },
        initScene: function() {
            // SCENE
            scene = new THREE.Scene();
            // CAMERA

            var VIEW_ANGLE = 40,
                ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
                NEAR = 0.1,
                FAR = 20000;

            camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

            scene.add(camera);
            camera.position.set(180, 220, 400);
            camera.lookAt(scene.position);
            // RENDERER
            if (Detector.webgl)
                renderer = new THREE.WebGLRenderer({antialias: true});
            else
                renderer = new THREE.CanvasRenderer();
            renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
            $("#discoverlayout").height(SCREEN_HEIGHT)
            container = document.getElementById('discoverlayout');

            container.appendChild(renderer.domElement);
            // EVENTS
            // CONTROLS
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            // STATS
            //	stats = new Stats();
            // stats.domElement.style.position = 'absolute';
            // stats.domElement.style.bottom = '0px';
            // stats.domElement.style.zIndex = 100;
            // container.appendChild( stats.domElement );
            // LIGHT
            var light = new THREE.PointLight(0xffffff);
            light.position.set(0, 250, 0);
            scene.add(light);
            // FLOOR
            // adding two planes
            threeDservices.addPlanes(scene)
            // SKYBOX/FOG
            var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
            var skyBoxMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.BackSide});
            var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
            scene.add(skyBox);
            canvas1 = document.createElement('canvas');
            context1 = canvas1.getContext('2d');


        },

        getInitialState: function() {
            return {modalHeading: "Nodata", notInOurZone: false,position:{}};
                  },
        componentDidMount: function() {
            SCREEN_WIDTH = parseInt($("#discoverlayout").width());
            SCREEN_HEIGHT = parseInt(($(window).height() - 220) / 2);
                        $("#discoverlayout").height(SCREEN_HEIGHT)
        },  makeDefault:function(){
SCREEN_WIDTH = parseInt($("#discoverlayout").width());
          SCREEN_HEIGHT = parseInt(($(window).height() - 220) / 2);
             targetList = [];
             container=null;
                scener=null;
                camerar=null;
                rendererr=null;
                controlsr=null;
                statsr=null;
             clock = new THREE.Clock();

            // custom global variables

             projector;
                mouse = {
                    x: 0,
                    y: 0
                };
                INTERSECTED;
             sprite1=null;
             canvas1=null;
                context1=null;
                texture1=null;
          },
        renderLayout: function(data) {
        this.makeDefault();
            var discoveredTopology=data["discovered-topology-message"]["discovered-topology"];
            this.initScene();
            this.animate();
            nodeData={}
            if(discoveredTopology["network-topology"])
             nodeData = discoveredTopology["network-topology"]["topology"][0].node;
             else
             nodeData = discoveredTopology["topology"][0].node;


            threeDservices.loadNodes(nodeData,this,scene,targetList,threeDservices);
            if( discoveredTopology["l1-services"]){
              var liServices = data["verified-packet-topology-message"]["verified-packet-topology"]["l1-services"]["l1-service"];
              threeDservices.loadOpticalNodes(liServices,this,scene,targetList,threeDservices);

            }
            var linkData = discoveredTopology["topology"][0].link;
            threeDservices.loadLinks(linkData,this,scene,targetList,threeDservices);
                        document.addEventListener('mousemove', this.onDocumentMouseMove, false);


        },  componentWillUnmount: function() {
                document.removeEventListener('mousemove', this.onDocumentMouseMove, false)
            },
        render: function() {
            return (
                <div className="directlayout">
                    <h3>
                        Discovered Topology</h3>
                      <div className="layout-flex " id="discoverlayout" ></div>
                    <BootstrapLink ref="modal" data={this.state.modalHeading} className="hideLink" template={"MultiLayeredTopologyDetails"} addRow={this.addRow}/>
                </div>
            )
        }
    });
    return DiscoveredLayout;
});
