function scrollToSection() {
    document.getElementById("projects").scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("contactForm").addEventListener("submit", function(e) {

    e.preventDefault();

    document.getElementById("message").innerHTML =
    "✅ Thank you! Your message has been sent.";

    this.reset();

});
// ===== HERO 3D =====

const container = document.getElementById("hero3d");

if(container){

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({
alpha:true,
antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);


// ===== Torus =====

const geometry = new THREE.TorusGeometry(2,0.5,32,100);

const material = new THREE.MeshNormalMaterial();

const torus = new THREE.Mesh(geometry,material);

scene.add(torus);


// ===== Stars =====

const stars = new THREE.BufferGeometry();

const starVertices = [];

for(let i=0;i<3000;i++){

starVertices.push(
(Math.random()-0.5)*100,
(Math.random()-0.5)*100,
(Math.random()-0.5)*100
);

}

stars.setAttribute(
'position',
new THREE.Float32BufferAttribute(starVertices,3)
);

const starMaterial = new THREE.PointsMaterial({
color:0x00ffff,
size:0.15
});

const starField = new THREE.Points(stars,starMaterial);

scene.add(starField);


// ===== Animation =====

function animate(){

requestAnimationFrame(animate);

torus.rotation.x +=0.004;
torus.rotation.y +=0.006;

starField.rotation.y +=0.0008;

renderer.render(scene,camera);

}

animate();


// ===== Resize =====

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});

}