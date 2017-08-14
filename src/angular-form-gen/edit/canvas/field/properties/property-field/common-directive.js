fg.directive('fgPropertyFieldCommon', function(fgPropertyFieldCommonLinkFn) {
  return {
    restrict: 'AE',
    templateUrl: 'angular-form-gen/edit/canvas/field/properties/property-field/common.ng.html',
    link: fgPropertyFieldCommonLinkFn
  };
}).factory('fgPropertyFieldCommonLinkFn', function($rootScope) {
  return function($scope, $element, $attrs, ctrls) {
    $scope.fields = {
      fieldname: false,
      displayname: false,
      placeholder: false,
      tooltip: false,
      focus: false
    };

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

    $scope.$watch($attrs['fgPropertyFieldCommon'], function(value) {
      $scope.fields = angular.extend($scope.fields, value);
    });
  };
});
