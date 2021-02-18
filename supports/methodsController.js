'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Entity = use("App/Models/Entity");

/**
 * @author caniggiamoreira@gmail.com
 * @linkedin https://www.linkedin.com/in/caniggia-moreira-8a945999/
 * Resourceful controller for interacting with entitys
 */
class EntityController {
  /**
   * Show a list of all entitys.
   * GET entitys 
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
      const search = request.input("search"); 
      const filter = {
        page: request.input("page") || 1,
        perPage: request.input("perPage") || 5,
        orderBy: request.input("orderBy") || "id",
        typeOrderBy: request.input("typeOrderBy") || "DESC", 
        searchKeys: ["id"]
      };
      const data = await Entity.query().select('*').where(function () {  
        if (search) {
          if (filter.searchKeys instanceof Array) { filter.searchKeys.forEach(key => { this.orWhere(`${key}`, 'like', "%" + search + "%") }) }
          else { this.where(`${filter.searchKeys}`, 'like', "%" + search + "%") }
        }  
      }) 
      .orderBy(filter.orderBy, filter.typeOrderBy)
      .paginate(filter.page, filter.perPage); 
     return response.ok(data);
  }
 

  /**
   * Create/save a new entity.
   * POST entitys
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = await Entity.create(request.all());
    return response.created(data, {message:'successfully created object'});
  }

  /**
   * Display a single entity.
   * GET entitys/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const data = await Entity.find(params.id) 
    return response.ok(data);
  } 

  /**
   * Update entity details.
   * PUT or PATCH entitys/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = await Entity.query().where('id',params.id).update(request.all()); 
    return response.ok(data, {message:'successfully updated object', data: data});
  }

  /**
   * Delete a entity with id.
   * DELETE entitys/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
      const data = await Entity.find(params.id)
      await data.delete();
      return response.ok(null,{message:'successfully deleted object'}); 
  }
}

module.exports = entityController
