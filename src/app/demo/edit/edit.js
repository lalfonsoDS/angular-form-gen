app.controller('FormEditCtrl', function ($scope, $location, inform, $window, formMetaInfo, form, Form) {

  $scope.addFieldCallback = function(field, index, success, error) {
    console.log("added field: ", index, field);
    success();
  }

  $scope.moveFieldCallback = function(fromIdx, toIdx, success, error) {
    console.log("moved field from / to: ", fromIdx, toIdx);
    success();
  }

  $scope.removeFieldCallback = function(index, success, error) {
    console.log("removed field: ", index);
    success();
  }

  $scope.modifyPropertyCallback = function(index, success, error) {
    console.log("FIELD: ", $scope.form.schema.fields[index]);
    success();
  }

  $scope.formTypeFields = [
    {
      fieldName: "FIRST_NAME",
      required: false
    },
    {
      fieldName: "EMAIL",
      required: false
    },
    {
      fieldName: "LAST_NAME",
      required: false
    },
    {
      fieldName: "COMPANY_EMPLOYEE_ID",
      required: false
    }
  ];

  $scope.form = form;

  // Precreate the (form) $state object here so we can access it later.

  $scope.form.$state = {};

  // Make the form schema for editing application specific form information available on the scope.

  $scope.formMetaInfo = formMetaInfo;

  // Execute when the `close` button is smashed.

  $scope.onClose = function () {

    // Prompt the user if we've got some unsaved modifications.

    if ($scope.form.$state && $scope.form.$state.$dirty && !$window.confirm('Discard unsaved changes?')) {
      return;
    }

    $location.path('/demo');
  };

  $scope.canSave = function () {
    return $scope.form.$state.$dirty && $scope.form.$state.$valid;
  };

  $scope.onSave = function () {

    if ($scope.canSave()) {
      Form.save($scope.form).then(function() {
        inform.add('Form saved', { type: 'success' });
        $location.path('/demo');
      });
    }
  };


});
