const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
/*mongoose.connect("mongodb://localhost:27017/BProje",{useNewUrlParser:true,useUnifieldTopology:true})

.then ((result)=>console.log('bağlandı'))
.catch((err)=>console.log(err))

*/

mongoose.connect('mongodb://127.0.0.1:27017/BProje',(err)=>{
    if(!err) console.log('bağlandı');
    else console.log('hata');
})
const db=mongoose.connection;

const Schema=new mongoose.Schema;

const userSchema=new mongoose.Schema({
    isim:{type:String,required:true},
    soyisim:{type:String,required:true}
});


//bu şemayı bir model için rezerve etmeliyiz 

var User=mongoose.model('User',userSchema);



//const Note=mongoose.model('Note',yeniSchema);


app.get('/',(req,res)=>{
    res.sendFile (__dirname+"/index.html");

})

app.post('/',(req,res)=>{
  new User({
      isim:req.body.isim,
      soyisim:req.body.soyisim
  }).save((err)=>{
        if(err){
            throw error;
        }
        console.log ('eklendi');
    });
   

    console.log(req.body);
    res.redirect('/')
})

app.listen(3000, ()=>{
    console.log('3000 den dinleniyor');
});