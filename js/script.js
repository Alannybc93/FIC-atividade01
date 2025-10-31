const menuBtn = document.getElementById('menuBtn');
const nav = document.querySelector('.nav');
if(menuBtn){
  menuBtn.addEventListener('click', ()=> {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.gap = '12px';
  });
}

document.getElementById('ano')?.appendChild(document.createTextNode(new Date().getFullYear()));
document.getElementById('ano2')?.appendChild(document.createTextNode(new Date().getFullYear()));
document.getElementById('ano3')?.appendChild(document.createTextNode(new Date().getFullYear()));

const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !email || !message){
      alert('Preencha todos os campos antes de enviar.');
      return;
    }

    alert('Mensagem enviada! (simulação)');
    form.reset();
  });
}


const photoInput = document.getElementById('photo');
if(photoInput){
  photoInput.addEventListener('change', ()=>{
    if(photoInput.files.length > 0){
      alert('Foto selecionada: ' + photoInput.files[0].name);
    }
  });
}
