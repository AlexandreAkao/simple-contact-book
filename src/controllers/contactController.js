const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
  return res.render('contact', { contact: {} });
};

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.register();
  
    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      return req.session.save(() => res.redirect('/contacts'));
    }
  
    req.flash('success', 'Contact registered successfully.');
    return req.session.save(() => res.redirect(`/contacts/${contact.contact._id}`));
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
};

exports.show = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.render('404');
    const contact = await Contact.findById(id);

    if (!contact) return res.render('404');

    return res.render('contact', { contact });
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
  
};

exports.edit = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.render('404');
    const contact = new Contact(req.body);
    await contact.edit(id);
  
    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      return req.session.save(() => res.redirect(`/contacts/${id}`));
    }

    req.flash('success', 'Contact edited successfully.');
    return req.session.save(() => res.redirect(`/contacts/${contact.contact._id}`));
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.render('404');

    const contact = await Contact.delete(id);
    if (!contact) return res.render('404');
  
    req.flash('success', 'Contact deleted successfully.');
  
    return req.session.save(() => res.redirect('/'));
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
};