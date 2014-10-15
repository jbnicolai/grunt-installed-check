# grunt-installed-check

> Checks if your NPM and Bower installs matches package.json and bower.json.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-installed-check --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-installed-check');
```

## The "installed_check" task

### Options

#### options.packageLocation
Type: `String`
Default value: `package.json`

Path to package.json

#### options.bowerLocation
Type: `String`
Default value: `bower.json`

Path to bower.json