var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');
var router = express.Router();
var multerS3 = require('multer-s3');
var multer = require('multer');



var URL='mongodb://abmnukmr:abmnukmr@ds149324.mlab.com:49324/med7';


const db = require('monk')(URL)

const doctor = db.get('doctor')
const doctor_search = db.get('doctor_search')

const hospital = db.get('hospital')
const hospital_search = db.get('hospital_search')

const chemist=db.get('chemist')
const chemist_search=db.get('chemist_search')

const ayurveda=db.get('ayurveda');
const ayurveda_serach=db.get('ayurveda_search');

const pathalogy=db.get('pathalogy');
const pathalogy_serach=db.get('pathalogy_search');

const homeo=db.get('homeyo');
const homeo_serach=db.get('homeopath_search');





aws.config.loadFromPath('./config.json');
aws.config.update({
    signatureVersion: 'v4'
});
var s0 = new aws.S3({})


var upload = multer({
    storage: multerS3({
        s3: s0,
        bucket: 'vioti',
        acl: 'public-read',
//       accessKeyId:'AKIAI3Q6TFHIZE67TWSQ',
        //     secretAccessKey: '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',

        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now()+file.originalname)
        }
    })
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// add a doctor

router.get('/add/doctor',function (req,res,next) {
    var d=new Date();
    var m=("0" + (d.getMonth() + 1)).slice(-2);
    var y=d.getFullYear();
    var d=("0" + (d.getDate() )).slice(-2);

    var item={
        "name":"asbkas",
        "email":"",
        "exper":"",
        "fee":"",
        "lic_no":" ",
        "spl":"",
        "date":y.toString()+m.toString()+d.toString(),
        "address":"",
        "lat":"",
        "show":"false",
        "lng":"",
        "phone":"",
        "sun_time":"",
        "mon_time":"",
        "tue_time":"",
        "wed_time":"",
        "thu_time":"",
        "fri_time":"",
        "sat_time":"",
       }
    doctor_search.update({"search":"gogolio"},{$push:{"docters":item}},false ,
        true,function (req,res) {


      if(err){
        console.log(err)
      }
      else  console.log("sucesssfully added doctor_search")

      })

    doctor.insert(item,function (req,res) {
        if(err){
            console.log(err)
        }
        else  console.log("sucesssfully added doctor")

    })



    res.send("insertion successfully");

})




////add a hospital

router.get('/add/hospital',function (req,res,next) {
    var d=new Date();
    var m=("0" + (d.getMonth() + 1)).slice(-2);
    var y=d.getFullYear();
    var d=("0" + (d.getDate() )).slice(-2);

    var item={
        "name":"asbkas",
        "email":"",
        "doctors":"",
        "date":y.toString()+m.toString()+d.toString(),
        "address":"",
        "lat":"",
        "lng":"",
        "show":"false",
        "phone":"",
         "services":""
    }
    hospital_search.update({"search":"gogolio"},{$push:{"docters":item}},false ,
        true,function (req,res) {


            if(err){
                console.log(err)
            }
            else  console.log("sucesssfully added doctor_search")

        })

    hospital.insert(item,function (req,res) {
        if(err){
            console.log(err)
        }
        else  console.log("sucesssfully added doctor")

    })



    res.send("insertion successfully");

})

//// add a chemist

router.get('/add/chemist',function (req,res,next) {
    var d=new Date();
    var m=("0" + (d.getMonth() + 1)).slice(-2);
    var y=d.getFullYear();
    var d=("0" + (d.getDate() )).slice(-2);

    var item={
        "name":"asbkas",
        "email":"",
        "date":y.toString()+m.toString()+d.toString(),
        "address":"",
        "lat":"",
        "lng":"",
        "show":"false",
        "phone":"",
        "dl_no":""
    }
    chemist_search.update({"search":"gogolio"},{$push:{"docters":item}},false ,
        true,function (req,res) {


            if(err){
                console.log(err)
            }
            else  console.log("sucesssfully added doctor_search")

        })

    chemist.insert(item,function (req,res) {
        if(err){
            console.log(err)
        }
        else  console.log("sucesssfully added doctor")

    })



    res.send("insertion successfully");

})



//// add a Ayurveda

router.get('/add/ayurveda',function (req,res,next) {
    var d=new Date();
    var m=("0" + (d.getMonth() + 1)).slice(-2);
    var y=d.getFullYear();
    var d=("0" + (d.getDate() )).slice(-2);

    var item={
        "name":"asbkas",
        "email":"",
        "date":y.toString()+m.toString()+d.toString(),
        "address":"",
        "lat":"",
        "lng":"",
        "show":"false",
        "phone":"",
        "dl_no":""
    }
    ayurveda_serach.update({"search":"gogolio"},{$push:{"docters":item}},false ,
        true,function (req,res) {


            if(err){
                console.log(err)
            }
            else  console.log("sucesssfully added doctor_search")

        })

    ayurveda.insert(item,function (req,res) {
        if(err){
            console.log(err)
        }
        else  console.log("sucesssfully added doctor")

    })



    res.send("insertion successfully");

})


/////add homeo

router.get('/add/homeo',function (req,res,next) {
    var d=new Date();
    var m=("0" + (d.getMonth() + 1)).slice(-2);
    var y=d.getFullYear();
    var d=("0" + (d.getDate() )).slice(-2);

    var item={
        "name":"asbkas",
        "email":"",
        "date":y.toString()+m.toString()+d.toString(),
        "address":"",
        "lat":"",
        "lng":"",
        "show":"false",
        "phone":"",
        "dl_no":""
    }
    homeo_serach.update({"search":"gogolio"},{$push:{"docters":item}},false ,
        true,function (req,res) {


            if(err){
                console.log(err)
            }
            else  console.log("sucesssfully added doctor_search")

        })

    homeo.insert(item,function (req,res) {
        if(err){
            console.log(err)
        }
        else  console.log("sucesssfully added doctor")

    })



    res.send("insertion successfully");

})


//// add a pathalogy

router.get('/add/pathalogy',function (req,res,next) {
    var d=new Date();
    var m=("0" + (d.getMonth() + 1)).slice(-2);
    var y=d.getFullYear();
    var d=("0" + (d.getDate() )).slice(-2);

    var item={
        "name":"asbkas",
        "email":"",
        "date":y.toString()+m.toString()+d.toString(),
        "address":"",
        "lat":"",
        "lng":"",
        "show":"false",
        "phone":"",
        "dl_no":""
    }
    pathalogy_serach.update({"search":"gogolio"},{$push:{"docters":item}},false ,
        true,function (req,res) {


            if(err){
                console.log(err)
            }
            else  console.log("sucesssfully added doctor_search")

        })

    pathalogy.insert(item,function (req,res) {
        if(err){
            console.log(err)
        }
        else  console.log("sucesssfully added doctor")

    })



    res.send("insertion successfully");

})


module.exports = router;
