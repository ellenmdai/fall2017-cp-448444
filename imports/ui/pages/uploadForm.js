import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Uploads } from '../../api/uploads.js';
import { Galleries } from '../../api/galleries.js';
import './uploadForm.html';
import '../components/header.js';
 
Template.uploadForm.helpers({
	usersGalleries: function() {
		return Galleries.find({owner: Meteor.userId()});
	}
});

Template.uploadForm.events({
	'submit #upload_form'(event) {
		event.preventDefault();
		console.log(event);
		const files = Array.from(document.getElementById('image-to-upload').files);
		//ensure a file is selected
		if (files.length === 0) {
			alert("Please select a file to upload.");
			throw new Meteor.Error('no file selected');
		}
		const caption = document.getElementById('image-to-upload-caption').value;
		
		//make sure user is logged in
		if (! Meteor.userId()) {
		  throw new Meteor.Error('not-authorized');
		}
		
		var selectedGalleries = $('#gallerySelector').val(); // array of gallery ids
		if (selectedGalleries === null) {
			selectedGalleries = [];
		}
		var oneGalleryImgs = [];
		
		for (var i = 0; i < files.length; i++) {
			// from https://forums.meteor.com/t/insert-data-to-collectionfs-cfs-filesystem-cfs-standard-packages/5304/3
			var tmpdoc = new FS.File(files[i]);
			tmpdoc.owner = Meteor.userId();
			tmpdoc.caption = caption;
			//https://github.com/CollectionFS/Meteor-CollectionFS/issues/323
			Uploads.insert(tmpdoc, function(err, fileObj) {
				console.log(fileObj._id);
				for (var j = 0; j < selectedGalleries.length; j++) {
					oneGalleryImgs = Galleries.findOne({_id: selectedGalleries[j]}).regImages;
					oneGalleryImgs.push(fileObj._id);
					Galleries.update({_id: selectedGalleries[j]}, {
						$set: {
							regImages: oneGalleryImgs
						}
					});
				}
			});
		}

		alert("Pictures are uploaded!");
		Router.go('/portfolio');
	},
});