const express = require('express')
const router = express.Router()
const {
    check,
    validationResult
} = require('express-validator/check')
const {
    matchedData
} = require('express-validator/filter')
const fs = require('fs')
const app = express();

function getDate() {
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    return mm + '/' + dd + '/' + yyyy;
}

new Date().getMonth() + '/' + new Date().getDate() + '/' + new Date().getFullYear()

function checkForValue(json, value) {
    if (!json) {
        return false;
    }
    for (let i = 0; i < json.length; i++) {
        if (json[i].name == value) {
            return true;
        }
    }
    return false;
}

function getTime() {
    let today = new Date();
    let hh = today.getHours();
    let mm = today.getMinutes();
    let ss = today.getSeconds();
    if (hh < 10) {
        hh = '0' + hh;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    if (ss < 10) {
        ss = '0' + ss;
    }
    return hh + ':' + mm + ':' + ss;
}

router.get('/', (req, res) => {
    res.render('index', {
        data: {},
        errors: {},
        database: JSON.parse(fs.readFileSync('./db/listofnames.json')),
        checkedIn: JSON.parse(fs.readFileSync('./db/db.json'))
    })
});

router.get('/500', (req, res) => {
    res.render('500');
});

router.post('/', [
    check('name')
    .isLength({
        min: 5
    })
    .withMessage('A name is required')
    .trim()
    .escape()
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render('index', {
            data: req.body,
            errors: errors.mapped(),
            database: JSON.parse(fs.readFileSync('./db/listofnames.json')),
            checkedIn: JSON.parse(fs.readFileSync('./db/db.json'))
        })
    }

    const data = matchedData(req)

    let currentDay = getDate();
    let name = data.name.toLowerCase();

    let db = JSON.parse(fs.readFileSync('./db/db.json'))
    let list = JSON.parse(fs.readFileSync('./db/listofnames.json'))

    if (!checkForValue(list["names"], name)) {

        list['names'].push({
            "name": name
        });

        list.names.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });

        fs.writeFileSync('./db/listofnames.json', JSON.stringify(list));
    }


    if (!checkForValue(db[currentDay], name)) {
        if (!db[currentDay]) {
            db[currentDay] = [];
        }

        db[currentDay].push({
            name,
            time: getTime()
        });

        fs.writeFileSync('./db/db.json', JSON.stringify(db));
    }

    res.redirect(301, '/')
})

router.get('/admin', (req, res) => {
    res.render('admin', {
        errors: {},
        data: {},
        db: {},
        dbList: {}
    })
});

router.post('/admin', [check('password')
    .equals('blamejake')
    .withMessage('Wrong password, nice try Jimmy.')
], (req, res) => {
    const errors = validationResult(req)
    console.log(errors.mapped());
    if (!errors.isEmpty()) {
        return res.render('admin', {
            data: req.body,
            errors: errors.mapped(),
            db: {},
            dbList: {}
        })
    }
    res.render('admin', {
        data: {},
        errors: {},
        db: JSON.parse(fs.readFileSync('./db/db.json')),
        dbList: JSON.parse(fs.readFileSync('./db/listofnames.json'))
    })

})

module.exports = router