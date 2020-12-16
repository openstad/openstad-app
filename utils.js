const fs = require("fs");

/**
 * Turn object intto one line string
 * @param   object      obj key value object, won't work with nested object
 * @return  string      string with key="object" seperated with spaces
 */
exports.objectToAline = (obj) => {
  return Object.keys(obj)
    .map(function (key) {
      return "" + key + "='" + obj[key] + "'"; // line break for wrapping only
    })
    .join(" ");
};

/**
 * Creates env file from object
 * @param {string} path path to .env file
 * @param {object} obj object to convert to env
 */
exports.createEnvFile = (path, obj = {}) => {
  const stream = fs.createWriteStream(path);

  Object.keys(obj).map(function (key) {
    const line = `${key}='${obj[key]}'\n`;
    stream.write(line);
  });

  stream.end();
};
