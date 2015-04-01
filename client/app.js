var app = angular.module('lowlaAngular', [
	'lowlaAngular.factory'
	]);

app.controller('SessionsCtrl', [ '$scope', 'LowlaStore', function($scope, LowlaStore) {

	$scope.sessions = [];

	$scope.readAll = function() {

		LowlaStore.all().then( function(docs) {
			console.log('all read, found', docs.length, docs);
			$scope.sessions = docs;
		}, 

		function(err) { console.error(err); } );
	};

	$scope.remove = function(doc) {

		LowlaStore.remove(doc).then( function() {
			$scope.readAll();
		});

	};


	$scope.doEdit = function(doc) {
		$scope.edited = doc._id;
	};

	$scope.save = function(doc) {
		$scope.edited = null;
		LowlaStore.save(doc);
	};

	$scope.saveNew = function() {

		LowlaStore.saveNew({'title' : $scope.title})
			
			.then( function(newDoc) {
				$scope.sessions.push(newDoc);
			}, 
			function(err) { console.error(err); } );

		$scope.title = "";

	};

	$scope.readAll();

} ]);