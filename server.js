var express = require('express');
app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
// var unless = require('express-unless');
cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/products_DB');
var db = mongoose.connection;

db.on('error', function () {
    console.log('Connection Failed!');
})

db.on('open', function () {
    console.log('Connection Established!');
})

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    username: {
        type: String,
        required: true,

    },
    isLoggedIn: {
        type: Boolean,
        default: false,
        required: true
    }
})

var ProductSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true,

    },
    productCode: {
        type: String,
        required: true,
        unique: true
    },
    releaseDate: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    price: {
        type: String,
        required: true,

    },
    starRating: {
        type: String,
        required: true,

    },
    imageUrl: {
        type: String,
        required: true,

    }

});

var productModel = mongoose.model('productsCollection', ProductSchema);
var userModel = mongoose.model('userCollection', UserSchema);

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(function (req, res, next) {
    if (req.path == '/userRegister' || req.path == '/authenticate') {
        return next();
    }
    var token = req.body.authtoken || req.query.authtoken || req.headers['authtoken'] || req.headers.authorization;
    jwt.verify(token, 'kartik-secret-key', function (err, decoded) {
        if (err) {
            res.send({
                err: true,
                msg: 'Invalid Request'
            });
        } else {
            req.decoded = decoded;
            next();
        }
    })
});
// .unless({path:['/userRegister/','/authenticate/']});

app.get('/getproducts', function (req, res) {

    productModel.find({}, function (err, docs) {
        if (err) {
            console.log('Bad request');
        } else {
            res.send(docs);
        }
    })

});

app.post('/userRegister', function (req, res) {
    var user = new userModel(req.body);
    user.save();
})

app.post('/createProduct',function(req,res){
    console.log(req.body);
    var products=new productModel(req.body);
    products.save();
})

app.post('/getProductInfo',function(req,res){
    console.log(req.body);
    productModel.findOne({productCode:req.body.pCode},function(err,docs){
        if(err){
            res.json({
                success: false,
                user: null,
            })
        }else{
            res.json({
            success: true,
            user:docs
        })
        }
    });

})

app.post('/authenticate', function (req, res) {
    userModel.findOne({ email: req.body.email }, function (err, docs) {

        var token = jwt.sign({ 'email': req.body.email }, 'kartik-secret-key', {
            expiresIn: '1h'
        });
        if (!docs) {
            res.json({
                success: false,
                user: null,
            })
        } else {
            if (docs.password == req.body.password) {

                userModel.findOneAndUpdate({ email: req.body.email }, { 'isLoggedIn': true }, { new: true }, function (err, data) {

                    if (!err)
                        res.json({
                            success: true,
                            user: data,
                            jwtToken: token
                        })
                })


            } else {
                res.json({
                    success: false,
                    user: null
                })
            }
        }
    })

});



app.put('/logout', function (req, res) {


    userModel.findOneAndUpdate({ username: req.body.username }, { "isLoggedIn": false }, function (err, docs) {
        if (!err) {
            res.send({ 'flg': 'success', "data": docs });
        }
        else {
            res.send({ 'flg': 'fail', 'data': err })
        }
    });
});



app.listen(3000, function () {
    console.log('Server running on port:3000');
})

