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
  if(items.length===0){ if(!confirm('Aucune quantit� s�lectionn�e  envoyer quand m�me ?')) return; }

  try{
    const res = await fetch('/api/order', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name, items })
    });
    const j = await res.json();
    if(j.ok){
      document.getElementById('msg').textContent = 'Commande enregistr�e  merci !';
      document.getElementById('orderForm').reset();
      document.querySelectorAll('[data-id]').forEach(i=>i.value=0);
    } else {
      document.getElementById('msg').textContent = 'Erreur: ' + (j.error||'');
    }
  }catch(err){
    document.getElementById('msg').textContent = 'Erreur r�seau: ' + err.message;
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
