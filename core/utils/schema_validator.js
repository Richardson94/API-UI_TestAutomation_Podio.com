const { Validator } = require('jsonschema');
const fileReader = require('./file_reader');

module.exports.validateSchemaFromPath = function (response, schemaPath) {
  const validator = new Validator();
  const schema = fileReader.readJson(schemaPath);
  return validator.validate(response, schema).valid;
};
