document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const previewContainer = document.getElementById('preview-container');
    const formatSelect = document.getElementById('format-select');
    const convertBtn = document.getElementById('convert-btn');
    const themeToggle = document.getElementById('theme-toggle');
    
    // Open file explorer when clicking on drag and drop area
    dropArea.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file drag and drop
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('drag-over');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('drag-over');
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    // Handle file selection
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            handleFile(fileInput.files[0]);
        }
    });

    function handleFile(file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = document.createElement('img');
                img.id = 'preview-img';
                img.src = reader.result;
                img.classList.add('image-preview');
                
                const fileName = document.createElement('p');
                fileName.classList.add('file-name');
                fileName.textContent = file.name;

                previewContainer.innerHTML = '';
                previewContainer.appendChild(img);
                previewContainer.appendChild(fileName);
                previewContainer.style.display = 'block';
                dropArea.style.display = 'none';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a valid image file.');
        }
    }

    convertBtn.addEventListener('click', () => {
        const file = document.getElementById('preview-img');
        const format = formatSelect.value;
        if (file) {
            // Convert and download the image
            convertAndDownloadImage(file.src, format);
        }
    });

    function convertAndDownloadImage(imgSrc, format) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // To handle CORS issues

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `converted.${format}`;
                link.click();
            }, `image/${format}`);
        };

        img.src = imgSrc;
    }

    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-theme');
    });
});
