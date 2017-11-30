//import '../imports/startup/client';
import {Router} from 'meteor/iron:router';
import '../imports/startup/client/accounts-config.js';
import '../imports/ui/pages/feedbody.js';
import '../imports/ui/pages/portfolio.js';

/*Router code learned from http://meteortips.com/second-meteor-tutorial/iron-router-part-1/
and http://iron-meteor.github.io/iron-router/*/
Router.route('/', function() {
	this.render('feedbody');
}, {
	name: 'home',
	template: 'feedbody'
});
Router.route('/portfolio', function() {
	this.render('portfolio');
});
