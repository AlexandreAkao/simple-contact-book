const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  if (req.session.user) return res.render('login-logged');
  return res.render('login');
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      return req.session.save(() => {
        return res.redirect('/login');
      })
    }
  
    req.flash('success', 'Your user has been successfully created.');
    return req.session.save(() => {
      return res.redirect('/login');
    })
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      return req.session.save(() => {
        return res.redirect('/login');
      })
    }
  
    req.flash('success', 'You have entered the system.');
    req.session.user = login.user;
    return req.session.save(() => {
      return res.redirect('/login');
    })
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
};

exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/login');
};