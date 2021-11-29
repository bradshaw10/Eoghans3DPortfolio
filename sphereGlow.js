import './styles.scss';
import * as THREE from 'three'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			// const geometry = new THREE.SphereGeometry();
			// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			// const cube = new THREE.Mesh( geometry, material );
			// scene.add( cube );

			camera.position.z = 5;

			const animate = function () {
				requestAnimationFrame( animate );

				// cube.rotation.x += 0.01;
				// cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			};

			animate();


                var sphereMaterial =
                   new THREE.MeshLambertMaterial({
                      color: 0x0000ff,
                      //map: earthTexture
                   });

                // set up the sphere vars
                var radius = 75;
                var segments = 16;
                var rings = 16;

                // create a new mesh with
                // sphere geometry - we will cover
                // the sphereMaterial next!
               var earth = new THREE.Mesh(

                   new THREE.SphereGeometry(
                      radius,
                      segments,
                      rings),

                   sphereMaterial);

                earth.position.x = 0;
                earth.position.y = 0;

                // add the sphere to the scene
                scene.add(earth);
