var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/fetchget', function (req, res, next) {
    res.json({
        isSuccess: true,
        data: {
            name: 'huang'
        }
    });
});

router.post('/uploadfile', function (req, res, next) {
    res.json({
        isSuccess: true,
        data: {
            fileId: 'huang'
        }
    });
});

router.post('/a', function (req, res, next) {
    let time = req.body.duration;
    setTimeout(() => {
        res.json({
            isSuccess: true,
            data: {
                fileId: 'huang'
            }
        });
    }, time);
});

router.post('/b', function (req, res, next) {
    let time = req.body.duration;
    setTimeout(() => {
        res.json({
            isSuccess: true,
            data: {
                fileId: 'huang'
            }
        });
    }, time);
});

router.post('/c', function (req, res, next) {
    let time = req.body.duration;
    setTimeout(() => {
        res.json({
            isSuccess: true,
            data: {
                fileId: 'huang'
            }
        });
    }, time);
});

module.exports = router;
