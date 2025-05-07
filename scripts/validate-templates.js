// This file validates all templates in the template folder.
import fs from 'fs'
import Ajv from 'ajv'
import addFormats from "ajv-formats"
import yaml from 'yaml'

const REQUIRED_FILES = ['index.yml', 'defaults.yml', 'preview.png']

// Preflight: Load JSON schema
const data = fs.readFileSync('template.schema.json', 'utf-8')
const schemaJson = JSON.parse(data)

// Read in all templates
const templates = fs.readdirSync('templates')
  .filter(name => {
    const stat = fs.statSync(`templates/${name}`)
    return stat.isDirectory()
  })

const errors = []

for (const template of templates) {
  let data, parsedData

  console.log(`Checking ${template}...`)
  // Check for required files
  const contents = fs.readdirSync(`templates/${template}`)
  for (const file of REQUIRED_FILES) {
    if (!contents.includes(file)) {
      errors.push(new Error(`Template ${template}: Required file ${file} not found`))
    }
  }

  if (!contents.includes('index.yml') || !contents.includes('defaults.yml')) {
    continue
  }

  data = fs.readFileSync(`templates/${template}/index.yml`, 'utf-8')
  parsedData = yaml.parse(data)

  // Validate index.yml
  const ajv = new Ajv()
  addFormats(ajv) // Required to parse `format`, such as `date-time`
  const validate = ajv.compile(schemaJson)
  const isValid = validate(parsedData)
  if (!isValid) {
    if (validate.errors) {
      for (const error of validate.errors) {
        errors.push(new Error(`Template ${template} [index.yml]: ${error.message}`))
      }
    } else {
      errors.push(new Error(`Template ${template} [index.yml]: Errors encountered while parsing index.yml`))
    }
  }

  // Validate defaults.yml
  data = fs.readFileSync(`templates/${template}/defaults.yml`, 'utf-8')
  parsedData = yaml.parse(data)

  if (parsedData.writer === undefined || parsedData.reader === undefined) {
    errors.push(new Error(`Template ${template} [defaults.yml]: Reader or writer property not present.`))
  }
}

if (errors.length > 0) {
  console.error('=== VALIDATION FAILED ===\n')
  for (const error of errors) {
    console.error(error.message)
  }
  process.exit(1)
} else {
  console.log('Validation successful.')
  process.exit(0)
}
