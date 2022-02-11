const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  createdAt: { type: String, default: Date.now },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
  this.body = body;
  this.errors = [];
  this.contact = null;
}

Contact.findById = async function(id) {
  if (typeof id !== 'string') return;
  return await ContactModel.findById(id);
}

Contact.findMany = async function() {
  return await ContactModel.find().sort({ createdAt: -1 });
}

Contact.delete = async function(id) {
  if(typeof id !== 'string') return;
  return await ContactModel.findOneAndDelete({ _id: id });
};

Contact.prototype.register = async function() {
  this.valida();

  if (this.errors.length  > 0) return;
  this.contact = await ContactModel.create(this.body);
}

Contact.prototype.cleanUp = function() {
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  const { name, lastname, email, phone } = this.body;

  this.body = { name, lastname, email, phone };
}

Contact.prototype.valida = function() {
  this.cleanUp();

  const { name, email, phone } = this.body;

  if (email && !validator.isEmail(email)) this.errors.push('Invalid email.');
  if (!name) this.errors.push('Name is a required field.');
  if (!email && !phone) this.errors.push('At least one contact needs to be sent: email or phone.');
}


Contact.prototype.edit = async function(id) {
  if (typeof id !== 'string') return;

  this.valida();

  if (this.errors.length  > 0) return;
  this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
}

module.exports = Contact;
