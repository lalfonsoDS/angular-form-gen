fg.directive('fgPropertyFieldOptions', function(fgPropertyFieldOptionsLinkFn) {
  return {
    scope: true,
    controller: 'fgPropertyFieldOptionsController as optionsCtrl',
    templateUrl: 'angular-form-gen/edit/canvas/field/properties/options/options.ng.html',
    link: fgPropertyFieldOptionsLinkFn
  };
}).factory('fgPropertyFieldOptionsLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {
    $scope.previous = {};
    angular.copy($scope.field, $scope.previous);

    $scope.multiple = false;

    $attrs.$observe('fgPropertyFieldOptions', function(value) {
      if(value === 'multiple') {
        $scope.multiple = true;
      }
    });

    $scope.propChanged = function() {
      $scope.field.processing = true;
      $scope.$emit('propChanged', $scope.index, function() {
        angular.copy($scope.field, $scope.previous);
        $scope.field.processing = false;
      }, function(){
        angular.copy($scope.previous, $scope.field);
        $scope.field.processing = false;
      });
    }
  };
});
