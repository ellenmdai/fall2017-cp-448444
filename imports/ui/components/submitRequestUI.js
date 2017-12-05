import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Uploads } from '../../api/uploads.js';
import { Galleries } from '../../api/galleries.js';
import { SubmitRequests } from '../../api/submitrequests.js';
import { removeSubmitRequest } from '../../api/submitrequests.js';
import './submitRequestUI.html';

Template.submitRequest.helpers({
	galleryName: function() {
		return Galleries.findOne({_id: this.gallery}).name;
	},
	getThumb: function() {
		return Uploads.findOne({_id: this.image}).url('thumbs');
	},
	getUrl: function() {
		return Uploads.findOne({_id: this.image}).url('images');
	},
	getImgName: function() {
		var theUpload = Uploads.findOne({_id: this.image});
		return theUpload.name;
	},
	getSenderName: function() {
		return Meteor.users.findOne({_id: this.from}).username;
	}
});

Template.submitRequest.events({
	'click .approveSubmit'(event) {
		event.preventDefault();
		console.log(event);
		//add the image id to the gallery's appropriate lsit
		var theRegs = Galleries.findOne({_id: this.gallery}).regImages;
		theRegs.push(this.image);
		Galleries.update(this.gallery, {
			$set: {
				regImages: theRegs
			}
		});
		//SubmitRequests.remove(this._id);
		removeSubmitRequest.call({_id: this._id}, function(err) {
			if(err) {
				alert(err.reason);
			}
		});
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