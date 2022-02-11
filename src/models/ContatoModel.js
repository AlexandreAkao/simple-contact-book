const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  criadoEm: { type: String, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null
}

Contato.findById = async function(id) {
  if (typeof id !== 'string');
  return await ContatoModel.findById(id);
}

Contato.prototype.register = async function() {
  this.valida();

  if (this.errors.length  > 0) return;
  this.contato = await ContatoModel.create(this.body);
}

Contato.prototype.cleanUp = function() {
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
  }
}

Contato.prototype.valida = function() {
  this.cleanUp();
  if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail invalido.');
  if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
  if (!this.body.email && !this.body.telefone) this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
}

module.exports = Contato;
