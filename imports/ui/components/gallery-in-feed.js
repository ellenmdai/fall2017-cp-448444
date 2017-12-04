import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Uploads } from '../../api/uploads.js';
//import { Galleries } from '../../api/galleries.js';
import { SubmitRequests } from '../../api/submitrequests.js';
import { Router } from 'meteor/iron:router';
import './gallery-in-feed.html';
 
Template.gallery_in_feed.onRendered(function() {
	//this.find('#gg_grid_body').innerHTML = "";
});

Template.gallery_in_feed.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
  uploads: function() {
	return Uploads.find();
  },
	loadImages() {
    var img;
    var newRow;
    var newEntry;
    var newEntryHyperlink;
    var newEntryImage;
		var totImgCount = 0;
		//put featured images first
    for (var i = 0; i < this.featured.length; i++) {
      if (totImgCount % 4 === 0) {
        if (newRow !== undefined) { //working or not????
          //document.getElementsByClassName('gg_grid_body')[0].appendChild(newRow);
					Template.instance().find('.gg_grid_body').appendChild(newRow);
        }
        newRow = document.createElement('tr');
      }
      img = Uploads.findOne({_id: this.featured[i]});
      console.log(this.name + ": " + img);
      newEntry = document.createElement('td');
      newEntry.setAttribute('class', 'gallery_cell');
      newEntryHyperlink = document.createElement('a');
      newEntryHyperlink.setAttribute('href', img.url('imageStore'));
      newEntryHyperlink.setAttribute('target', '_blank');
      newEntryImage = document.createElement('img');
      newEntryImage.setAttribute('src', img.url());
      newEntryImage.setAttribute('alt', "cannot display image");
      newEntryImage.setAttribute('class', "imageInGalleryGrid");
      newEntryHyperlink.appendChild(newEntryImage);
      newEntry.appendChild(newEntryHyperlink);
      //newEntry.innerHTML += "<br>Caption: " + theUpload.caption + "<br>Owner: " + theUpload.owner + "<br>";
      newRow.appendChild(newEntry);
			totImgCount++;
    }
		//put non-featured next
		for (i = 0; i < this.regImages.length; i++) {
      if (totImgCount % 4 === 0) {
        if (newRow !== undefined) { //working or not????
          //document.getElementsByClassName('gg_grid_body')[0].appendChild(newRow);
					Template.instance().find('.gg_grid_body').appendChild(newRow);
        }
        newRow = document.createElement('tr');
      }
      img = Uploads.findOne({_id: this.regImages[i]});
      console.log(this.name + ": " + img._id);
      newEntry = document.createElement('td');
      newEntry.setAttribute('class', 'gallery_cell');
      newEntryHyperlink = document.createElement('a');
      newEntryHyperlink.setAttribute('href', img.url('imageStore'));
      newEntryHyperlink.setAttribute('target', '_blank');
      newEntryImage = document.createElement('img');
      newEntryImage.setAttribute('src', img.url());
      newEntryImage.setAttribute('alt', "cannot display image");
      newEntryImage.setAttribute('class', "imageInGalleryGrid");
      newEntryHyperlink.appendChild(newEntryImage);
      newEntry.appendChild(newEntryHyperlink);
      //newEntry.innerHTML += "<br>Caption: " + theUpload.caption + "<br>Owner: " + theUpload.owner + "<br>";
      newRow.appendChild(newEntry);
			totImgCount++;
    }
		//add last incomplete row
    //document.getElementsByClassName('gg_grid_body')[0].appendChild(newRow);
		Template.instance().find('.gg_grid_body').appendChild(newRow);
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