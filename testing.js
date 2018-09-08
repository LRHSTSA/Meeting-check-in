// let date = ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '/' + (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + '/' + new Date().getFullYear();
// const fs = require('fs');
// const sortJson = require('sort-json');
// const db = JSON.parse(fs.readFileSync('./db/db.json'));
// const dbList = JSON.parse(fs.readFileSync('./db/listofnames.json'));
// // const options = {
// //     ignoreCase: true,
// //     reverse: false,
// //     depth: 3
// // };
// // console.log(JSON.parse(fs.readFileSync('./db/listofnames.json')))
// // console.log('')
// // const copy = sortJson(JSON.parse(fs.readFileSync('./db/listofnames.json')), options);

// // console.log(copy);

// // if (JSON.parse(fs.readFileSync('./db/listofnames.json')) === copy) {
// //     console.log(false);
// // }

// // var data = [{
// //     "id": "105",
// //     "name": "FIAT",
// //     "active": true,
// //     "parentId": "1"
// // }, {
// //     "id": "106",
// //     "name": "AUDI",
// //     "active": true,
// //     "parentId": "1"
// // }, {
// //     "id": "107",
// //     "name": "BMW",
// //     "active": true,
// //     "parentId": "1"
// // }, {
// //     "id": "109",
// //     "name": "RENAULT",
// //     "active": true,
// //     "parentId": "1"
// // }];
// // console.log(data + '\n');

// // list.names.sort((a, b) => {
// //     return a.name.localeCompare(b.name);
// // });

// // console.log(data);


// // for (key in db) {
// //     console.log(key);
// //     for (let i = 0; i < db[key].length; i++) {
// //         console.log('--' + db[key][i].name + '-------' + db[key][i].time)
// //         console.log(db[key][i].name)
// //     }
// // }

// // console.log(dbList.names[i])

// for (key in db) {
//     console.log(key)
//     for (let i = 0; i < dbList.names.length; i++) {
//         if (checkForValue(db[key], dbList.names[i].name) != 'abc') {
//             console.log(dbList.names[i].name + '----' + db[key][checkForValue(db[key], dbList.names[i].name)].time)
//         } else {
//             console.log(dbList.names[i].name + '----' + 'Absent')
//         }
//     }
// }

// function checkForValue(json, value) {
//     if (!json) {
//         return false;
//     }
//     for (let i = 0; i < json.length; i++) {
//         if (json[i].name == value) {
//             return i;
//         }
//     }
//     return 'abc';
// }

// console.log(checkForValue(db['09/03/2018'], dbList.names[1].name));
let result2 = [];
for (let i = 1; i <= 100; i++) {
    let result = '';
    if (i % 3 === 0) {
        result += 'Fizz'
    }
    if (i % 5 === 0) {
        result += 'Buzz'
    }
    if (result === '') {
        result = i
    }
    result2.push(result);

}
console.log('[\'' + (result2.join('\', \'')) + '\']');

    
