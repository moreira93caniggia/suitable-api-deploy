
const base64 = use("App/Helpers/base64"); 
const Helpers = use("Helpers"); 
const Drive = use("Drive");
const path = require("path"); 
module.exports = async(fileName) => { 
    return new Promise((resolve, reject) => {
        const tmpPath = Helpers.tmpPath('projects');
        const path_project = path.join(tmpPath, fileName);   
         var zipFolder = require('zip-folder');  
          zipFolder(`${path_project}`,`${path_project}.zip`, function(err) {
              if(err) {
                  console.log('oh no!', err);
              } else {
                  console.log('EXCELLENT');
                  Drive.delete(`${path_project}.zip`)
                  const data = base64(fileName+".zip", tmpPath);
                  resolve(data); 
              }
          });  

         
    });
  };
   