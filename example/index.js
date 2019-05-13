function start() {
  if (this.timer) return
  const test = new TimeBasedObject(2000)
  const test2 = new TimeBasedObject(2000)

  Array.apply(null, Array(10))
    .map(function() {
      return Math.random() * 100
    })
    .forEach((val, i) => (test[i] = val + i))

  Array.apply(null, Array(10))
    .map(function() {
      return Math.random() * 100
    })
    .forEach((val, i) => (test2[i] = val + i))

  this.timer = setInterval(() => {
    document.getElementById('test1').innerHTML =
      'First obj keys: ' + Object.keys(test)
    document.getElementById('test2').innerHTML =
      'Second obj keys: ' + Object.keys(test2)

    // init the first 5 items of test
    Array.apply(null, Array(5))
      .map(function() {
        return Math.random() * 100
      })
      .forEach((val, i) => (test[i] = val + i))
  }, 1000)
}

function stop() {
  clearInterval(this.timer)
  this.timer = undefined
  document.getElementById('test1').innerHTML = ''
  document.getElementById('test2').innerHTML = ''
}
