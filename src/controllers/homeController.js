const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
  const contatos = await Contato.findMany();
  return res.render('index', { contatos });
};