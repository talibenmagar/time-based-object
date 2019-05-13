class TimeBasedObject {
  // target - key-value object
  // timeLimit - the time in ms to dispose
  constructor(timeLimit, target = {}) {
    // gets all keys from target
    var keys = Object.keys(target)
    // set a timerDictionary with targets' keys with init value according to given time limit
    var timeDict = keys.reduce((obj, key) => {
      obj[key] = Date.now() + timeLimit
      return obj
    }, {})

    // set timer to delete every key-value pair that wasn't in use for the given timeLimit
    this.timer = setInterval(() => {
      // get the deleteKeys - check the time of the timeDictionary.
      // In case the time is not bigger from the current time, delete the key
      var deleteKeys = Object.keys(timeDict).filter(
        key => timeDict[key] <= Date.now()
      )
      deleteKeys.forEach(key => delete target[key])
    }, timeLimit)

    // override the get/set (using proxy)
    var handler = {
      get: function(target, prop) {
        // set the current key value to the last updated time (current time + the time limit)
        timeDict[prop] = Date.now() + timeLimit
        return target[prop]
      },
      set: function(target, prop, value, receiver) {
        // set the current key value on time dictuinary to the last updated time (current time + the time limit)
        timeDict[prop] = Date.now() + timeLimit
        target[prop] = value

        return true
      }
    }

    return new Proxy(target, handler)
  }
}
