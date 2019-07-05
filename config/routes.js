/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'EventController.index',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  'GET /admin': 'EventController.admin',

  'GET /event/:id': 'EventController.event',

  'GET /event/full/:id': 'EventController.update',
  // 'POST /event/update/:id': 'EventController.update',
  'PATCH /event/:id': 'EventController.update',

  // 'POST /event/delete/:id': 'EventController.delete',
  'DELETE /event/:id': 'EventController.delete',

  // 'GET /event/create': 'EventController.create',
  'GET /event': 'EventController.create',
  // 'POST /event/create': 'EventController.create',
  'POST /event': 'EventController.create',

  'GET /event/search': 'EventController.search',

  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',

  'GET /user/logout': 'UserController.logout',


  '/person/populate': { view: '404' },
  '/user/populate': { view: '404' },
  '/user/add': { view: '404' },
  '/user/remove': { view: '404' },

  // '/person/:id/:association': 'PersonController.populate',
  'GET /event/reg': 'UserController.populate',
  // '/user/:id/:association/add/:fk': 'UserController.add',
  // '/user/:id/:association/remove/:fk': 'UserController.remove',

  'POST /event/reg/:fk': 'UserController.addEvent',
  'DELETE /event/reg/:fk': 'UserController.removeEvent',

  'GET /event/:id/participant/': 'EventController.populate',


  'GET /event/all/': 'EventController.eventAll',




  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
