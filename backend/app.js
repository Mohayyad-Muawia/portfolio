require('dotenv').config();
const port = process.env.PORT || 5000; // Default to 5000 if PORT is not set
const dbUrl = process.env.DB_URL;

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const projectsRoutes = require('./routes/projectsRoutes');
const { add_project } = require('./controllers/projectsController');

const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');

// CORS configuration
app.use(cors());
app.use(compression());


// firebase and multer
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage(); // Store the file in memory instead of the filesystem
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const mimeType = allowedTypes.test(file.mimetype);
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimeType && extName) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
    }
});


app.post('/add', upload.single('image'), add_project);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/imgs', express.static(path.join(__dirname, 'imgs')));

app.use('/projects', projectsRoutes);

mongoose.connect(dbUrl)
    .then(() => {
        app.listen(port, '0.0.0.0', () => {
            console.log(`Listening on port ${port}...`);
        });
    })
    .catch(err => console.log(err));
