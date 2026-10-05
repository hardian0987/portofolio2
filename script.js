const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];

/* Skills (12 skill tetap, dikelompokkan) */
const skills=[['devicon-laravel-original colored','Laravel','Full-stack Framework','Backend'],['devicon-php-plain colored','PHP','Backend Logic','Backend'],['fa-brands fa-html5" style="color:#f97316','Blade','UI Components','Frontend'],['devicon-mysql-original colored','MySQL','Relational Database','Database'],['devicon-git-plain colored','Git','Version Control','Tools'],['devicon-github-original colored','GitHub','Repository & Sync','Tools'],['devicon-docker-plain colored','Docker','Container Basics','Tools'],['devicon-wordpress-plain colored','WordPress','CMS Development','Backend'],['devicon-postman-plain colored','Postman','API Testing','Tools'],['devicon-tailwindcss-original colored','Tailwind CSS','Utility-first Styling','Frontend'],['devicon-javascript-plain colored','JavaScript','Interactive DOM','Frontend'],['devicon-bootstrap-plain colored','Bootstrap','Responsive Layout','Frontend']];
$('#skillGrid').innerHTML=skills.map(([i,n,d,c])=>`<div class="sk rv" data-cat="${c}"><i class="${i}"></i><div><h4>${n}</h4><small>${d}</small></div></div>`).join('');
const mq=skills.slice(0,11).map(s=>`<span><i class="${s[0]}"></i>${s[1]}</span>`).join('');
$('#track').innerHTML=mq+mq;

/* Typing */
const words=['Laravel Ã‚Â· PHP Ã‚Â· MySQL','REST API Ã‚Â· Postman','JavaScript Ã‚Â· Tailwind CSS','Dari database ke UI'];let w=0,c=0,del=false;
(function type(){const t=words[w];$('#typed').textContent=t.slice(0,c);c+=del?-1:1;let d=del?35:75;
 if(!del&&c>t.length){del=true;d=1400}else if(del&&c<0){del=false;w=(w+1)%words.length;c=0;d=300}setTimeout(type,d)})();

/* Reveal + count-up */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');
 const n=$('[data-n]',e.target);if(n){const to=+n.dataset.n,t0=performance.now();(function f(t){const p=Math.min((t-t0)/1200,1);n.textContent=Math.round(to*(1-Math.pow(1-p,3)));p<1&&requestAnimationFrame(f)})(t0)}
 io.unobserve(e.target)}),{threshold:.15});
$$('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%3)*90+'ms';io.observe(el)});

/* Nav, progress, active link, cursor glow, tilt */
const links=$$('#menu a'),secs=links.map(a=>$(a.getAttribute('href')));
addEventListener('scroll',()=>{const h=document.documentElement;$('#progress').style.width=scrollY/(h.scrollHeight-innerHeight)*100+'%';
 const y=scrollY+200;secs.forEach((s,i)=>links[i].classList.toggle('on',s.offsetTop<=y&&s.offsetTop+s.offsetHeight>y))},{passive:true});
$('#burger').onclick=()=>$('#menu').classList.toggle('show');links.forEach(a=>a.onclick=()=>$('#menu').classList.remove('show'));
addEventListener('pointermove',e=>{const g=$('#glow');g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'},{passive:true});
if(matchMedia('(hover:hover)').matches)$$('.tilt').forEach(el=>{
 el.onpointermove=e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`};
 el.onpointerleave=()=>el.style.transform=''});

/* Music player */
const list=[{t:'Circles',a:'Post Malone',s:'songs/circles songs.mp3'},{t:'September',a:'Earth, Wind & Fire',s:'songs/september songs.mp3'},{t:"Can't Stop the Feeling!",a:'Justin Timberlake',s:"songs/Can't Stop the Feeling songs (2).mp3"}];
const au=new Audio(),P=$('#player'),pi=$('#play i');let k=0;
function load(i){k=(i+list.length)%list.length;au.src=list[k].s;$('#pTitle').textContent=list[k].t;$('#pArtist').textContent=list[k].a}
function toggle(){au.paused?au.play().catch(()=>{}):au.pause()}
au.onplay=()=>{P.classList.add('playing');pi.className='fa-solid fa-pause'};
au.onpause=()=>{P.classList.remove('playing');pi.className='fa-solid fa-play'};
au.ontimeupdate=()=>$('#fill').style.width=(au.currentTime/au.duration||0)*100+'%';
au.onended=()=>{load(k+1);au.play()};
$('#disc').onclick=()=>{P.classList.toggle('open');if(!P.classList.contains('open')&&!au.paused)return;};
$('#play').onclick=toggle;$('#next').onclick=()=>{load(k+1);au.play()};$('#prev').onclick=()=>{load(k-1);au.play()};
$('#bar').onclick=e=>{const r=e.currentTarget.getBoundingClientRect();au.currentTime=(e.clientX-r.left)/r.width*au.duration||0};
load(0);


/* Filter stack + spotlight */
$('#filters').onclick=e=>{const f=e.target.dataset.f;if(!f)return;$$('#filters button').forEach(b=>b.classList.toggle('on',b===e.target));
 $$('.sk').forEach(k=>{k.classList.toggle('hide',f!=='all'&&k.dataset.cat!==f);k.classList.add('in')})};
$$('.sk').forEach(k=>k.onpointermove=e=>{const r=k.getBoundingClientRect();k.style.setProperty('--x',e.clientX-r.left+'px');k.style.setProperty('--y',e.clientY-r.top+'px')});

/* Manifesto: kata menyala saat scroll */
const mf=$('#manifesto');mf.innerHTML=mf.textContent.split(' ').map(w=>`<span>${w}</span>`).join(' ');
const ws=$$('span',mf),steps=$$('.step');
function onScroll(){const r=mf.getBoundingClientRect(),p=Math.min(Math.max((innerHeight*.85-r.top)/(r.height+innerHeight*.35),0),1);
 ws.forEach((w,i)=>w.classList.toggle('lit',i/ws.length<p));
 const t=$('#tl').getBoundingClientRect(),q=Math.min(Math.max((innerHeight*.6-t.top)/t.height,0),1);$('#tlFill').style.height=q*100+'%';
 steps.forEach(s=>s.classList.toggle('act',s.getBoundingClientRect().top<innerHeight*.6))}
addEventListener('scroll',onScroll,{passive:true});onScroll();

/* Magnetic button + copy email */
if(matchMedia('(hover:hover)').matches){const m=$('.magnet');m.onpointermove=e=>{const r=m.getBoundingClientRect();m.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.15}px,${(e.clientY-r.top-r.height/2)*.3}px)`};m.onpointerleave=()=>m.style.transform=''}
$('#copy').onclick=()=>{navigator.clipboard?.writeText('hardianr7@gmail.com');$('#copy span').textContent='Tersalin Ã¢Å“â€œ';setTimeout(()=>$('#copy span').textContent='Salin email',1800)};


/* Project detail */
const projects=[
{t:'Elyfone',type:'E-Commerce',role:'Fullstack Developer',status:'Selesai',
 sum:'Web toko online gadget dengan katalog produk dinamis, halaman detail, dan simulasi keranjang belanja.',
 feat:['Katalog produk dinamis dari database','Halaman detail produk lengkap dengan harga & deskripsi','Keranjang belanja dengan total otomatis','Tampilan responsif di HP dan desktop'],
 chal:['Merancang relasi tabel produk, kategori, dan keranjang agar tidak berantakan','Menjaga total harga tetap konsisten saat item ditambah atau dihapus'],
 learn:['Eloquent relationship, migration, dan seeder di Laravel','Memisahkan logika backend dari tampilan Blade agar mudah dirawat'],
 tech:['Laravel','PHP','MySQL','Blade','Git'],flow:['Riset','Desain DB','Backend','UI','Testing'],
 code:"Route::get('/products/{product}', [ProductController::class, 'show']);\nRoute::post('/cart/add', [CartController::class, 'add']);"},
{t:'MyDay',type:'Personal Web',role:'Frontend Developer',status:'Selesai',
 sum:'Web keseharian sederhana untuk mencatat aktivitas dan jadwal harian dengan tampilan yang ringan.',
 feat:['Catatan aktivitas harian','Tampilan jadwal yang rapi dan mudah dibaca','Desain responsif mobile-first','Interaksi ringan dengan JavaScript'],
 chal:['Menata layout agar tetap nyaman di layar kecil','Mengelola data dan interaksi tanpa backend'],
 learn:['Manipulasi DOM dan event handling di JavaScript','Dasar mobile-first dengan CSS Flexbox dan Grid'],
 tech:['HTML','CSS','JavaScript'],flow:['Ide','Wireframe','Coding','Uji di HP'],
 code:"document.querySelector('#add').addEventListener('click', () => {\n  renderActivity(input.value);\n});"},
{t:'REST API Gateway',type:'Backend API',role:'Backend Developer',status:'Selesai',
 sum:'Latihan membangun dan mengonsumsi REST API dengan autentikasi token dan pengujian endpoint.',
 feat:['Endpoint CRUD dengan format response JSON seragam','Autentikasi Bearer token','Validasi input dan pesan error yang jelas','Pengujian endpoint lewat koleksi Postman'],
 chal:['Membuat format response dan error yang konsisten di semua endpoint','Mengamankan endpoint agar hanya bisa diakses user yang berhak'],
 learn:['HTTP method dan status code yang tepat','Middleware, controller, dan resource di Laravel'],
 tech:['Laravel','PHP','REST API','MySQL','Postman'],flow:['Rancang endpoint','Auth','Implementasi','Test Postman'],
 code:"Route::middleware('auth:sanctum')->group(function () {\n  Route::apiResource('products', ProductController::class);\n});"}];
const pm=document.createElement('div');pm.className='pm';pm.setAttribute('role','dialog');pm.setAttribute('aria-modal','true');document.body.appendChild(pm);
const li=a=>a.map(x=>`<li>${x}</li>`).join('');let cur=0;
function openP(i){cur=(i+projects.length)%projects.length;const p=projects[cur],card=$$('.pcard')[cur];
 pm.innerHTML=`<div class="pm-panel"><div class="pm-top"><div><small>0${cur+1} / ${projects.length} Ã‚Â· ${p.type}</small><h3>${p.t}</h3></div><button class="pm-x" aria-label="Tutup"><i class="fa-solid fa-xmark"></i></button></div>
 <div class="pm-vis">${$('.pvis',card).outerHTML}</div><p class="pm-sum">${p.sum}</p>
 <div class="pm-meta"><div><small>Peran</small><b>${p.role}</b></div><div><small>Tipe</small><b>${p.type}</b></div><div><small>Status</small><b>${p.status}</b></div></div>
 <div class="pm-grid"><div class="pm-blk"><h5>Fitur utama</h5><ul>${li(p.feat)}</ul></div><div class="pm-blk"><h5>Tantangan</h5><ul>${li(p.chal)}</ul></div>
 <div class="pm-blk"><h5>Pembelajaran utama</h5><ul>${li(p.learn)}</ul></div><div class="pm-blk"><h5>Teknologi</h5><div class="tags">${p.tech.map(x=>`<span>${x}</span>`).join('')}</div></div>
 <div class="pm-blk full"><h5>Alur pengerjaan</h5><div class="pm-steps">${p.flow.map(x=>`<span>${x}</span>`).join('<i>Ã¢â€ â€™</i>')}</div></div>
 <div class="pm-blk full"><h5>Cuplikan kode</h5><pre>${p.code}</pre></div></div>
 <div class="pm-nav"><button data-d="-1"><i class="fa-solid fa-arrow-left"></i><span>Sebelumnya</span></button><button data-d="1"><span>Berikutnya</span><i class="fa-solid fa-arrow-right"></i></button></div></div>`;
 pm.classList.add('open');document.body.classList.add('lock');$('.pm-panel',pm).scrollTop=0}
function closeP(){pm.classList.remove('open');document.body.classList.remove('lock')}
$$('.pcard').forEach((c,i)=>c.onclick=()=>openP(i));
pm.onclick=e=>{if(e.target===pm||e.target.closest('.pm-x'))closeP();const b=e.target.closest('[data-d]');if(b)openP(cur+ +b.dataset.d)};
addEventListener('keydown',e=>{if(!pm.classList.contains('open'))return;if(e.key==='Escape')closeP();if(e.key==='ArrowRight')openP(cur+1);if(e.key==='ArrowLeft')openP(cur-1)});


/* Puzzle foto About - kanvas, kepingan jigsaw rapat tanpa celah dan diam */
(function(){
const pz=$('#puzzle');
const cv=document.createElement('canvas');
cv.className='pzc';
pz.textContent='';pz.appendChild(cv);
const ctx=cv.getContext('2d');
const img=new Image();
let COLS=4,ROWS=3,cw=0,ch=0,W=0,H=0,dpr=1,pieces=[],hover=-1,ready=false;

const f2=p=>p[0].toFixed(1)+','+p[1].toFixed(1);

/* --- geometri jigsaw: tonjolan & cekungan selalu berpasangan --- */
function segs(len,R,nw){
 const c=len/2,a=c-nw/2,b=c+nw/2;
 const p=Math.min(Math.max(c-R*.8,a),c),q=Math.max(Math.min(c+R*.8,b),c);
 return [[[a,0],[a,0],[a,R*.55],[a,R]],
         [[a,R],[a,R*1.75],[p,R*1.9],[c,R*1.9]],
         [[c,R*1.9],[q,R*1.9],[b,R*1.75],[b,R]],
         [[b,R],[b,R*.55],[b,0],[b,0]]];
}
function edgeD(ss,map){
 let d='L'+f2(map(ss[0][0]))+' ';
 for(const g of ss)d+='C'+f2(map(g[1]))+' '+f2(map(g[2]))+' '+f2(map(g[3]))+' ';
 return d;
}
function pathFor(r,c){
 const R=Math.min(cw,ch)*.15,nwH=cw*.2,nwV=ch*.2;
 let d='M0,0 ';
 if(r===0)d+='L'+f2([cw,0])+' ';
 else{const s=(r+c)%2===0?-1:1;d+=edgeD(segs(cw,R,nwH),p=>[p[0],s*p[1]])+'L'+f2([cw,0])+' '}
 if(c===COLS-1)d+='L'+f2([cw,ch])+' ';
 else{const s=(c+1+r)%2===0?1:-1;d+=edgeD(segs(ch,R,nwV),p=>[cw+s*p[1],p[0]])+'L'+f2([cw,ch])+' '}
 if(r===ROWS-1)d+='L'+f2([0,ch])+' ';
 else{const s=(r+1+c)%2===0?-1:1;d+=edgeD(segs(cw,R,nwH),p=>[cw-p[0],ch+s*p[1]])+'L'+f2([0,ch])+' '}
 if(c===0)d+='L'+f2([0,0])+' ';
 else{const s=(c+r)%2===0?1:-1;d+=edgeD(segs(ch,R,nwV),p=>[s*p[1],ch-p[0]])}
 return d+'Z';
}

function layout(){
 const rect=pz.getBoundingClientRect();
 W=rect.width;H=rect.height;
 if(!W||!H)return;
 dpr=Math.min(2,devicePixelRatio||1);
 cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
 ctx.setTransform(dpr,0,0,dpr,0,0);
 COLS=innerWidth<700?3:4;
 ROWS=Math.max(3,Math.round(COLS*img.naturalHeight/img.naturalWidth));
 /* tanpa celah: sel membagi area tepat, tonjolan mengunci ke cekungan tetangga */
 cw=W/COLS;ch=H/ROWS;
 pieces=[];
 for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++)
  pieces.push({i:r*COLS+c,r,c,path:new Path2D(pathFor(r,c)),bx:c*cw,by:r*ch,hov:0});
 hover=-1;
 ready=true;
 draw();
}

function draw(){
 if(!ready)return;
 ctx.clearRect(0,0,W,H);
 const sw=COLS*cw,sh=ROWS*ch;
 /* 1) gambar isi semua kepingan (kepingan yang ditunjuk paling akhir) */
 const order=pieces.filter(p=>p.i!==hover).concat(pieces.filter(p=>p.i===hover));
 for(const p of order){
  const s=1+p.hov*.05, lift=-p.hov*9;
  ctx.save();
  ctx.translate(p.bx+cw/2,p.by+ch/2+lift);
  ctx.scale(s,s);
  ctx.translate(-cw/2,-ch/2);
  /* bayangan mengikuti kurva jigsaw */
  ctx.shadowColor='rgba(0,0,0,'+(.3+p.hov*.28)+')';
  ctx.shadowBlur=14+p.hov*16;
  ctx.shadowOffsetY=6+p.hov*8;
  ctx.fillStyle='#0a0e18';
  ctx.fill(p.path);
  /* foto digunting tepat pada bentuk kepingan */
  ctx.shadowColor='transparent';ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  ctx.save();
  ctx.clip(p.path);
  ctx.drawImage(img,-p.c*cw,-p.r*ch,sw,sh);
  const g=ctx.createLinearGradient(0,0,0,ch);
  g.addColorStop(0,'rgba(255,255,255,'+(.05+p.hov*.07)+')');
  g.addColorStop(1,'rgba(0,0,0,.17)');
  ctx.fillStyle=g;ctx.fill(p.path);
  ctx.restore();
  ctx.restore();
 }
 /* 2) garis pemisah digambar setelah semua isi, supaya tidak tertutup
      kepingan tetangga dan seluruh tonjolan terlihat utuh */
 for(const p of pieces){
  ctx.save();
  const s=1+p.hov*.05, lift=-p.hov*9;
  ctx.translate(p.bx+cw/2,p.by+ch/2+lift);
  ctx.scale(s,s);
  ctx.translate(-cw/2,-ch/2);
  ctx.lineWidth=p.hov>.04?2.2:1.1;
  ctx.strokeStyle=p.hov>.04?'rgba(129,140,248,'+(.45+p.hov*.5)+')':'rgba(0,0,0,.42)';
  if(p.hov<=.04){ctx.shadowColor='rgba(255,255,255,.22)';ctx.shadowBlur=1;ctx.shadowOffsetY=0}
  else{ctx.shadowColor='rgba(129,140,248,.8)';ctx.shadowBlur=10}
  ctx.stroke(p.path);
  ctx.restore();
 }
}

/* kursor hanya memunculkan garis pemisah & sedikit mengangkat kepingan;
   tidak ada loop animasi - digambar ulang hanya bila kepingan berubah */
function pick(ev){
 const b=pz.getBoundingClientRect();
 const x=ev.clientX-b.left,y=ev.clientY-b.top;
 let hit=-1;
 for(const p of pieces)
  if(x>=p.bx-cw*.15&&x<=p.bx+cw*1.15&&y>=p.by-ch*.15&&y<=p.by+ch*1.15) hit=p.i;
 if(hit===hover)return;
 if(hover>-1)pieces[hover].hov=0;
 hover=hit;
 if(hover>-1)pieces[hover].hov=1;
 draw();
}
pz.addEventListener('pointermove',pick,{passive:true});
pz.addEventListener('pointerdown',pick,{passive:true});
const clear=()=>{if(hover===-1)return;if(hover>-1)pieces[hover].hov=0;hover=-1;draw()};
pz.addEventListener('pointerleave',clear);
pz.addEventListener('pointercancel',clear);

img.onload=()=>{
 pz.style.aspectRatio=img.naturalWidth+'/'+img.naturalHeight;
 layout();
 let rt;const re=()=>{clearTimeout(rt);rt=setTimeout(layout,180)};
 addEventListener('resize',re);
 addEventListener('orientationchange',re);
};
img.src=pz.dataset.src;
})();
/* Music player: sembunyi setengah di kiri */
let hideT;const peek=()=>{P.classList.remove('open');P.classList.add('peek')};
const arm=()=>{clearTimeout(hideT);if(!P.classList.contains('open'))hideT=setTimeout(peek,5000)};
$('#disc').onclick=()=>{if(P.classList.contains('peek')){P.classList.remove('peek');arm();return}
 P.classList.toggle('open');arm()};
$('#hide').onclick=()=>{clearTimeout(hideT);peek()};
arm();


/* Hero X-ray: lensa mengikuti kursor/jari, jalan sendiri saat idle */
(function(){const x=$('#xray'),hero=$('#home');if(!x)return;let mx=0,my=0,tx=0,ty=0,last=-9999,vis=true;
 const pos=e=>{const r=x.getBoundingClientRect();tx=Math.min(Math.max(e.clientX-r.left,0),r.width);ty=Math.min(Math.max(e.clientY-r.top,0),r.height);last=performance.now()};
 hero.addEventListener('pointermove',pos);hero.addEventListener('pointerdown',pos);
 new IntersectionObserver(([e])=>vis=e.isIntersecting).observe(hero);
 (function f(t){if(vis){const r=x.getBoundingClientRect();if(t-last>2500){tx=r.width*(.5+.4*Math.sin(t/1700));ty=r.height*(.5+.36*Math.sin(t/1100+1))}
  mx+=(tx-mx)*.12;my+=(ty-my)*.12;x.style.setProperty('--mx',mx.toFixed(1)+'px');x.style.setProperty('--my',my.toFixed(1)+'px')}requestAnimationFrame(f)})(0)})();

/* Brief builder: susun brief -> email / salin */
(function(){const b=$('#brief');if(!b)return;
 const stackOf={'Company Profile':'Laravel · Blade · Tailwind CSS','E-Commerce':'Laravel · MySQL · Blade','Dashboard Admin':'Laravel · MySQL · JavaScript','REST API':'Laravel · Sanctum · Postman'};
 const val=k=>$$('[data-k="'+k+'"] .on',b).map(x=>x.textContent);
 const build=()=>{const t=val('type')[0],f=val('feat');
  return `# Project Brief\n\n- Jenis proyek : ${t}\n- Fitur        : ${f.length?f.join(', '):'(belum dipilih)'}\n- Timeline     : ${val('time')[0]}\n- Stack usulan : ${stackOf[t]}\n\nHalo Hardian, saya tertarik berdiskusi soal proyek ini.`};
 const render=()=>{const s=build();$('#brOut').textContent=s;$('#brSend').href='mailto:hardianr7@gmail.com?subject='+encodeURIComponent('Project Brief: '+val('type')[0])+'&body='+encodeURIComponent(s)};
 b.addEventListener('click',e=>{const btn=e.target.closest('.br-g button');if(!btn)return;const g=btn.parentElement;
  if('single' in g.dataset)$$('button',g).forEach(x=>x.classList.toggle('on',x===btn));else btn.classList.toggle('on');render()});
 $('#brCopy').onclick=()=>{navigator.clipboard?.writeText($('#brOut').textContent);$('#brCopy').textContent='Tersalin ✓';setTimeout(()=>$('#brCopy').textContent='Salin brief',1800)};
 render()})();


/* API Playground: request simulasi dengan respons JSON bergaya terminal */
(function(){const side=$('#apiSide');if(!side)return;let cur='profile',timer,wait;
 const ep={profile:['GET','/api/profile',()=>({name:'Hardian Ramadan',role:'Fullstack Developer',education:'SMK Rekayasa Perangkat Lunak',focus:['Laravel','MySQL','REST API'],open_to_work:true})],
  skills:['GET','/api/skills',()=>({count:skills.length,data:skills.map(s=>({name:s[1],category:s[3]}))})],
  projects:['GET','/api/projects',()=>({count:projects.length,data:projects.map(p=>({title:p.t,type:p.type,tech:p.tech}))})],
  contact:['POST','/api/contact',()=>({status:'success',message:'Pesan diterima. Hardian akan membalas secepatnya.',reply_to:'hardianr7@gmail.com'})]};
 const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
 const hl=s=>esc(s).replace(/("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|(-?\b\d+\.?\d*\b)/g,(m,str,col,bool)=>str?(col?`<span class="jk">${str}</span>${col}`:`<span class="js">${str}</span>`):bool?`<span class="jb">${m}</span>`:`<span class="jn">${m}</span>`);
 function send(){clearInterval(timer);clearTimeout(wait);const e=ep[cur],st=$('#apiStatus'),out=$('#apiOut');
  $('#apiUrl').textContent=e[0]+' '+e[1];st.className='wait';st.textContent='SENDING…';$('#apiTime').textContent='';out.innerHTML='';
  const ms=Math.round(28+Math.random()*60);
  wait=setTimeout(()=>{const txt=JSON.stringify(e[2](),null,2);st.className='ok';st.textContent=e[0]==='POST'?'201 Created':'200 OK';$('#apiTime').textContent=ms+' ms';let i=0;
   timer=setInterval(()=>{i+=6;out.innerHTML=hl(txt.slice(0,i))+'<span class="caret">▍</span>';if(i>=txt.length){clearInterval(timer);out.innerHTML=hl(txt)}},16)},ms*7)}
 side.onclick=e=>{const b=e.target.closest('button');if(!b)return;cur=b.dataset.e;$$('button',side).forEach(x=>x.classList.toggle('on',x===b));send()};
 $('#apiSend').onclick=send;
 new IntersectionObserver(([e],o)=>{if(e.isIntersecting){send();o.disconnect()}},{threshold:.3}).observe($('.api'));
})();