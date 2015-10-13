'use strict';

var module = angular.module('mpModal', []);

module.factory('mpModalService', function () {

});

module.directive('mpModalBase', function () {
	return {
		/*
		template : function (elem, attrs) {
			return '<div class="mp-overlay">\
				<div ng-include="' + attrs.mpModalBase + '"></div>\
				</div>';*/
		controller: function ($scope, $element) {
			console.log('CONTROLLER');

			var vm = $scope.vmModal;			

			//$scope.vmModal.confirm = function () { alert('controller'); };

			vm.confirm = function () { 

				$element.remove();
			};

			vm.cancel = function () { 

				$element.remove();
			};

			console.log($scope);
			
		},
		controllerAs: 'vmModal',
		template: '{{ vmModal |json }}<div class="mp-overlay">\
			<div class="mp-dialog">\
			<div class="mp-title"><h3>{{ vmModal.title }}</h3></div>\
       		<div class="mp-content" ng-include="vmModal.contentUrl"></div>\
       		<div class="mp-footer">\
       		<button ng-click="vmModal.confirm()" class="confirm">Ok</button>\
       		<button ng-click="vmModal.cancel()" class="cancel">Cancel</button>\
       		</div>\
       		</div>\
       		</div>',
		link: function($scope, $element, $attrs) {

			var vm = $scope.vmModal;

           	vm.contentUrl = $attrs.mpModalBase;
           	vm.title = $attrs.title !== undefined ? $attrs.title : 'Modal Title';

       		$attrs.$observe('mpModalBase', function (newUrl) {
           		$scope.vmModal.contentUrl = newUrl;
           	});

           	//vm.confirm = function () { alert('confirmed'); }
           	
       	}
       	
	};
});

module.directive('mpModal', function ($http, $templateCache, $compile) {


	return {
		controller : function ($scope) {
			$scope.confirm = function () { 
				alert('this wow')
			};
		},
		link : linkFunction
	};

	function linkFunction ($scope, $element, $attrs, $ctrl, $transclude) {

		console.log($scope);
		console.log($element);
		console.log($attrs.template);
		console.log($ctrl);

		var template_location = 'mpModal' + $attrs.mpModal + '.html';

		if ($attrs.templateUrl) {
			$http.get($attrs.templateUrl).success(function (response) {
				console.log(response);
				$templateCache.put($attrs.mpModal, response);
			});
		}

		$element.bind('click', function () {

			var compiled_directive = $compile('<div mp-modal-base="' + $attrs.mpModal + '" title="' + $attrs.title + '"></div>')($scope);

			$scope.$apply(function () { 
				angular.element('body').prepend(compiled_directive);
			});
		})
		


	}
});
