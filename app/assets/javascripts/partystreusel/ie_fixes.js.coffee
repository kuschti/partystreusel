if Function::name is `undefined` and Object.defineProperty isnt `undefined`
  Object.defineProperty Function::, "name",
    get: ->
      funcNameRegex = /function\s([^(]{1,})\(/
      results = (funcNameRegex).exec(@toString())
      (if (results and results.length > 1) then results[1].trim() else "")

    set: (value) ->
