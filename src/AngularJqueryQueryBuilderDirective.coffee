angular.module 'angular-jquery-querybuilder'
.directive 'queryBuilderr', [ () ->
  restrict: 'AE'
  scope:
    builder: '='
    # .rules  required
    # .filters  required
    # .config 
    # .api

  link: ($scope, $element) ->

    updateRules = ->
      $element[0].queryBuilder.setRules(getRulesOrDefault())

    buildApi = ->
      if $scope.builder.api
        $scope.builder.api.isValid = -> $element[0].queryBuilder.validate()
        $scope.builder.api.getRules = -> $element[0].queryBuilder.getRules()
        $scope.builder.api.updateRules = updateRules
        $scope.builder.api.init = launchBuilder
        $scope.builder.builder = launchBuilder

    viewToModelNotificator = ->
      $element.on 'afterUpdateRuleValue.queryBuilder    afterUpdateRuleFilter.queryBuilder
                   afterUpdateRuleOperator.queryBuilder afterUpdateGroupCondition.queryBuilder
                   afterReset.queryBuilder              afterMove.queryBuilder
                   afterSetFilters.queryBuilder         afterInvert.queryBuilder
                   afterDeleteRule.queryBuilder         afterDeleteGroup.queryBuilder', ->  # these are all events which could change rules value
        newRules = $element[0].queryBuilder.getRules()
        if (not angular.equals newRules, $scope.builder.rules) and (newRules?.condition or newRules?.rules)
          $scope.$emit("QueryBuilderValueChanged")

    getRulesOrDefault = ->
      if not $scope.builder.rules?.condition and not $scope.builder.rules?.rules # to save querybuilder from incorrect external values
        {condition: "OR", rules: []}
      else
        $scope.builder.rules

    _getOptions = ->
      options =
        filters: $scope.builder.filters
        rules: getRulesOrDefault()

      if $scope.builder.config
        for option, value of $scope.builder.config
          options[option] = value
      options

    launchBuilder = ->
      $element.queryBuilder _getOptions()

    init = ->
      launchBuilder()
      buildApi()
      viewToModelNotificator()

    do init
]
