/**
 * Event.js
 *
 * @description :: A e definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/es-and-orm/es
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    id: { type: "number", autoIncrement: true },
    name: { type: "string", required: true },
    s_desc: { type: "string", required: true },
    f_desc: { type: "string", required: true },
    url: { type: "string", required: true },
    org: { type: "string", required: true },
    date: { type: 'ref', columnType: 'datetime', required: true },
    s_time: { type: "string", required: true },
    e_time: { type: "string", required: true },
    venue: { type: "string", required: true },
    quota: { type: "number", required: true },
    highlighted: { type: "boolean", defaultsTo: false },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    registeredBy: {
      collection: 'User',
      via: 'registered',
    },

  },

};

