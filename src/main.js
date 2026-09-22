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
  <div class="stage" id="explore-stage">
    <div class="explore-heading" aria-hidden="true"><strong>BAIDNET</strong><span>A WORLD WITHIN A WORLD</span><small>PEOPLE &nbsp;×&nbsp; BUSINESS &nbsp;×&nbsp; COMMUNITY &nbsp;×&nbsp; GLOBAL IMPACT</small><p>A unified ecosystem where finance, community, and opportunity<br>empower people to build generational wealth.</p></div>
    <button class="globe-trigger" id="globe-trigger" type="button" aria-expanded="false" aria-controls="explore-cards" aria-label="Explore BAIDNET sections"><canvas id="globe"></canvas><span class="globe-cta">EXPLORE BAIDNET <b>+</b></span></button><div class="glow"></div>
    <div class="explore-cards" id="explore-cards" aria-hidden="true">
      <a class="explore-card card-bsean" href="#bsean-page"><img src="/assets/BSEAN.png" alt=""><span>BSEAN<small>Start · Grow · Scale</small></span></a>
      <a class="explore-card card-membership" href="#membership-page"><img src="/assets/MEMBERSHIP.png" alt=""><span>Membership<small>Access · Benefits · Belong</small></span></a>
      <a class="explore-card card-businesses" href="#businesses"><img src="/assets/BUSINESSES.png" alt=""><span>Businesses<small>List · Partner · Thrive</small></span></a>
      <a class="explore-card card-investors" href="#partners"><img src="/assets/INVESTORS%20AND%20PARTNERS.png" alt=""><span>Investors & Partners<small>Fund · Collaborate · Expand</small></span></a>
      <a class="explore-card card-communities" href="#communities-page"><img src="/assets/COMMUNITIES.png" alt=""><span>Communities<small>Support · Empower · Sustain</small></span></a>
    </div>
    <div class="hud hud-a"><i></i><span>COMMUNITY NODE</span></div>
    <div class="hud hud-b"><i></i><span>BUSINESS NODE</span></div>

  </div>
  <div class="scroll">SCROLL TO ENTER <span>↓</span></div>
</section>

<section class="section-page" id="bsean-page"><p class="eyebrow">BSEAN</p><h2>Black and Sustainable Entrepreneur Alliance Network</h2><p>Explore the business-side network where participating entrepreneurs create member experiences, connect resources and grow within the BAIDNET ecosystem.</p><a class="pill" href="#home">Back to globe ↑</a></section>
<section class="section-page" id="membership-page"><p class="eyebrow">MEMBERSHIP</p><h2>Your access point to the BAIDNET ecosystem.</h2><p>Discover how membership connects financial access, the BDC wallet and participating member experiences across the network.</p><a class="pill" href="#home">Back to globe ↑</a></section>
<section class="section-page" id="communities-page"><p class="eyebrow">COMMUNITIES</p><h2>Build wealth. Strengthen communities. Create legacy.</h2><p>Explore how participation across consumers, businesses and partners is designed to create a stronger interconnected community economy.</p><a class="pill" href="#home">Back to globe ↑</a></section>

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
// Hero globe: preserve the approved committed globe artwork visually.
// Each approved render is shown intact as a spherical front-facing layer, while a
// transparent 3D shell supplies rotation, rim depth, network motion and lighting.
const globeSources=['/assets/Globe%201.png','/assets/Golbe2.png'];
let globeSourceIndex=0;

const globeFaceCanvas=document.createElement('canvas');
globeFaceCanvas.width=globeFaceCanvas.height=1024;
const faceCtx=globeFaceCanvas.getContext('2d');
const faceTexture=new THREE.CanvasTexture(globeFaceCanvas);
faceTexture.colorSpace=THREE.SRGBColorSpace;
faceTexture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());

const globeFace=new THREE.Mesh(
  new THREE.CircleGeometry(.995,128),
  new THREE.MeshBasicMaterial({map:faceTexture,transparent:true,side:THREE.DoubleSide,depthWrite:true})
);
globeFace.position.z=.035;
world.add(globeFace);

const sourceArt=new Image();
sourceArt.onload=()=>{
  const w=sourceArt.naturalWidth,h=sourceArt.naturalHeight;
  // Both committed renders are square and already contain the exact approved globe.
  // Crop only the black margin while keeping the complete globe composition unchanged.
  const side=Math.min(w,h);
  // Globe 1 is the Africa view. Its source render contains slightly more outer margin
  // than the America view, so crop it tighter so both globes occupy the same diameter.
  const africaView=globeSourceIndex===0;
  const cropScale=africaView ? .91 : 1;
  const cropSide=side*cropScale;
  const sx=(w-cropSide)/2, sy=(h-cropSide)/2;
  faceCtx.clearRect(0,0,1024,1024);
  faceCtx.save();
  faceCtx.beginPath();
  faceCtx.arc(512,512,505,0,Math.PI*2);
  faceCtx.clip();
  faceCtx.drawImage(sourceArt,sx,sy,cropSide,cropSide,0,0,1024,1024);
  faceCtx.restore();
  faceTexture.needsUpdate=true;
};
sourceArt.src=globeSources[0];

const shell=new THREE.Mesh(
  new THREE.SphereGeometry(1.015,96,64),
  new THREE.MeshPhysicalMaterial({
    color:0xffffff,transparent:true,opacity:.055,roughness:.12,metalness:.05,
    clearcoat:1,clearcoatRoughness:.08,side:THREE.DoubleSide,depthWrite:false
  })
);
world.add(shell);

const atmosphere=new THREE.Mesh(
  new THREE.SphereGeometry(1.075,64,64),
  new THREE.MeshBasicMaterial({color:0xf0b64f,transparent:true,opacity:.055,side:THREE.BackSide,depthWrite:false})
);
world.add(atmosphere);

// A restrained orbital layer echoes the approved renders without covering their photography.
const orbital=new THREE.Group();
world.add(orbital);
const nodeMat=new THREE.MeshBasicMaterial({color:0xffc65a});
const orbitPts=[];
for(let i=0;i<22;i++){
 const phi=Math.acos(-1+(2*i)/22),theta=Math.sqrt(22*Math.PI)*phi;
 const p=new THREE.Vector3(Math.cos(theta)*Math.sin(phi),Math.sin(theta)*Math.sin(phi),Math.cos(phi)).multiplyScalar(1.09);
 const dot=new THREE.Mesh(new THREE.SphereGeometry(i%6===0?.015:.006,8,8),nodeMat);
 dot.position.copy(p); orbital.add(dot); orbitPts.push(p);
}
function orbitArc(a,b){
 const mid=a.clone().add(b).multiplyScalar(.5).normalize().multiplyScalar(1.24);
 const curve=new THREE.QuadraticBezierCurve3(a,mid,b);
 orbital.add(new THREE.Line(
   new THREE.BufferGeometry().setFromPoints(curve.getPoints(32)),
   new THREE.LineBasicMaterial({color:0xf0b34d,transparent:true,opacity:.24})
 ));
}
[[1,8],[3,14],[5,18],[7,20],[2,16]].forEach(([a,b])=>orbitArc(orbitPts[a],orbitPts[b]));

setInterval(()=>{
  globeSourceIndex=(globeSourceIndex+1)%globeSources.length;
  sourceArt.src=globeSources[globeSourceIndex];
},5000);
const starsGeo=new THREE.BufferGeometry(), positions=[];
for(let i=0;i<320;i++){positions.push((Math.random()-.5)*9,(Math.random()-.5)*7,(Math.random()-.5)*5-1)}
starsGeo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
scene.add(new THREE.Points(starsGeo,new THREE.PointsMaterial({color:0xb99a5b,size:.008,transparent:true,opacity:.5})));
const key=new THREE.DirectionalLight(0xffd47c,4.5);key.position.set(-2,2.5,3);scene.add(key);
const rim=new THREE.PointLight(0x8d6a2d,8,7);rim.position.set(2,-1,2);scene.add(rim,new THREE.AmbientLight(0x3d3525,1.15));

function size(){
 const p=canvas.parentElement;
 const w=p.clientWidth,h=p.clientHeight;
 renderer.setSize(w,h,false);
 camera.aspect=w/h;
 camera.updateProjectionMatrix();
}
addEventListener('resize',size);size();
let mx=0,my=0,scrollY=0;
addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5)*.28;my=(e.clientY/innerHeight-.5)*.18},{passive:true});
addEventListener('scroll',()=>scrollY=window.scrollY,{passive:true});
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function animate(){
 if(!reduce){
   shell.rotation.y+=.00125; orbital.rotation.y+=.0014;
   world.rotation.x+=(my-world.rotation.x)*.018;
   world.rotation.z+=(mx-world.rotation.z)*.018;
   camera.position.z=3.35+Math.min(scrollY/innerHeight,.7)*.28
 }
 const rt=performance.now()*.001;
 renderer.render(scene,camera);requestAnimationFrame(animate)
} animate();

const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.paths article,.manifesto,.economy-copy,.orbit-system,.platform,.closing').forEach(el=>reveal.observe(el));


const globeTrigger=document.querySelector('#globe-trigger');
const exploreStage=document.querySelector('#explore-stage');
const exploreCards=document.querySelector('#explore-cards');
function setExplore(open){
  exploreStage.classList.toggle('explore-open',open);
  document.querySelector('.hero').classList.toggle('hero-explore-open',open);
  globeTrigger.setAttribute('aria-expanded',String(open));
  exploreCards.setAttribute('aria-hidden',String(!open));
  requestAnimationFrame(()=>requestAnimationFrame(size));
}
globeTrigger.addEventListener('click',()=>setExplore(!exploreStage.classList.contains('explore-open')));
document.querySelectorAll('.explore-card').forEach(card=>card.addEventListener('click',()=>setExplore(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')setExplore(false)});
