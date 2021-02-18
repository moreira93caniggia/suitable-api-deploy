


  
const readBD = use("App/Helpers/readBD"); 

const Helpers = use("Helpers");  
const path = require("path"); 
const Drive = use("Drive");

module.exports = async(project) => { 
    return new Promise((resolve, reject) => {   
       // var db = readBD(project)
        const tmpPath = Helpers.tmpPath('projects');
        const path_project = path.join(tmpPath, project);  
        var data = Drive.get(`${path_project}/${project}-bd.sql`,'utf-8'); 

        var remove = ['-','/*','ADD','ALTER TABLE','MODIFY','SET ',' ']; 
        const new_ = data.split('\n')
          .filter((val, idx) => val.indexOf('-') === -1)
          .filter((val, idx) => val.indexOf('/*') === -1)
          .filter((val, idx) => val.indexOf('ADD') === -1)
          .filter((val, idx) => val.indexOf('ALTER TABLE') === -1)
          .filter((val, idx) => val.indexOf('MODIFY') === -1)
          .filter((val, idx) => val.indexOf('SET ') === -1)
          .filter((val, idx) => val.indexOf(' ') !== -1).join()
            

        resolve(new_);    
    });
};