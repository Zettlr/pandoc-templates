// This file takes all templates in the template folder, and (re)generates
// the metadata.json file.
import fs from 'fs'
import yaml from 'yaml'

const templates = fs.readdirSync('templates')
  .filter(name => {
    const stat = fs.statSync(`templates/${name}`)
    return stat.isDirectory()
  })

const metadata = {
  generatedOn: new Date().toISOString(),
  templates: []
}

for (const template of templates) {
  let data, parsedData
  data = fs.readFileSync(`templates/${template}/index.yml`, 'utf-8')
  parsedData = yaml.parse(data)

  const templateData = {
    id: template, // Folder name == ID
    ...parsedData
  }

  // Provide reader/writer properties
  data = fs.readFileSync(`templates/${template}/defaults.yml`, 'utf-8')
  parsedData = yaml.parse(data)
  templateData.reader = parsedData.reader
  templateData.writer = parsedData.writer

  metadata.templates.push(templateData)
}

fs.writeFileSync('metadata.json', JSON.stringify(metadata, undefined, 2), 'utf-8')
