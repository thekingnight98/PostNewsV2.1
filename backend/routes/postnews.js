const router = require('express').Router();
let PostNews = require('../models/News.model');
// const multer = require('multer')

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
//     if (!allowedTypes.includes(file.mimetype)) {
//         const error = new Error("Incorrect file");
//         error.code = "INCORRECT_FILETYPE";
//         return cb(error, false)
//     }
//     cb(null, true);
// }
// const upload = multer({
//     dest: './uploads',
//     fileFilter,
//     limits: {
//         fileSize: 5000000
//     }
// });



router.route('/').get((req, res) => {
    PostNews.find()
        .then(news => res.json(news))
        .catch(err => res.status(400).json('Error ' + err))
});


// เพิ่ม ข่าว

// fuction upload
// router.post('/add', upload.single('file'), async(req, res) => {
//     // const filename = req.file != null ? req.file.filename : null
//     const postNews = new postNews({
//         title: req.body.title,
//         detail: req.body.detail,
//         category: req.body.category,
//         file: req.file,
//         tags: req.body.tags.map(tag => tag.text)
//     })

//     postNews.save()
//         .then(() => res.json('News added !'))
//         .catch(err => res.status(400).json('Error ' + err));
// })

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const detail = req.body.detail;
    const category = req.body.category;
    // const 
    const tags = req.body.tags.map(tag => tag.text);

    const postNews = new PostNews({
        title,
        detail,
        category,
        // imageUrl,
        tags
    })
    console.log(postNews);
    postNews.save()
        .then(() => res.json('News added !'))
        .catch(err => res.status(400).json('Error ' + err));
});

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