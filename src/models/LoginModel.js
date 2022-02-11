const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    const { email, password } = this.body;

    this.body = { email, password };
  }

  valida() {
    this.cleanUp();

    const { email, password } = this.body;

    if (!validator.isEmail(email)) this.errors.push('Invalid email');

    if (password.length < 3 || password.length > 50) {
      this.errors.push('Password must be between 3 and 50 characters.');
    }
  }

  async userExists() {
    const { email } = this.body;

    this.user = await LoginModel.findOne({ email });

    if (this.user) this.errors.push('User already exists.');
  }

  async register() {
    this.valida();

    await this.userExists();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    this.user = await LoginModel.create(this.body);
  }

  async login() {
    this.valida();

    const { email, password } = this.body;

    if (this.errors.length > 0) return;

    this.user = await LoginModel.findOne({ email });

    if (!this.user) {
      return this.errors.push('Invalid username or password.');
    }

    if (!bcryptjs.compareSync(password, this.user.password)) {
      this.errors.push('Invalid username or password.');
      this.user = null;
    }
  }
}

module.exports = Login;
