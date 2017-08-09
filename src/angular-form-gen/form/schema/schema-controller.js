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
      copy.processing = false;
    }
    var error = function(){
      angular.copy(_previousValue, _model.fields);
      copy.processing = false;
    }

    field.processing = true;
    var _previousValue = [];
    angular.copy(_model.fields, _previousValue);

    var copy = fgUtils.copyField(field);
    copy.formTypeFields = _formTypeFields;

    index = index === undefined ? _model.fields.length : index;
    _model.fields.splice(index, 0, copy);

    //call to the add field callback function if it's set
    if (this.addFieldCallback) {
      this.addFieldCallback(copy, index, success, error);
    };
  };

  this.removeField = function(index) {
    var success = function(){
      _model.fields.splice(index, 1);
      field.processing = false;
    }
    var error = function(){
      angular.copy(_previousValue, _model.fields);
      field.processing = false;
    }

    var field = _model.fields[index];

    field.processing = true;
    var _previousValue = [];
    angular.copy(_model.fields, _previousValue);

    //call to the remove field callback function if it's set
    if (this.removeFieldCallback) {
      this.removeFieldCallback(index, success, error);
    };
  };

  this.swapFields = function(idx1, idx2) {
    var success = function(){
      field1.processing = false;
      field2.processing = false;
    }
    var error = function(){
      angular.copy(_previousValue, _model.fields);
      field1.processing = false;
      field2.processing = false;
    }

    var field1 = _model.fields[idx1];
    var field2 = _model.fields[idx2];

    field1.processing = true;
    field2.processing = true;

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
        field.processing = false;
      }

      var error = function(){
        _previousValue[fromIdx].$_isDragging = false;
        _model.fields = angular.copy(_previousValue);
        field.processing = false;
      }

      var _previousValue = angular.copy(_model.fields);
      var field = _model.fields.splice(fromIdx, 1)[0];
      field.processing = true;
      console.log(field)

      if (toIdx > fromIdx)--toIdx;
      _model.fields.splice(toIdx, 0, field);

      //call to the move field callback function if it's set
      if (this.moveFieldCallback) {
        this.moveFieldCallback(fromIdx, toIdx, success, error);
      };
    }
  };

});
