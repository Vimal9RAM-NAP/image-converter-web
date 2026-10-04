const fileInput = document.getElementById('file-input');
const fileLabel = document.getElementById('file-label');
const formatSelect = document.getElementById('format-select');
const qualityContainer = document.getElementById('quality-container');
const qualityRange = document.getElementById('quality-range');
const qualityVal = document.getElementById('quality-val');
const dropZone = document.getElementById('drop-zone');

const emptyState = document.getElementById('empty-state');
const previewImg = document.getElementById('preview-img');
const metaBadges = document.getElementById('meta-badges');
const metaDim = document.getElementById('meta-dim');
const metaSize = document.getElementById('meta-size');

function handleFileSelection(file) {
    if (!file) return;

    fileLabel.innerText = file.name;
    const reader = new FileReader();

    reader.onload = (e) => {
        previewImg.src = e.target.result;
        previewImg.classList.remove('hidden');
        emptyState.classList.add('hidden');
        metaBadges.classList.remove('hidden');

        
        const tempImg = new Image();
        tempImg.onload = () => {
            metaDim.innerText = `${tempImg.width} x ${tempImg.height}px`;
            metaSize.innerText = `${(file.size / 1024).toFixed(1)} KB`;
        };
        tempImg.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
    }
});

qualityRange.addEventListener('input', (e) => {
    qualityVal.innerText = `${e.target.value}%`;
});

formatSelect.addEventListener('change', (e) => {
    if (e.target.value === 'image/png') {
        qualityContainer.style.opacity = '0.3';
        qualityContainer.style.pointerEvents = 'none';
    } else {
        qualityContainer.style.opacity = '1';
        qualityContainer.style.pointerEvents = 'auto';
    }
});


['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.add('dropzone-active');
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.remove('dropzone-active');
    }, false);
});

dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if (dt.files.length > 0) {
        fileInput.files = dt.files;
        handleFileSelection(dt.files[0]);
    }
});