const Project = require('../models/projectModel')
const nodemailer = require('nodemailer');

require('dotenv').config()
const password = process.env.PASS

const add_project = async (req, res) => {
    try {
        const { title, description, url, technologies, type } = req.body;
        const imageUrl = req.file.path;
    
        const newProject = new Project({
          title,
          description,
          url,
          technologies,
          type,
          imageUrl
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
}

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