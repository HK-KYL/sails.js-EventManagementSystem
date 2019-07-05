/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - index
    index: async function (req, res) {

        var events = await Event.find({ highlighted: true }).limit(4);
        return res.view('pages/event/index', { 'events': events });

    },

    // action - admin
    admin: async function (req, res) {

        var events = await Event.find();
        return res.view('pages/event/admin', { 'events': events });

    },

    // action - event
    event: async function (req, res) {

        var isRegistered = false;

        var event = await Event.findOne(req.params.id);

        if (req.session._id) {
            var eventForCheck = await User.findOne(req.session._id).populate('registered', {
                where: {
                    id: req.params.id,
                },
            });

            isRegistered = eventForCheck.registered.length ? true : false;
        }

        if (!event) return res.notFound();

        return res.view('pages/event/detail', { 'event': event, 'isReg': isRegistered });

    },

    // action - event
    eventAll: async function (req, res) {

        var events = await Event.find();
        return res.json(events);

    },

    // action - create
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('pages/event/form', { 'action': 'create' });
        else if (req.method == "POST") {

            req.body.Event.date = new Date(req.body.Event.date);

            req.body.Event.highlighted = req.body.Event.highlighted == 'on' ? true : false;

            await Event.create(req.body.Event);

            return res.redirect("/");

        } else 
            return res.forbidden();

    },

    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {

            var event = await Event.findOne(req.params.id);

            if(!event) return res.notFound();

            return res.view('pages/event/form', { 'event': event, 'action': 'update' });

        } else if (req.method == "PATCH") {

            // console.log(req.body.name);

            var e = req.body;

            if (typeof e === "undefined")
                return res.badRequest("Form-data not received.");

            var es = await Event.update(req.params.id).set({

                name: e.name,
                s_desc: e.s_desc,
                f_desc: e.f_desc,
                url: e.url,
                org: e.org,
                date: new Date(e.date),
                s_time: e.s_time,
                e_time: e.e_time,
                venue: e.venue,
                quota: e.quota,
                highlighted: e.highlighted == 'on' ? true : false,

            }).fetch();

            if (es.length == 0) return res.notFound();

            return res.ok("Update successfully!");

        } else 
            return res.forbidden();

    },

    // action - delete 
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var event = await Event.destroy(req.params.id).fetch();

        if (event.length == 0) return res.notFound();

        return res.ok("Event deleted!");
    },

    // search function
    search: async function (req, res) {

        const qName = req.query.name || "";
        const qOrg = req.query.org || "";
        var qs_Date = req.query.s_date || "1990/1/1";
        var qe_Date = req.query.e_date || "2090/1/1";
        const qVenue = req.query.venue || "";

        qs_Date = new Date(qs_Date);
        qe_Date = new Date(qe_Date);

        var isSearching;

        if (req.query.name || req.query.org || req.query.s_date || req.query.e_date || req.query.venue) {
            isSearching = true;
        }

        const qPage = Math.max(req.query.page - 1, 0) || 0;
        const numOfItemsPerPage = 2;

        var events = await Event.find({
            limit: numOfItemsPerPage,
            skip: numOfItemsPerPage * qPage,

            where: {
                name: { contains: qName },
                org: { contains: qOrg },
                date: { '>=': qs_Date, '<=': qe_Date },
                venue: { contains: qVenue },
            },
            sort: 'name',
        });

        var allEvents = await Event.find({
            where: {
                name: { contains: qName },
                org: { contains: qOrg },
                date: { '>=': qs_Date, '<=': qe_Date },
                venue: { contains: qVenue },
            },
            sort: 'name',
        });

        var numOfPage = Math.ceil(allEvents.length / numOfItemsPerPage);

        return res.view('pages/event/search', { 'events': events, 'count': numOfPage, 'isSearching': isSearching });
    },

    populate: async function (req, res) {

        req.params.association = 'registeredBy';

        const message = sails.getInvalidIdMsg(req.params);
    
        if (message) return res.badRequest(message);
    
        var events = await Event.findOne(req.params.id).populate(req.params.association);
    
        if (!events) return res.notFound();
    
        return res.view('pages/event/event-participant', { 'participants': events.registeredBy });
    
    },

};

