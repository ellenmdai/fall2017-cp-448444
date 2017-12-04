import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import { Uploads } from '../../api/uploads.js';
import { Galleries } from '../../api/galleries.js';
import { Router } from 'meteor/iron:router';

import './uploads-grid.html';

Template.uploads_grid.onCreated(function() {
  Meteor.subscribe('uploads');
});

Template.uploads_grid.onRendered(function() {
  
});

Template.uploads_grid.helpers({
  uploads: function() {
    return Uploads.find({owner: Meteor.userId()});
  }
});

Template.uploads_grid.events({
  //'click .goto-upload'(event) {
  //  event.preventDefault();
  //  console.log(event);
  //  alert("upload button clicked.  Will add modal later.");
  //  //$('#upload-box').dialog('show');
  //}
  'click #goto-upload'(event) {
    event.preventDefault();
    console.log(event);
    Router.go('/uploadForm');
  }
});

Template.imgBoxU.events({
  'click .delete_button'(event) {
    event.preventDefault();
    var uploadId = event.target.value;
    Galleries.find().forEach(function(gallery) {
      if (gallery.regImages.includes(uploadId)) {
        var newReg = gallery.regImages;
        newReg.splice(gallery.regImages.indexOf(uploadId), 1);
        Galleries.update(gallery._id, {
          $set: {
            regImages: newReg
          }
        });
      }
      if (gallery.featured.includes(uploadId)) {
        var newFeatured = gallery.featured;
        newFeatured.splice(gallery.featured.indexOf(uploadId), 1);
        Galleries.update(gallery._id, {
          $set: {
            featured: newFeatured
          }
        });
      }
    });
    Uploads.remove(uploadId);
  }
});