const radios = document.querySelectorAll('.radio');

radios.forEach(radio => {
    radio.addEventListener('change', function() {
        const choixDivs = document.querySelectorAll(`[name="${this.name}"]`); // Sélectionne tous les éléments ayant le même attribut name
        choixDivs.forEach(choixDiv => {
            choixDiv.closest('.choix').classList.remove('selected'); // Retire la classe selected de tous les choix du même groupe
        });

        const choixDiv = this.closest('.choix');
        if (this.checked) {
            choixDiv.classList.add('selected'); // Ajoute la classe selected à l'élément sélectionné
        }
    });
});

const textarea = document.querySelector('.textarea-textbox');

textarea.addEventListener('keyup', e => {
    textarea.style.height = "38px";
    let scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;
})

const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const titreImage = document.querySelector('.titre-image');

fileInput.addEventListener('change', function () {
  imagePreview.innerHTML = ''; // Réinitialise le contenu pour éviter d'afficher les anciennes images

  const files = fileInput.files;
  titreImage.textContent = files.length > 0 ? `${files.length} images sélectionnés` : 'Aucun fichier sélectionné';

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // Crée un élément image pour chaque fichier sélectionné
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.classList.add('preview-image');

    // Ajoute l'image à la div d'aperçu
    imagePreview.appendChild(img);
  }
});


