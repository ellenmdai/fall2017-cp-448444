import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import { Uploads } from '../../api/uploads.js';

//import '../components/upload-box.js';
import './uploads_grid.html';

Template.uploads_grid.onCreated(function() {
  //Meteor.subscribe('uploads');
});

Template.uploads_grid.onRendered(function bodyOnCreated() {
  //Meteor.subscribe('uploads');
  //Meteor.call('uploads_grid.showAllofUsers');
});

Template.uploads_grid.helpers({
  //uploads: function() {
  //  return Uploads.find();
  //}
  loadUploads() {
    Meteor.call('uploads_grid.showAllofUsers');
  }
});

Template.uploads_grid.events({
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
  'uploads_grid.showAllofUsers'() {
    if (document.getElementById('ug_body_grid')) {
      //NOT WORKING WHYYYYY
      document.getElementById('ug_grid_body').innerHTML = ''; // clear table
    }
    if (! Meteor.userId()) {
      alert("you are not logged in.");
      throw new Meteor.Error('not-authorized');
    }
    var foundUploads = Uploads.find({owner: Meteor.userId()}); // cursor object
    var i = 0;
    console.log(foundUploads.fetch());
    alert("foundUploads length: " + foundUploads.count());
    var newRow;
    var newEntry;
    var newEntryHyperlink;
    var newEntryImage;
    var newEntryEdit;
    var newEntryDelete;
    foundUploads.forEach(function(theUpload) {
      if (i % 4 === 0) {
        if (newRow !== undefined) {
          document.getElementById('ug_grid_body').appendChild(newRow);
        }
        newRow = document.createElement('tr');
      }
      newEntry = document.createElement('td');
      newEntry.setAttribute('class', 'upload_cell');
      newEntryHyperlink = document.createElement('a');
      newEntryHyperlink.setAttribute('href', theUpload.url('imageStore'));
      newEntryHyperlink.setAttribute('target', '_blank');
      newEntryImage = document.createElement('img');
      newEntryImage.setAttribute('src', theUpload.url());
      newEntryImage.setAttribute('alt', "cannot display image");
      newEntryImage.setAttribute('class', "imageInUploadsGrid");
      newEntryHyperlink.appendChild(newEntryImage);
      newEntry.appendChild(newEntryHyperlink);
      newEntry.innerHTML += "<br>Caption: " + theUpload.caption + "<br>Owner: " + theUpload.owner + "<br>";
      //TODO: make edit button work
      newEntryEdit = document.createElement('button');
      newEntryEdit.innerHTML = "Edit";
      newEntryEdit.setAttribute('value', theUpload._id);
      newEntryEdit.setAttribute('class', "edit_button");
      newEntry.appendChild(newEntryEdit);
      newEntryDelete = document.createElement('button');
      newEntryDelete.innerHTML = "Delete";
      newEntryDelete.setAttribute('value', theUpload._id);
      newEntryDelete.setAttribute('class', "delete_button");
      newEntry.appendChild(newEntryDelete);
      newRow.appendChild(newEntry);
      i++;
    });
    document.getElementById('ug_grid_body').appendChild(newRow);
  },
});