
'use strict';

/**
 * Module dependencies.
 */
let _ = require('lodash'),
    glob = require('glob');

/**
 * Get files by glob patterns
 */
 module.exports.getGlobbedFiles = (globPatterns, removeRoot) => {

    // URL paths regex
    let urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	let output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(globPattern => {
			output = _.union(output, this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {

        if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
            let files = glob(globPatterns, { sync: true });
            if (removeRoot) {
                files = files.map(function(file) {
                    return file.replace(removeRoot, '');
                });
            }
            output = _.union(output, files);
        }
    }

	return output;
 };
