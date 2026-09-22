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
    <div class="explore-heading" aria-hidden="true"><strong>BAIDNET</strong><span>A WORLD WITHIN A WORLD</span><small>PEOPLE &nbsp;×&nbsp; BUSINESS &nbsp;×&nbsp; COMMUNITY &nbsp;×&nbsp; GLOBAL IMPACT</small><p>A unified ecosystem where finance, community, and opportunity<br>empower people to build generational wealth.</p><button class="explore-heading-button" type="button" tabindex="-1">Explore BAIDNET <b>→</b></button></div>
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

<section class="section-page bsean-section" id="bsean-page">
  <div class="bsean-info-card">
    <p class="eyebrow">BSEAN</p>
    <h2>Black and Sustainable Entrepreneur Alliance Network</h2>
    <p>BSEAN is BAIDNET’s business participation network—built for entrepreneurs and businesses to create their own member experiences, connect with customers, vendors and service providers, and participate in a community-powered economy.</p>
    <p>Businesses maintain control of their own offers and membership programs while BAIDNET provides the infrastructure that connects access, participation and designated BDC utility across the network.</p>
    <div class="bsean-points"><span>START</span><span>GROW</span><span>SCALE</span></div>
    <a class="pill" href="#home">Back to globe ↑</a>
  </div>
  <aside class="community-invite-card">
    <p class="eyebrow">BUILD WITH US</p>
    <h3>Contribute to community building.</h3>
    <p>Support the continued development of BlackWall-Interconnected Co., BAIDNET and the community infrastructure connecting people, businesses and opportunity.</p>
    <div class="cashapp-block">
      <div><small>BLACKWALL-INTERCONNECTED CO.</small><strong>Community Contribution</strong><span>Scan the Cash App QR code to contribute.</span></div>
      <img src="data:image/png;base64,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" alt="Cash App QR code for BlackWall-Interconnected Co. contributions">
    </div>
    <div class="preregister">
      <h4>Stay connected to what we're building.</h4>
      <p>Pre-register for updates on emerging BWICO + BAIDNET developments.</p>
      <form id="bsean-preregister">
        <label>Email<input type="email" name="email" autocomplete="email" required placeholder="you@example.com"></label>
        <label>Phone<input type="tel" name="phone" autocomplete="tel" placeholder="(000) 000-0000"></label>
        <label class="consent"><input type="checkbox" name="updates" required><span>I want to receive BWICO + BAIDNET development updates.</span></label>
        <button class="pill filled" type="submit">Pre-register</button>
        <p class="form-status" aria-live="polite"></p>
      </form>
    </div>
  </aside>
</section>
<section class="section-page membership-experience" id="membership-page">
  <div class="membership-intro">
    <p class="eyebrow">MEMBERSHIP</p>
    <h2>Two ways to participate.<br><em>One interconnected economy.</em></h2>
    <p>Move across the experience to explore how consumers and businesses participate in BAIDNET.</p>
  </div>
  <div class="membership-split" aria-label="BAIDNET consumer and business membership">
    <article class="member-panel consumer-member" tabindex="0">
      <div class="member-art"><img src="/assets/BAIDNET%20Business%20Model06.png" alt="BAIDNET consumer membership experience"></div>
      <div class="member-panel-shade"></div>
      <div class="member-panel-copy">
        <span class="member-number">01</span><p class="eyebrow">CONSUMER MEMBERS</p>
        <h3>Access. Participate.<br>Belong.</h3>
        <p>Open a BAIDNET account with a qualifying fiat balance, receive the initial BDC allocation, and access participating businesses and member experiences.</p>
        <div class="member-tags"><span>FIAT ACCESS</span><span>BDC WALLET</span><span>MEMBER EXPERIENCES</span></div>
      </div>
      <span class="member-explore">EXPLORE <b>↗</b></span>
    </article>
    <article class="member-panel business-member" tabindex="0">
      <div class="member-art"><img src="/assets/BAIDNET%20Business%20Model08.png" alt="BAIDNET business membership experience"></div>
      <div class="member-panel-shade"></div>
      <div class="member-panel-copy">
        <span class="member-number">02</span><p class="eyebrow">BUSINESS MEMBERS</p>
        <h3>Create. Connect.<br>Grow.</h3>
        <p>Participate through BSEAN, create your own membership experiences, accept BDC for designated products and services, and connect with an engaged network.</p>
        <div class="member-tags"><span>BSEAN</span><span>B2C + B2B</span><span>NETWORK GROWTH</span></div>
      </div>
      <span class="member-explore">EXPLORE <b>↗</b></span>
    </article>
  </div>
  <div class="membership-story" aria-label="BAIDNET business model highlights">
    <div class="membership-story-heading">
      <p class="eyebrow">WHY BAIDNET</p>
      <h3>See the model behind the membership.</h3>
      <p>Explore the problems BAIDNET is designed to address, the connected solution, and the advantages of a community-powered financial ecosystem.</p>
    </div>
    <div class="membership-story-grid">
      <button class="story-card" type="button" data-story-image="/assets/BAIDNET%20Business%20Model01.png" data-story-label="BUSINESS MODEL 01">
        <img src="/assets/BAIDNET%20Business%20Model01.png" alt="BAIDNET Business Model 01">
        <span><small>01 / BUSINESS MODEL</small><strong>Introducing BAIDNET</strong><b>View full card ↗</b></span>
      </button>
      <button class="story-card" type="button" data-story-image="/assets/BAIDNET%20Business%20Model02.png" data-story-label="BUSINESS MODEL 02">
        <img src="/assets/BAIDNET%20Business%20Model02.png" alt="BAIDNET Business Model 02">
        <span><small>02 / BUSINESS MODEL</small><strong>The Opportunity</strong><b>View full card ↗</b></span>
      </button>
      <button class="story-card" type="button" data-story-image="/assets/BAIDNET%20Business%20Model03.png" data-story-label="BUSINESS MODEL 03">
        <img src="/assets/BAIDNET%20Business%20Model03.png" alt="BAIDNET Business Model 03">
        <span><small>03 / BUSINESS MODEL</small><strong>The Problem</strong><b>View full card ↗</b></span>
      </button>
      <button class="story-card" type="button" data-story-image="/assets/BAIDNET%20Business%20Model04.png" data-story-label="BUSINESS MODEL 04">
        <img src="/assets/BAIDNET%20Business%20Model04.png" alt="BAIDNET Business Model 04">
        <span><small>04 / BUSINESS MODEL</small><strong>The Solution</strong><b>View full card ↗</b></span>
      </button>
      <button class="story-card" type="button" data-story-image="/assets/BAIDNET%20Business%20Model05.png" data-story-label="BUSINESS MODEL 05">
        <img src="/assets/BAIDNET%20Business%20Model05.png" alt="BAIDNET Business Model 05">
        <span><small>05 / BUSINESS MODEL</small><strong>How BAIDNET Works</strong><b>View full card ↗</b></span>
      </button>
      <button class="story-card" type="button" data-story-image="/assets/BAIDNET%20Business%20Model06.png" data-story-label="BUSINESS MODEL 06">
        <img src="/assets/BAIDNET%20Business%20Model06.png" alt="BAIDNET Business Model 06">
        <span><small>06 / BUSINESS MODEL</small><strong>Consumer Membership</strong><b>View full card ↗</b></span>
      </button>
      <button class="story-card" type="button" data-story-image="/assets/BAIDNET%20Business%20Model07.png" data-story-label="BUSINESS MODEL 07">
        <img src="/assets/BAIDNET%20Business%20Model07.png" alt="BAIDNET Business Model 07">
        <span><small>07 / BUSINESS MODEL</small><strong>The Community Economy</strong><b>View full card ↗</b></span>
      </button>
      <button class="story-card" type="button" data-story-image="/assets/BAIDNET%20Business%20Model08.png" data-story-label="BUSINESS MODEL 08">
        <img src="/assets/BAIDNET%20Business%20Model08.png" alt="BAIDNET Business Model 08">
        <span><small>08 / BUSINESS MODEL</small><strong>Business Membership</strong><b>View full card ↗</b></span>
      </button>
      <button class="story-card" type="button" data-story-image="/assets/BAIDNET%20Business%20Model09.png" data-story-label="BUSINESS MODEL 09">
        <img src="/assets/BAIDNET%20Business%20Model09.png" alt="BAIDNET Business Model 09">
        <span><small>09 / BUSINESS MODEL</small><strong>Network Advantages</strong><b>View full card ↗</b></span>
      </button>
      <button class="story-card" type="button" data-story-image="/assets/BAIDNET%20Business%20Model10.png" data-story-label="BUSINESS MODEL 10">
        <img src="/assets/BAIDNET%20Business%20Model10.png" alt="BAIDNET Business Model 10">
        <span><small>10 / BUSINESS MODEL</small><strong>BDC Utility</strong><b>View full card ↗</b></span>
      </button>
      <button class="story-card" type="button" data-story-image="/assets/BAIDNET%20Business%20Model11.png" data-story-label="BUSINESS MODEL 11">
        <img src="/assets/BAIDNET%20Business%20Model11.png" alt="BAIDNET Business Model 11">
        <span><small>11 / BUSINESS MODEL</small><strong>Business-to-Business Economy</strong><b>View full card ↗</b></span>
      </button>
      <button class="story-card" type="button" data-story-image="/assets/BAIDNET%20Business%20Model12.png" data-story-label="BUSINESS MODEL 12">
        <img src="/assets/BAIDNET%20Business%20Model12.png" alt="BAIDNET Business Model 12">
        <span><small>12 / BUSINESS MODEL</small><strong>Revenue Model</strong><b>View full card ↗</b></span>
      </button>
      <button class="story-card" type="button" data-story-image="/assets/BAIDNET%20Business%20Model13.png" data-story-label="BUSINESS MODEL 13">
        <img src="/assets/BAIDNET%20Business%20Model13.png" alt="BAIDNET Business Model 13">
        <span><small>13 / BUSINESS MODEL</small><strong>Community Impact</strong><b>View full card ↗</b></span>
      </button>
      <button class="story-card" type="button" data-story-image="/assets/BAIDNET%20Business%20Model14.png" data-story-label="BUSINESS MODEL 14">
        <img src="/assets/BAIDNET%20Business%20Model14.png" alt="BAIDNET Business Model 14">
        <span><small>14 / BUSINESS MODEL</small><strong>Growth & Scale</strong><b>View full card ↗</b></span>
      </button>
      <button class="story-card" type="button" data-story-image="/assets/BAIDNET%20Business%20Model15.png" data-story-label="BUSINESS MODEL 15">
        <img src="/assets/BAIDNET%20Business%20Model15.png" alt="BAIDNET Business Model 15">
        <span><small>15 / BUSINESS MODEL</small><strong>The BAIDNET Vision</strong><b>View full card ↗</b></span>
      </button>
    </div>
  </div>
  <a class="pill membership-back" href="#home">Back to globe ↑</a>
  <div class="member-modal" id="member-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Expanded membership card">
    <button class="member-modal-close" type="button" aria-label="Close expanded membership card">×</button>
    <div class="member-modal-card"></div>
  </div>
</section>
<section class="section-page communities-experience" id="communities-page"><div class="communities-intro"><p class="eyebrow">COMMUNITIES</p><h2>Build wealth. Strengthen communities. Create legacy.</h2><p>Businesses join BAIDNET and use the provided business membership creation process to design their own custom memberships. Each business sets its membership price in dollars and defines its services and experiences. BAIDNET member consumers choose the memberships that match their desired experiences, join and support those businesses, and use BAIDCoin for designated services and experiences inside the network.</p></div><div class="community-flow"><span>1 · BUSINESS JOINS</span><span>→</span><span>2 · CREATES MEMBERSHIP</span><span>→</span><span>3 · SETS DOLLAR PRICE</span><span>→</span><span>4 · MEMBERS JOIN</span><span>→</span><span>5 · ACCESS WITH BAIDCOIN</span></div><div class="community-card-grid"><button class="community-card" type="button" data-title="Homes" data-image="/assets/Homes.png" data-description="Homeownership and neighborhood businesses can create memberships around housing-related services, access, education and community experiences."><img src="/assets/Homes.png" alt="Homes"><span><small>01 / COMMUNITY EXPERIENCE</small><strong>Homes</strong><b>Explore experience ↗</b></span></button><button class="community-card" type="button" data-title="Wealth" data-image="/assets/Wealth.png" data-description="Financial and professional businesses can create memberships around education, planning, tools and member services."><img src="/assets/Wealth.png" alt="Wealth"><span><small>02 / COMMUNITY EXPERIENCE</small><strong>Wealth</strong><b>Explore experience ↗</b></span></button><button class="community-card" type="button" data-title="Shop" data-image="/assets/Shop.png" data-description="Retailers and brands can create memberships around exclusive products, releases, services and member experiences."><img src="/assets/Shop.png" alt="Shop"><span><small>03 / COMMUNITY EXPERIENCE</small><strong>Shop</strong><b>Explore experience ↗</b></span></button><button class="community-card" type="button" data-title="Innovation" data-image="/assets/INNOVATION.png" data-description="Creators, builders and technology businesses can create memberships around labs, workshops, tools, collaboration and innovation experiences."><img src="/assets/INNOVATION.png" alt="Innovation"><span><small>04 / COMMUNITY EXPERIENCE</small><strong>Innovation</strong><b>Explore experience ↗</b></span></button><button class="community-card" type="button" data-title="Education" data-image="/assets/Education.png" data-description="Educators and training providers can create memberships for courses, skills, mentorship, workshops and community learning."><img src="/assets/Education.png" alt="Education"><span><small>05 / COMMUNITY EXPERIENCE</small><strong>Education</strong><b>Explore experience ↗</b></span></button><button class="community-card" type="button" data-title="Health & Wellness" data-image="/assets/HEALTH&WELLNESS.png" data-description="Health and wellness businesses can create memberships around eligible wellness services, education, fitness, nutrition and community programs."><img src="/assets/HEALTH&WELLNESS.png" alt="Health & Wellness"><span><small>06 / COMMUNITY EXPERIENCE</small><strong>Health & Wellness</strong><b>Explore experience ↗</b></span></button><button class="community-card" type="button" data-title="Food & Culture" data-image="/assets/Food%20%26%20Culture.png" data-description="Restaurants, food brands and cultural businesses can create memberships for dining, tastings, events, special access and community programming."><img src="/assets/Food%20%26%20Culture.png" alt="Food & Culture"><span><small>07 / COMMUNITY EXPERIENCE</small><strong>Food & Culture</strong><b>Explore experience ↗</b></span></button><button class="community-card" type="button" data-title="Arts & Entertainment" data-image="/assets/Art%20%26%20Entertainment.png" data-description="Artists, galleries, venues, media and entertainment businesses can create memberships for events, content, exhibitions, performances and cultural experiences."><img src="/assets/Art%20%26%20Entertainment.png" alt="Arts & Entertainment"><span><small>08 / COMMUNITY EXPERIENCE</small><strong>Arts & Entertainment</strong><b>Explore experience ↗</b></span></button><button class="community-card" type="button" data-title="BAIDNET Business Growth Center" data-image="/assets/Business%20Growth.png" data-description="For the growth and support of member businesses. A support environment connecting participating businesses with mentorship, business tools, education, strategic relationships, market opportunities and growth resources."><img src="/assets/Business%20Growth.png" alt="BAIDNET Business Growth Center"><span><small>09 / COMMUNITY EXPERIENCE</small><strong>BAIDNET Business Growth Center</strong><b>Explore experience ↗</b></span></button></div><a class="pill communities-back" href="#home">Back to globe ↑</a><div class="community-modal" id="community-modal" aria-hidden="true" role="dialog" aria-modal="true"><button class="community-modal-close" type="button" aria-label="Close">×</button><div class="community-modal-visual"><img alt=""></div><div class="community-modal-copy"><p class="eyebrow">COMMUNITY EXPERIENCE</p><h3></h3><p class="community-modal-description"></p><div class="community-modal-model"><strong>How participation works</strong><p>The business creates and controls its own membership and sets the membership price in dollars. BAIDNET members choose whether to join. Once enrolled, designated services and experiences can be accessed with BAIDCoin according to that business membership.</p></div></div></div></section>

<section class="ecosystem-showcase" id="paths">
  <div class="ecosystem-showcase-inner">
    <aside class="ecosystem-showcase-copy">
      <p class="eyebrow">THE BAIDNET PRODUCT SHINES</p>
      <h2>ONE<br><em>INTERCONNECTED</em><br>ECOSYSTEM</h2>
      <h3>Built for the people who <i>power the network.</i></h3>
      <p>BAIDNET connects conventional financial access with a blockchain-powered network economy while keeping the experience understandable, useful and grounded in real participation.</p>
      <div class="ecosystem-signoff"><span></span><strong>A WORLD WITHIN A WORLD.</strong></div>
    </aside>

    <div class="ecosystem-card-wall">
      <article class="ecosystem-product-card" id="consumers">
        <div class="ecosystem-card-art"><img src="/assets/oneinerconnectedecosystemcard01consumers.png" alt="BAIDNET consumer experience"></div>
        <div class="ecosystem-card-copy"><small>01 / CONSUMERS <b>◉</b></small><h3>Your account. Your wallet. Your community.</h3><p>Enter through BAIDNET, access your fiat-facing financial tools and BDC wallet, then discover participating businesses and member experiences.</p><a href="#economy">Experience BAIDNET <span>→</span></a></div>
      </article>
      <article class="ecosystem-product-card" id="businesses">
        <div class="ecosystem-card-art"><img src="/assets/oneinterconnectedecosystem02Businesses.png" alt="BAIDNET participating business experience"></div>
        <div class="ecosystem-card-copy"><small>02 / BUSINESSES <b>◇</b></small><h3>Build experiences. Grow together.</h3><p>BSEAN gives participating businesses infrastructure to create their own memberships, offers and designated BDC experiences.</p><a href="#economy">Explore Be Seen <span>→</span></a></div>
      </article>
      <article class="ecosystem-product-card" id="partners">
        <div class="ecosystem-card-art"><img src="/assets/oneinterconnectedecosystem03INVESTORS%20%26%20PARTNERS.png" alt="BAIDNET investors and partners experience"></div>
        <div class="ecosystem-card-copy"><small>03 / INVESTORS &amp; PARTNERS <b>⌁</b></small><h3>See what we're building.</h3><p>Explore the platform, commercial model, readiness, proof and long-term opportunity behind the ecosystem.</p><a href="#platform">View the opportunity <span>→</span></a></div>
      </article>
    </div>

    <div class="ecosystem-bridge" aria-label="BAIDNET connects conventional finance and a blockchain economy">
      <span>CONVENTIONAL<br>FINANCE</span><i></i><strong>BAIDNET<br>PLATFORM</strong><i></i><span>BLOCKCHAIN<br>ECONOMY</span>
    </div>
  </div>
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


const preregForm=document.querySelector('#bsean-preregister');
if(preregForm){preregForm.addEventListener('submit',e=>{e.preventDefault();const status=preregForm.querySelector('.form-status');status.textContent='Thanks — your pre-registration details are ready to submit once the BWICO contact endpoint is connected.';});}


/* Membership split-view spatial interaction */
document.querySelectorAll('.member-panel').forEach(panel=>{
  panel.addEventListener('pointermove',e=>{
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const r=panel.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    panel.style.setProperty('--rx',(-y*5).toFixed(2)+'deg');
    panel.style.setProperty('--ry',(x*7).toFixed(2)+'deg');
    panel.style.setProperty('--mx',(x*100+50).toFixed(1)+'%');
    panel.style.setProperty('--my',(y*100+50).toFixed(1)+'%');
  });
  panel.addEventListener('pointerleave',()=>{
    panel.style.setProperty('--rx','0deg'); panel.style.setProperty('--ry','0deg');
    panel.style.setProperty('--mx','50%'); panel.style.setProperty('--my','50%');
  });
});

/* Expand membership cards into a full-card window */
const memberModal=document.querySelector('#member-modal');
const memberModalCard=memberModal?.querySelector('.member-modal-card');
const memberModalClose=memberModal?.querySelector('.member-modal-close');
let memberModalReturn=null;
function closeMemberModal(){
 if(!memberModal)return;
 memberModal.classList.remove('is-open','story-modal-open');
 memberModal.setAttribute('aria-hidden','true');
 document.body.classList.remove('member-modal-open');
 memberModalCard.innerHTML='';
 memberModalReturn?.focus();
}
document.querySelectorAll('.member-panel').forEach(panel=>{
 panel.setAttribute('role','button');
 panel.setAttribute('aria-label',(panel.querySelector('.eyebrow')?.textContent||'Membership')+' — open full card');
 panel.addEventListener('click',()=>{
   memberModalReturn=panel;
   const clone=panel.cloneNode(true);
   clone.removeAttribute('tabindex'); clone.removeAttribute('role'); clone.removeAttribute('aria-label');
   clone.style.removeProperty('--rx'); clone.style.removeProperty('--ry');
   memberModalCard.replaceChildren(clone);
   memberModal.classList.add('is-open');
   memberModal.setAttribute('aria-hidden','false');
   document.body.classList.add('member-modal-open');
   memberModalClose.focus();
 });
 panel.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();panel.click();}});
});
memberModalClose?.addEventListener('click',closeMemberModal);
memberModal?.addEventListener('click',e=>{if(e.target===memberModal)closeMemberModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&memberModal?.classList.contains('is-open'))closeMemberModal();});


/* Business-model story cards: open deck image unobstructed */
document.querySelectorAll('.story-card').forEach(card=>{
 card.addEventListener('click',()=>{
   card.classList.remove('is-selected');
   void card.offsetWidth;
   card.classList.add('is-selected');
   setTimeout(()=>card.classList.remove('is-selected'),320);
   memberModalReturn=card;
   const src=card.dataset.storyImage, label=card.dataset.storyLabel||'BAIDNET';
   memberModalCard.innerHTML='<div class="story-modal-label">'+label+'</div><div class="story-modal-image"><img src="'+src+'" alt="'+label+' full business model card"></div>';
   memberModal.classList.add('is-open','story-modal-open');
   memberModal.setAttribute('aria-hidden','false');
   document.body.classList.add('member-modal-open');
   memberModalClose.focus();
 });
});

const communityModal=document.querySelector('#community-modal');const communityModalClose=communityModal?.querySelector('.community-modal-close');let communityReturn=null;function closeCommunityModal(){if(!communityModal)return;communityModal.classList.remove('is-open');communityModal.setAttribute('aria-hidden','true');document.body.classList.remove('community-modal-open');communityReturn?.focus();}document.querySelectorAll('.community-card').forEach(card=>card.addEventListener('click',()=>{communityReturn=card;communityModal.querySelector('img').src=card.dataset.image;communityModal.querySelector('img').alt=card.dataset.title;communityModal.querySelector('h3').textContent=card.dataset.title;communityModal.querySelector('.community-modal-description').textContent=card.dataset.description;communityModal.classList.add('is-open');communityModal.setAttribute('aria-hidden','false');document.body.classList.add('community-modal-open');communityModalClose?.focus();}));communityModalClose?.addEventListener('click',closeCommunityModal);communityModal?.addEventListener('click',e=>{if(e.target===communityModal)closeCommunityModal();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&communityModal?.classList.contains('is-open'))closeCommunityModal();});
