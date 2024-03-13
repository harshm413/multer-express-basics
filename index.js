const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        ); // Generate a unique filename
    },
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post(
    '/submit',
    upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'favImages' }]),
    (req, res) => {
        const { name, age } = req.body;
        const avatarFile = req.files['avatar'][0];
        const favImages = req.files['favImages'];

        console.log('Name:', name);
        console.log('Age:', age);
        console.log('Avatar File:', avatarFile);
        console.log('Favorite Images Details:');
        favImages.forEach((file) => {
            console.log(file);
        });
        res.send('Form submitted successfully!');
    }
);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
