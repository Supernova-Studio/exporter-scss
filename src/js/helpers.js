/**
 * Convert group name, token name and possible prefix into camelCased string, joining everything together
 */
Pulsar.registerFunction(
  "readableVariableName",
  function (token, tokenGroup, prefix) {
    // Create array with all path segments and token name at the end
    const segments = [...tokenGroup.path];
    if (!tokenGroup.isRoot) {
      segments.push(tokenGroup.name)
    }
    segments.push(token.name);

    if (prefix && prefix.length > 0) {
      segments.unshift(prefix);
    }

    // Create "sentence" separated by spaces so we can camelcase it all
    let sentence = segments.join(" ");

    // camelcase string from all segments
     sentence = sentence
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    
    // only allow letters, digits, underscore and hyphen
    sentence = sentence.replace(/[^a-zA-Z0-9_-]/g, '_')

    // prepend underscore if it starts with digit 
    if (/^\d/.test(sentence)) {
      sentence = '_' + sentence;
    }

    return sentence;
  }
);


function findAliases(token, allTokens){
  let aliases = allTokens.filter(t => t.value.referencedToken && t.value.referencedToken.id === token.id)
  for (const t of aliases) {
    aliases = aliases.concat(findAliases(t, allTokens))
  }
  return aliases;
}

Pulsar.registerFunction("findAliases", findAliases)

Pulsar.registerFunction("gradientAngle", function(from, to) {
    var deltaY = (to.y - from.y);
    var deltaX = (to.x - from.x);
    var radians = Math.atan2(deltaY, deltaX); 
    var result = radians * 180 / Math.PI; 
    result = result + 90; 
    return  ((result < 0) ? (360 + result) : result) % 360;
})

/**
 * Behavior configuration of the exporter
 * Prefixes: Add prefix for each category of the tokens. For example, all colors can start with "color, if needed"
 */
Pulsar.registerPayload("behavior", {
  colorTokenPrefix: "color",
  borderTokenPrefix: "border",
  gradientTokenPrefix: "gradient",
  measureTokenPrefix: "measure",
  shadowTokenPrefix: "shadow",
  typographyTokenPrefix: "typography",
});
