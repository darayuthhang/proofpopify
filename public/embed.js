(function(){
var d=document,w=window;
function E(t,s,p){var e=d.createElement(t);if(s)for(var k in s)e.style[k]=s[k];if(p)p.appendChild(e);return e}
function hexYIQ(h){h=h.replace('#','');var r=parseInt(h.substr(0,2),16),g=parseInt(h.substr(2,2),16),b=parseInt(h.substr(4,2),16);return((r*299)+(g*587)+(b*114))/1000}

class ProofPopifyWidget{
constructor(){
this.tx=[];this.ci=0;this.vis=false;this.cyc=null;
this.tc='#00B4D8';this.bg='#ffffff';this.at='subscribed';
this.rn=true;this.si=true;this.sb=true;this.sc=true;
this.pos='bottom-left';this.avBase="https://api.dicebear.com/9.x/micah/svg?backgroundColor=transparent&seed=";
this.hfs='14px';this.bfs='12px';this.el={};this.pp='20px';
this.init();
}

init(){
var s=d.currentScript||d.querySelector('script[data-proofpopify]')||d.querySelector('script[src*="embed.js"]');
if(!s){console.error("ProofPopify: Script tag not found.");return}
this.url=new URL(s.getAttribute('src'),w.location.href);
this.sid=this.url.searchParams.get('id');
this.tst=this.url.searchParams.get('test')==='true';
this.api=this.url.origin;
if(!this.sid){console.error("ProofPopify: Missing 'id' parameter.");return}
this.css();this.dom();this.fetch();
}

css(){
if(d.getElementById('ppfy-s'))return;
var s=d.createElement('style');s.id='ppfy-s';
s.textContent='@keyframes ppfy-sl{from{opacity:0;transform:translateX(-120%)}to{opacity:1;transform:translateX(0)}}@keyframes ppfy-sr{from{opacity:0;transform:translateX(120%)}to{opacity:1;transform:translateX(0)}}@keyframes ppfy-ol{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(-120%)}}@keyframes ppfy-or{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(120%)}}@keyframes ppfy-p{0%{transform:scale(1)}50%{transform:scale(1.15)}100%{transform:scale(1)}}@keyframes ppfy-sh{0%{background-position:-200% 0}100%{background-position:200% 0}}#ppfy-c.ppfy-in-l{animation:ppfy-sl .5s ease-out forwards}#ppfy-c.ppfy-in-r{animation:ppfy-sr .5s ease-out forwards}#ppfy-c.ppfy-out-l{animation:ppfy-ol .5s ease-in forwards}#ppfy-c.ppfy-out-r{animation:ppfy-or .5s ease-in forwards}@media(max-width:640px){#ppfy-c{left:12px!important;right:auto!important}#ppfy-c.mob-b{bottom:12px!important;top:auto!important}#ppfy-c.mob-t{top:12px!important;bottom:auto!important}#ppfy-c>div{width:max-content!important;max-width:280px!important;padding:8px 10px!important;box-sizing:border-box}#ppfy-c p{font-size:12px!important}#ppfy-c span,#ppfy-c a{font-size:10px!important}#ppfy-c svg{width:12px!important;height:12px!important}#ppfy-aw{width:32px!important;height:32px!important;font-size:16px!important;border-radius:8px!important}}';
d.head.appendChild(s);
}

dom(){
var el=this.el;
el.ctr=E('div',{position:'fixed',zIndex:'999999',opacity:'0',pointerEvents:'none',fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif'});
el.ctr.id='ppfy-c';

el.card=E('div',{backgroundColor:this.bg,padding:'10px 14px',display:'flex',alignItems:'center',gap:'12px',width:'max-content',maxWidth:'370px',boxSizing:'border-box',position:'relative',overflow:'hidden'},el.ctr);

el.shim=E('div',{position:'absolute',top:'0',left:'0',right:'0',bottom:'0',background:'linear-gradient(90deg,transparent 0%,rgba(255,255,255,.08) 50%,transparent 100%)',backgroundSize:'200% 100%',animation:'ppfy-sh 2s ease-in-out .5s 1',pointerEvents:'none',borderRadius:'14px'},el.card);

el.avw=E('div',{width:'42px',height:'42px',borderRadius:'50%',display:'none',alignItems:'center',justifyContent:'center',flexShrink:'0',position:'relative',overflow:'hidden',backgroundColor:'#f3f4f6'},el.card);
el.avw.id='ppfy-aw';

el.avi=E('img',{width:'100%',height:'100%',objectFit:'cover'},el.avw);

var tc=E('div',{display:'flex',flexDirection:'column',gap:'3px',position:'relative'},el.card);

el.tr=E('p',{margin:'0',fontSize:this.hfs,fontWeight:'500',color:'#374151',lineHeight:'1.4'},tc);

el.ns=d.createElement('span');el.ns.style.fontWeight='700';
el.itn=d.createTextNode(' in ');
el.ls=d.createElement('span');el.ls.style.fontWeight='600';
el.atn=d.createTextNode(' '+this.at);
el.tr.append(el.ns,el.itn,el.ls,el.atn);

var mr=E('div',{display:'flex',alignItems:'center',gap:'6px',marginTop:'2px'},tc);

el.ts=E('span',{fontSize:'12px',color:'#6b7280',display:'flex',alignItems:'center',gap:'3px'},mr);
E('span',{width:'3px',height:'3px',borderRadius:'50%',backgroundColor:'#d1d5db',flexShrink:'0'},mr);

el.vl=d.createElement('a');
el.vl.href=this.api+'/verified';el.vl.target='_blank';el.vl.rel='noreferrer';
Object.assign(el.vl.style,{display:'flex',alignItems:'center',gap:'3px',textDecoration:'none',cursor:'pointer',transition:'opacity .2s',opacity:'0.7'});
el.vl.onmouseover=function(){this.style.opacity='1'};
el.vl.onmouseout=function(){this.style.opacity='0.7'};

el.vi=E('div',{display:'flex',alignItems:'center'},el.vl);
el.vi.innerHTML='<svg style="width:14px;height:14px" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 15l-4-4 1.41-1.41L11 13.17l6.59-6.59L19 8l-8 8z"/></svg>';

el.vt=E('span',{fontSize:'11px',display:'flex',gap:'2px',alignItems:'center'},el.vl);
mr.appendChild(el.vl);
d.body.appendChild(el.ctr);
}

sty(){
var el=this.el,c=el.card,ctr=el.ctr;
c.style.backgroundColor=this.bg;
if(this.sb){
c.style.border='2px solid #000';c.style.borderRadius='6px';
c.style.boxShadow='4px 4px 0 0 rgba(0,0,0,1)';
el.avw.style.border='1px solid #000';el.avw.style.boxShadow='none';
if(el.shim)el.shim.style.display='none';
}else{
c.style.border='1px solid '+(hexYIQ(this.bg)>=128?'#e5e7eb':'#374151');
c.style.borderRadius='14px';
c.style.boxShadow='0 20px 30px -8px rgba(0,0,0,.12),0 8px 16px -4px rgba(0,0,0,.08)';
el.avw.style.border='2px solid #fff';el.avw.style.boxShadow='0 2px 5px rgba(0,0,0,.05)';
if(el.shim)el.shim.style.display='block';
}
var txt=hexYIQ(this.bg)>=128?'#374151':'#f3f4f6';
el.tr.style.color=txt;el.ts.style.color=txt;el.ts.style.opacity='0.8';
el.vl.style.opacity='1';el.vt.style.color=txt;el.vi.style.color=this.tc;
var sImg='<img src="'+this.api+'/stripe-logo.svg" alt="Stripe" style="height:13px;width:auto;vertical-align:middle;display:inline-block">';
if(this.tst||this.dm){
el.vt.innerHTML='<span>Verified by</span>'+sImg;
}else{
el.vt.innerHTML='<span>Verified by</span>'+sImg;
}
el.avw.style.display=this.si?'flex':'none';
Object.assign(ctr.style,{top:'auto',bottom:'auto',left:'auto',right:'auto'});
ctr.classList.remove('mob-t','mob-b');
ctr.classList.add(this.pos.includes('top')?'mob-t':'mob-b');
var p=this.pos,px=this.pp;
if(p==='top-left'){ctr.style.top=px;ctr.style.left=px}
else if(p==='top-right'){ctr.style.top=px;ctr.style.right=px}
else if(p==='bottom-right'){ctr.style.bottom=px;ctr.style.right=px}
else{ctr.style.bottom=px;ctr.style.left=px}
}

show(){
if(!this.tx.length)return;
var t=this.tx[this.ci],el=this.el,dn=this.rn?(t.name||'Someone'):'Someone';
this.sty();
el.avi.src=this.avBase+encodeURIComponent(dn);
el.avi.style.animation='none';el.avi.offsetHeight;
el.avi.style.animation='ppfy-p .6s ease-in-out .2s 1';
el.atn.nodeValue=' '+this.at;
el.ns.innerText=dn;
var loc='';
if(this.sc&&t.city&&t.city!=='Unknown City')loc=t.city+' ('+( t.country||'Unknown')+')';
else if(t.country)loc=t.country;
if(!loc){el.itn.nodeValue=' ';el.ls.style.display='none'}
else{el.itn.nodeValue=' in ';el.ls.style.display='inline';el.ls.innerText=loc;el.ls.style.color=this.tc}
el.ts.innerText=this.ago(t.created);
if(this.tst||this.dm)el.vl.href=this.api+'/verified?test=true';
else el.vl.href=this.api+'/verified?proof_id='+this.sid;
var c=el.ctr,isR=this.pos.includes('right');
c.classList.remove('ppfy-out-l','ppfy-out-r','ppfy-in-l','ppfy-in-r');
c.style.opacity='1';c.style.pointerEvents='auto';
c.classList.add(isR?'ppfy-in-r':'ppfy-in-l');
this.vis=true;
var self=this;
setTimeout(function(){
c.classList.remove('ppfy-in-l','ppfy-in-r');c.classList.add(isR?'ppfy-out-r':'ppfy-out-l');
setTimeout(function(){
c.style.opacity='0';c.style.pointerEvents='none';c.classList.remove('ppfy-out-l','ppfy-out-r');
self.vis=false;self.ci=(self.ci+1)%self.tx.length;
},500);
},4000);
}

async fetch(){
if(this.tst){
this.tx=[{name:'John Doe',city:'San Francisco',country:'United States',created:Math.floor(Date.now()/1000)-120}];
this.ov();this.cycle();return;
}
try{
var r=await window.fetch(this.api+'/api/public/transactions?proof_id='+this.sid);
if(!r.ok){var e=await r.json().catch(function(){return{}});console.error('ProofPopify: API '+r.status+' - '+(e.error||'Unknown'));return}
var j=await r.json();
if(j.transactions&&j.transactions.length>0){
this.tx=j.transactions;
if(j.themeColor)this.tc=j.themeColor;
if(j.backgroundColor)this.bg=j.backgroundColor;
if(j.actionText)this.at=j.actionText;
if(j.showRealNames!==undefined)this.rn=j.showRealNames;
if(j.showIcon!==undefined)this.si=j.showIcon;
if(j.showBorder!==undefined)this.sb=j.showBorder;
if(j.showCity!==undefined)this.sc=j.showCity;
if(j.position)this.pos=j.position;
if(j.avatarUrlBase)this.avBase=j.avatarUrlBase;
if(j.isDummy!==undefined)this.dm=j.isDummy;
this.cycle();
}else{console.warn('ProofPopify: No transactions found.')}
}catch(e){console.error('ProofPopify: Fetch error',e)}
}

ov(){
if(!this.tst)return;
var u=this.url.searchParams,g=function(k){return u.get(k)};
if(g('theme'))this.tc=decodeURIComponent(g('theme'));
if(g('bg'))this.bg=decodeURIComponent(g('bg'));
if(g('action'))this.at=decodeURIComponent(g('action'));
if(g('realNames')!==null)this.rn=g('realNames')==='true';
if(g('showIcon')!==null)this.si=g('showIcon')==='true';
if(g('showBorder')!==null)this.sb=g('showBorder')==='true';
if(g('showCity')!==null)this.sc=g('showCity')==='true';
if(g('position'))this.pos=g('position');
}

cycle(){
this.show();
var self=this;
this.cyc=setInterval(function(){
if(!d.body.contains(self.el.ctr)){clearInterval(self.cyc);return}
if(!self.vis)self.show();
},5000);
}

ago(ts){
var s=Math.floor(Date.now()/1000)-ts;
if(s<60)return'Just now';
var m=Math.floor(s/60);if(m<60)return m+' minutes ago';
var h=Math.floor(m/60);if(h<24)return h+' hours ago';
return Math.floor(h/24)+' days ago';
}
}
new ProofPopifyWidget();
})();
