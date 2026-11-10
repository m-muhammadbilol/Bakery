const I=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const CATS=[
{id:'all',label:'All',icon:I('<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>')},
{id:'croissants',label:'Croissants',icon:I('<path d="M3 16c1-6 5-10 9-10s8 4 9 10c-3-2-6-3-9-3s-6 1-9 3z"/><path d="M9 7l1 6M15 7l-1 6"/>')},
{id:'breads',label:'Breads',icon:I('<path d="M4 12a5 5 0 0 1 4-8h8a5 5 0 0 1 4 8v7H4z"/><path d="M9 9l1.5 3M13 9l1.5 3"/>')},
{id:'cakes',label:'Cakes',icon:I('<path d="M4 20V12h16v8z"/><path d="M4 15c3 2 5-2 8 0s5 2 8 0"/><path d="M12 12V7M12 4v1"/>')},
{id:'cookies',label:'Cookies',icon:I('<circle cx="12" cy="12" r="8"/><circle cx="9" cy="10" r=".8"/><circle cx="14" cy="9" r=".8"/><circle cx="14" cy="14" r=".8"/><circle cx="9" cy="15" r=".8"/>')}];
// Single source of truth. art = [shape, main color, accent color]
const P=[
{id:1,name:'Classic Butter Croissant',cat:'croissants',price:8,art:['croissant','#D9A15B','#B57A32']},
{id:2,name:'Chocolate Croissant',cat:'croissants',price:10,art:['croissant','#C98A47','#4A2E23']},
{id:3,name:'Almond Croissant',cat:'croissants',price:11,isNew:true,art:['croissant','#D4A468','#F3E3C3']},
{id:4,name:'Artisan Sourdough',cat:'breads',price:12,art:['loaf','#C9934F','#EBD7B5']},
{id:5,name:'Rustic Baguette',cat:'breads',price:7,art:['baguette','#D3A058','#A8702E']},
{id:6,name:'Country Loaf',cat:'breads',price:10,art:['loaf','#B9803F','#E6CDA2']},
{id:7,name:'Strawberry Shortcake',cat:'cakes',price:14,isNew:true,art:['cake','#F1D9B5','#D2493F']},
{id:8,name:'Chocolate Fudge Cake',cat:'cakes',price:15,art:['cake','#5A372A','#C58B55']},
{id:9,name:'Vanilla Celebration Cake',cat:'cakes',price:16,art:['cake','#F7E7C8','#EBC3A7']},
{id:10,name:'Chocolate Chip Cookies',cat:'cookies',price:6,art:['cookie','#D6A15E','#4A2E23']},
{id:11,name:'Butter Cookies',cat:'cookies',price:7,art:['cookie','#E3B877','#C58B55']},
{id:12,name:'Double Chocolate Cookies',cat:'cookies',price:8,isNew:true,art:['cookie','#5A372A','#EADBC8']}];
const byId=id=>P.find(p=>p.id===id);
const fmt=n=>'$'+(Number.isInteger(n)?n:n.toFixed(2));
const cache={};
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const mix=(h,t)=>'#'+hx(h).map(v=>Math.round(t<0?v*(1+t):v+(255-v)*t).toString(16).padStart(2,'0')).join('');
const G=(id,c)=>`<linearGradient id="${id}" x1=".15" y1="0" x2=".85" y2="1"><stop offset="0" stop-color="${mix(c,.3)}"/><stop offset=".5" stop-color="${c}"/><stop offset="1" stop-color="${mix(c,-.32)}"/></linearGradient>`;
const DEFS=`<radialGradient id="bg" cx=".5" cy=".35" r=".85"><stop offset="0" stop-color="#FCF3E6"/><stop offset="1" stop-color="#E4CFB3"/></radialGradient><linearGradient id="tb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9D6BB"/><stop offset="1" stop-color="#D9C2A0"/></linearGradient><linearGradient id="sd" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".3" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient><filter id="bl" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="11"/></filter><filter id="f" x="-6%" y="-6%" width="112%" height="112%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="7" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="9" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 .22 0 0 0 0 .12 0 0 0 0 .06 0 0 0 .55 -.14" result="gc"/><feComposite in="gc" in2="d" operator="in" result="gi"/><feMerge><feMergeNode in="d"/><feMergeNode in="gi"/></feMerge></filter>`;
function cookie(x,y,r,c,b,p){const pts=Array.from({length:22},(_,i)=>{const a=i/22*6.2832,k=r*(1+.05*Math.sin(i*2.9+x*.1));return`${(x+Math.cos(a)*k).toFixed(1)},${(y+Math.sin(a)*k*.9).toFixed(1)}`}).join(' ');
let d=`<polygon points="${pts}" fill="url(#g1)" stroke="${mix(c,-.4)}" stroke-width="3" stroke-linejoin="round"/><ellipse cx="${x-r*.25}" cy="${y-r*.3}" rx="${r*.5}" ry="${r*.22}" fill="#fff" opacity=".14"/>`;
if(p.id===11)for(let k=-3;k<=3;k++)d+=`<path d="M${x+k*r*.2-r*.1} ${y-r*.55}v${r*1.1}" stroke="${mix(c,-.35)}" stroke-width="3" opacity=".45"/>`;
else for(let k=0;k<7;k++){const a=k*2.4+x,q=r*(.18+.5*((k*37%10)/10)),cx=x+Math.cos(a)*q,cy=y+Math.sin(a)*q*.85;d+=`<g transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${k*47})"><rect x="-9" y="-7" width="18" height="14" rx="4" fill="${b}"/><rect x="-6" y="-5" width="7" height="4" rx="2" fill="#fff" opacity=".28"/></g>`}
return d}
function art(p){if(cache[p.id])return cache[p.id];const[k,c,b]=p.art;let s='';
if(k==='croissant'){s=[-2,2,-1,1,0].map(t=>{const a=2-Math.abs(t);return`<g transform="translate(${200+t*60} ${236-a*26}) rotate(${t*20})"><ellipse rx="${50+a*15}" ry="${66+a*10}" fill="url(#g1)" stroke="${mix(c,-.45)}" stroke-width="2.5"/><path d="M${-30-a*8} -22Q0 ${-46-a*4} ${30+a*8} -22" fill="none" stroke="${mix(c,.5)}" stroke-width="6" stroke-linecap="round" opacity=".5"/><path d="M${-36-a*8} 14Q0 -2 ${36+a*8} 14" fill="none" stroke="${mix(c,-.4)}" stroke-width="2.5" opacity=".5"/></g>`}).join('');
if(p.id===2)s+=`<path d="M105 215Q150 160 200 170T295 190M120 245Q170 195 215 205T290 225" fill="none" stroke="${b}" stroke-width="5" stroke-linecap="round" opacity=".92"/>`;
if(p.id===3){for(let i=0;i<14;i++)s+=`<ellipse cx="${120+(i*53%170)}" cy="${150+(i*37%90)}" rx="11" ry="5" transform="rotate(${i*31} ${120+(i*53%170)} ${150+(i*37%90)})" fill="${b}" stroke="${mix(c,.1)}" stroke-width="1"/>`;for(let i=0;i<30;i++)s+=`<circle cx="${100+(i*71%200)}" cy="${130+(i*43%130)}" r="2" fill="#fff" opacity=".75"/>`}}
else if(k==='loaf')s=`<path d="M42 272Q34 148 200 130Q366 148 358 272Q200 296 42 272Z" fill="url(#g1)"/><path d="M42 272Q200 296 358 272Q354 254 200 262Q46 254 42 272Z" fill="${mix(c,-.45)}" opacity=".6"/><ellipse cx="200" cy="185" rx="100" ry="38" fill="#fff" opacity=".2"/><g fill="none" stroke-linecap="round"><path d="M120 185Q150 175 165 235M190 165Q222 165 232 240M255 185Q282 190 288 238" stroke="${mix(c,-.5)}" stroke-width="15"/><path d="M120 185Q150 175 165 235M190 165Q222 165 232 240M255 185Q282 190 288 238" stroke="${b}" stroke-width="8"/></g>`;
else if(k==='baguette')s=`<g transform="rotate(-16 200 235)"><rect x="25" y="195" width="350" height="76" rx="38" fill="url(#g1)"/><rect x="30" y="248" width="340" height="22" rx="11" fill="${mix(c,-.45)}" opacity=".5"/><ellipse cx="200" cy="212" rx="150" ry="9" fill="#fff" opacity=".22"/>${[80,150,220,290].map(x=>`<path d="M${x} 207q22 6 30 38" fill="none" stroke="${mix(c,-.5)}" stroke-width="14" stroke-linecap="round"/><path d="M${x} 207q22 6 30 38" fill="none" stroke="${b}" stroke-width="7" stroke-linecap="round"/>`).join('')}</g>`;
else if(k==='cake'){const dark=p.id===8,top=dark?c:'#FFF6E6';s=`<rect x="98" y="196" width="204" height="96" rx="14" fill="url(#g1)"/><rect x="98" y="236" width="204" height="14" fill="#FFF6E6"/><rect x="98" y="196" width="204" height="96" rx="14" fill="url(#sd)"/><ellipse cx="200" cy="196" rx="102" ry="27" fill="${top}"/>${dark?`<path d="M98 196q8 40 20 0t26 8 18 30 20-32 24 26 20-26 26 34 20-40 14 20 10-20v-4z" fill="${mix(c,-.15)}"/><ellipse cx="170" cy="186" rx="40" ry="8" fill="#fff" opacity=".2"/>`:''}`;
if(p.id===7)for(let i=0;i<3;i++){const x=150+i*50,y=178-(i%2)*6;s+=`<path d="M${x} ${y-24}c24-6 36 14 30 30-4 12-16 20-30 22-14-2-26-10-30-22-6-16 6-36 30-30z" fill="${b}"/><path d="M${x-8} ${y-26}l8 8 8-8" stroke="#4E8A3C" stroke-width="5" fill="none"/>${[-10,0,10].map(q=>`<circle cx="${x+q}" cy="${y+q/2}" r="1.8" fill="#F8D5A0"/>`).join('')}`}
if(p.id===8)for(let i=0;i<4;i++)s+=`<circle cx="${140+i*40}" cy="${176-(i%2)*8}" r="14" fill="${b}" stroke="${mix(b,-.4)}"/>`;
if(p.id===9)for(let i=0;i<6;i++){const a=i*1.05;s+=`<circle cx="${200+Math.cos(a)*62}" cy="${194+Math.sin(a)*14}" r="13" fill="${b}" stroke="${mix(b,-.25)}"/>`}}
else s=cookie(268,205,70,c,b,p)+cookie(140,222,78,c,b,p)+cookie(215,250,90,c,b,p);
const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs>${DEFS}${G('g1',c)}</defs><rect width="400" height="400" fill="url(#bg)"/><rect y="290" width="400" height="110" fill="url(#tb)"/><ellipse cx="200" cy="300" rx="150" ry="20" fill="#3A2418" opacity=".34" filter="url(#bl)"/><g filter="url(#f)">${s}</g></svg>`;
return cache[p.id]='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}
const $=id=>document.getElementById(id);
let cat='all';
function renderCats(){$('cats').innerHTML=CATS.map(c=>`<button class="cat" data-cat="${c.id}" aria-pressed="${c.id===cat}">${c.icon}${c.label}</button>`).join('')}
function renderGrid(){const list=cat==='all'?P:P.filter(p=>p.cat===cat);
$('grid').classList.toggle('few',list.length<5);
$('grid').innerHTML=list.map((p,i)=>`<article class="card p${i%5}" style="--d:${i*45}ms"><div class="ph"><img src="${art(p)}" alt="${p.name}, illustrated placeholder" width="400" height="400" loading="lazy">${p.isNew?'<span class="new">New</span>':''}<button class="add" data-add="${p.id}" aria-label="Add ${p.name} to cart">Add to Cart</button></div><div class="info"><h3>${p.name}</h3><span class="price">${fmt(p.price)}</span></div></article>`).join('');
$('status').textContent=`Showing ${list.length} ${list.length===1?'product':'products'}`}
// Cart: stores only id + qty; validated against the catalog on load
const KEY='crumb-crust-cart-v1';
function load(){try{const r=JSON.parse(localStorage.getItem(KEY)||'[]');if(!Array.isArray(r))return[];const seen=new Set();return r.filter(x=>x&&Number.isInteger(x.id)&&Number.isInteger(x.qty)&&x.qty>=1&&x.qty<=99&&byId(x.id)&&!seen.has(x.id)&&seen.add(x.id)).map(x=>({id:x.id,qty:x.qty}))}catch(e){return[]}}
let cart=load();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(cart))}catch(e){}};
const total=()=>cart.reduce((s,x)=>s+byId(x.id).price*x.qty,0);
const n=()=>cart.reduce((s,x)=>s+x.qty,0);
function renderCart(bump){const c=n();$('count').textContent=c;$('openCart').setAttribute('aria-label',`Open cart, ${c} ${c===1?'item':'items'}`);
if(bump){$('count').classList.remove('bump');void $('count').offsetWidth;$('count').classList.add('bump')}
$('items').innerHTML=cart.length?cart.map(x=>{const p=byId(x.id);return`<li class="item"><img src="${art(p)}" alt="${p.name}"><div><h3>${p.name}</h3><div class="u">${fmt(p.price)} each</div><div class="q"><button class="icon" data-dec="${p.id}" aria-label="Decrease quantity of ${p.name}" ${x.qty<=1?'disabled':''}>&minus;</button><output aria-label="Quantity">${x.qty}</output><button class="icon" data-inc="${p.id}" aria-label="Increase quantity of ${p.name}">+</button><button class="rm" data-rm="${p.id}" aria-label="Remove ${p.name} from cart">Remove</button></div></div></li>`}).join(''):`<li class="empty"><p>Your cart is empty. Add something fresh from the oven.</p></li>`;
$('subtotal').textContent=fmt(total());$('checkout').hidden=!cart.length;
if(isOpen()&&!$('drawer').contains(document.activeElement))$('closeCart').focus()}
let last=null;const isOpen=()=>$('drawer').classList.contains('open');
function openCart(){if(isOpen())return;last=document.activeElement;$('drawer').classList.add('open');$('overlay').classList.add('open');$('page').inert=true;$('closeCart').focus()}
function closeCart(){if(!isOpen())return;$('drawer').classList.remove('open');$('overlay').classList.remove('open');$('page').inert=false;if(last&&document.contains(last))last.focus()}
let tt;function toast(m){const t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),2200)}
function add(id){const x=cart.find(i=>i.id===id);if(x)x.qty=Math.min(99,x.qty+1);else cart.push({id,qty:1});save();renderCart(true);toast(`${byId(id).name} added to cart`);openCart()}
function setQty(id,d){const x=cart.find(i=>i.id===id);if(!x)return;x.qty=Math.max(1,Math.min(99,x.qty+d));save();renderCart()}
function remove(id){cart=cart.filter(i=>i.id!==id);save();renderCart()}
document.addEventListener('click',e=>{const t=e.target.closest('button,#overlay');if(!t)return;const d=t.dataset;
if(d.cat){cat=d.cat;renderCats();renderGrid();$('cats').querySelector(`[data-cat="${cat}"]`).focus()}
else if(d.add)add(+d.add);else if(d.inc)setQty(+d.inc,1);else if(d.dec)setQty(+d.dec,-1);else if(d.rm)remove(+d.rm);
else if(t.id==='openCart')openCart();else if(t.id==='closeCart'||t.id==='continue'||t.id==='overlay')closeCart();
else if(t.id==='checkout')toast('Demo only. No payment is taken.')});
document.addEventListener('keydown',e=>{if(!isOpen())return;if(e.key==='Escape'){closeCart();return}
if(e.key!=='Tab')return;const f=[...$('drawer').querySelectorAll('button:not([disabled]):not([hidden])')];if(!f.length)return;const a=f[0],z=f[f.length-1];
if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}});
(function(){const f=byId(3);[['hi1',1,'Golden butter croissants, illustrated'],['hi2',4,'Artisan sourdough loaf, illustrated'],['hi3',3,'']].forEach(([i,id,a])=>{const e=$(i);e.src=art(byId(id));e.alt=a});$('favN').textContent=f.name;$('favP').textContent=fmt(f.price);$('favB').dataset.add=f.id;$('favB').setAttribute('aria-label','Add '+f.name+' to cart')})();
renderCats();renderGrid();renderCart();
