var path = require('path');

var test1 = path.dirname("./../../1)multiModule/script.js");
var test2 = path.extname("./../../1)multiModule/script.js");
var test3 = path.isAbsolute("./../../1)multiModule/script.js");
var test4 = path.parse("./../../1)multiModule/script.js");
var test5 = path.join("../", "../", "4)express");
var test6 = path.join(test4.name, test4.ext);
console.log(test1);
console.log(test2);
console.log(test3);
console.log(test4);
console.log(test5);
console.log(test6);