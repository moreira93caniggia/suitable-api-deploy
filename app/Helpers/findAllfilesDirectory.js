 
  
const fs = require('fs').promises;
module.exports = async(diretorio, arquivos) => {
    return new Promise((resolve, reject) => {   
            if(!arquivos) arquivos = []; 
            arquivos = fs.readdir(diretorio); 
        resolve(arquivos); 
    });
};
   