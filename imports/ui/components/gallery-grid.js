import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import { Uploads } from '../../api/uploads.js';

import './gallery-grid.html';

Template.gallery_grid.onCreated(function() {
  //Meteor.subscribe('uploads');
});

Template.gallery_grid.onRendered(function() {
  //Meteor.subscribe('uploads');
  //Meteor.call('uploads_grid.showAllofUsers');
});

Template.gallery_grid.helpers({
  //uploads: function() {
  //  return Uploads.find();
  //}
  loadImages() {
    if (document.getElementById('gg_body_grid')) {
      //NOT WORKING WHYYYYY
      document.getElementById('gg_grid_body').innerHTML = ''; // clear table
    }
    //console.log(this.imgIds);
    //console.log(this.isFeatured);
    var img;
    var newRow;
    var newEntry;
    var newEntryHyperlink;
    var newEntryImage;
    for (var i = 0; i < this.imgIds; i++) {
      if (i % 4 === 0) {
        if (newRow !== undefined) { //working or not????
          document.getElementById('ug_grid_body').appendChild(newRow);
        }
        newRow = document.createElement('tr');
      }
      img = Uploads.findOne({_id: this.imgIds[i]});
      console.log(img);
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
    }
    document.getElementById('gg_grid_body').appendChild(newRow);
  }
});

Template.gallery_grid.events({
  //'click .goto-upload'(event) {
  //  event.preventDefault();
  //  console.log(event);
  //  alert("upload button clicked.  Will add modal later.");
  //  //$('#upload-box').dialog('show');
  //}
  'click .delete_button'(event) {
    event.preventDefault();
    var uploadId = event.target.value;
    Meteor.call('uploads.remove', uploadId, function(err, res) {
      if (err) {
        alert("something went wrong.  Or maybe its this callback function thing...");
      }
      else {
        alert("image deleted, probably");
      }
    });
  }
});

Meteor.methods({
  
});