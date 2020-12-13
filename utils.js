/**
 * Turn object intto one line string
 * @param   object      obj key value object, won't work with nested object
 * @return  string      string with key="object" seperated with spaces
 */
exports.objectToAline = (obj) => {
  return Object.keys(obj).map(function (key) {
    return "" + key + "='" + obj[key] +"'"; // line break for wrapping only
  }).join(" ");
}
