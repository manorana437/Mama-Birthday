const screen=document.getElementById("screen");
const progressBar=document.getElementById("progressBar");
const stepLabel=document.getElementById("stepLabel");
const music=document.getElementById("music");
const soundBtn=document.getElementById("soundBtn");
let step=1,musicStarted=false,paused=false;

const photos=[
 {src:"mama-1.jpg",quote:"Mama, aap jaisi koi nahi. Aapke bina zindagi adhuri hai. Happy Birthday to my everything! 💕"},
 {src:"mama-2.jpg",quote:"Mama, aap jaisi koi nahi. Aapke bina zindagi adhuri hai. Happy Birthday to my everything! 💕"},
 {src:"mama-3.jpg",quote:"I love u MeRi Moto MeRi JannaT"}
];

function update(){progressBar.style.width=`${step/8*100}%`;stepLabel.textContent=`${String(step).padStart(2,"0")} / 08`}
function startMusic(){if(musicStarted)return;musicStarted=true;music.volume=.5;music.play().catch(()=>{})}
function page(content){screen.innerHTML=`<div class="page">${content}</div>`;update()}
function go(n){step=n;render();update()}
function celebration(){
 const box=document.createElement("div");box.className="celebration";document.body.appendChild(box);
 const icons=["💖","💕","💗","💋","😘","💝","✨","♥","💞","🥰"];
 for(let i=0;i<30;i++){
  const p=document.createElement("span");p.className="particle";p.textContent=icons[Math.floor(Math.random()*icons.length)];
  p.style.setProperty("--x",`${(Math.random()-.5)*620}px`);
  p.style.setProperty("--y",`${(Math.random()-.5)*720}px`);
  p.style.setProperty("--r",`${Math.random()*700-350}deg`);
  p.style.animationDelay=`${Math.random()*.12}s`;box.appendChild(p);
 }
 setTimeout(()=>box.remove(),1500);
}
function render(){
 if(step===1)page(`<div class="eyebrow">A LITTLE SURPRISE FOR YOU</div><div class="locket"></div><div class="hero">Happy Birthday,<br><span>MY MOTO</span></div><p class="sub">A tiny digital gift for the woman who makes every moment feel like home.</p><button class="btn" id="open">Open My Heart →</button><div class="micro">tap to begin</div>`);
 if(step===2)page(`<div class="eyebrow">JUST ONE QUESTION</div><div class="hero" style="font-size:50px">Ready for<br><span>your surprise?</span></div><p class="sub">There are a few little moments waiting for you.</p><div class="choice"><button class="btn" id="yes">Yes ♡</button><button class="btn ghost" id="no">Maybe...</button></div>`);
 if(step===3)renderBalloons();
 if(step===4)page(`<div class="eyebrow">MAKE A WISH</div><div class="cake">🎂</div><div class="wish">Close your eyes<br>& make a beautiful wish.</div><div class="sparkles">✦ ✧ ✦ ✧ ✦</div><button class="btn" id="blow" style="margin-top:24px">Blow the candle ✨</button>`);
 if(step===5)page(`<div class="eyebrow">A MESSAGE FROM MY HEART</div><div class="envelope" id="envelope">💌</div><div class="hero" style="font-size:40px">For my <span>Mama</span></div><p class="sub">There's something I want you to read.</p><button class="btn" id="openLetter">Open Letter</button>`);
 if(step===6){page(`<div class="eyebrow">DEAR MY MOTO,</div><div class="letter"><h3>Happy Birthday to someone truly special! 🎂</h3><p>You are my sweet soul, my rock, and someone I am so grateful to have in my life.</p><p>You bring so much warmth and sweetness into my life. Every moment with you is precious.</p><p>On your special day, I wish you all the happiness, love, and joy that you deserve. May this year bring you countless beautiful moments!</p><p style="text-align:right;color:#a52e57">With all my love, ♥</p></div>`);setTimeout(()=>{if(step===6)go(7)},7000)}
 if(step===7)page(`<div class="eyebrow">ONE LAST LITTLE THING</div><div class="gift" id="gift">🎁</div><div class="hero" style="font-size:43px">A gift,<br><span>just for you.</span></div><p class="sub">Tap the box.</p>`);
 if(step===8)renderPhotos(0);
}
function renderBalloons(){
 page(`<div class="eyebrow">A LITTLE FUN FIRST</div><div class="hero" style="font-size:43px">Pop all<br><span>4 balloons</span></div><div class="counter" id="counter">0 / 4</div><div class="balloon-area"><button class="balloon">💖</button><button class="balloon">💋</button><button class="balloon">💕</button><button class="balloon">😘</button></div>`);
 let popped=0;document.querySelectorAll(".balloon").forEach((b,i)=>{b.onclick=()=>{if(b.classList.contains("popped"))return;b.classList.add("popped");popped++;celebration();document.getElementById("counter").textContent=`${popped} / 4`;if(popped===4)setTimeout(()=>go(4),700)}})
}
function renderPhotos(index){
 const p=photos[index];
 screen.innerHTML=`<div class="page photo-page"><div class="photo-title">Happy Birthday,<br>MY MOTO ♡</div><div class="photo-frame"><img src="${p.src}" alt="Birthday memory ${index+1}"></div><div class="quote">${p.quote}</div><div class="dots">${photos.map((_,i)=>`<span class="dot ${i===index?"active":""}"></span>`).join("")}</div></div>`;
 update();
 if(index<photos.length-1)setTimeout(()=>{if(step===8&&!paused)renderPhotos(index+1)},4300);
 else setTimeout(()=>{if(step===8&&!paused)renderFinal()},5000);
}
function renderFinal(){screen.innerHTML=`<div class="page"><div class="final-heart">♥</div><div class="hero" style="font-size:47px">I love u MeRi Moto,<br><span>MeRi JannaT</span> 💕</div><div class="signature">Happy Birthday, Mama.</div></div>`;update();celebration()}
document.addEventListener("click",e=>{
 if(e.target.closest("#open")){startMusic();go(2)}
 if(e.target.closest("#yes")){startMusic();go(3)}
 if(e.target.closest("#no"))e.target.closest("#no").animate([{transform:"translateX(0)"},{transform:"translateX(16px)"},{transform:"translateX(-16px)"},{transform:"translateX(0)"}],{duration:420});
 if(e.target.closest("#blow")){celebration();go(5)}
 if(e.target.closest("#openLetter")||e.target.closest("#envelope"))go(6);
 if(e.target.closest("#gift")){celebration();go(8)}
});
soundBtn.onclick=()=>{startMusic();music.muted=!music.muted;soundBtn.textContent=music.muted?"×":"♪"};
render();
