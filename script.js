// Scene
const scene = new THREE.Scene();

// Background Galaxy
const textureLoader = new THREE.TextureLoader();

// ==========================
// Texture Foto
// ==========================

const photoTexture = textureLoader.load("assets/photo1.png");

const planetTexture = textureLoader.load("assets/planet.png");

const cloudTexture = textureLoader.load("assets/cloud.png");

const photoTexture2 = textureLoader.load("assets/photo2.png");

const photoTexture3 = textureLoader.load("assets/photo3.png");

const photoTexture4 = textureLoader.load("assets/photo4.png");

let galaxyBackground;
let hologramBackground;

textureLoader.load(
    "assets/galaxy.png",
    function(texture){

        galaxyBackground = texture;
        scene.background = galaxyBackground;

    }
);

textureLoader.load(
    "assets/background2.png",
    function(texture){

        hologramBackground = texture;

    }
);

// Texture Bintang
const starTexture = textureLoader.load("assets/star.png");

// ==========================
// Musik
// ==========================

const music = new Audio("assets/music.mp3");

music.loop = true;

music.volume = 0.5;

// Camera
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

// ==========================
// Cahaya
// ==========================

const light = new THREE.PointLight(
    0xffffff,
    1.2,
    100
);
light.position.set(
5,
3,
6
);
scene.add(light);

const backLight = new THREE.PointLight(
    0xaa66ff,
    1,
    20
);

backLight.position.set(
    -5,
    2,
    -4
);

scene.add(backLight);

const blueLight = new THREE.PointLight(
    0x66ccff,
    0.6,
    20
);

blueLight.position.set(
    6,
    -2,
    -3
);

scene.add(blueLight);

const ambient = new THREE.AmbientLight(
    0xffffff,
    0.4
);
scene.add(ambient);

// ==========================
// Planet
// ==========================

const geometry = new THREE.SphereGeometry(
1.25,
128,
128
);

const material = new THREE.MeshStandardMaterial({

    map: planetTexture,

    roughness: 0.9,

    metalness: 0,

    emissive: 0x220033,

    emissiveIntensity: 0.15

});

const planet = new THREE.Mesh(
geometry,
material
);

scene.add(planet);

const cloudGeometry = new THREE.SphereGeometry(
    1.27,
    128,
    128
);

const cloudMaterial = new THREE.MeshStandardMaterial({

    map: cloudTexture,

    transparent:true,

    opacity:0.45,

    depthWrite:false,

    roughness:1,

    metalness:0

});

const clouds = new THREE.Mesh(
    cloudGeometry,
    cloudMaterial
);

scene.add(clouds);

// Atmosfer Planet

const atmosphereGeometry = new THREE.SphereGeometry(
1.28,
64,
64
);

const atmosphereMaterial = new THREE.MeshPhongMaterial({

    color:0x66ccff,

    transparent:true,

    opacity:0.28,

    blending:THREE.AdditiveBlending,

    side:THREE.DoubleSide,

    depthWrite:false

});

const atmosphere = new THREE.Mesh(

atmosphereGeometry,

atmosphereMaterial

);

scene.add(atmosphere);

// Glow Planet

const glowGeometry = new THREE.SphereGeometry(
1.32,
64,
64
);

const glowMaterial = new THREE.MeshBasicMaterial({

    color:0xaa66ff,

    transparent:true,

    opacity:0.22,

    blending:THREE.AdditiveBlending,

    side:THREE.DoubleSide,

    depthWrite:false

});

const glow = new THREE.Mesh(
glowGeometry,
glowMaterial
);

scene.add(glow);

// ==========================
// Planet Shockwave
// ==========================

const shockGeometry = new THREE.RingGeometry(
    1.4,
    1.43,
    128
);

const shockMaterial = new THREE.MeshBasicMaterial({

    color:0x88ccff,

    transparent:true,

    opacity:0,

    side:THREE.DoubleSide,

    blending:THREE.AdditiveBlending

});

const shockwave = new THREE.Mesh(
    shockGeometry,
    shockMaterial
);

shockwave.rotation.x = Math.PI/2;

scene.add(shockwave);

let shockPower = 0;

let ringPulse = 0;

// ==========================
// Rim Light Planet
// ==========================

const rimGeometry = new THREE.SphereGeometry(
1.34,
64,
64
);

const rimMaterial = new THREE.MeshBasicMaterial({

    color:0x88ccff,

    transparent:true,

    opacity:0.12,

    blending:THREE.AdditiveBlending,

    side:THREE.BackSide

});

const rim = new THREE.Mesh(
    rimGeometry,
    rimMaterial
);

scene.add(rim);

// ==========================
// Aurora Glow
// ==========================

const auroraGeometry = new THREE.SphereGeometry(
1.45,
64,
64
);

const auroraMaterial = new THREE.MeshBasicMaterial({

    color:0xaa66ff,

    transparent:true,

    opacity:0.03,

    blending:THREE.AdditiveBlending,

    side:THREE.DoubleSide,

    depthWrite:false

});

const aurora = new THREE.Mesh(
    auroraGeometry,
    auroraMaterial
);

scene.add(aurora);

const energyGeometry = new THREE.TorusGeometry(
1.65,
0.015,
16,
128
);

const energyMaterial = new THREE.MeshBasicMaterial({

    color:0xaa66ff,

    transparent:true,

    opacity:0.5,

    blending:THREE.AdditiveBlending

});

const energyRing = new THREE.Mesh(
    energyGeometry,
    energyMaterial
);

energyRing.rotation.x = Math.PI / 2;

scene.add(energyRing);

const energyRing2 = new THREE.Mesh(
    energyGeometry,
    energyMaterial.clone()
);

energyRing2.scale.set(1.08,1.08,1.08);

energyRing2.rotation.x = Math.PI/2;
energyRing2.rotation.z = Math.PI/4;

scene.add(energyRing2);

const energyRing3 = new THREE.Mesh(
    energyGeometry,
    energyMaterial.clone()
);

energyRing3.scale.set(1.15,1.15,1.15);

energyRing3.rotation.x = Math.PI/2;
energyRing3.rotation.y = Math.PI/3;

scene.add(energyRing3);

// ==========================
// Magic Particles
// ==========================

const sparkGeometry = new THREE.BufferGeometry();

const sparkCount = 200;

const sparkPositions = [];

for(let i = 0; i < sparkCount; i++){

    const radius = 1.8 + Math.random() * 1.5;
    const angle = Math.random() * Math.PI * 2;

    sparkPositions.push(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 2,
        Math.sin(angle) * radius
    );

}

sparkGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(sparkPositions, 3)
);

const sparkMaterial = new THREE.PointsMaterial({

    color: 0xaaeeff,

    size: 0.08,

    transparent:true,

    opacity:0.8,

    blending:THREE.AdditiveBlending

});

const sparks = new THREE.Points(
    sparkGeometry,
    sparkMaterial
);

scene.add(sparks);

// ==========================
// Shooting Star
// ==========================

const meteorGeometry = new THREE.SphereGeometry(0.05, 16, 16);

const meteorMaterial = new THREE.MeshBasicMaterial({

    color: 0xffffff

});

const meteor = new THREE.Mesh(
    meteorGeometry,
    meteorMaterial
);

meteor.visible = false;

scene.add(meteor);

// ==========================
// Meteor Trail
// ==========================

const trailGeometry = new THREE.BufferGeometry();

const trailPositions = new Float32Array(60 * 3);

trailGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(trailPositions, 3)
);

const trailMaterial = new THREE.LineBasicMaterial({

    color: 0xffffff,

    transparent: true,

    opacity: 0.5

});

const meteorTrail = new THREE.Line(
    trailGeometry,
    trailMaterial
);

meteorTrail.visible = false;

scene.add(meteorTrail);

let meteorTimer = 0;

let meteorActive = false;

// ==========================
// Orbit Ring
// ==========================

const orbitGeometry = new THREE.RingGeometry(
3.1,
3.12,
256
);

const orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0x66ccff,
    transparent: true,
    opacity:0.28,
    side: THREE.DoubleSide
});

const orbitRing = new THREE.Mesh(
    orbitGeometry,
    orbitMaterial
);

orbitRing.rotation.x = Math.PI / 2.8;

scene.add(orbitRing);

// ==========================
// Foto Pertama
// ==========================

const photoGeometry = new THREE.PlaneGeometry(1.2, 1.2);

// ==========================
// Frame Foto
// ==========================

const frameGeometry = new THREE.PlaneGeometry(1.34, 1.50);

const frameMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
});

const glowPhotoGeometry = new THREE.CircleGeometry(0.55, 64);

const photoMaterial = new THREE.MeshBasicMaterial({
    map: photoTexture,
    transparent: true,
    opacity:1,
    side: THREE.DoubleSide
});

const glowPhotoMaterial = new THREE.MeshBasicMaterial({

    color: 0xffffff,

    transparent: true,

    opacity: 0.12,

    side: THREE.DoubleSide,

});

const photo = new THREE.Mesh(
    photoGeometry,
    photoMaterial
);

let orbitAngle = 0;

scene.add(photo);

const photoGlow = new THREE.Mesh(
    glowPhotoGeometry,
    glowPhotoMaterial.clone()
);

scene.add(photoGlow);

const photoMaterial2 = new THREE.MeshBasicMaterial({
    map: photoTexture2,
    transparent: true,
    opacity:1,
    side: THREE.DoubleSide
});

const photo2 = new THREE.Mesh(
    photoGeometry,
    photoMaterial2
);

scene.add(photo2);

const photoMaterial3 = new THREE.MeshBasicMaterial({
    map: photoTexture3,
    transparent: true,
    opacity:1,
    side: THREE.DoubleSide
});

const photo3 = new THREE.Mesh(photoGeometry, photoMaterial3);
scene.add(photo3);

const photoMaterial4 = new THREE.MeshBasicMaterial({
    map: photoTexture4,
    transparent: true,
    opacity:1,
    side: THREE.DoubleSide
});

const photo4 = new THREE.Mesh(photoGeometry, photoMaterial4);
scene.add(photo4);

const frame1 = new THREE.Mesh(frameGeometry, frameMaterial.clone());
const frame2 = new THREE.Mesh(frameGeometry, frameMaterial.clone());
const frame3 = new THREE.Mesh(frameGeometry, frameMaterial.clone());
const frame4 = new THREE.Mesh(frameGeometry, frameMaterial.clone());

scene.add(frame1);
scene.add(frame2);
scene.add(frame3);
scene.add(frame4);

// ==========================
// Glow Foto Orbit
// ==========================

const photoGlow2 = new THREE.Mesh(
    glowPhotoGeometry,
    glowPhotoMaterial.clone()
);

const photoGlow3 = new THREE.Mesh(
    glowPhotoGeometry,
    glowPhotoMaterial.clone()
);

const photoGlow4 = new THREE.Mesh(
    glowPhotoGeometry,
    glowPhotoMaterial.clone()
);


scene.add(photoGlow2);
scene.add(photoGlow3);
scene.add(photoGlow4);

// ==========================
// Bintang
// ==========================

const starsGeometry = new THREE.BufferGeometry();

const starsCount = 3000;

const positions = [];

for(let i=0;i<starsCount;i++){

positions.push(

(Math.random()-0.5)*200,

(Math.random()-0.5)*200,

(Math.random()-0.5)*200

);

}

starsGeometry.setAttribute(
'position',
new THREE.Float32BufferAttribute(
positions,
3
)
);

const starsMaterial = new THREE.PointsMaterial({

    color: 0xffffff,

    size: 0.3

});

const stars = new THREE.Points(
starsGeometry,
starsMaterial
);

scene.add(stars);

// ==========================
// LOVE HOLOGRAM 3D
// ==========================

const heartShape = new THREE.Shape();

heartShape.moveTo(0, 0);

heartShape.bezierCurveTo(
    0, 1,
    -2, 1,
    -2, -1
);

heartShape.bezierCurveTo(
    -2, -2.5,
    0, -3,
    0, -4
);

heartShape.bezierCurveTo(
    0, -3,
    2, -2.5,
    2, -1
);

heartShape.bezierCurveTo(
    2, 1,
    0, 1,
    0, 0
);


const heartGeometry =
new THREE.ExtrudeGeometry(
    heartShape,
    {
        depth: 0.4,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 5
    }
);


const heartMaterial =
new THREE.MeshBasicMaterial({

    color: 0xff3366,

    transparent: true,

    opacity: 0,

    depthWrite: false

});


const loveHologram =
new THREE.Mesh(
    heartGeometry,
    heartMaterial
);


loveHologram.scale.set(
    0.4,
    0.4,
    0.4
);


loveHologram.position.set(
    0,
    0,
    0
);


scene.add(loveHologram);

// ==========================

camera.position.z = 5;

let targetCameraZ = 5;

let endingCameraActive = false;

let cinematicTransition = false;
let cinematicProgress = 0;

let overcharge = 0;

let planetFade = 0;

let loveReveal = 0;

let whiteFlash = 0;

let cinematicCamera = 0;

let cinematicZoom = false;
let cinematicTargetZ = 2.2;

let photoFocus = false;
let normalCameraZ = 3.8;
let focusCameraZ = 2.8;

let minZoom = 3;
let maxZoom = 10;

// ==========================
// Pinch Zoom Mobile
// ==========================

let lastDistance = null;

// ==========================
// Animasi Planet
// ==========================

let targetScale = 1;
let floatTime = 0;

let photoScales = [1,1,1,1];

let photoGlowPower = [0,0,0,0];

let selectedPhotoObject = null;

let photoAura = 0;

let freezePhoto = null;

let photoDepth = 0;

let memoryFocus = false;

let memoryFloat = 0;

let photoFade = 0;

let endingGlow = 0;

let planetPulse = 0;

let finalEnding = 0;

let finalLight = 0;

let memoryExplosion = 0;

let targetPlanetPulse = 0;

let photosUnlocked = false;

// ==========================
// Open Gift Button
// ==========================

const openBtn = document.getElementById("openBtn");
const welcome = document.getElementById("welcome");
const letter = document.getElementById("letter");
const message = document.getElementById("message");
const closeMessage = document.getElementById("closeMessage");
const hearts = document.getElementById("hearts");
const photoViewer = document.getElementById("photoViewer");
const viewerImage = document.getElementById("viewerImage");
const viewerText = document.getElementById("viewerText");
const closeViewer = document.getElementById("closeViewer");
const finishMemory = document.getElementById("finishMemory");
const endingScreen = document.getElementById("endingScreen");
const memoryComplete = document.getElementById("memoryComplete");
const finalTransformBtn = document.getElementById("finalTransformBtn");

console.log("memoryComplete =", memoryComplete);
console.log("finalTransformBtn =", finalTransformBtn);
finalTransformBtn.addEventListener("click", () => {

    console.log("Memulai transisi hologram...");

    finalTransformBtn.style.display = "none";

    cinematicTransition = true;

    cinematicZoom = true;

});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const messageText = document.getElementById("messageText");
const fullMessage = `Hawooo biluuu hehehehe

Terimakasih sudah hadir dalam hidupku.

Semoga setiap langkah kamu selalu dipenuhi bahagia.

Semoga semua apa yang kamu mau bisa tercapai satu per satu.

Makasih kamu seneng atau sedih tetap menjadi diri kamu sendiri ❤️`;

const photoMessages = [
`Pesan untuk Foto 1`,

`Pesan untuk Foto 2`,

`Pesan untuk Foto 3`,

`Pesan untuk Foto 4`
];

let openedPhotos = [];

let allPhotosOpened = false;

let finalMemoryEffect = 0;

function checkAllPhotosOpened(){

    if(openedPhotos.length === 4){

        allPhotosOpened = true;

        finalEnding = 1;

finalLight = 1;

cinematicZoom = true;

memoryExplosion = 1;

        endingCameraActive = true;

cinematicCamera = 1;

        cinematicTransition = true;

        memoryComplete.classList.add("show");

        finalTransformBtn.classList.add("show");

        console.log("Semua kenangan sudah dibuka ❤️");

    }

}

openBtn.addEventListener("click", () => {

    targetScale = 1.35;

    targetCameraZ = 3.8;

    music.play();

setTimeout(()=>{

    letter.style.opacity = "1";

    letter.style.pointerEvents = "auto";

},3000);

    welcome.style.opacity = "0";

    welcome.style.transform = "translate(-50%, -50%) scale(0.8)";

    setTimeout(() => {

        welcome.style.display = "none";

    }, 500);

});

letter.addEventListener("click", () => {

    letter.style.opacity = "0";
    letter.style.pointerEvents = "none";

    message.style.opacity = "1";
    message.style.pointerEvents = "auto";
    message.style.transform = "translate(-50%, -50%) scale(1)";
    typeMessage();
const heartInterval = setInterval(createHeart, 350);

setTimeout(() => {

    clearInterval(heartInterval);

},8000);

});

// ==========================

function typeMessage(){

    let index = 0;

    messageText.innerHTML = "";

    const typing = setInterval(() => {

        if(index >= fullMessage.length){

            clearInterval(typing);

            return;

        }

        const char = fullMessage[index];

        if(char === "\n"){

            messageText.innerHTML += "<br>";

        }else{

            messageText.innerHTML += char;

        }

        index++;

    },40);

}

closeMessage.addEventListener("click", () => {

    message.style.opacity = "0";

    message.style.pointerEvents = "none";

    message.style.transform = "translate(-50%, -50%) scale(0.8)";

    photosUnlocked = true;

});

function createHeart(){

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.animationDuration = (4 + Math.random() * 3) + "s";

    heart.style.fontSize = (18 + Math.random() * 20) + "px";

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    },7000);

}

function updatePhotoFocus(){

    if(!memoryFocus){

        photoMaterial.opacity = 1;
        photoMaterial2.opacity = 1;
        photoMaterial3.opacity = 1;
        photoMaterial4.opacity = 1;

        return;

    }


    photoMaterial.opacity =
    freezePhoto === photo ? 1 : 0.35;


    photoMaterial2.opacity =
    freezePhoto === photo2 ? 1 : 0.35;


    photoMaterial3.opacity =
    freezePhoto === photo3 ? 1 : 0.35;


    photoMaterial4.opacity =
    freezePhoto === photo4 ? 1 : 0.35;

}

function animate(){

requestAnimationFrame(animate);

updatePhotoFocus();

memoryFloat += 0.03;

meteorTimer++;

if(!meteorActive && meteorTimer > 400){

    meteor.visible = true;
    meteorTrail.visible = true;
    meteorTrail.visible = false;

    meteor.position.set(

        -12,

        6 + Math.random()*4,

        -5

    );

    meteorActive = true;

    meteorTimer = 0;

}

if(meteorActive){

    meteor.position.x += 0.18;

    meteor.position.y -= 0.07;

    meteor.position.z += 0.05;

    const positions = meteorTrail.geometry.attributes.position.array;

for(let i = positions.length - 3; i >= 3; i -= 3){

    positions[i] = positions[i - 3];
    positions[i + 1] = positions[i - 2];
    positions[i + 2] = positions[i - 1];

}

positions[0] = meteor.position.x;
positions[1] = meteor.position.y;
positions[2] = meteor.position.z;

meteorTrail.geometry.attributes.position.needsUpdate = true;

    if(meteor.position.x > 12){

        meteor.visible = false;

        meteorActive = false;

    }

}

floatTime += 0.03;


// ==========================
// LOVE HOLOGRAM ANIMATION
// ==========================

loveHologram.material.opacity = 
0.85 * loveReveal;

loveHologram.rotation.y += 0.01;

loveHologram.position.y =
Math.sin(floatTime * 2) * 0.15;

planet.rotation.y += 
0.0025 + finalEnding * 0.003;

planet.rotation.x =
Math.sin(floatTime * 0.25) * 0.03;

planet.material.transparent = true;

planet.material.opacity = 1 - planetFade;

clouds.rotation.y += 0.003;

clouds.material.transparent = true;

clouds.material.opacity = 1 - planetFade;

clouds.rotation.x =
Math.sin(floatTime * 0.2) * 0.01;

orbitRing.rotation.z += 0.001;

if(freezePhoto === null){

    orbitAngle += 0.01;

}

photo.position.x = Math.cos(orbitAngle) * 3;
photo.position.z = Math.sin(orbitAngle) * 3;
photo.position.y =
    Math.sin(floatTime * 1.5 + orbitAngle) * 0.25;
    if(freezePhoto === photo){

    photo.position.y += 
    Math.sin(memoryFloat) * 0.002;

}
    if(freezePhoto === photo){

    photo.position.z += photoDepth * 0.15;

}
photoGlow.position.copy(photo.position);
photoGlow.position.z -= 0.03;
frame1.position.copy(photo.position);
frame1.lookAt(camera.position);
frame1.position.z -= 0.01;
photoGlow.lookAt(camera.position);
photoGlow.material.opacity =
0.12 +
photoGlowPower[0] * 0.18 +
endingGlow * 0.15;

photoGlowPower[0] *= 0.985;
photoAura * 0.25;
photo.rotation.z =
Math.sin(floatTime) * 0.05;

photo2.position.x = Math.cos(orbitAngle + Math.PI) * 3;
photo2.position.z = Math.sin(orbitAngle + Math.PI) * 3;
photo2.position.y =
    Math.sin(floatTime * 1.5 + orbitAngle + Math.PI) * 0.25;
    if(freezePhoto === photo2){

    photo2.position.y += 
    Math.sin(memoryFloat) * 0.002;

}
    if(freezePhoto === photo2){

    photo2.position.z += photoDepth * 0.15;

}
photoGlow2.position.copy(photo2.position);
photoGlow2.position.z -= 0.03;
frame2.position.copy(photo2.position);
frame2.lookAt(camera.position);
frame2.position.z -= 0.01;
photoGlow2.lookAt(camera.position);
photoGlow2.material.opacity =
0.12 +
photoGlowPower[1] * 0.18 +
endingGlow * 0.15;

photoGlowPower[1] *= 0.985;
photoAura * 0.25;
photo2.rotation.z =
Math.sin(floatTime + 1) * 0.05;

photo3.position.x = Math.cos(orbitAngle + Math.PI / 2) * 3;
photo3.position.z = Math.sin(orbitAngle + Math.PI / 2) * 3;
photo3.position.y =
Math.sin(floatTime * 1.5 + orbitAngle + Math.PI / 2) * 0.25;
if(freezePhoto === photo3){

    photo3.position.y += 
    Math.sin(memoryFloat) * 0.002;

}
if(freezePhoto === photo3){

    photo3.position.z += photoDepth * 0.15;

}
photoGlow3.position.copy(photo3.position);
photoGlow3.position.z -= 0.03;
frame3.position.copy(photo3.position);
frame3.lookAt(camera.position);
frame3.position.z -= 0.01;
photoGlow3.lookAt(camera.position);
photoGlow3.material.opacity =
0.12 +
photoGlowPower[2] * 0.18 +
endingGlow * 0.15;

photoGlowPower[2] *= 0.985;
photoAura * 0.25;
photo3.rotation.z =
Math.sin(floatTime + 2) * 0.05;

photo4.position.x = Math.cos(orbitAngle + Math.PI * 1.5) * 3;
photo4.position.z = Math.sin(orbitAngle + Math.PI * 1.5) * 3;
photo4.position.y =
Math.sin(floatTime * 1.5 + orbitAngle + Math.PI * 1.5) * 0.25;
if(freezePhoto === photo4){

    photo4.position.y += 
    Math.sin(memoryFloat) * 0.002;

}
if(freezePhoto === photo4){

    photo4.position.z += photoDepth * 0.15;

}
photoGlow4.position.copy(photo4.position);
photoGlow4.position.z -= 0.03;
frame4.position.copy(photo4.position);
frame4.lookAt(camera.position);
frame4.position.z -= 0.01;
photoGlow4.lookAt(camera.position);
photoGlow4.material.opacity =
0.12 +
photoGlowPower[3] * 0.18 +
endingGlow * 0.15;

photoGlowPower[3] *= 0.985;
photoAura * 0.25;
photo4.rotation.z =
Math.sin(floatTime + 3) * 0.05;

let zoomSpeed = photoFocus ? 0.05 : 0.02;

camera.position.z +=
(targetCameraZ - camera.position.z) * zoomSpeed;

if(cinematicTransition){

    cinematicProgress += 0.003;

    overcharge += (1 - overcharge) * 0.02;

    if(cinematicProgress > 0.55){

        whiteFlash += (1 - whiteFlash) * 0.04;

        if(cinematicProgress > 1.2){

            if(scene.background !== hologramBackground){

                scene.background = hologramBackground;

            }

            memoryComplete.style.opacity = 0;
            planetFade += (1 - planetFade) * 0.01;
            loveReveal += (1 - loveReveal) * 0.015;

        }

        camera.position.z +=
        (2.6 - camera.position.z) * 0.015;

    }

}

if(cinematicZoom){

    camera.position.z += 
    (cinematicTargetZ - camera.position.z) * 0.008;

}

camera.position.y += 
(Math.sin(floatTime * 0.5) * 0.15 - camera.position.y) * 0.02;

camera.lookAt(planet.position);

planet.scale.lerp(
    new THREE.Vector3(targetScale, targetScale, targetScale),
    0.03
);

planet.scale.x += Math.sin(floatTime * 4) * planetPulse * 0.003;
planet.scale.y += Math.sin(floatTime * 4) * planetPulse * 0.003;
planet.scale.z += Math.sin(floatTime * 4) * planetPulse * 0.003;

targetPlanetPulse *= 0.96;
planetPulse += (targetPlanetPulse - planetPulse) * 0.12;

atmosphere.scale.copy(planet.scale);

glow.scale.copy(planet.scale);

glow.rotation.y += 0.002;

glow.rotation.x += 0.001;

rim.rotation.y += 0.001;

atmosphere.material.opacity =
0.22 +
Math.sin(floatTime * 2) * 0.04 +
planetPulse * 0.12 +
overcharge * 0.20;

aurora.rotation.y += 0.001;

aurora.rotation.x += 0.0005;

aurora.material.opacity =
    0.03 + Math.sin(floatTime * 0.5) * 0.01;

energyRing.rotation.z += 0.002;
energyRing.rotation.x += 0.001;

energyRing2.rotation.y -= 0.003;
energyRing2.rotation.z += 0.0015;

energyRing3.rotation.x += 0.0025;
energyRing3.rotation.y += 0.001;

energyRing.material.opacity =
(
0.35 + Math.sin(floatTime * 2) * 0.12
)
*
(1 - planetFade);


energyRing2.material.opacity =
(
0.25 + Math.sin(floatTime*2+1)*0.10
)
*
(1 - planetFade);


energyRing3.material.opacity =
(
0.18 + Math.sin(floatTime*2+2)*0.08
)
*
(1 - planetFade);

const pulse = ringPulse * 0.25;

energyRing.scale.set(
    1 + Math.sin(floatTime * 2) * 0.02 + memoryExplosion * 0.5,
    1 + Math.sin(floatTime * 2) * 0.02 + memoryExplosion * 0.5,
    1 + Math.sin(floatTime * 2) * 0.02 + memoryExplosion * 0.5
);

energyRing2.scale.set(
    1.08 + Math.sin(floatTime * 2 + 1) * 0.02 + memoryExplosion * 0.5,
    1.08 + Math.sin(floatTime * 2 + 1) * 0.02 + memoryExplosion * 0.5,
    1.08 + Math.sin(floatTime * 2 + 1) * 0.02 + memoryExplosion * 0.5
);

energyRing3.scale.set(
    1.15 + Math.sin(floatTime * 2 + 2) * 0.02 + memoryExplosion * 0.5,
    1.15 + Math.sin(floatTime * 2 + 2) * 0.02 + memoryExplosion * 0.5,
    1.15 + Math.sin(floatTime * 2 + 2) * 0.02 + memoryExplosion * 0.5
);

ringPulse *= 0.92;

atmosphere.rotation.y += 0.004;

atmosphere.rotation.x =
Math.sin(floatTime * 0.2) * 0.01;

atmosphere.material.opacity =
(
0.22 +
Math.sin(floatTime * 2) * 0.04 +
planetPulse * 0.12 +
finalLight * 0.25
)
*
(1 - planetFade);

stars.rotation.y+=0.0005;

sparks.rotation.y += 0.003;

sparks.rotation.x += 0.0005;

if(memoryExplosion){

    sparks.scale.x += 0.005;
    sparks.scale.y += 0.005;
    sparks.scale.z += 0.005;

}

sparkMaterial.size =
0.06 +
Math.sin(floatTime * 3) * 0.02 +
planetPulse * 0.04;

if(allPhotosOpened){

    stars.material.opacity =
    0.8 + Math.sin(floatTime * 3) * 0.2;

}else{

    stars.material.opacity =
    0.7 + Math.sin(floatTime * 2) * 0.3;

}
stars.material.transparent = true;

photo.lookAt(camera.position);

photo2.lookAt(camera.position);
photo3.lookAt(camera.position);
photo4.lookAt(camera.position);

frame1.lookAt(camera.position);
frame2.lookAt(camera.position);
frame3.lookAt(camera.position);
frame4.lookAt(camera.position);

photoGlowPower[0] += (photoGlowPower[0] - photoGlowPower[0]) * 0;

if(allPhotosOpened){

    endingGlow += (1 - endingGlow) * 0.02;

    orbitMaterial.opacity +=
    (0.6 - orbitMaterial.opacity) * 0.02;

    atmosphereMaterial.opacity +=
    (0.45 - atmosphereMaterial.opacity) * 0.02;

    glowMaterial.opacity +=
    (0.45 - glowMaterial.opacity) * 0.02;

}

    finalLight += (1 - finalLight) * 0.015;

planetPulse += (0 - planetPulse) * 0.02;

finalLight += (1 - finalLight) * 0.02;

glow.material.opacity =
(
0.18 +
endingGlow * 0.25 +
planetPulse * 0.18 +
finalLight * 0.25 +
overcharge * 0.35
)
*
(1 - planetFade);

shockwave.position.copy(planet.position);

shockwave.scale.set(
    1 + (1 - shockPower) * 5,
    1 + (1 - shockPower) * 5,
    1
);

shockwave.material.opacity = shockPower * 0.45;

shockPower *= 0.95;

// ==========================
// Shockwave Animation
// ==========================

shockwave.position.copy(planet.position);

shockwave.lookAt(camera.position);

const shockScale = 1 + (1 - shockPower) * 6;

shockwave.scale.set(
    shockScale,
    shockScale,
    shockScale
);

shockwave.material.opacity = shockPower * 0.45;

shockPower *= 0.95;

if(shockPower < 0.01){

    shockPower = 0;

}

photoFade += 
(0 - photoFade) * 0.02;
light.intensity =
1.2 +
endingGlow * 0.8 +
whiteFlash * 2;

backLight.intensity =
1 +
endingGlow * 0.5 +
whiteFlash;

blueLight.intensity =
0.6 +
endingGlow * 0.4 +
whiteFlash;


renderer.render(scene,camera);

photo.scale.lerp(
    new THREE.Vector3(
        photoScales[0],
        photoScales[0],
        photoScales[0]
    ),
    0.05
);

photo2.scale.lerp(
    new THREE.Vector3(
        photoScales[1],
        photoScales[1],
        photoScales[1]
    ),
    0.05
);

photo3.scale.lerp(
    new THREE.Vector3(
        photoScales[2],
        photoScales[2],
        photoScales[2]
    ),
    0.05
);

photo4.scale.lerp(
    new THREE.Vector3(
        photoScales[3],
        photoScales[3],
        photoScales[3]
    ),
    0.05
);

}

animate();

// Responsive

window.addEventListener("click", (event)=>{
  
  if(!photosUnlocked){
    return;
}

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([
        photo,
        photo2,
        photo3,
        photo4
    ]);

    if(intersects.length > 0){

    const selectedPhoto = intersects[0].object;
    selectedPhotoObject = selectedPhoto;
    photoAura = 1;
    freezePhoto = selectedPhoto;
    photoDepth = 1;
    photoFade = 1;
    memoryFocus = true;

    photoFocus = true;
targetCameraZ = focusCameraZ;

    if(!openedPhotos.includes(selectedPhoto)){

    openedPhotos.push(selectedPhoto);
    if(selectedPhoto === photo){

    photoScales[0] = 1.15;

}

else if(selectedPhoto === photo2){

    photoScales[1] = 1.15;

}

else if(selectedPhoto === photo3){

    photoScales[2] = 1.15;

}

else if(selectedPhoto === photo4){

    photoScales[3] = 1.15;

}

    checkAllPhotosOpened();

if(selectedPhoto === photo){

    photoGlowPower[0] = 1;

    photoScales[0] = 1.15;

    targetScale = 1.48;

    endingGlow = 1;

}

else if(selectedPhoto === photo2){

    photoGlowPower[1] = 1;

    photoScales[1] = 1.15;

    targetScale = 1.45;

    endingGlow = 0.5;

}

else if(selectedPhoto === photo3){

    photoGlowPower[2] = 1;

    photoScales[2] = 1.15;

    targetScale = 1.45;

    endingGlow = 0.5;

}

else if(selectedPhoto === photo4){

    photoGlowPower[3] = 1;

    photoScales[3] = 1.15;

    targetScale = 1.45;

    endingGlow = 0.5;

}

}

    viewerImage.src = selectedPhoto.material.map.image.src;

    if(selectedPhoto === photo){

        viewerText.innerText = photoMessages[0];

    }else if(selectedPhoto === photo2){

        viewerText.innerText = photoMessages[1];

    }else if(selectedPhoto === photo3){

        viewerText.innerText = photoMessages[2];

    }else if(selectedPhoto === photo4){

        viewerText.innerText = photoMessages[3];

    }

    photoViewer.classList.add("show");

}

});

closeViewer.addEventListener("click", ()=>{

    photoViewer.classList.remove("show");

    photoFocus = false;
    targetCameraZ = normalCameraZ;
    photoScales = [1,1,1,1];
    photoAura = 0;
    freezePhoto = null;
    photoDepth = 0;
    photoFade = 0;
    memoryFocus = false;

});

finishMemory.addEventListener("click", ()=>{

    photoViewer.classList.remove("show");

    cinematicTransition = true;

    finalTransformBtn.classList.add("show");

});

finalTransformBtn.addEventListener("click", ()=>{

    finalTransformBtn.classList.remove("show");

    cinematicZoom = true;

});

// ==========================
// Camera Zoom Mouse
// ==========================

window.addEventListener("wheel",(event)=>{

    targetCameraZ += event.deltaY * 0.01;

    targetCameraZ = Math.max(
        minZoom,
        Math.min(maxZoom,targetCameraZ)
    );

});

// ==========================
// Touch Pinch Zoom
// ==========================

window.addEventListener("touchmove",(event)=>{

    if(event.touches.length === 2){

        const touch1 = event.touches[0];
        const touch2 = event.touches[1];


        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;


        const distance = Math.sqrt(
            dx * dx + dy * dy
        );


        if(lastDistance){

            const difference = distance - lastDistance;


            targetCameraZ -= difference * 0.01;


            targetCameraZ = Math.max(
                minZoom,
                Math.min(maxZoom,targetCameraZ)
            );

        }


        lastDistance = distance;

    }

});


window.addEventListener("touchend",()=>{

    lastDistance = null;

});

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});