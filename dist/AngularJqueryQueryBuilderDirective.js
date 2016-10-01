angular.module('angular-jquery-querybuilder').directive('queryBuilderr', [
  '$http', function($http) {
    return {
      restrict: 'AE',
      scope: {
        builder: '='
      },
      link: function($scope, $element) {
        var _getOptions, buildApi, getRulesOrDefault, init, launchBuilder, updateRules, viewToModelNotificator;
        updateRules = function() {
          return $element[0].queryBuilder.setRules(getRulesOrDefault());
        };
        buildApi = function() {
          if ($scope.builder.api) {
            $scope.builder.api.isValid = function() {
              return $element[0].queryBuilder.validate();
            };
            $scope.builder.api.getRules = function() {
              return $element[0].queryBuilder.getRules();
            };
            $scope.builder.api.updateRules = updateRules;
            $scope.builder.api.init = launchBuilder;
            return $scope.builder.builder = launchBuilder;
          }
        };
        viewToModelNotificator = function() {
          return $element.on('afterUpdateRuleValue.queryBuilder    afterUpdateRuleFilter.queryBuilder afterUpdateRuleOperator.queryBuilder afterUpdateGroupCondition.queryBuilder afterReset.queryBuilder              afterMove.queryBuilder afterSetFilters.queryBuilder         afterInvert.queryBuilder afterDeleteRule.queryBuilder         afterDeleteGroup.queryBuilder', function() {
            var newRules;
            newRules = $element[0].queryBuilder.getRules();
            if ((!angular.equals(newRules, $scope.builder.rules)) && ((newRules != null ? newRules.condition : void 0) || (newRules != null ? newRules.rules : void 0))) {
              return $scope.$emit("QueryBuilderValueChanged");
            }
          });
        };
        getRulesOrDefault = function() {
          var ref, ref1;
          if (!((ref = $scope.builder.rules) != null ? ref.condition : void 0) && !((ref1 = $scope.builder.rules) != null ? ref1.rules : void 0)) {
            return {
              condition: "OR",
              rules: []
            };
          } else {
            return $scope.builder.rules;
          }
        };
        _getOptions = function() {
          var option, options, ref, value;
          options = {
            filters: $scope.builder.filters,
            rules: getRulesOrDefault()
          };
          if ($scope.builder.config) {
            ref = $scope.builder.config;
            for (option in ref) {
              value = ref[option];
              options[option] = value;
            }
          }
          return options;
        };
        launchBuilder = function() {
          return $element.queryBuilder(_getOptions());
        };
        init = function() {
          launchBuilder();
          buildApi();
          return viewToModelNotificator();
        };
        return init();
      }
    };
  }
]);
