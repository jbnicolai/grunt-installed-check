/*
 * grunt-installed-check
 * https://github.com/walbo/grunt-installed-check
 *
 * Copyright (c) 2014 Petter Walbø Johnsgård
 * Licensed under the MIT license.
 */

var _ = require("lodash"),
	semver = require("semver"),
	chalk = require( 'chalk' );

module.exports = function ( grunt ) {

	grunt.registerTask( 'installed_check', 'Checks if your NPM and Bower installs matches package.json and bower.json.', function() {
		
		// Options
		var options = this.options({
				packageLocation : 'package.json',
				bowerLocation : 'bower.json'
			});

		// Read json file or return false.
		function readFile ( file ) {
			return grunt.file.exists( file ) ? grunt.file.readJSON( file ) : false;
		}

		// Compare versions
		function check_version ( type, json ) {
			// If not json return empty
			if ( ! json ) {
				return [];
			}

			var results = [],
				dependencies = _.merge( json.dependencies || {}, json.devDependencies || {} ),
				dir,
				json_file;

			if ( type === 'bower' ) {
				dir = 'bower_components';
				json_file = 'bower.json';
			} else if ( type === 'npm' ) {
				dir = 'node_modules';
				json_file = 'package.json';
			}

			_.each( Object.keys( dependencies ), function ( dependency ) {
				var file = readFile( dir + '/' + dependency + '/' + json_file );

				if ( ! file ) {
					results.push( dependency + chalk.red( ' (' + type + ') not installed' ) );
				} else if ( ! semver.satisfies(file.version, dependencies[dependency] ) ) {
					results.push( dependency + chalk.yellow( ' (' + type + ') not matching. Package version: ' + dependencies[dependency] + ' Your version: ' + file.version ) );
				}
			} );

			return results;
		}

		var errors = check_version( 'bower', readFile( options.bowerLocation ), grunt ).concat( check_version( 'npm', readFile( options.packageLocation ), grunt ) );

		if ( errors.length !== 0 ) {
			_.each ( errors, function ( error ) {
				grunt.log.error( error );
			} );

			return false;
		}
	} );

};
