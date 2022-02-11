const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
  return res.render('contato', { contato: {} });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();
  
    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      return req.session.save(() => res.redirect('/contatos'));
    }
  
    req.flash('success', 'Contato registrado com sucesso.');
    return req.session.save(() => res.redirect(`/contatos/${contato.contato._id}`));
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
};

exports.show = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');
    const contato = await Contato.findById(req.params.id);

    if (!contato) return res.render('404');

    return res.render('contato', { contato });
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
  
};

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);
  
    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      return req.session.save(() => res.redirect(`/contatos/${req.params.id}`));
    }

    req.flash('success', 'Contato registrado com sucesso.');
    return req.session.save(() => res.redirect(`/contatos/${contato.contato._id}`));
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.delete(req.params.id);
    if (!contato) return res.render('404');
  
    req.flash('success', 'Contato apagado com sucesso.');
  
    return req.session.save(() => res.redirect('/'));
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
};