document.getElementById('converter-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('file-input');
    const formatSelect = document.getElementById('format-select').value;
    const qualityRange = document.getElementById('quality-range').value / 100;
    const canvas = document.getElementById('conversion-canvas');
    const ctx = canvas.getContext('2d');

    if (!fileInput.files || !fileInput.files[0]) {
        alert('Please select an image file first.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;

            
            if (formatSelect === 'image/jpeg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0);

    
            const convertedDataUrl = canvas.toDataURL(formatSelect, qualityRange);

           
            const ext = formatSelect.split('/')[1];
            const downloadLink = document.createElement('a');
            downloadLink.href = convertedDataUrl;
            downloadLink.download = `converted.${ext === 'jpeg' ? 'jpg' : ext}`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
});