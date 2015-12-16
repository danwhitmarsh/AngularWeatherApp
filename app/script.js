// create the module and name it weatherApp, load in routing
var weatherApp = angular.module('weatherApp', ['ngRoute']);
	

weatherApp.config(function($routeProvider) {
	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'app/views/home/homeview.html',
			controller  : 'mainController'
		})

		// route for the day page
		.when('/daycode/:day', {
			templateUrl : 'app/views/day/dayview.html',
			controller  : 'dayController'
		})
});
		
	
weatherApp.service("weatherService", function ($http, $q) {
	
	// setup deferred so that does not return until promise
	var deferred = $q.defer();
	
	//get json file
	$http.get('http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20woeid=44418&format=json').then(function (data) {
		
		//get valid data from resultset
		deferred.resolve(data.data.query.results.channel.item);
	});
	
	//return data
	this.getWeather = function () {
		
		return deferred.promise;
	}
})



.controller("mainController", function ($scope, weatherService){
		
		var promise = weatherService.getWeather();
		promise.then(function (data)
		{
			$scope.weather = data;
			$scope.days = data.forecast;
		});
	
})


	

.controller('dayController', function ($scope, $routeParams, weatherService) {
	
	var promise = weatherService.getWeather();
		promise.then(function (data)
		{
			var day = $routeParams.day;
			$scope.days = data.forecast;
			$scope.searchText = $routeParams.day;
		});
	
});


	