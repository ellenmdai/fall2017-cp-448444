//import '../imports/startup/client';
import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';
import { Galleries } from '../imports/api/galleries.js';
import '../imports/startup/accounts-config.js';
import '../imports/ui/pages/feedbody.js';
import '../imports/ui/pages/portfolio.js';
import '../imports/ui/pages/editGallery.js';
import '../imports/ui/pages/notifications.js';

/*Router code learned from http://meteortips.com/second-meteor-tutorial/iron-router-part-1/
and http://iron-meteor.github.io/iron-router/*/
Router.route('/', function() {
	this.render('feedbody');
}, {
	name: 'home',
	template: 'feedbody'
});
Router.route('/portfolio', function() {
	if (!Meteor.userId()) {
		this.redirect('home');
	}
	this.render('portfolio');
});
Router.route('/editGallery/:_galId', {
	waitOn: function() {
		Meteor.subscribe('galleries', this.params._galId);
	},
	action: function() {
		this.render('editGallery', {
			data: function() {
				return Galleries.findOne({_id: this.params._galId});
			}
		});
	}
});
Router.route('/notifications/:_usrId', function() {
	if (!Meteor.userId()) {
		alert("You are not logged in. No one wants to message you.");
		this.redirect('home');
	}
	else if (Meteor.userId() !== this.params._usrId) {
		alert("This ain't you. Go home.");
		this.redirect('home');
	}
	this.render('notifications');
}); 
//Router.route('/cfs/files/uploads/:imageId', function() {
//	var imageId = this.params.imageId;
//	
//	  // Read from a CollectionFs FS.File
//	  // Assumes you have a "Pdfs" CollectionFs
//	  var image = Pdfs.findOne({_id: imageId});
//	  var readable = image.createReadStream("tmp");
//	  var buffer = new Buffer(0);
//	  readable.on("data", function(buffer) {
//		buffer = buffer.concat([buffer, readable.read()]);
//	  });
//	  readable.on("end", function() {
//		this.response.writeHead(200, {
//		  //"Content-Type": "application/pdf",
//		  "Content-Length": buffer.length
//		});
//		this.response.write(buffer);
//		this.response.end();
//	  });
//	}, {
//	  where: "server"
//	}
//);
