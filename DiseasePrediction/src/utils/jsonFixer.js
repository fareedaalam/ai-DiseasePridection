// utils/jsonFixer.js
const { jsonrepair } = require('jsonrepair');

function fixInvalidJsonString(jsonStr) {
  try {
  const fixedJson = jsonrepair(jsonStr);
 return JSON.parse(fixedJson);
  
} catch (err) {
  console.error('Repair failed:', err.message);
}
}

module.exports = { fixInvalidJsonString };
