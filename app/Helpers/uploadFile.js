


  
const Helpers = use("Helpers");  

module.exports = async(file,path, name, format) => { 
    return new Promise((resolve, reject) => {  
        try {
            file.move(path, {
                name: `${name}.${format}`,
                overwrite: true
              });   
               file.moved();  
            resolve(true);
        } catch (error) {
            reject(error)
        }          
    });
  };

