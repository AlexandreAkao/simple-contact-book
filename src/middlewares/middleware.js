exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  return next();
};

exports.outroMiddleware = (req, res, next) => {
  return next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render('404');
  }
  return next()
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  return next();
};

exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash('errors', 'Você precisa fazer login.');
    return req.session.save(() => res.redirect('/login'));
  }

  return next();
};
