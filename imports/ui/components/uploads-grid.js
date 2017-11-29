import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import { Uploads } from '../../api/uploads.js';

//import '../components/upload-box.js';
import './uploads_grid.html';

const numCols = 4;

Template.uploads_grid.onRendered(function bodyOnCreated() {
  //Meteor.subscribe('uploads');
  Meteor.call('uploads_grid.showAllofUsers');
});

Template.uploads_grid.helpers({
  //uploads: function() {
  //  return Uploads.find();
  //}
});

Template.uploads_grid.events({
  //'click .goto-upload'(event) {
  //  event.preventDefault();
  //  console.log(event);
  //  alert("upload button clicked.  Will add modal later.");
  //  //$('#upload-box').dialog('show');
  //}
});

Meteor.methods({
  'uploads_grid.showAllofUsers'() {
    if (! Meteor.userId()) {
      alert("you are not logged in.");
      throw new Meteor.Error('not-authorized');
    }
    const foundUploads = Uploads.find({owner: Meteor.userId}); // cursor object
    var i = 0;
    console.log(foundUploads);
    alert("foundUploads length: " + foundUploads.count());
    var newRow;
    var newEntry;
    var newEntryHyperlink;
    var newEntryImage;
    foundUploads.forEach(function(theUpload) {
      if (i % 4 === 0) {
        if (newRow !== null) {
          document.getElementById('ug_grid_body').appendChild(newRow);
        }
        newRow = document.createElement('tr');
      }
      newEntry = document.createElement('td');
      newEntry.setAttribute('class', 'upload_cell');
      newEntryHyperlink = document.createElement('a');
      newEntryHyperlink.setAttribute('href', theUpload.url);
      newEntryHyperlink.setAttribute('target', '_blank');
      newEntryImage = document.createElement('img');
      newEntryImage.setAttribute('src', theUpload.url);
      newEntryImage.setAttribute('alt', "cannot display image");
      newEntryImage.setAttribute('class', "imageInUploadsGrid");
      newEntryHyperlink.appendChild(newEntryImage);
      newEntry.appendChild(newEntryHyperlink);
      newEntry.innerHTML += "<br>Caption: " + theUpload.caption + "<br>Owner: " + theUpload.owner + "<br>";
      //TODO: edit and delete buttons
      newRow.appendChild(newEntry);
      i++;
    });
    document.getElementById('ug_grid_body').appendChild(newRow);
  },
});