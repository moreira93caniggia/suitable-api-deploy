  
const Helpers = use("Helpers"); 
const Drive = use("Drive");
const path = require("path");  
module.exports = async(project, sqlToJson=[]) => {
    return new Promise((resolve, reject) => { 
        const tmpPath = Helpers.tmpPath('projects');
        const path_project = path.join(tmpPath, project);   
        Drive.put( `${path_project}/${project}-data.json`, Buffer.from(sqlToJson)); 
        resolve(sqlToJson); 
    });
  };
   