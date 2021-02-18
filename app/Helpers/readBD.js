


  
const Helpers = use("Helpers");  
const path = require("path"); 
const Drive = use("Drive");

module.exports = async(project) => { 
    return new Promise((resolve, reject) => {  
        const tmpPath = Helpers.tmpPath('projects');
        const path_project = path.join(tmpPath, project);  
        const data = Drive.get(`${path_project}/${project}-bd.sql`,'utf-8'); 
        resolve(data);    
    });
};