module.exports = (ApiRoute, Route) => 
    // Protected routes
    ApiRoute(() => {  

      Route.get('/pre-generate-api', 'ProjectController.normalizeSqlToJson').validator("paramProject") 
      Route.get('/finalize-generate-api', 'ProjectController.generateApi').validator("paramProject")  
      Route.get('/download', 'ProjectController.downloadApi').validator("paramProject") 

      Route.get("/", "ProjectController.index").validator("paramProject") 
      Route.post("/", "ProjectController.store").validator("createProject")
        
  }, "projects");

  