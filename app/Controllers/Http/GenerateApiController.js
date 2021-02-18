"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const cd = use("App/Helpers/cd");
const cloneApi = use("App/Helpers/cloneApiGit");
const create_routes = use("App/Helpers/createRoutes");
const runCommand = use("App/Helpers/runCommandAdonis"); 
const zipApiBase64 = use("App/Helpers/zipApiBase64"); 
const dataSqlProject = use("App/Helpers/dataSqlProject"); 
const Helpers = use('Helpers') 
const path = require("path"); 

/**
 * Resourceful controller for interacting with generateapis
 */
class GenerateApiController {
  /**
   * Show a list of all generateapis.
   * GET generateapis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
 

  async downloadApi({ request, response }){
    const { project } = request.all();  
    const data = await zipApiBase64(project);
    return response.status(200).send({data: data});
  }
 
}

module.exports = GenerateApiController;
