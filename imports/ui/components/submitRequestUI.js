import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Uploads } from '../../api/uploads.js';
import { Galleries } from '../../api/galleries.js';
import { SubmitRequests } from '../../api/submitrequests.js';
import { Router } from 'meteor/iron:router';
import './submitRequestUI.html';
//import './gallery-grid.js';
 
Template.submitRequest.onCreated(function() {
	
});

Template.submitRequest.helpers({
	galleryName: function() {
		return Galleries.findOne({_id: this.gallery}).name;
	},
	getUrl: function() {
		return Uploads.findOne({_id: this.image}).url('imageStore');
	},
	getImgName: function() {
		var theUpload = Uploads.findOne({_id: this.image});
		console.log(theUpload);
		return theUpload.name;
	}
});

Template.submitRequest.events({
	'click .approveSubmit'(event) {
		event.preventDefault();
		console.log(event);
		var theRegs = Galleries.findOne({_id: this.gallery}).regImages;
		theRegs.push(this.image);
		Galleries.update(this.gallery, {
			$set: {
				regImages: theRegs
			}
		});
		SubmitRequests.remove(this._id);
		alert("The image has been added to your gallery.");
	},
	'click .approveSubmitF'(event) {
		event.preventDefault();
		console.log(event);
		var theFeatured = Galleries.findOne({_id: this.gallery}).featured;
		theFeatured.push(this.image);
		Galleries.update(this.gallery, {
			$set: {
				featured: theFeatured
			}
		});
		SubmitRequests.remove(this._id);
		alert("The image has been featured in your gallery.");
	},
	'click .denySubmit'(event) {
		event.preventDefault();
		console.log(event);
		SubmitRequests.remove(this._id);
	}
});