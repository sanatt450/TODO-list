const express = require("express");
const bodyParser = require("body-parser");
// requireing mongoose
// const mongoose = require('mongoose');

const app = express();

app.use(express.static("public"));

// create item variable here so that it can use anywhere
const items = ["buy Food", "cook Food", "Eat Food"];
//  create array for workItem
let workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs"); // ejs

// // ****DATABASE CONNECTION****
// mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewurlParser: true});
 
// // creating a schema
// const ItemsSchema = new mongoose.Schema({
//     name : String
// });
// //creating a model
// const Item = mongoose.model("Item", ItemsSchema);

// // creating a 3 new document
// const item1 = new Item ({
//     name: "Bue food"
// })
// const item2 =  new Item({
//     name: "cook food"
// })
// const item3 = new Item({
//     name: "Eat Food"
// })
//  // creating a array which store these three items
// const defaultItems = [item1, item2, item3];
// // Use Insert Many and insert our array into Item collection
// Item.insertMany([defaultItems], (err) =>{
//     if(err) console.log(err);
//     else console.log("Successfully saved defaultItems in databas");
// });


app.get("/", (req, res) => {
    var today = new Date();
    //   initially we can do by using switch statement using currentDay = today.getDay() but it's to long so new method is write below
    var option = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    var day = today.toLocaleDateString("en-Us", option); // .toLocalDateString converts date to a string

    // res.render("list", { listTitle: day }); -- before adding newListItem
    res.render('list', {listTitle: day, newListItem: items}); // newListItem initialise below
});

app.post("/", (req, res) => {

    let item = req.body.newItem;

    // for work
    if(req.body.button == "work"){
        workItems.push(item);
        res.redirect('/work');
    }
    else{
    
    // items array  is initialse at top we add item in items array 
    items.push(item);


    // firsty we us to add list using ejs template res.render method but website crash so use this 
    res.redirect('/');
}

});

// work route
app.get("/work", (req,res) =>{
    res.render('list', {listTitle: "work List", newListItem: workItems});
});

app.post('/work', (req,res) =>{
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
})


app.listen(3000, () => {
    console.log("server is running at port 3000");
});
