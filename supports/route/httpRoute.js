module.exports = (ApiRoute, Route) => 
    // Protected routes
    ApiRoute(() => { 
    Route.get("/", "Controller.index"); 
    Route.post("/", "Controller.store"); 
    Route.get("/:id", "Controller.show"); 
    Route.put("/:id", "Controller.update");
    Route.delete("/:id", "Controller.destroy");    
  }, "prefix")//.middleware(["auth"]);