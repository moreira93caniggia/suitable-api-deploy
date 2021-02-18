const path = require("path");  
const fse = require("fs-extra"); 
module.exports = async(folder, _path) => {
    return new Promise((resolve, reject) => {   
        const dir = path.join(_path, folder);
        //Verifica se não existe
        if (!fse.existsSync(dir)){
          //Efetua a criação do diretório
            fse.mkdirs(dir, (err) => {
              if(err) {reject(err)}
              resolve(true)
            });
        } 
    });
};
  