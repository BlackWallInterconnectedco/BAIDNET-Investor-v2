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
// Dimensional BAIDNET globe: the concept art is a blueprint, not a flat sphere texture.
const sphereGeo = new THREE.SphereGeometry(1,96,64);
const earth = new THREE.Mesh(sphereGeo,new THREE.MeshStandardMaterial({
  color:0x030606, metalness:.68, roughness:.32
}));
world.add(earth);

const grid = new THREE.Mesh(
  new THREE.SphereGeometry(1.012,48,32),
  new THREE.MeshBasicMaterial({color:0xc89b43,wireframe:true,transparent:true,opacity:.105})
);
world.add(grid);

const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.065,64,64),
  new THREE.MeshBasicMaterial({color:0xe0aa45,transparent:true,opacity:.045,side:THREE.BackSide})
);
world.add(atmosphere);

// Extract visual regions from THEGLOBE.png and place them as separate curved panels.
// Each panel has its own geometry and sits above the Earth surface, creating real parallax.
const globeSources=['/assets/Globe%201.png','/assets/Golbe2.png'];
let globeSourceIndex=0;
const sourceArt = new Image();
sourceArt.src=globeSources[globeSourceIndex];
const panelGroup = new THREE.Group();
world.add(panelGroup);

function panelTexture(img,sx,sy,sw,sh){
  const c=document.createElement('canvas'); c.width=512; c.height=320;
  const x=c.getContext('2d');
  x.drawImage(img,sx,sy,sw,sh,0,0,c.width,c.height);
  const t=new THREE.CanvasTexture(c); t.colorSpace=THREE.SRGBColorSpace;
  t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
  return t;
}
function curvedPanel(texture,lat,lon,w=.55,h=.34,raise=1.035){
  const g=new THREE.PlaneGeometry(w,h,12,8);
  const pos=g.attributes.position;
  // Bow the panel so each photograph is physically curved rather than a flat billboard.
  for(let i=0;i<pos.count;i++){
    const x=pos.getX(i), y=pos.getY(i);
    pos.setZ(i,-(x*x+y*y)*.18);
  }
  pos.needsUpdate=true; g.computeVertexNormals();
  const m=new THREE.MeshStandardMaterial({
    map:texture,metalness:.06,roughness:.42,side:THREE.DoubleSide
  });
  const p=new THREE.Mesh(g,m);
  const phi=THREE.MathUtils.degToRad(90-lat), theta=THREE.MathUtils.degToRad(lon+180);
  const v=new THREE.Vector3(
    -raise*Math.sin(phi)*Math.cos(theta),
     raise*Math.cos(phi),
     raise*Math.sin(phi)*Math.sin(theta)
  );
  p.position.copy(v);
  p.lookAt(0,0,0); p.rotateY(Math.PI);
  panelGroup.add(p);
}
function rebuildCommunityPanels(){
  panelGroup.clear();
  const w=sourceArt.naturalWidth,h=sourceArt.naturalHeight;
  // Regions sampled from the committed globe artwork and distributed around the real 3D world.
  const crops=[
    [.31,.08,.18,.22, 52,-28,.48,.30],
    [.48,.07,.18,.23, 49, 12,.49,.31],
    [.63,.12,.17,.22, 35, 48,.46,.30],
    [.24,.29,.20,.21, 15,-48,.51,.31],
    [.61,.30,.20,.23, 12, 48,.52,.32],
    [.20,.48,.23,.20,-10,-57,.55,.31],
    [.58,.49,.22,.21,-8, 55,.54,.31],
    [.28,.64,.22,.20,-35,-35,.52,.30],
    [.46,.66,.20,.20,-42, 10,.49,.29],
    [.62,.67,.19,.18,-38, 52,.46,.28]
  ];
  crops.forEach(([x,y,cw,ch,lat,lon,pw,ph])=>{
    curvedPanel(panelTexture(sourceArt,w*x,h*y,w*cw,h*ch),lat,lon,pw,ph);
  });
}
sourceArt.onload=rebuildCommunityPanels;

// Alternate the two approved committed globe views every five seconds.
// Because the imagery is rebuilt as raised curved panels, the globe remains dimensional.
setInterval(()=>{
  globeSourceIndex=(globeSourceIndex+1)%globeSources.length;
  sourceArt.src=globeSources[globeSourceIndex];
},5000);

// Raised luminous network nodes and arcs live above both Earth and image panels.
const gold = new THREE.MeshBasicMaterial({color:0xf0bd57});
const nodes=[];
for(let i=0;i<58;i++){
 const phi=Math.acos(-1+(2*i)/58), theta=Math.sqrt(58*Math.PI)*phi;
 const p=new THREE.Vector3(Math.cos(theta)*Math.sin(phi),Math.sin(theta)*Math.sin(phi),Math.cos(phi)).multiplyScalar(1.075);
 const dot=new THREE.Mesh(new THREE.SphereGeometry(i%10===0?.019:.008,8,8),gold);
 dot.position.copy(p); world.add(dot); nodes.push(p);
}
function arc(a,b){
 const mid=a.clone().add(b).multiplyScalar(.5).normalize().multiplyScalar(1.32);
 const curve=new THREE.QuadraticBezierCurve3(a,mid,b);
 const geo=new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
 world.add(new THREE.Line(geo,new THREE.LineBasicMaterial({color:0xe2ad49,transparent:true,opacity:.42})));
}
[[2,18],[7,33],[12,46],[21,40],[4,28],[15,36],[1,31],[25,52],[9,44],[17,55]].forEach(([a,b])=>arc(nodes[a],nodes[b]));
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
