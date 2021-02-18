'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model') 
const readBD = use("App/Helpers/readBD");  
const writeDataSqlToJson = use("App/Helpers/writeDataSqlToJson"); 

class NormalizeSql extends Model {
  /**
   * 
   * @param {*} file 
   */
  
    static async normalizeDB(project) {  
          var db = await readBD(project); 
          var column_types = [
            {type: "int", matching:"integer"},
            {type: "varchar", matching:"string"},
            {type: "text", matching:"text"},
            {type: "date", matching:"date"},
            {type: "datatime", matching:"datatime"},
            {type: "double", matching:"double"},
            {type: "timestamp", matching:"timestamp"},
            {type: "tinyint", matching:"boolean"},
            {type: "time", matching:"time"},
            {type: "bigint", matching:"bigint"},
            {type: "float", matching:"float"}];

          db = db.split('\n')
          .filter((val, idx) => val.indexOf('-') === -1).filter((val, idx) => val.indexOf('/*') === -1)
          .filter((val, idx) => val.indexOf('ADD') === -1).filter((val, idx) => val.indexOf('ALTER TABLE') === -1)
          .filter((val, idx) => val.indexOf('MODIFY') === -1).filter((val, idx) => val.indexOf('SET ') === -1)
          .filter((val, idx) => val.indexOf(' ') !== -1).join('\n').split(';');
          let entities = [] ;  
          for (let index = 0; index < db.length - 1; index++) {
              var entity = { entity: db[index].split('`')[1], attributes:[]}; 
              
              if( entity.entity !='adonis_schema'){
                  if( entity.entity !='tokens'){
                    var column= db[index].split('`');
                    for (let i = 3; i < column.length; i+=2) { 
                      const field = column[i]; 
                          var type = column[i+1].trim();
                          var attribute = { field: field, type: type, size: 0, restrictions:{ null:'NAO', attributes: null,defaultTo: null, index: null ,foreign_key:'', primary_key:''}, functions:'',foreign_keys:''};
                          type.split(',').filter((val, idx) =>{ 
                            if(val.indexOf('UNSIGNED') !== -1){
                              attribute.restrictions.attributes ="unsigned()"
                            }
                            if(val.indexOf('NOT NULL') !== -1){
                              attribute.restrictions.null ="SIM"
                            }
                            if(val.indexOf('DEFAULT CURRENT_TIMESTAMP') !== -1){
                              attribute.restrictions.default = "CURRENT_TIMESTAMP"
                            }
                            if(val.indexOf('UNIQUE') !== -1){
                              attribute.restrictions.index = "unique()"
                            }
                            if(val.indexOf("DEFAULT '0'") !== -1){
                              attribute.restrictions.defaultTo = "defaultTo('0')"
                            }
                            if(val.indexOf("DEFAULT '1'") !== -1){
                              attribute.restrictions.defaultTo = "defaultTo('1')"
                            }
                          
                          }).join("");

                          //
                          if(field=='user_id'){
                            field.split(',').filter((val, idx) =>{ 
                              if(val.indexOf('_id') !== -1 || val.indexOf('id_') !== -1){
                                attribute.foreign_keys+=`.references('id').inTable('${attribute.field.replace('_id','s')}');`
                                attribute.restrictions.foreign_key=attribute.field;
                              }  
                            }).join("");
                          }

                          field.split(',').filter((val, idx) =>{ 
                            if(val.indexOf('id') !== -1 && val.indexOf('_id') === -1){ 
                              attribute.restrictions.primary_key=attribute.field;
                            }  
                          }).join("");
                          
                          for (let t = 0; t < column_types.length; t++) {
                            const column_type = column_types[t];
                            if(type.slice(0,column_type.type.length) === column_type.type){
                              attribute.type = column_type.matching 
                              for (let s = 1; s <= 255; s++) { 
                                const size = ""+s;
                                if(type.substr(column_type.type.length+1, size.length) === size){
                                  attribute.size = s
                                }  
                              }

                            } 
                          } 
                          
                          attribute.functions = `table.${attribute.type}('${attribute.field}'${attribute.size==0?'':','+attribute.size})${attribute.restrictions.attributes==null?'':'.'+attribute.restrictions.attributes}.${attribute.restrictions.null=='SIM'?'notNullable()':'nullable()'}${attribute.restrictions.index==null?'':'.'+attribute.restrictions.index}${attribute.restrictions.defaultTo==null?'':'.'+attribute.restrictions.defaultTo}`;
                          attribute.functions+=attribute.foreign_keys
                          if(attribute.field !='created_at'){ 
                            if(attribute.field !='updated_at'){ 
                              entity.attributes.push(attribute); 
                            }
                          } 
                          
                    }  
                    entities.push(entity); 
                  }
              } 
          }  
          await writeDataSqlToJson(project,JSON.stringify(entities, null, '\t'));
          return entities
      }
}

module.exports = NormalizeSql
