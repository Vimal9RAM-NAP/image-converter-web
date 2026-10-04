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


    if (formatSelect === 'image/svg+xml') {
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

            
                const dataUrl = canvas.toDataURL('image/png');
                const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}">
                    <image href="${dataUrl}" width="${img.width}" height="${img.height}"/>
                </svg>`;

                const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = 'converted.svg';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
        return;
    }


    reader.onload = function (event) {
        let imageSrc = event.target.result;


        if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
            const svgBlob = new Blob([event.target.result], { type: 'image/svg+xml;charset=utf-8' });
            imageSrc = URL.createObjectURL(svgBlob);
        }

        const img = new Image();
        img.onload = function () {
            canvas.width = img.width || 800;
            canvas.height = img.height || 600;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (formatSelect === 'image/jpeg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);


            const convertedDataUrl = canvas.toDataURL(formatSelect, qualityRange);

            const ext = formatSelect.split('/')[1].replace('+xml', '');
            const downloadLink = document.createElement('a');
            downloadLink.href = convertedDataUrl;
            downloadLink.download = `converted.${ext === 'jpeg' ? 'jpg' : ext}`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
                URL.revokeObjectURL(imageSrc);
            }
        };
        img.src = imageSrc;
    };


    if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
        reader.readAsText(file);
    } else {
        reader.readAsDataURL(file);
    }
});