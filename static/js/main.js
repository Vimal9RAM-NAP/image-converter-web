function updateFileName(input) {
    const label = document.getElementById('file-label');
    if (input.files && input.files[0]) {
        label.innerText = `Selected: ${input.files[0].name}`;
    }
}

function toggleQualitySlider(format) {
    const qualityContainer = document.getElementById('quality-container');
    if (format === 'WEBP' || format === 'JPEG') {
        qualityContainer.style.display = 'block';
    } else {
        qualityContainer.style.display = 'none';
    }
}