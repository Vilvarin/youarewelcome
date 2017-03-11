const url = '/api/'

function createSleepPromise (timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

function sleep (timeout) {
  let promiseFunction = value => {
    return createSleepPromise(timeout).then(() => {
      return value
    })
  }

  promiseFunction.then = () => {
    let sleepPromise = createSleepPromise(timeout)

    return sleepPromise.then.apply(sleepPromise, arguments)
  }

  promiseFunction.catch = Promise.resolve().catch

  return promiseFunction
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function transformRequest (obj) {
  let str = []
  for (let p in obj) {
    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
  }
  return str.join('&')
}

export default {
  getAnswer (request) {
    return fetch(url + 'get-answer', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: transformRequest({q: request})
    })
    .then(sleep(1500))
    .then(checkStatus)
    .then(response => response.json())
  }
}
