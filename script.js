// Exemple d'interaction simple pour l'animation au survol des cartes
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = imageSrc; // Charge l'image cliquée
    lightbox.style.display = 'flex'; // Affiche la lightbox
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none'; // Cache la lightbox
}
document.addEventListener("DOMContentLoaded", () => {
    // Lien direct vers votre PDF Dropbox
    const pdfURL = 'https://www.dropbox.com/scl/fi/29zhk1kdyl5kqpagz1n4n/M-moire-OpenStreetMap-Erwan-Levieux.pdf?rlkey=7y4ri84dcdkxruz45gddlcxja&st=2if2u9o6&raw=1'; // Remplacez ce lien

    const flipbook = document.getElementById('pdfBook');
    flipbook.innerHTML = ''; // Vide le conteneur pour ajouter les pages

    // Charger le PDF avec PDF.js
    const loadingTask = pdfjsLib.getDocument(pdfURL);
    loadingTask.promise.then(pdf => {
        // Nombre total de pages du PDF
        const numPages = pdf.51;

        // Pour chaque page du PDF, crée une div pour le flipbook
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            pdf.getPage(pageNum).then(page => {
                const viewport = page.getViewport({ scale: 1.5 }); // Ajuste le zoom
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                
                // Rendu de la page du PDF sur le canvas
                page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise.then(() => {
                    // Ajouter l'image (canvas) à Turn.js comme une page
                    const pageDiv = document.createElement('div');
                    pageDiv.classList.add('page');
                    pageDiv.appendChild(canvas);
                    flipbook.appendChild(pageDiv);

                    // Si toutes les pages sont chargées, initialiser Turn.js
                    if (pageNum === numPages) {
                        $('#pdfBook').turn({
                            width: 800,
                            height: 600,
                            autoCenter: true,
                            display: 'double',
                            duration: 1000
                        });
                    }
                });
            });
        }
    }).catch(error => {
        console.error('Erreur de chargement du PDF :', error);
    });
});
