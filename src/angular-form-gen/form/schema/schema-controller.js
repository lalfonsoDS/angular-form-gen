fg.controller('fgSchemaController', function($scope, fgUtils) {

  var _model;
  var _formTypeFields;

  this.updateTypeFields = function(formTypeFields) {
    if (formTypeFields) { _formTypeFields = formTypeFields; };
    _model.fields = _model.fields.map(function(field) {
      return angular.extend({}, field, {
        formTypeFields: formTypeFields
      });
    });
  };

  this.model = function(value) {
    if(value !== undefined) {
      _model = value;

      if(!angular.isArray(value.fields)) {
        value.fields = [];
      }
    }

    return _model;
  };

  this.addField = function(field, index) {
    var success = function(){
        //no action
    }
    var error = function(){
      angular.copy(_previousValue, _model.fields);
    }

    var _previousValue = [];
    angular.copy(_model.fields, _previousValue);

    var copy = fgUtils.copyField(field);
    copy.formTypeFields = _formTypeFields;

    index = index === undefined ? _model.fields.length : index;
    _model.fields.splice(index, 0, copy);

    //call to the add field callback function if it's set
    if (this.addFieldCallback) {
      this.addFieldCallback(field, index, success, error);
    };
  };

  this.removeField = function(index) {
    var success = function(){
      //no action
    }
    var error = function(){
      angular.copy(_previousValue, _model.fields);
    }

    var _previousValue = [];
    angular.copy(_model.fields, _previousValue);

    _model.fields.splice(index, 1);

    //call to the remove field callback function if it's set
    if (this.removeFieldCallback) {
      this.removeFieldCallback(index, success, error);
    };
  };

  this.swapFields = function(idx1, idx2) {
    var success = function(){
      //no action
    }
    var error = function(){
      angular.copy(_previousValue, _model.fields);
    }

    var _previousValue = [];
    angular.copy(_model.fields, _previousValue);

    if (idx1 <= -1 || idx2 <= -1 || idx1 >= _model.fields.length || idx2 >= _model.fields.length) {
      return;
    }
    _model.fields[idx1] = _model.fields.splice(idx2, 1, _model.fields[idx1])[0];

    //call to the move field callback function if it's set
    if (this.moveFieldCallback) {
      this.moveFieldCallback(idx1, idx2, success, error);
    };
  };

  this.moveField = function(fromIdx, toIdx) {
    if ((fromIdx >= 0) && (toIdx <= _model.fields.length) && (fromIdx !== toIdx)) {

      var success = function(){
        //no action
      }

      var error = function(){
        _previousValue[fromIdx].$_isDragging = false;
        _model.fields = angular.copy(_previousValue);
      }

      var _previousValue = angular.copy(_model.fields);

      var field = _model.fields.splice(fromIdx, 1)[0];
      if (toIdx > fromIdx)--toIdx;
      _model.fields.splice(toIdx, 0, field);

      //call to the move field callback function if it's set
      if (this.moveFieldCallback) {
        this.moveFieldCallback(fromIdx, toIdx, success, error);
      };
    }
  };

});
