'use strict';

/**
 * Module dependencies.
 */
let glob = require('glob');

// Detail config exports
module.exports = Object.assign({},
    require('./env/all')
);

/**
 * Get files by glob patterns
 */
 module.exports.getGlobbedFiles = getGlobbedFiles;

 function getGlobbedFiles(globPatterns, removeRoot) {
    // URL paths regex
    let urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	let output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
	if (Array.isArray(globPatterns)) {
		globPatterns.forEach(globPattern => {
			output = output.concat(getGlobbedFiles(globPattern, removeRoot));
		});
	} else if(typeof(globPatterns) == 'string') {
      if (urlRegex.test(globPatterns)) {
        output.push(globPatterns);
      } else {
          let files = glob(globPatterns, { sync: true });
          if (removeRoot) {
            files = files.map(function(file) {
              return file.replace(removeRoot, '');
            });
          }
          output = output.concat(files);
        }
      }
	return output;
 }
