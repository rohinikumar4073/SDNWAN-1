define(['three',
        'Detector',
        'OrbitControls'
    ], function(THREE) {
        var ThreeDServices = {
            positions: {
                fb: {},
                os: {}
            },
            xValueFB: -175,
            xvalueOB: -175,
            getPositions: function(i, v, self) {
                var x, y, z;
                if (v.type == "forwarding-box") {
                    y = 108;
                    self.xValueFB = self.xValueFB + 35;
                    x = self.xValueFB;
                    if (i % 2 == 0) {
                        z = 10;
                    } else {
                        z = -10;
                    }
                } else {
                    y = 5;
                    self.xvalueOB = self.xvalueOB + 70;
                    x = self.xvalueOB;
                    if (i % 2 == 0) {
                        z = 50;
                    } else {
                        z = 30;
                    }
                }

                var cube1Postion = {
                    x: x,
                    y: y,
                    z: z
                };
                return cube1Postion;
            },
            addOpticalSwitch: function(parent, scene, targetList, threeDservices, i, name) {
                var textureOS = THREE.ImageUtils.loadTexture("css/images/ciscoicons/optical%20switch.png", {}, function() {
                    parent.renderScene()
                });
                var cubeGeometry1 = new THREE.CylinderGeometry(15, 15, 10, 20, 1); //Cylinder 1 - center
                var cubeMaterial1 = new THREE.MeshBasicMaterial({
                    color: 0x049FD9,
                    map: textureOS
                });
                var cube = new THREE.Mesh(cubeGeometry1, cubeMaterial1);
                var cubePostion = threeDservices.getPositions(i, {
                    type: "optical-switch"
                }, threeDservices)
                cube.position.set(cubePostion.x, cubePostion.y, cubePostion.z);
                cube.name = name;
                scene.add(cube);
                targetList.push(cube)
                return cubePostion;
            },
            addLink: function(source, destination, scene, targetList) {

                var materialLine = new THREE.LineBasicMaterial({
                    color: 0x049FD9
                });

                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(source.x, source.y, source.z), new THREE.Vector3(destination.x, destination.y, destination.z));
                var line = new THREE.Line(geometryLine, materialLine);

                scene.add(line);
                targetList.push(line)
            },
            loadLinks: function(links, parent, scene, targetList, threeDservices) {
                links.forEach(function(v, i) {
                    var destination = v.destination["dest-node"];

                    var source = v.source["source-node"];

                    threeDservices.addLink(threeDservices.positions.fb[source], threeDservices.positions.fb[destination], scene, targetList);
                    if (v.destination["l1-switch-port"]) {
                        var destinationOpticalLink = v.destination["l1-switch-port"].split(":")[0];
                        threeDservices.addLink(threeDservices.positions.fb[destination], threeDservices.positions.os[destinationOpticalLink], scene, targetList);

                    }
                    if (v.source["l1-switch-port"]) {
                        var sourceDestinationLInk = v.source["l1-switch-port"].split(":")[0];
                        threeDservices.addLink(threeDservices.positions.fb[source], threeDservices.positions.os[sourceDestinationLInk], scene, targetList);

                    }



                })

            },

            loadOpticalNodes: function(liServices, parent, scene, targetList, threeDservices) {
                threeDservices.xvalueOB = -175;

                var opticalDevices = [];
                var opticalPostions = {};
                liServices.forEach(function(v1, i1) {
                    v1.path.forEach(function(v2, i2) {
                        v2["path-element"].forEach(function(v3, i3) {
                            var APOINT = v3["a-endpoint"].split(",")[0];
                            var ZPOINT = v3["z-endpoint"].split(",")[0];
                            var source, destination;
                            if (opticalDevices.indexOf(APOINT) == -1) {
                                opticalDevices.push(APOINT);
                                threeDservices.positions.os[APOINT] = threeDservices.addOpticalSwitch(parent, scene, targetList, threeDservices, opticalDevices.length - 1, APOINT);
                            }
                            if (opticalDevices.indexOf(ZPOINT) == -1) {
                                opticalDevices.push(ZPOINT);
                                threeDservices.positions.os[ZPOINT] = threeDservices.addOpticalSwitch(parent, scene, targetList, threeDservices, opticalDevices.length - 1, ZPOINT);
                            }
                            threeDservices.addLink(threeDservices.positions.os[APOINT], threeDservices.positions.os[ZPOINT], scene, targetList)
                        })

                    })


                })
            },
            loadNodes: function(nodeData, parent, scene, targetList, self) {
                var textureFB = THREE.ImageUtils.loadTexture("css/images/ciscoicons/forwarding%20box.png", {}, function() {
                    parent.renderScene()
                });
                self.xValueFB = -175;
                nodeData.forEach(function(v, i) {
                    var texture = null;
                    if (v.type == "forwarding-box") {
                        texture = textureFB;
                    }
                    var cubeGeometry1 = new THREE.CubeGeometry(20, 20, 20);
                    var cubeMaterial1 = new THREE.MeshBasicMaterial({
                        color: 0x049FD9,
                        map: texture
                    });
                    var cube = new THREE.Mesh(cubeGeometry1, cubeMaterial1);
                    var cubePostion = self.getPositions(i, v, self)

                    cube.name = v["forwarding-box-name"];
                    cube.dataObjectValue = v;
                    self.positions.fb[cube.name] = cubePostion;
                    cube.position.set(cubePostion.x, cubePostion.y, cubePostion.z);
                    scene.add(cube);
                    targetList.push(cube)
                })

            },

            unSubscribe: function() {

            },
            addSpriteMaterial: function(scene, canvas1, sprite1, texture1) {
                // canvas contents will be used for a texture
                texture1 = new THREE.Texture(canvas1)
                texture1.needsUpdate = true;

                ////////////////////////////////////////

                var spriteMaterial = new THREE.SpriteMaterial({
                    map: texture1,
                    useScreenCoordinates: true
                });

                sprite1 = new THREE.Sprite(spriteMaterial);
                sprite1.scale.set(200, 100, 1.0);
                sprite1.position.set(50, 50, 0);
                scene.add(sprite1);
                debugger;
            },
            addPlanes: function(scene) {
                var plane1Postion = {
                    x: -5,
                    y: 5,
                    z: 0
                };
                var plane2Postion = {
                    x: -10,
                    y: -5,
                    z: 0
                };


                var material1 = new THREE.MeshBasicMaterial({
                    color: 0xcccccc,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.5
                });
                var floorGeometry1 = new THREE.PlaneGeometry(500, 100, 10, 10);
                var floor1 = new THREE.Mesh(floorGeometry1, material1);
                floor1.position.y = -0.5;
                floor1.position.z = 40;
                floor1.rotation.x = Math.PI / 2;
                floor1.name = "Plane 1";
                scene.add(floor1);

                var material2 = new THREE.MeshBasicMaterial({
                    color: 0xcccccc,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.5
                });
                var floorGeometry2 = new THREE.PlaneGeometry(500, 100, 10, 10);
                var floor2 = new THREE.Mesh(floorGeometry2, material2);
                floor2.position.x = 10;
                floor2.position.y = 100;

                floor2.rotation.x = Math.PI / 2;
                floor2.name = "Plane 2";
                scene.add(floor2);


            }
        }

        return ThreeDServices;

    }

)
