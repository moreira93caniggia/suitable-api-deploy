 
/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers') 
const path = require("path");  
const Drive = use("Drive");
const removeLastLetter = use("App/Helpers/AuxFunctions/removeLetterLastPosition");
const firstLetterUppercase = use("App/Helpers/AuxFunctions/convertFirstLetterUppercase");
module.exports = async(entity, project) => {
    return new Promise((resolve, reject) => { 
        const tmpPath = Helpers.tmpPath('projects');
        const path_project = path.join(tmpPath, project); 
        const path_api = path.join(path_project, "adonis-api-app");   
        const util = require('util');
        
        const result = runCommandAdonis(entity);
        resolve(result);
        async function runCommand(command) { 
            const exec = util.promisify(require('child_process').exec); 
            const { stdout, stderr, error } = await exec(command);
            if(stderr){console.error('stderr:', stderr);}
            if(error){console.error('error:', error);}
            return stdout;
        }

        async function runCommandAdonis(entity) {  
            entity = firstLetterUppercase(removeLastLetter(entity)).join("");  
            // your code here building the command you wish to execute ...
            const command = `cd ${path_api} && adonis make:model ${entity} -m -c`;
            //console.log(`√ create  app\Models\${entity}.js`); 
            //console.log(`√ create  app\Controllers\Http\${entity}Controllers.js`);
            const result = await runCommand(command);
            console.log(result);
            return result // your code here processing the result ...
        } 
    });
}
  