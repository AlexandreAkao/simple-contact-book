const Contact = require('../models/ContactModel');

exports.index = async (req, res) => {
  const contacts = await Contact.findMany();
  return res.render('index', { contacts });
};