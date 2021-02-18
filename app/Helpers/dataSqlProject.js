
 const Helpers = use("Helpers"); 
 const path = require("path"); 
 module.exports = async(fileName) => {
    return new Promise((resolve, reject) => {
        const tmpPath = Helpers.tmpPath('projects');
        const path_project = path.join(tmpPath, fileName);
        const path_file = path.join(path_project, fileName); 
        const data = use(path_file+"-data.json");   
        resolve(data); 
    });
};
   