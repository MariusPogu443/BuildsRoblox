const radios = document.querySelectorAll('.radio');

radios.forEach(radio => {
    radio.addEventListener('change', function () {
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
const resetButton = document.getElementById('resetButton');
const mediaPreview = document.getElementById('imagePreview');
const titreMedia = document.querySelector('.titre-image');

let imageCount = 0;
let videoCount = 0;

fileInput.addEventListener('change', function () {
    const files = fileInput.files;

    // Efface le contenu précédent de la prévisualisation
    mediaPreview.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Crée un élément pour chaque fichier sélectionné
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.classList.add('preview-media');
            mediaPreview.appendChild(img);
            imageCount++;
        } else if (file.type.startsWith('video/')) {
            videoCount++;
        }
    }

    titreMedia.textContent = imageCount > 0 ? `${imageCount} images sélectionnées` : 'Aucune image sélectionnée';
    if (videoCount > 0) {
        titreMedia.textContent += ` et ${videoCount} vidéo${videoCount > 1 ? 's' : ''} sélectionnée${videoCount > 1 ? 's' : ''}`;
    }
});

resetButton.addEventListener('click', function () {
    // Réinitialise le champ de sélection de fichiers et efface la prévisualisation
    fileInput.value = '';
    mediaPreview.innerHTML = '';
    titreMedia.textContent = 'Aucun fichier sélectionné';
    // Réinitialise les compteurs
    imageCount = 0;
    videoCount = 0;
});
