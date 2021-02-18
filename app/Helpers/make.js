const fs = require("fs");
const fse = require("fs-extra");

const mime = require("mime-types");

const Helpers = use("Helpers");
const tmpPath = Helpers.tmpPath() 
const Drive = use("Drive");

module.exports = async (project,cb1, cb2, cb3) => {
  return new Promise((resolve, reject) => {
    
    fse.mkdirs(project, (err) => {
        if (err) {
          console.error(err);
        }
        cb1(cb2, cb3);
      });

    if (path || fileName || format) {
      const filePath = Helpers.publicPath(path + "" + fileName + "." + format);  
      const exists = Drive.exists(filePath);

      if (exists) { 
        fs.readFile(
          filePath, {
            encoding: 'base64'
          },
          (err, base64) => {
            if (err) {
              reject(err)
            } else { 
              const fileMimeType = mime.lookup(filePath);
              resolve(`data:${fileMimeType};base64,${base64}`); 
            }
          }
        )
      } else {
        reject({ err: "File doesn't exists" });
      }
    } else {
      reject({ err: "No file name provided" });
    }
  });
};

function cd(cb1, cb2) {
    try {
      process.chdir(path_base);
      cb1(cb2);
    } catch (err) {
      console.error(err);
    }
  }
