const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  return res.render('login');
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();
    console.log(login.errors)
    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      return req.session.save(() => {
        return res.redirect('/login');
      })
    }
  
    req.flash('success', 'Seu usuário foi criado com sucesso.');
    return req.session.save(() => {
      return res.redirect('/login');
    })
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
};