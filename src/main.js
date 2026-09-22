import * as THREE from 'three';
import './styles.css';

document.querySelector('#app').innerHTML = `
<header class="nav">
  <a class="brand" href="#home"><b>B</b><span>BAIDNET<small>A WORLD WITHIN A WORLD</small></span></a>
  <nav><a href="#consumers">Consumers</a><a href="#businesses">Businesses</a><a href="#economy">The Economy</a><a href="#partners">Investors & Partners</a></nav>
  <a class="pill" href="#paths">Explore BAIDNET</a>
</header>
<main>
<section class="hero" id="home">
  <div class="hero-grid" aria-hidden="true"></div>
  <div class="copy">
    <p class="eyebrow">BLACKWALL INTERCONNECTED</p>
    <h1>A WORLD<br>WITHIN A <em>WORLD.</em></h1>
    <p class="lede">Finance. Community. Opportunity. One interconnected ecosystem where people access financial tools, businesses create member experiences, and value circulates through a community-powered economy.</p>
    <div class="actions"><a class="pill filled" href="#paths">Explore BAIDNET</a><a class="ghost-link" href="#economy">Watch the network come alive <span>↗</span></a></div>
    <div class="hero-stats"><div><strong>FIAT</strong><span>Access layer</span></div><div><strong>BDC</strong><span>Network utility</span></div><div><strong>BSEAN</strong><span>Business network</span></div></div>
  </div>
  <div class="stage">
    <canvas id="globe"></canvas><div class="glow"></div>
    <div class="hud hud-a"><i></i><span>COMMUNITY NODE</span></div>
    <div class="hud hud-b"><i></i><span>BUSINESS NODE</span></div>

  </div>
  <div class="scroll">SCROLL TO ENTER <span>↓</span></div>
</section>

<section class="manifesto" id="story"><p class="eyebrow">ONE INTERCONNECTED ECOSYSTEM</p><h2>Built for the people who <em>power the network.</em></h2><p>BAIDNET connects conventional financial access with a blockchain-powered network economy while keeping the experience understandable, useful and grounded in real participation.</p></section>

<section class="paths" id="paths">
  <article id="consumers"><small>01 / CONSUMERS</small><div class="icon">◉</div><h2>Your account. Your wallet.<br>Your community.</h2><p>Enter through BAIDNET, access your fiat-facing financial tools and BDC wallet, then discover participating businesses and member experiences.</p><a href="#economy">Experience BAIDNET →</a></article>
  <article id="businesses"><small>02 / BUSINESSES</small><div class="icon">◇</div><h2>Build experiences.<br>Grow together.</h2><p>BSEAN gives participating businesses infrastructure to create their own memberships, offers and designated BDC experiences.</p><a href="#economy">Explore Be Seen →</a></article>
  <article id="partners"><small>03 / INVESTORS & PARTNERS</small><div class="icon">⌁</div><h2>See what we're<br>building.</h2><p>Explore the platform, commercial model, readiness, proof and long-term opportunity behind the ecosystem.</p><a href="#platform">View the opportunity →</a></article>
</section>

<section class="economy" id="economy">
 <div class="economy-copy"><p class="eyebrow">THE NETWORK ECONOMY</p><h2>Value doesn't stop.<br><em>It circulates.</em></h2><p>Fiat establishes access. BDC enables designated economic participation across the network.</p></div>
 <div class="orbit-system" aria-label="BAIDNET value circulation model">
   <div class="ring r1"></div><div class="ring r2"></div><div class="core"><b>BDC</b><span>NETWORK<br>UTILITY</span></div>
   <div class="node n1"><b>01</b><span>CONSUMER</span></div><div class="node n2"><b>02</b><span>BUSINESS</span></div><div class="node n3"><b>03</b><span>VENDOR</span></div><div class="node n4"><b>04</b><span>NETWORK</span></div>
 </div>
</section>

<section class="platform" id="platform">
 <p class="eyebrow">THE PLATFORM</p><h2>Two financial worlds.<br><em>One connected experience.</em></h2>
 <div class="platform-grid"><div><small>FIAT LAYER</small><strong>Access & conventional finance</strong><p>Account access, qualifying balances, memberships and conventional financial activity.</p></div><div><small>BDC LAYER</small><strong>Designated network economy</strong><p>Member experiences, participating commerce and designated B2B activity across the ecosystem.</p></div></div>
</section>

<section class="closing"><p class="eyebrow">BLACKWALL INTERCONNECTED</p><h2>Finance. Community.<br><em>Opportunity.</em></h2><p>A stronger network creates greater opportunity.</p><a class="pill filled" href="#home">Enter BAIDNET</a></section>
</main>
`;

const canvas = document.querySelector('#globe');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, 1, .1, 100);
camera.position.z = 3.35;
const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true, powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const world = new THREE.Group();
scene.add(world);
// Use THEGLOBE.png as the actual surface texture of the 3D sphere.
// The uploaded source contains the globe centered in a wide concept image, so first
// extract that globe region into an equirectangular texture canvas, then map it to
// SphereGeometry. The mesh itself now rotates in true 3D rather than showing a flat disc.
const textureCanvas = document.createElement('canvas');
textureCanvas.width = 2048;
textureCanvas.height = 1024;
const textureCtx = textureCanvas.getContext('2d');
const globeTexture = new THREE.CanvasTexture(textureCanvas);
globeTexture.colorSpace = THREE.SRGBColorSpace;
globeTexture.wrapS = THREE.RepeatWrapping;
globeTexture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

const globeArt = new Image();
globeArt.src = '/assets/THEGLOBE.png';
globeArt.onload = () => {
  const w = globeArt.naturalWidth, h = globeArt.naturalHeight;
  // Crop the central globe only. These ratios match the approved THEGLOBE concept asset.
  const cropSize = Math.min(h * .91, w * .58);
  const sx = w * .5 - cropSize * .5;
  const sy = h * .5 - cropSize * .5;
  // Stretch the isolated globe artwork across an equirectangular map so it wraps
  // completely around the physical sphere instead of sitting in front of it.
  textureCtx.clearRect(0,0,2048,1024);
  textureCtx.drawImage(globeArt,sx,sy,cropSize,cropSize,0,0,2048,1024);
  globeTexture.needsUpdate = true;
};

const globe = new THREE.Mesh(
  new THREE.SphereGeometry(1,96,64),
  new THREE.MeshStandardMaterial({
    map: globeTexture,
    color: 0xffffff,
    metalness: .08,
    roughness: .38,
    emissive: 0x1b1003,
    emissiveIntensity: .14
  })
);
globe.rotation.y = -.2;
world.add(globe);
const grid = new THREE.Mesh(new THREE.SphereGeometry(1.012,40,28),new THREE.MeshBasicMaterial({color:0xc89b43,wireframe:true,transparent:true,opacity:.12}));
world.add(grid);
const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.055,64,64),new THREE.MeshBasicMaterial({color:0xd5a447,transparent:true,opacity:.035,side:THREE.BackSide}));
world.add(atmosphere);

const gold = new THREE.MeshBasicMaterial({color:0xe0b65c});
const nodes = [];
for(let i=0;i<48;i++){
 const phi=Math.acos(-1+(2*i)/48), theta=Math.sqrt(48*Math.PI)*phi;
 const p=new THREE.Vector3(Math.cos(theta)*Math.sin(phi),Math.sin(theta)*Math.sin(phi),Math.cos(phi)).multiplyScalar(1.025);
 const dot=new THREE.Mesh(new THREE.SphereGeometry(i%9===0?.018:.009,8,8),gold); dot.position.copy(p); world.add(dot); nodes.push(p);
}
function arc(a,b){
 const mid=a.clone().add(b).multiplyScalar(.5).normalize().multiplyScalar(1.35);
 const curve=new THREE.QuadraticBezierCurve3(a.clone().multiplyScalar(1.01),mid,b.clone().multiplyScalar(1.01));
 const geo=new THREE.BufferGeometry().setFromPoints(curve.getPoints(36));
 const line=new THREE.Line(geo,new THREE.LineBasicMaterial({color:0xd6a94d,transparent:true,opacity:.32}));
 world.add(line);
}
[[2,17],[7,31],[11,42],[20,38],[4,26],[14,34],[1,29],[23,45]].forEach(([a,b])=>arc(nodes[a],nodes[b]));

const starsGeo=new THREE.BufferGeometry(), positions=[];
for(let i=0;i<320;i++){positions.push((Math.random()-.5)*9,(Math.random()-.5)*7,(Math.random()-.5)*5-1)}
starsGeo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
scene.add(new THREE.Points(starsGeo,new THREE.PointsMaterial({color:0xb99a5b,size:.008,transparent:true,opacity:.5})));
const key=new THREE.DirectionalLight(0xffd47c,4.5);key.position.set(-2,2.5,3);scene.add(key);
const rim=new THREE.PointLight(0x8d6a2d,8,7);rim.position.set(2,-1,2);scene.add(rim,new THREE.AmbientLight(0x3d3525,1.15));

function size(){const p=canvas.parentElement,w=p.clientWidth,h=p.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
addEventListener('resize',size);size();
let mx=0,my=0,scrollY=0;
addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5)*.28;my=(e.clientY/innerHeight-.5)*.18},{passive:true});
addEventListener('scroll',()=>scrollY=window.scrollY,{passive:true});
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function animate(){
 if(!reduce){world.rotation.y+=.00125;world.rotation.x+=(my-world.rotation.x)*.018;world.rotation.z+=(mx-world.rotation.z)*.018;camera.position.z=3.35+Math.min(scrollY/innerHeight,.7)*.28}
 renderer.render(scene,camera);requestAnimationFrame(animate)
} animate();

const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.paths article,.manifesto,.economy-copy,.orbit-system,.platform,.closing').forEach(el=>reveal.observe(el));
