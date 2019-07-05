/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login: async function (req, res) {

        if (req.method == "GET") return res.view('pages/login');

        if (!req.body.username) return res.badRequest();
        if (!req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(401);
            return res.send("User not found");
        }

        const match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) {
            res.status(401);
            return res.send("Wrong Password");
        }

        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session._id = user.id;
            req.session.username = req.body.username;
            req.session.role = user.role;

            sails.log("Session: " + JSON.stringify(req.session));

            // return res.json(req.session);

            if (req.wantsJSON){
                return res.redirect('/');
            } else {
                return res.ok("Login successfully");
            }

        });

    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            if (req.wantsJSON){
                return res.redirect('/');
            } else {
                return res.ok("Logout successfully");
            }

        });
    },

    addEvent: async function (req, res) {

        req.params.id = req.session._id;
        req.params.association = 'registered';

        const message = sails.getInvalidIdMsg(req.params);
    
        if (message) return res.badRequest(message);
    
        if (!await User.findOne(req.params.id)) return res.notFound();

        var events = await Event.findOne(req.params.fk).populate("registeredBy");

        if (events.registeredBy.length >= events.quota)
            return res.ok("Not enough quota!");
    
        await User.addToCollection(req.params.id, req.params.association).members(req.params.fk);
    
        return res.redirect("/event/reg");
    
    },

    removeEvent: async function (req, res) {

        req.params.id = req.session._id;
        req.params.association = 'registered';

        const message = sails.getInvalidIdMsg(req.params);
    
        if (message) return res.badRequest(message);
    
        if (!await User.findOne(req.params.id)) return res.notFound();
    
        await User.removeFromCollection(req.params.id, req.params.association).members(req.params.fk);
    
        return res.redirect("/event/reg");
    
    },

    populate: async function (req, res) {

        req.params.id = req.session._id;
        req.params.association = 'registered';
    
        const message = sails.getInvalidIdMsg(req.params);
    
        if (message) return res.badRequest(message);
    
        var events = await User.findOne(req.params.id).populate(req.params.association);
    
        if (!events) return res.notFound();

        if(req.wantsJSON)
            return res.json(events);
        else
            return res.view('pages/event/event-reg', { 'events': events.registered });
        // return res.json(events);
    
    },

};

