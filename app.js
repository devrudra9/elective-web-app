const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Elective = require("./models/selective_model");

mongoose.connect("mongodb+srv://baranwalrudreshwar:Rdb3JKjhp0Wq9RF3@cluster0.4bvibng.mongodb.net/").then( () => {
    console.log('Database Connected too :D');
}).catch( (err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.redirect("/add-item");
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.urlencoded( { extended: true } ));

app.get("/show-submissions", async (req, res) => {
    const allSubmissions = await Elective.find({});
    // console.log(allSubmissions);
    res.render('all_submissions', { allSubmissions })
})

app.get('/add-item', (req, res) => {
    res.render("add_item");
})

app.post('/add-item', async (req, res) => {
    console.log(req.body);
    const { studentName, studentID, studentCGPA, email, subject1, subject2, subject3 } = req.body;

    const isdatastored = await Elective.create({ 
        name : studentName, 
        email: email, 
        stdID : studentID, 
        stdCGPA : studentCGPA, 
        subjects : [subject1, subject2, subject3]
    });

    if(!isdatastored) {
        console.log('Error Occured in add-item');
    }
    console.log('Data stored Success');
    res.redirect("/show-submissions")
});

app.get("/read-it/:id", async (req, res) => {
    const { id } = req.params;
    const item = await Elective.findById(id);
    // console.log(item);
    res.render('read_it', { item })
});

app.post("/delete-item/:id", async (req, res) => {
    const { id } = req.params;
    const deleteitem = await Elective.findByIdAndDelete(id);
    if(!deleteitem) {
        console.log('Item not deleted');
    }
    console.log('Item deleted');
    res.redirect("/show-submissions");
});

app.listen(3000, () => { 
    console.log('Server is up and running at port 3000') 
});