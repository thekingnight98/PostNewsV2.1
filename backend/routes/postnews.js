// const router = require('express').Router();
let express = require('express'),
    multer = require('multer'),
    // mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

let PostNews = require('../models/News.model');


router.route('/').get((req, res) => {
    PostNews.find()
        .then(news => res.json(news))
        .catch(err => res.status(400).json('Error ' + err))
});


// เพิ่ม ข่าว
router.post('/add', upload.single('profileImg'), (req, res) => {
    // const url = req.protocol + '://' + req.get('host')
    const postNews = new PostNews({
        title: req.body.title,
        detail: req.body.detail,
        category: req.body.category,
        tags: req.body.tags.map(tag => tag.text),
        // profileImg: url + '/public/' + req.file.filename
        profileImg: req.body.profileImg

    });
    postNews.save()
        .then(() => res.status(200).json('News added !'))
        .catch(err => {
            console.log(err),
                res.status(500).json({
                    error: err
                });
        })
})

// router.route('/add').post((req, res) => {
//     const title = req.body.title;
//     const detail = req.body.detail;
//     const category = req.body.category;
//     // const 
//     const tags = req.body.tags.map(tag => tag.text);

//     const postNews = new PostNews({
//         title,
//         detail,
//         category,
//         // imageUrl,
//         tags
//     })
//     console.log(postNews);
//     postNews.save()
//         .then(() => res.json('News added !'))
//         .catch(err => res.status(400).json('Error ' + err));
// });

// หา news by id
router.route('/:id').get((req, res) => {
    PostNews.findById(req.params.id)
        .then((news) => res.json(news))
        .catch(err => res.status(400).json('Error ' + err));
});


// ลบ news by id
router.route('/:id').delete((req, res) => {
    PostNews.findByIdAndDelete(req.params.id)
        .then(() => res.json('News deleted !'))
        .catch(err => res.status(400).json('Error ' + err));
});

// อัปเดต news by id
router.route('/update/:id').post((req, res) => {
    PostNews.findById(req.params.id)
        .then(news => {
            news.title = req.body.title;
            news.detail = req.body.detail;
            news.category = req.body.category;
            news.tags = req.body.tags;

            news.save()
                .then(() => res.json('Post News updated !!'))
                .catch((err) => res.status(400).json('Error ' + err));
        })
        .catch((err) => res.status(400).json('Error ' + err));

});


module.exports = router;