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

//////// add a doctor
///////
router.get('/add/doctor/:email',function (req,res,next) {
  doctor.find({"email":req.params.email},function (err,docs) {

    // res.json(docs.length)

    if(docs.length<1){

        var d = new Date();
        var m = ("0" + (d.getMonth() + 1)).slice(-2);
        var y = d.getFullYear();
        var d = ("0" + (d.getDate() )).slice(-2);

        var item = {
            "name": "asbkas",
            "email": req.params.email,
            "exper": "",
            "fee": "",
            "lic_no": " ",
            "spl": "",
            "date": y.toString() + m.toString() + d.toString(),
            "address": "",
            "lat": "",
            "show": "false",
            "lng": "",
            "phone": "",
            "sun_time": "",
            "mon_time": "",
            "tue_time": "",
            "wed_time": "",
            "thu_time": "",
            "fri_time": "",
            "sat_time": "",
        }
        doctor_search.update({"search": "gogolio"}, {$push: {"docters": item}}, false,
            true, function (req, res) {


                if (err) {
                    console.log(err)
                }
                else console.log("sucesssfully added doctor_search")

            })

        doctor.insert(item, function (req, res) {
            if (err) {
                console.log(err)
            }
            else console.log("sucesssfully added doctor")

        })

        res.send("insertion successfully");

    }
    else {
      res.send("error")
    }

     // var  ty=json(docs.length)
  });



})




////add a hospital

router.get('/add/hospital/:email',function (req,res,next) {


    hospital.find({"email":req.params.email},function (err,docs) {

        // res.json(docs.length)

        if(docs.length<1) {


            var d = new Date();
            var m = ("0" + (d.getMonth() + 1)).slice(-2);
            var y = d.getFullYear();
            var d = ("0" + (d.getDate() )).slice(-2);

            var item = {
                "name": "asbkas",
                "email": req.params.email,
                "doctors": "",
                "date": y.toString() + m.toString() + d.toString(),
                "address": "",
                "lat": "",
                "lng": "",
                "show": "false",
                "phone": "",
                "services": ""
            }
            hospital_search.update({"search": "gogolio"}, {$push: {"docters": item}}, false,
                true, function (req, res) {


                    if (err) {
                        console.log(err)
                    }
                    else console.log("sucesssfully added doctor_search")

                })

            hospital.insert(item, function (req, res) {
                if (err) {
                    console.log(err)
                }
                else console.log("sucesssfully added doctor")

            })

            res.send("insertion successfully");


        }
        else {
                res.send("error")
            }
        });



})
//// add a chemist

router.get('/add/chemist/:email',function (req,res,next) {


    chemist.find({"email":req.params.email},function (err,docs) {

        // res.json(docs.length)

        if(docs.length<1) {

            var d=new Date();
    var m=("0" + (d.getMonth() + 1)).slice(-2);
    var y=d.getFullYear();
    var d=("0" + (d.getDate() )).slice(-2);

    var item={
        "name":"asbkas",
        "email":req.params.email,
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

}
else {
    res.send("error")
}

// var  ty=json(docs.length)
});



})


//// add a Ayurveda

router.get('/add/ayurveda/:email',function (req,res,next) {


    ayurveda.find({"email":req.params.email},function (err,docs) {

        // res.json(docs.length)

        if(docs.length<1) {


            var d=new Date();
    var m=("0" + (d.getMonth() + 1)).slice(-2);
    var y=d.getFullYear();
    var d=("0" + (d.getDate() )).slice(-2);

    var item={
        "name":"asbkas",
        "email":req.params.email,
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

        }
        else {
            res.send("error")
        }

        // var  ty=json(docs.length)
    });



})

/////add homeo

router.get('/add/homeo/:email',function (req,res,next) {


    homeo.find({"email":req.params.email},function (err,docs) {

        // res.json(docs.length)

        if(docs.length<1) {

            var d=new Date();
    var m=("0" + (d.getMonth() + 1)).slice(-2);
    var y=d.getFullYear();
    var d=("0" + (d.getDate() )).slice(-2);

    var item={
        "name":"asbkas",
        "email":req.params.email,
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

        }
        else {
            res.send("error")
        }

        // var  ty=json(docs.length)
    });



})

//// add a pathalogy

router.get('/add/pathalogy/:email',function (req,res,next) {


    pathalogy.find({"email":req.params.email},function (err,docs) {

        // res.json(docs.length)

        if(docs.length<1) {

            var d=new Date();
    var m=("0" + (d.getMonth() + 1)).slice(-2);
    var y=d.getFullYear();
    var d=("0" + (d.getDate() )).slice(-2);

    var item={
        "name":"asbkas",
        "email":req.params.email,
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

        }
        else {
            res.send("error")
        }

        // var  ty=json(docs.length)
    });



})









////////<////// now get allll ......>>
/// get all doctor list

router.get('/doctor/list',function (req,res,next) {
    doctor_search.find({ "search": "gogolio"},function (err,docs) {
      if(err) console.log(err)
       else {
        res.json(docs[0].docters)
      }
    })
    //res.send("get sucessfully")
})


//// get all hospital
router.get('/hospital/list',function (req,res,next) {
    hospital_search.find({ "search": "gogolio"},function (err,docs) {
        if(err) console.log(err)
        else {
            res.json(docs[0].docters)
        }
    })
    //res.send("get sucessfully")
})

//// get chemist list
router.get('/chemist/list',function (req,res,next) {
    chemist_search.find({ "search": "gogolio"},function (err,docs) {
        if(err) console.log(err)
        else {
            res.json(docs[0].docters)
        }
    })
    //res.send("get sucessfully")
})


//// get ayurveda list
router.get('/ayurveda/list',function (req,res,next) {
    ayurveda_serach.find({ "search": "gogolio"},function (err,docs) {
        if(err) console.log(err)
        else {
            res.json(docs[0].docters)
        }
    })
    //res.send("get sucessfully")
})

//// pathalogy search
router.get('/hospital/list',function (req,res,next) {
    pathalogy_search.find({ "search": "gogolio"},function (err,docs) {
        if(err) console.log(err)
        else {
            res.json(docs[0].docters)
        }
    })
    //res.send("get sucessfully")
})

///homeolist
router.get('/homeo/list',function (req,res,next) {
    pathalogy_search.find({ "search": "gogolio"},function (err,docs) {
        if(err) console.log(err)
        else {
            res.json(docs[0].docters)
        }
    })
    //res.send("get sucessfully")
})


//// view your profile
router.get('/be/doctor',function (req,res,next) {
    doctor.find({},function (err,docs) {
        if(err) console.log(err)
        else {
            res.json(docs[0].docters)
        }
    })
    //res.send("get sucessfully")
})





//////////// Order a medicine






module.exports = router;
