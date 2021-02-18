const files = require("./contextFiles");

function loadRoutes(ApiRoute, Route) {
  const req = files("./v1", true, /\.js$/);
  req.keys().forEach(async (filename) => { 
    const m = await require(filename);
    return m(ApiRoute, Route);
  });
}

module.exports = function (Route) {
  /**
   * Lets share same configs across
   * route groups but define middlewares
   * independently
   */
  const ApiRoute = (registerCallback, prefix = "") => {
    return Route.group(registerCallback).prefix(`api/${prefix}`); 
  };

  loadRoutes(ApiRoute, Route);
};
