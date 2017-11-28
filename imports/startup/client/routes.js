import { Router } from 'meteor/iron:router';

import '../../ui/pages/feedbody.js';
import '../../ui/pages/portfolio.js';

Router.route('/', function () {
  this.render('feedbody');
});

Router.route('/myPortfolio', function() {
	this.render('portfolio');
});