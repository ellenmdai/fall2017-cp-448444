import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Uploads } from '../../api/uploads.js';
import { Router } from 'meteor/iron:router';
import './gallery-in-feed.html';

Template.gallery_in_feed.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
	getRegImages: function() {
		var imgs = [];
		for (i = 0; i < this.regImages.length; i++) {
      imgs.push(Uploads.findOne({_id: this.regImages[i]}));
		}
		return imgs;
	},
	getFeatured: function() {
		var imgs = [];
		for (i = 0; i < this.featured.length; i++) {
      imgs.push(Uploads.findOne({_id: this.featured[i]}));
		}
		return imgs;
	}
});

Template.gallery_in_feed.events({
	'click .editGallery'(event) {
		event.preventDefault();
		console.log(event);
		console.log(event.target.value);
		Router.go('/editGallery/' + event.target.value);
	},
	'click .submitAnImg'(event) {
		event.preventDefault();
		console.log(event);
		console.log(event.target.value);
		Router.go('/submitForm/' + event.target.value);
	}
});