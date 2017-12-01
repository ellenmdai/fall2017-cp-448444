//import '../imports/startup/client';
import {Router} from 'meteor/iron:router';
import '../imports/startup/client/accounts-config.js';
import '../imports/ui/pages/feedbody.js';
import '../imports/ui/pages/portfolio.js';

/*Router code learned from http://meteortips.com/second-meteor-tutorial/iron-router-part-1/
and http://iron-meteor.github.io/iron-router/*/
Router.route('/', function() {
	this.render('feedbody');
}, {
	name: 'home',
	template: 'feedbody'
});
Router.route('/portfolio', function() {
	this.render('portfolio');
});
Router.route('/cfs/files/uploads/:imageId', function() {
	var imageId = this.params.imageId;
	
	  // Read from a CollectionFs FS.File
	  // Assumes you have a "Pdfs" CollectionFs
	  var image = Pdfs.findOne({_id: imageId});
	  var readable = image.createReadStream("tmp");
	  var buffer = new Buffer(0);
	  readable.on("data", function(buffer) {
		buffer = buffer.concat([buffer, readable.read()]);
	  });
	  readable.on("end", function() {
		this.response.writeHead(200, {
		  //"Content-Type": "application/pdf",
		  "Content-Length": buffer.length
		});
		this.response.write(buffer);
		this.response.end();
	  });
	}, {
	  where: "server"
	}
);
