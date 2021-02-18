/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers') 
const path = require("path");  
const Drive = use("Drive");
module.exports = async(project, entities=[]) => {

    const firstLetterUppercase = use("App/Helpers/AuxFunctions/convertFirstLetterUppercase");
    const addLetterLastPositionString = use("App/Helpers/AuxFunctions/addLetterLastPositionString");
    const removeLastLetter = use("App/Helpers/AuxFunctions/removeLetterLastPosition");
    
    const tmpPath = Helpers.tmpPath('projects');
    const path_project = path.join(tmpPath, project); 
    const path_api = path.join(path_project, "adonis-api-app");
    return new Promise((resolve, reject) => {  
        var content = Drive.get(`supports/route/httpRoute.js`,'utf-8'); 
        content.then(function(result) { 
            for (let i = 0; i < entities.length; i++) {
 
                const entity = firstLetterUppercase(entities[i].entity).join("");
                const prefix = addLetterLastPositionString(firstLetterUppercase(entities[i].entity).join("_"));  
                var route = result.split('Controller').slice(0).join(`${removeLastLetter(entity)}Controller`)
                .split('prefix').slice(0).join(`${prefix}`.toLowerCase()); 
                console.log(`√ create route start/v1/${prefix.toLowerCase()}.routes.js`);
                Drive.put(`${path_api}/start/routes/v1/${prefix.toLowerCase()}.routes.js`, Buffer.from(route));         
            } 
            resolve('routes created')
         }); 
    });
};

