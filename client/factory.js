var app = angular.module('lowlaAngular.factory', []);

app.factory('LowlaStore', function($q) {

	return {

		getLowlaDb : function() {
			return new LowlaDB();
		},

		all : function() {

			console.log('read all');

			var lowla = this.getLowlaDb();

			var items = lowla.collection('mydb', 'items');
			lowla.sync(location.protocol + '//' + location.host);

			var deferred = $q.defer();

			items.find().toArray().then( 
				function(docs) { 
					deferred.resolve(docs);
				},
				function(err) {
					deferred.reject(err);
				}
			);

			var promise = deferred.promise;

			return promise;

		},

		remove : function(doc) {

			console.log('remove', doc);

			var lowla = this.getLowlaDb();
			var items = lowla.collection('mydb', 'items');
			var deferred = $q.defer();

			items.remove({ _id: doc._id }).then( 
				function(doc) { 
					lowla.sync(location.protocol + '//' + location.host);
					deferred.resolve(true);
				},
				function(err) {
					deferred.reject(err);
				}
			);

			var promise = deferred.promise;

			return promise;

		},

		save : function(doc) {

			console.log('saving', doc);

			var lowla = this.getLowlaDb();
			var items = lowla.collection('mydb', 'items');
			var deferred = $q.defer();

			//remove all attrs starting with a $: if not, lowla won't save the doc
			for (key in doc) {
				if (key.indexOf('$') === 0) {
					delete doc[key];
				}
			}
			
			items.findAndModify({_id: doc._id}, doc).then( 
				function(doc) { 
					console.log('> saved');
					lowla.sync(location.protocol + '//' + location.host);
					deferred.resolve(doc);
				},
				function(err) {
					deferred.reject(err);
				}
			);

			var promise = deferred.promise;

			return promise;

		},

		saveNew : function(newDoc) {

			console.log('saving new', newDoc);

			var lowla = this.getLowlaDb();
			var items = lowla.collection('mydb', 'items');
			var deferred = $q.defer();

			items.insert(newDoc).then( 
				function(doc) { 
					console.log('> saved');
					lowla.sync(location.protocol + '//' + location.host);
					deferred.resolve(doc);
				},
				function(err) {
					deferred.reject(err);
				}
			);

			var promise = deferred.promise;

			return promise;

		}


	};


});
