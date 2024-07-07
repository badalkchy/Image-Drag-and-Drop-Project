document.addEventListener('DOMContentLoaded', (event) => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const removeButton = document.getElementById('remove-button');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropZone.addEventListener('drop', handleDrop, false);
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFiles, false);

    // Remove image on button click
    removeButton.addEventListener('click', () => {
        dropZone.innerHTML = '<p>Drag and drop an image here</p>';
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropZone.classList.add('highlight');
    }

    function unhighlight() {
        dropZone.classList.remove('highlight');
    }

    function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;

        handleFiles({ target: { files } });
    }

    function handleFiles(e) {
        let files = e.target.files;
        [...files].forEach(previewFile);
    }

    function previewFile(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let img = document.createElement('img');
            img.src = reader.result;
            dropZone.innerHTML = '';
            dropZone.appendChild(img);
        }
    }
});
