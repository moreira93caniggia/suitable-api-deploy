"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const cd = use("App/Helpers/cd");
const cloneApi = use("App/Helpers/cloneApi");
const create_routes = use("App/Helpers/createRoutes");
const runCommand = use("App/Helpers/runCommandAdonis");
const zipApiBase64 = use("App/Helpers/zipApiBase64");
const dataSqlProject = use("App/Helpers/dataSqlProject");

const NormalizeSql = use("App/Models/NormalizeSql");
const uploadFile = use("App/Helpers/uploadFile");
const Helpers = use("Helpers");
const path = require("path"); 

const create_dir = use("App/Helpers/createDir");

const insertColumnMigration = use("App/Helpers/insertColumnMigration");
const insertMethodController = use("App/Helpers/insertMethodController");

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const { project } = request.all();
    return await insertMethodController(project);
  }

  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { project_name } = request.all();
     //copies directory, even if it has subdirectories or files
     const project = project_name;
      const file_sql = request.file('file_sql', { types: ['x-sql'], size: '2mb' }); 
      const tmpPath = Helpers.tmpPath('projects');  
      const path_project = path.join(tmpPath, project);  
      create_dir(project, tmpPath);
      uploadFile(file_sql,path_project, project+'-bd','sql');   
      console.log(`√ project successfully created`);
    return response.created(project);
  }

  async normalizeSqlToJson({ request, response }) {
    const { project } = request.all();
    try {
      const db = await NormalizeSql.normalizeDB(project);
      return response.ok(db, { message: "successfully normalized sql" });
    } catch (error) {
      error = error.toString().split(":");
      console.log(`${error[0]}`);
      const message = error[0] === "FileNotFound" ? "project not found" : "";
      return response.notFound(null, { message: message });
    }
  }

  async generateApi({ request, response }) {
    const { project } = request.all();
    const entities = await dataSqlProject(project);
    if (entities.length > 0) {
      const cloneApi_ = await cloneApi(project);
      await create_routes(project, entities);
      for (let index = 0; index < entities.length; index++) {
        const entity = entities[index].entity;
        if (entity != "users") {
          await runCommand(`${entity}`, project);
        }
      }
      await insertColumnMigration(project);
      await insertMethodController(project);
    }
    const data = await zipApiBase64(project);
    console.log(`√ successfully generated api`);
    return response.created(data, { message: "successfully generated api" });
  }

  async downloadApi({ request, response }) {
    const { project } = request.all();
    const data = await zipApiBase64(project);
    return response.ok(data, { message: "successfully" });
  }
  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ProjectController;
