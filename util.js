const fs = require('fs')
const path = require('path')
const camelCase = require('camelcase')

const getComponentModuleNames = componentDir => {
  return fs.readdirSync(path.resolve(componentDir))
}

const makeEntryFile = componentModuleNames => {
  const content = componentModuleNames.map(componentName => {
    return `export { default as ${camelCase(componentName, {pascalCase: true})} } from './component/${componentName}';`
  })
  const index = './src/index.js'
  fs.writeFileSync(index, content.join('\n'))
  return { index }
}

const getRestEntry = (componentModuleNames, componentDir) => {
  makeEntryFile(componentModuleNames)
  return componentModuleNames.reduce((prev, name) => {
    prev[name] = `${componentDir}/${name}/index.js`
    return prev
  }, {})
}

export const getInput = () => {
  const componentDir = './src/component'
  const componentModuleNames = getComponentModuleNames(componentDir)
  const index = makeEntryFile(componentModuleNames)
  const restEntry = getRestEntry(componentModuleNames, componentDir)
  return {
    ...index,
    ...restEntry
  }
}

export const getOutput = name => {
  console.log(name)
  return name === 'index' ? 'index.js' : `${name}/index.js`
}

