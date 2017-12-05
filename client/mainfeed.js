//import '../imports/startup/client';
import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';
import { Uploads } from '../imports/api/uploads.js';
import { Galleries } from '../imports/api/galleries.js';
import '../imports/startup/accounts-config.js';
import '../imports/ui/pages/feedbody.js';
import '../imports/ui/pages/portfolio.js';
import '../imports/ui/pages/editGallery.js';
import '../imports/ui/pages/notifications.js';
import '../imports/ui/pages/submitForm.js';
import '../imports/ui/pages/uploadForm.js';
import '../imports/ui/pages/newGallery.js';
import '../imports/ui/pages/editImage.js';

/*Router code learned from http://meteortips.com/second-meteor-tutorial/iron-router-part-1/
and http://iron-meteor.github.io/iron-router/
Pages that are private to the current user, like editing,
check for it and are otherwise rerouted to the homepage*/
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
Router.route('/uploadForm', function() {
	if (!Meteor.userId()) {
		alert("Please log in to upload images.");
		this.redirect('home');
	}
	this.render('uploadForm');
});
Router.route('/editImage/:_imgId', {
	waitOn: function() {
		Meteor.subscribe('uploads', this.params._imgId);
	},
	action: function() {
		//if someone else is trying to edit the image, redirect to another page.
		if(!Meteor.userId() || Meteor.userId() !== Uploads.findOne({_id: this.params._imgId}).owner) {
			alert("You are not authorized to edit this image.");
			this.redirect('home');
		}
		this.render('editImage', {
			data: function() {
				return Uploads.findOne({_id: this.params._imgId});
			}
		});
	}
});
Router.route('/newGallery', function() {
	if (!Meteor.userId()) {
		alert("Please log in to create a gallery.");
		this.redirect('home');
	}
	this.render('newGallery');
});
Router.route('/editGallery/:_galId', {
	waitOn: function() {
		Meteor.subscribe('galleries', this.params._galId);
	},
	action: function() {
		//if someone else is trying to edit the gallery, redirect to another page.
		if(!Meteor.userId() || Meteor.userId() !== Galleries.findOne({_id: this.params._galId}).owner) {
			alert("You are not authorized to edit this image.");
			this.redirect('home');
		}
		this.render('editGallery', {
			data: function() {
				return Galleries.findOne({_id: this.params._galId});
			}
		});
	}
});
Router.route('/submitForm/:_galId', function() {
	if (!Meteor.userId()) {
		alert("Please log in to submit an image.");
		this.redirect('home');
	}
	this.render('submitForm', {
		data: function() {
			return Galleries.findOne({_id: this.params._galId});
		}
	});
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
