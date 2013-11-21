# browserify-ngannotate

A [browserify](http://github.com/substack/node-browserify) transform that uses [ng-annotate](https://github.com/olov/ng-annotate) to add dependency injection annotations to your AngularJS source code, preparing it for minification.

# Usage
```
browserify -t browserify-ngannotate app.js > bundle.js
```

# Install
```
npm install browserify-ngannotate
```

# License
MIT
