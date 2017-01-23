angular.module 'angular-jquery-querybuilder', []
.directive 'queryBuilder', [ () ->
  restrict: 'AE'
  scope:
    options: '='
    builder: '='

  link: ($scope, $element) ->

    _updateRules = ->
      $element[0].queryBuilder.setRules(getRulesOrDefault())

    setBuilder = ->
      $scope.builder = $element[0].queryBuilder

    rulesChangeEvent = ->
      $($element).on 'afterUpdateRuleValue.queryBuilder', (event, rule) ->
        $scope.$emit("QueryBuilderRuleChanged", rule)

    viewToModelNotificator = ->
      $($element).on 'afterUpdateRuleValue.queryBuilder    afterUpdateRuleFilter.queryBuilder
                   afterUpdateRuleOperator.queryBuilder afterUpdateGroupCondition.queryBuilder
                   afterReset.queryBuilder              afterMove.queryBuilder
                   afterSetFilters.queryBuilder         afterInvert.queryBuilder
                   afterDeleteRule.queryBuilder         afterDeleteGroup.queryBuilder', ->  # these are all events which could change rules value
        newRules = $element[0].queryBuilder.getRules()
        if (not angular.equals newRules, $scope.options.rules) and (newRules?.condition or newRules?.rules)
          $scope.$emit("QueryBuilderValueChanged")

    getRulesOrDefault = ->
      if not $scope.options.rules?.condition and not $scope.options.rules?.rules # to save querybuilder from incorrect external values
        {condition: "OR", rules: []}
      else
        $scope.options.rules

    launchBuilder = ->
      $($element).queryBuilder $scope.options


    getMongo = ->
      $($element).queryBuilder('getMongo')

    init = ->
      launchBuilder()
      setBuilder()
      rulesChangeEvent()
      viewToModelNotificator()
    do init
]
