const fileInput = document.getElementById('file-input');
const fileLabel = document.getElementById('file-label');
const formatSelect = document.getElementById('format-select');
const qualityContainer = document.getElementById('quality-container');
const qualityRange = document.getElementById('quality-range');
const qualityVal = document.getElementById('quality-val');
const dropZone = document.getElementById('drop-zone');


fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        fileLabel.innerText = `Selected: ${e.target.files[0].name}`;
    }
});


qualityRange.addEventListener('input', (e) => {
    qualityVal.innerText = `${e.target.value}%`;
});


formatSelect.addEventListener('change', (e) => {
    if (e.target.value === 'image/png') {
        qualityContainer.style.display = 'none';
    } else {
        qualityContainer.style.display = 'block';
    }
});


['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.add('border-indigo-500', 'bg-gray-700');
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-indigo-500', 'bg-gray-700');
    }, false);
});

dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
        fileInput.files = files;
        fileLabel.innerText = `Selected: ${files[0].name}`;
    }
});