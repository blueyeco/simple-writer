var path = require('path');
var http = require('http');
var fs = require('fs');

/**
 * Simple page scraping and writing utility
 */
(function() {
    /**
     * Perform requests and file writing
     */
    function writePage(url, path) {
	var content = '';
	http.get(url, function(res) {
	    res.on('data', function(chunk) {
		content += chunk;
	    });

	    res.on('end', function() {
		fs.writeFile(path, content, function(err) {
		    if (err) {
			console.error('Error writing page content to file', err);
		    }
		    console.log('Finished writing file');
		});
	    });
	}).on('error', function(e) {
	    console.error('Error retrieving page ' + e);
	});
    }

    /**
     * Take an object of url:path pairs to iterate over
     */
    function writePages(pages) {
	Object.keys(pages).forEach(function(key) {
	    writePage(key, pages[key]);
	});
    }
    
    module.exports = {
	writePage: writePage,
	writePages: writePages
    }
}());


