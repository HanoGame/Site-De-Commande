function showMsg(text, isError=false){
  const msgEl = document.getElementById('msg');
  if(!msgEl) return;
  msgEl.textContent = text;
  msgEl.style.color = isError ? '#e74c3c' : '#1e7e34';
  msgEl.style.background = isError ? 'rgba(231,76,60,0.08)' : 'rgba(40,167,69,0.1)';
  msgEl.style.borderLeft = `4px solid ${isError ? '#e74c3c' : '#1e7e34'}`;
  msgEl.style.display = 'block';
  setTimeout(()=>{ msgEl.style.display = 'none'; }, 3500);
}

document.getElementById('orderForm').addEventListener('submit', async function(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  if(!name){ alert('Veuillez indiquer votre pr�nom'); return; }
  const inputs = document.querySelectorAll('[data-id]');
  const items = [];
  inputs.forEach(inp => {
    const id = inp.getAttribute('data-id');
    const qty = Number(inp.value) || 0;
    if(qty>0) items.push({ id, qty });
  });
  if(items.length===0){ if(!confirm('Aucune quantité sélectionnée. Envoyer quand même ?')) return; }

  try{
    const res = await fetch('/api/order', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name, items })
    });
    const j = await res.json();
    if(j.ok){
      showMsg('✅ Commande envoyée. Merci !');
      document.getElementById('orderForm').reset();
      document.querySelectorAll('[data-id]').forEach(i=>i.value=0);
      updateSummary();
    } else {
      showMsg('Erreur : ' + (j.error||''), true);
    }
  }catch(err){
    showMsg('Erreur réseau : ' + err.message, true);
  }
});

// filter cards when typing in header search
const searchInput = document.querySelector('.drive-search');
if(searchInput){
  searchInput.addEventListener('input', e=>{
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.dish-card').forEach(card=>{
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(term)?'flex':'none';
    });
  });
}
