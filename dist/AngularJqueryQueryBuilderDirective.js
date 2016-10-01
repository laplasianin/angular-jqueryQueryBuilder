angular.module('angular-jquery-querybuilder', []).directive('queryBuilder', [
  function() {
    return {
      restrict: 'AE',
      scope: {
        options: '=',
        builder: '='
      },
      link: function($scope, $element) {
        var _updateRules, getRulesOrDefault, init, launchBuilder, setBuilder, viewToModelNotificator;
        _updateRules = function() {
          return $element[0].queryBuilder.setRules(getRulesOrDefault());
        };
        setBuilder = function() {
          return $scope.builder = $element[0].queryBuilder;
        };
        viewToModelNotificator = function() {
          return $($element).on('afterUpdateRuleValue.queryBuilder    afterUpdateRuleFilter.queryBuilder afterUpdateRuleOperator.queryBuilder afterUpdateGroupCondition.queryBuilder afterReset.queryBuilder              afterMove.queryBuilder afterSetFilters.queryBuilder         afterInvert.queryBuilder afterDeleteRule.queryBuilder         afterDeleteGroup.queryBuilder', function() {
            var newRules;
            newRules = $element[0].queryBuilder.getRules();
            if ((!angular.equals(newRules, $scope.options.rules)) && ((newRules != null ? newRules.condition : void 0) || (newRules != null ? newRules.rules : void 0))) {
              return $scope.$emit("QueryBuilderValueChanged");
            }
          });
        };
        getRulesOrDefault = function() {
          var ref, ref1;
          if (!((ref = $scope.options.rules) != null ? ref.condition : void 0) && !((ref1 = $scope.options.rules) != null ? ref1.rules : void 0)) {
            return {
              condition: "OR",
              rules: []
            };
          } else {
            return $scope.options.rules;
          }
        };
        launchBuilder = function() {
          return $($element).queryBuilder($scope.options);
        };
        init = function() {
          launchBuilder();
          setBuilder();
          return viewToModelNotificator();
        };
        return init();
      }
    };
  }
]);
