/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers') 
const path = require("path"); 
const fse = require("fs-extra"); 
const create_dir = use("App/Helpers/createDir");
const cp = require("child_process");
const Drive = use("Drive");
 
module.exports = async(project) => {  
    return new Promise((resolve, reject) => {   
        const tmpPath = Helpers.tmpPath('projects');
        const path_project = path.join(tmpPath, project);
        const rename_new = path.join(path_project, "api");
        const path_api = path.join(path_project, "adonis-api-app");
        create_dir(project, tmpPath); 
         
        console.log(`cloned api`);

        fse.copy("supports/api-clone", `${path_project}`, function (err) {
            if (err) {
              console.error(err);
              reject({ err: err });
            } else {
                create_dir('Repositories', `${path_api}/app`);
                create_dir('v1', `${path_api}/start/routes`); 
                Drive.append(`${path_api}/start/routes.js`,  '\nrequire("./routes/loadRoutes")(Route);',{enconding:'utf-8',flag:'a'})
                Drive.copy(`supports/route/loadRoutes.js`, `${path_api}/start/routes/loadRoutes.js`);
                Drive.copy(`supports/route/contextFiles.js`, `${path_api}/start/routes/contextFiles.js`);
                console.log(`√ git clone project adonis Installed.`)
                resolve("√ git clone project adonis Installed.")
            }
        });
    });
};
  