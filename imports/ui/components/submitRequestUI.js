import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Uploads } from '../../api/uploads.js';
import { Galleries } from '../../api/galleries.js';
import { Router } from 'meteor/iron:router';
import './submitRequestUI.html';
//import './gallery-grid.js';
 
Template.submitRequest.onCreated({
	
});

Template.submitRequest.helpers({
	getUrl: function() {
		return Uploads.find({_id: this.imgId}).url;
	},
	getImgName: function() {
		return Uploads.find({_id: this.imgId}.name);
	}
});

Template.submitRequest.events({
	'click .editGallery'(event) {
		event.preventDefault();
		console.log(event);
		console.log(event.target.value);
		Router.go('/editGallery/' + event.target.value);
	}
});