import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Router} from 'meteor/iron:router';

import { Galleries } from '../../api/galleries.js';
import { Uploads } from '../../api/uploads.js';  // for testingn only; remove later

import './editGallery.html';
//import '../components/uploads-grid.js';
import '../components/header.js';

Template.editGallery.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('galleries');
  Meteor.subscribe('uploads');
  //TODO: figure out how to access data context for below
  //this.state.set('tmpFeatured', this.featured);
  //this.state.set('tmpRegular', this.regImages);
  //TODO: code below doesn't belong in onCreated I think...
  //if (this.owner !== Meteor.userId()) {
  //  alert("You are not authorized to edit this gallery.");
  //  Router.go('home');
  //}
});

Template.editGallery.onRendered(function() {
  
});

Template.editGallery.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
  featured: function() {
    return Uploads.find({_id: { $in: this.featured }});
  },
  regular: function() {
    return Uploads.find({_id: { $in: this.regImages }});
    //TODO: filter by subscriptions
  },
  notIn: function() {
    var allIn = this.featured.concat(this.regImages);
    console.log(allIn);
    return Uploads.find( { $and: [ {owner: Meteor.userId()}, {_id: { $not: { $in: allIn } } }  ]});
  }
});

Array.prototype.swapOut = function(str) {
  var i = this.indexOf(str);
  var newArray = this;
  if (i === -1) {
    newArray.push(str);
  }
  else {
    newArray.splice(i, 1);
  }
  return newArray;
};

Template.editGallery.events({
  'submit #edit_gallery_form'(event) {
    event.preventDefault();
    console.log(event);
    var newName = Template.instance().find('#editGalName').value;
    if (newName.trim() === "") {
      alert("The name cannot be blank.");
      throw new Meteor.Error("empty name");
    }
    console.log(newName);
    var gallery = Template.parentData(0);
    Galleries.update({_id: gallery._id}, {
      $set: {
        name: newName,
        description: Template.instance().find('#editGalDesc').value,
        open: Template.instance().find('#makeOpen').checked,
      }
    });
    alert("The gallery has been updated. Go back to your portfolio to see the changes.");
  },
  'change .featuredCheck'(event) {
    event.preventDefault();
    var gallery = Template.parentData(0);
    console.log(event);
    var newFeatured = gallery.featured.swapOut(event.target.value);
    var newRegular = gallery.regImages.swapOut(event.target.value);
    Galleries.update({_id: gallery._id}, {
      $set: {
        featured: newFeatured,
        regImages: newRegular
      }
    });
  },
  'click .thumbnail'(event) {
    event.preventDefault();
    var gallery = Template.parentData(0);
    var imgId = event.target.id;
    console.log(event);
    if (gallery.featured.includes(imgId)) {
      var newFeatured = gallery.featured;
      newFeatured.splice(newFeatured.indexOf(imgId), 1);
      Galleries.update({_id: gallery._id}, {
        $set: {
          featured: newFeatured,
        }
      });
    }
    else if (gallery.regImages.includes(imgId)) {
      var newRegular = gallery.regImages;
      newRegular.splice(newRegular.indexOf(imgId),1);
      Galleries.update({_id: gallery._id}, {
        $set: {
          regImages: newRegular,
        }
      });
    }
    else {
      var newRegular2 = gallery.regImages;
      newRegular2.push(imgId);
      Galleries.update({_id: gallery._id}, {
        $set: {
          regImages: newRegular2,
        }
      });
    }
  }
});