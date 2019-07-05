/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function (done) {

  sails.getInvalidIdMsg = function (opts) {

    if (opts.id && isNaN(parseInt(opts.id))) {
        return "Primary key specfied is invalid (incorrect type).";
    }
  
    if (opts.fk && isNaN(parseInt(opts.fk))) {
        return "Foreign key specfied is invalid (incorrect type).";
    }
  
    return null;        // falsy
  
  }

  sails.bcrypt = require('bcrypt');
  const saltRounds = 10;

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  if (await Event.count() > 0) {
    return done();
  }

  const hash = await sails.bcrypt.hash('123456', saltRounds);

  await User.createEach([
    { "username": "admin", "password": hash, 'role': 'admin' },
    { "username": "student1", "password": hash, 'role': 'student' },
    { "username": "student2", "password": hash, 'role': 'student' },
    // etc.
  ]);

  await Event.createEach([
    {
      name: 'Singing Contest',
      s_desc: 'Create horizontal forms with the grid by adding the .row class to form groups',
      f_desc: 'Create horizontal forms with the grid by adding the .row class to form groups and using the .col-*-* classes to specify the width of your labels and controls. Be sure to add .col-form-label to your <label>s as well so they’re vertically centered with their associated form controls.',
      url: 'https://images.pexels.com/photos/762905/pexels-photo-762905.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      org: 'Department of Music',
      date: new Date("2018/10/11"),
      s_time: '19:00',
      e_time: '20:00',
      venue: 'AC Hall',
      quota: 350,
      highlighted: true,
    },
    {
      name: 'Culture European Cinema',
      s_desc: 'At times, you maybe need to use margin or padding utilities to create that perfect alignment you need.',
      f_desc: 'At times, you maybe need to use margin or padding utilities to create that perfect alignment you need. For example, we’ve removed the padding-top on our stacked radio inputs label to better align the text baseline.',
      url: 'https://images.pexels.com/photos/716281/pexels-photo-716281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      org: 'Department of Art',
      date: new Date("2018/9/12"),
      s_time: '19:00',
      e_time: '20:00',
      venue: 'POD',
      quota: 351,
      highlighted: true,
    },
    {
      name: 'Workshop on Design for Sustainability',
      s_desc: 'The International Conference on Intelligent Informatics and Biomedical Sciences (ICIIBMS)',
      f_desc: 'The International Conference on Intelligent Informatics and Biomedical Sciences (ICIIBMS) is a joint effort of the University of the Ryukyus, the Okinawa Institute of Science and Technology Graduate  University (OIST) and the National Institute of Technology Okinawa College.',
      url: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      org: 'Department of Science',
      date: new Date("2018/8/13"),
      s_time: '19:00',
      e_time: '20:00',
      venue: 'SWT501',
      quota: 351,
      highlighted: true,
    },
    {
      name: 'Smarter Hong Kong, Smarter living',
      s_desc: 'We invite you to submit original technical papers to this conference.',
      f_desc: 'ICIIBMS aims to create an opportunity to top technology leaders, scholars, engineers, scientists, leading industry leaders as well as graduate students to share ideas and discuss latest results. ICIIBMS is a three day event with oral presentations, poster sessions and plenary lectures. We invite you to submit original technical papers to this conference.',
      url: 'https://as2.ftcdn.net/jpg/00/70/59/45/500_F_70594599_qjxJVjBozwLgWV5MhOKXf8M5FFajEN1u.jpg',
      org: 'Department of Science',
      date: new Date("2018/7/14"),
      s_time: '19:00',
      e_time: '20:00',
      venue: 'LW',
      quota: 351,
      highlighted: false,
    },
    {
      name: 'Culture Asia Cinema',
      s_desc: '2018 2nd International Conference on SmartRail, Traffic and Transportation Engineering(ICSTTE 2018)-Ei Compendex & Scopus—Call for paper',
      f_desc: 'The mission of ICSTTE 2018 is to promote progress in the field of SmartRail, Traffic and Transportation Engineering by hosting a global forum aimed at facilitating discourse and the exchange of ideas among the world’s top innovators, scientists, academics, researchers and thought leaders in the field. Over the three days of this conference, you’ll have an opportunity to hear about the latest developments and changes in an incredibly exciting field.',
      url: 'https://images.pexels.com/photos/769525/pexels-photo-769525.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      org: 'Department of Art',
      // date: (new Date("2018-10-14")).toISOString().split('T')[0],
      date: new Date("2018/6/15"),
      s_time: '19:00',
      e_time: '20:00',
      venue: 'AC Hall',
      quota: 351,
      highlighted: false,
    },
    // etc.
  ]);
  // ```


  const e1 = await Event.findOne({ name: "Culture Asia Cinema" });
  const e2 = await Event.findOne({ name: "Smarter Hong Kong, Smarter living" });
  const s1 = await User.findOne({ username: "student1" });
  const s2 = await User.findOne({ username: "student2" });

  await User.addToCollection(s1.id, 'registered').members(e1.id);
  await User.addToCollection(s2.id, 'registered').members([e1.id, e2.id]);

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
