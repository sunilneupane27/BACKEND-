var express = require("express")
let Books = require('./BooksSchema')
let mongodbConnected=require('./MongoDBConnect')
const cors = require('cors');
var app =express()
var bodyparser=require("body-parser")
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors());
console.log("BOOKS",Books)
app.get('/',function(req,res){
})
app.get('/about',function (req,res){
res.send("mongodb express React and mongoose app,React runs in another application")
Books.countDocuments().exec()
 .then(count=>{
 console.log("Total documents Count before addition :", count)


 }) .catch(err => { 
     console.error(err)
 })

})
app.get('/allbooks1',async(req,res)=>{
 const d= await Books.find();
 return res.json(d)
 })
app.get('/getbook/:id',function(req, res) {
 let id = req.params.id;
 Books.findById(id, function(err, book) {
 res.json(book);
 });
 });
app.post('/addbooks', function(req,res)
 {
 console.log("Ref",req.body)
 let newbook = new Books(req.body);
 console.log("newbook->",newbook)
 newbook.save()
 .then(todo => {
 res.status(200).json({'books': 'book added successfully'});
 })
 .catch(err => {
 res.status(400).send('adding newbook failed');
 });
})
