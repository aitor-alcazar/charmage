document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('drop-area');
    const previewContainer = document.getElementById('preview-container');
    const formatSelect = document.getElementById('format-select');
    const convertBtn = document.getElementById('convert-btn');
    const themeToggle = document.getElementById('theme-toggle');

    dropArea.addEventListener('click', () => {
        document.getElementById('file-input').click();
    });

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
            // Logic to convert and download the image
        }
    });

    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-theme');
    });
});
