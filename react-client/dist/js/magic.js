
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor('#ffffff');
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  geometry.colorsNeedUpdate = true;
  var material = new THREE.MeshBasicMaterial( { color: getRandomColor() } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  
  camera.position.z = 5;
  
  var animate = function () {
    requestAnimationFrame( animate );
    
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;
    
    // setInterval(cube.rotation.x += 0.01,tempo)
    renderer.render( scene, camera );
    
    // cancelAnimationFrame(id)
  };

animate()


// setInterval(() => createAnimate(50), 1000);
