#= require partystreusel/namespace

class FoundationHelpers

  @isSmall = ->
    !matchMedia(Foundation.media_queries['medium']).matches

  @isMedium = ->
    matchMedia(Foundation.media_queries['medium']).matches &&
      !@isLarge()

  @isLarge = ->
    matchMedia(Foundation.media_queries['large']).matches

Partystreusel.FoundationHelpers = FoundationHelpers
