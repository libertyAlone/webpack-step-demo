require('./main.scss') // production模式下使用import导入miniextracttextplugin无法处理scss

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('sw registered: ', registration)
      }).catch(registrationError => {
        console.log('err: ' + registrationError)
      })
  })
}
// async function getComponent() {
//   const element = document.createElement('div')
//   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash')
//   element.innerHTML = _.join(['hello', 'webpack'], ' ')
//   return element
// }

// getComponent().then(component => {
//   document.body.appendChild(component)
// })

async function component() {
  var element = document.createElement('div')
  var button = document.createElement('button')
  var br = document.createElement('br')
  button.innerHTML = '点击'
  const _ = await import(/* webpackChunkName: "lodash" */ 'lodash')
  element.innerHTML = _.join(['hello', 'webpack'], ' ')
  element.appendChild(br)
  element.appendChild(button)
  button.onclick = async (e) => {
    const print = (await import(/* webpackChunkName: "print" */ './print')).default
    print()
  }
  return element
}

component().then(component => {
  document.body.appendChild(component)
})
// document.body.appendChild(component())

if (module.hot) {
  module.hot.accept('./print.js', () => {
    console.log('accpet the updated printme module')
    document.body.removeChild(element)
    element = component()
    document.body.appendChild(element)
  })
}