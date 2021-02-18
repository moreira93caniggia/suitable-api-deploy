 
const Helpers = use("Helpers"); 
const Drive = use("Drive"); 
const path = require("path");  
const dataSqlProject = use("App/Helpers/dataSqlProject"); 
const findAllfilesDirectory = use("App/Helpers/findAllfilesDirectory"); 
const removeLastLetter = use("App/Helpers/AuxFunctions/removeLetterLastPosition");
const firstLetterUppercase = use("App/Helpers/AuxFunctions/convertFirstLetterUppercase");

module.exports = async(project) => { 
        var db = await dataSqlProject(project); 
        const tmpPath = Helpers.tmpPath('projects');
        const path_project = path.join(tmpPath, project); 
        const path_api = path.join(path_project, "adonis-api-app");
        const path_controllers = path.join(path_api, "app/Controllers/Http");
        var files_controllers = await findAllfilesDirectory(path_controllers); 
        

        for (let index = 0; index < db.length; index++) {
            var table = db[index];
            table.entity =firstLetterUppercase(removeLastLetter(table.entity)).join(""); 
            var file_controller_entity ="";
            for (let f = 0; f < files_controllers.length; f++) {
                var file = files_controllers[f]; 
                const controller_tmp =`${table.entity}Controller.js`;
                file.split('.').filter((val, idx) =>{if(val.indexOf(`${table.entity}`) !== -1 && file.length === controller_tmp.length)  file_controller_entity = file;})
            }  
             if(file_controller_entity!=""){ 
                var content_methods =await Drive.get(`supports/methodsController.js`,'utf-8'); 
                content_methods = content_methods.split("\n");
                for (let cm = 0; cm < content_methods.length; cm++) {   
                    content_methods[cm] = content_methods[cm].replace(/Entity/gi,table.entity); 
                } 
                Drive.append(`${path_controllers}/${file_controller_entity}`, Buffer.from(''));
                Drive.append(`${path_controllers}/${file_controller_entity}`, Buffer.from(content_methods.join("\n")),{enconding:'utf-8',flag:'w+'}); 
             }
        }    
    return content_methods.join("\n");  
};
   