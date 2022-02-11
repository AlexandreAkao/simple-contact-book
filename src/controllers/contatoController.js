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

exports.edit = async (req, res) => {
  if (!req.params.id) return res.render('404');
  const contato = await Contato.findById(req.params.id);
  
  if (!contato) return res.render('404');

  return res.render('contato', { contato })
};