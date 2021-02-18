/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')
const process = require("process");  
const path = require("path");
const tmpPath = Helpers.tmpPath();


module.exports = async(dir,cb1, cb2) => {
    return new Promise((resolve, reject) => {      
        const road = path.join(tmpPath, dir);  
        try {
            process.chdir(tmpPath+'/dir');
            cb1(cb2);
            resolve(); 
          } catch (err) {
            reject({ error: err });
          } 
          
    });
};
  