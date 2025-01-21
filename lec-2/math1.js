/*
function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}
/*
Module.exports = add;// add function will be overwritted
Module.exports = sub; --> this will run */

//IMprovisation we can use javascript object

/*  Module.exports = {
    addFn: add,
    subFn : sub,
} */

//Alternate of above
/*
Module.exports = {
    add,
    sub,
} //to use this const{add,sub} in main.js

*/

// exports.add = (a,b) => a+b ;
// exports.sub = (a,b) => a-b ;

/*
function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}
for exporting (sir use) 

module.exports = {add,sub};
*/