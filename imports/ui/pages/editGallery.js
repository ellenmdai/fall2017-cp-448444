import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Router} from 'meteor/iron:router';
import { Galleries } from '../../api/galleries.js';
import { Uploads } from '../../api/uploads.js';

import './editGallery.html';
import '../components/header.js';

Template.editGallery.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('galleries');
  Meteor.subscribe('uploads');
});

Template.editGallery.helpers({
  featured: function() {
    return Uploads.find({_id: { $in: this.featured }});
  },
  regular: function() {
    return Uploads.find({_id: { $in: this.regImages }});
  },
  notIn: function() {
    var allIn = this.featured.concat(this.regImages);
    console.log(allIn);
    return Uploads.find( { $and: [ {owner: Meteor.userId()}, {_id: { $not: { $in: allIn } } }  ]});
  }
});

//If the id's not in the list, add it; otherwise remove it.
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
  //set or unset image as featured
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
  //add or remove image from the gallery
  'click .thumbnail'(event) {
    event.preventDefault();
    var gallery = Template.parentData(0);
    var imgId = event.target.id;
    console.log(event);
    //remove:
    if (gallery.featured.includes(imgId)) {
      var newFeatured = gallery.featured;
      newFeatured.splice(newFeatured.indexOf(imgId), 1);
      Galleries.update({_id: gallery._id}, {
        $set: {
          featured: newFeatured,
        }
      });
    }
    //remove:
    else if (gallery.regImages.includes(imgId)) {
      var newRegular = gallery.regImages;
      newRegular.splice(newRegular.indexOf(imgId),1);
      Galleries.update({_id: gallery._id}, {
        $set: {
          regImages: newRegular,
        }
      });
    }
    //add:
    else {
      var newRegular2 = gallery.regImages;
      newRegular2.push(imgId);
      Galleries.update({_id: gallery._id}, {
        $set: {
          regImages: newRegular2,
        }
      });
    }
  },
  'click #goBack'(event) {
    event.preventDefault();
    console.log(event);
    Router.go('/portfolio');
  }
});