const Project = require('../models/projectModel')
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

require('dotenv').config()
const password = process.env.PASS


//firebase
admin.initializeApp({
  credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newlines
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  storageBucket: 'gs://portfolio-4bba7.appspot.com'   //process.env.FIREBASE_BUCKET_NAME // Set your bucket name here
});
const bucket = admin.storage().bucket();


const add_project = async (req, res) => {

    try {
      const { title, description, url, technologies, type } = req.body;
  
      // Check if the image has been uploaded
      if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
      }
  
      // Upload the image to Firebase Storage
      const blob = bucket.file(req.file.originalname); // Use original filename
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });
  
      // Return the URL of the uploaded image
      const uploadPromise = new Promise((resolve, reject) => {
        blobStream.on('error', (err) => {
          console.error(err);
          reject(err);
        });
  
        blobStream.on('finish', async () => {
          // The file upload is complete, get the public URL
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
          resolve(imageUrl);
        });
  
        blobStream.end(req.file.buffer); // End the stream with the file buffer
      });
  
      // Wait for the upload to complete
      const imageUrl = await uploadPromise;
  
      // Create and save the new project
      const newProject = new Project({
        title,
        description,
        url,
        technologies,
        type,
        imageUrl // Store the Firebase image URL
      });
  
      const savedProject = await newProject.save();
  
      res.status(201).json({
        message: 'Project uploaded successfully',
        project: savedProject
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
    
// const add_project = async (req, res) => {
//     try {
//         const { title, description, url, technologies, type } = req.body;
//         const imageUrl = req.file.path;
    
//         const newProject = new Project({
//           title,
//           description,
//           url,
//           technologies,
//           type,
//           imageUrl
//         });
    
//         const savedProject = await newProject.save();
    
//         res.status(201).json({
//           message: 'Project uploaded successfully',
//           project: savedProject
//         });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//       }
// }

const get_project = (req, res) => {
    const id = req.params.id
    Project.findById(id)
    .then(result => res.json(result))
}

const delete_project = (req, res) => {
    const id = req.params.id
    Project.findByIdAndDelete(id)
    .then(result => res.json(result))
}

const update_project = (req, res) => {
    const id = req.params.id
    Project.findByIdAndUpdate(id, req.body)
    .then(result => res.json(result))
}

const all_projects = (req, res) => {
    Project.find()
    .then(result => res.json(result))
}

const sign = (req, res) => {
    const inputPassword = req.body.password
    
    if(inputPassword === password){
        res.json({ correct: true })
    }else{
        res.json({ correct: false })
    }

}

const contact = async (req, res) => {

    
    
    const { name, email, message } = req.body;
    console.log(req.body);
    const html = `
        <h1>Hi, I am ${name}</h1>
        <p>${message}</p>
        <p>email: ${email}</p>
    `

    try {
        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for port 465, false for other ports
            auth: {
              user: "notloki911@gmail.com",
              pass: process.env.APP_PASS,
            },
        });
        // Define the email options
        let mailOptions = {
            from: {
                name: name,
                address: email
            }, // sender address
            to: ['mohayyad2.0@gmail.com', 'moheyyad2006@gmail.com'], // your email address
            subject: `New Contact Form Submission from ${name}`,
            // text: message,
            html: html
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        
        res.status(200).json('Email sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).json('Something went wrong. Please try again later.');
    }
}

module.exports = {
    add_project,
    get_project,
    delete_project,
    update_project,
    all_projects,
    sign,
    contact
}
