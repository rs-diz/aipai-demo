(function(){
  var hdr=document.querySelector('header');
  addEventListener('scroll',function(){hdr.classList.toggle('scrolled',scrollY>10)},{passive:true});
  var burger=document.querySelector('.burger');
  burger.addEventListener('click',function(){var o=hdr.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
  document.querySelectorAll('.nav a').forEach(function(a){a.addEventListener('click',function(){hdr.classList.remove('open')})});

  // hero flow
  var stages=document.querySelectorAll('.stage'),dds=document.querySelectorAll('.fields dd'),human=document.querySelector('.human'),btn=document.querySelector('.confirm'),timers=[];
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function reset(){timers.forEach(clearTimeout);timers=[];stages.forEach(function(s){s.classList.remove('on')});dds.forEach(function(d){d.classList.remove('on')});human.classList.remove('done');btn.textContent='Подтвердить';human.querySelector('p').innerHTML='<b>Сотрудник проверяет</b><br>карточку перед записью в CRM'}
  function confirm(){human.classList.add('done');btn.textContent='Готово';human.querySelector('p').innerHTML='<b>Записано в CRM</b><br>подтвердил менеджер, 09:13'}
  function run(){reset();
    if(reduce){stages.forEach(function(s){s.classList.add('on')});dds.forEach(function(d){d.classList.add('on')});return}
    var t=300;
    timers.push(setTimeout(function(){stages[0].classList.add('on')},t));
    timers.push(setTimeout(function(){stages[1].classList.add('on')},t+=1100));
    dds.forEach(function(d){timers.push(setTimeout(function(){d.classList.add('on')},t+=380))});
    timers.push(setTimeout(function(){stages[2].classList.add('on')},t+=600));
  }
  btn.addEventListener('click',confirm);
  document.querySelector('.flow-replay').addEventListener('click',run);
  run();


  // neural net background
  (function(){var c=document.getElementById('net');if(!c)return;var x=c.getContext('2d'),w,h,dpr=Math.min(devicePixelRatio||1,2),pts=[];
    function size(){var r=c.getBoundingClientRect();w=r.width;h=r.height;c.width=w*dpr;c.height=h*dpr;x.setTransform(dpr,0,0,dpr,0,0);
      var n=Math.round(Math.min(90,w*h/14000));pts=[];for(var i=0;i<n;i++)pts.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25})}
    function draw(){x.clearRect(0,0,w,h);for(var i=0;i<pts.length;i++){var p=pts[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
      for(var j=i+1;j<pts.length;j++){var q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=dx*dx+dy*dy;if(d<17000){x.strokeStyle='rgba(110,140,255,'+(0.22*(1-d/17000))+')';x.lineWidth=1;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}
      x.fillStyle=i%7?'rgba(140,165,255,.55)':'rgba(83,224,230,.9)';x.beginPath();x.arc(p.x,p.y,i%7?1.4:2.2,0,6.3);x.fill()}
      if(!reduce)requestAnimationFrame(draw)}
    size();draw();addEventListener('resize',size);})();

  // solutions tabs
  var tabs=document.querySelectorAll('.sol-list button'),panels=document.querySelectorAll('.sol-card');
  tabs.forEach(function(b){b.addEventListener('click',function(){tabs.forEach(function(x){x.setAttribute('aria-selected','false')});b.setAttribute('aria-selected','true');panels.forEach(function(p){p.classList.toggle('active',p.dataset.panel===b.dataset.t)})})});

  // reviews
  var rv=document.querySelector('.reviews');
  document.querySelectorAll('.rev-nav button').forEach(function(b){b.addEventListener('click',function(){rv.scrollBy({left:+b.dataset.dir*(rv.clientWidth*.8),behavior:reduce?'auto':'smooth'})})});

  // demo form
  document.querySelector('.form').addEventListener('submit',function(e){e.preventDefault();this.querySelector('.form-msg').textContent='Это демо: форма ничего не отправляет.'});
})();
