 
const Helpers = use("Helpers"); 
const Drive = use("Drive"); 
const path = require("path");  
const dataSqlProject = use("App/Helpers/dataSqlProject"); 
const findAllfilesDirectory = use("App/Helpers/findAllfilesDirectory"); 
const removeLetterLastPosition = use("App/Helpers/AuxFunctions/removeLetterLastPosition");
 
module.exports = async(project) => { 
        var db = await dataSqlProject(project); 
        const tmpPath = Helpers.tmpPath('projects');
        const path_project = path.join(tmpPath, project); 
        const path_api = path.join(path_project, "adonis-api-app");
        const path_migration = path.join(path_api, "database/migrations");
        const files = await findAllfilesDirectory(path_migration);

        for (let index = 0; index < db.length; index++) {
            var table = db[index];
            table.entity = removeLetterLastPosition(table.entity);
            var migration ="";
            for (let f = 0; f < files.length; f++) {
                var file = files[f]; 
                const entity_tmp =`1234567890123_${table.entity}_schema.js`;
                file.split('.').filter((val, idx) =>{if(val.indexOf(`${table.entity}`) !== -1 && file.length === entity_tmp.length)  migration = file;})
            } 
            if(migration!=""){
                var content = await Drive.get(`${path_migration}/${migration}`,'utf-8');
                content = content.split('\n').filter((val, idx) => val.indexOf(idx) === -1);
                var functions=""
                for (let c = 0; c < table.attributes.length; c++) { 
                        const f = table.attributes[c].functions;
                        if(table.attributes[c].field !='id'){ 
                            functions += "\n\t\t"+f;  
                        }
                }
                content[8] = "\t\ttable.increments()"+functions 
                Drive.append(`${path_migration}/${migration}`, Buffer.from(content.join("\n")),{enconding:'utf-8',flag:'w+'}); 
             }
        }   
    return(db);  
};
   