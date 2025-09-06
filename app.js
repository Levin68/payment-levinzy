/* Dark Mode Toggle */
(function(){
  const btn = document.getElementById('darkToggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
    btn && (btn.textContent = '☀️');
  }
  btn?.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    btn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
})();

/* Toast */
function showToast(message, color){
  let c = document.getElementById('toast-container');
  if(!c){
    c = document.createElement('div');
    c.id = 'toast-container';
    c.className = 'toast-container';
    document.body.appendChild(c);
  }
  const t = document.createElement('div');
  t.className = 'toast toast-show';
  t.style.borderLeft = '4px solid ' + (color || '#ec4899');
  t.textContent = message;
  c.appendChild(t);
  setTimeout(()=>{ t.classList.remove('toast-show'); t.classList.add('toast-hide'); }, 2000);
  setTimeout(()=>{ c.removeChild(t); }, 2200);
}

/* Ripple tipis */
function addRipple(el){
  el.addEventListener('click', function(e){
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const r = document.createElement('span');
    r.className = 'ripple';
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size/2) + 'px';
    r.style.top  = (e.clientY - rect.top  - size/2) + 'px';
    el.appendChild(r);
    setTimeout(()=> r.remove(), 650);
  }, { passive:true });
}
document.querySelectorAll('.box-button,.rules-button').forEach(addRipple);

/* Copy nomor */
function copyById(id, btn){
  const el = document.getElementById(id);
  if(!el) return;
  el.focus(); el.select(); el.setSelectionRange(0, el.value.length);

  let ok = false;
  try { ok = document.execCommand('copy'); } catch(e) { ok = false; }

  const finish = (success)=>{
    if(btn){
      const prev = btn.innerHTML;
      btn.disabled = true; btn.style.opacity = .9;
      btn.innerHTML = success ? 'Tersalin!' : 'Gagal';
      setTimeout(()=>{ btn.innerHTML = prev; btn.disabled = false; btn.style.opacity = 1; }, 1000);
    }
    showToast(success ? 'Nomor berhasil disalin' : 'Gagal menyalin. Coba manual ya.', success ? '#10b981' : '#ef4444');
  };

  if(ok){ finish(true); return; }
  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(el.value).then(()=>finish(true), ()=>finish(false));
  } else {
    finish(false);
  }
}