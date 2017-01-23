angular.module('angular-jquery-querybuilder', []).directive('queryBuilder', [
  function() {
    return {
      restrict: 'AE',
      scope: {
        options: '=',
        builder: '='
      },
      link: function($scope, $element) {
        var _updateRules, getMongo, getRulesOrDefault, init, launchBuilder, rulesChangeEvent, setBuilder, viewToModelNotificator;
        _updateRules = function() {
          return $element[0].queryBuilder.setRules(getRulesOrDefault());
        };
        setBuilder = function() {
          return $scope.builder = $element[0].queryBuilder;
        };
        rulesChangeEvent = function() {
          return $($element).on('afterUpdateRuleValue.queryBuilder', function(event, rule) {
            return $scope.$emit("QueryBuilderRuleChanged", rule);
          });
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
        getMongo = function() {
          return $($element).queryBuilder('getMongo');
        };
        init = function() {
          launchBuilder();
          setBuilder();
          rulesChangeEvent();
          return viewToModelNotificator();
        };
        return init();
      }
    };
  }
]);
