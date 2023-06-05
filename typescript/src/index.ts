import shortenCssHex from 'shorten-css-hex';

function shortenHex(hexValue) {
  const shortenedHex = shortenCssHex('#' + hexValue);
  return shortenedHex;
}

Pulsar.registerFunction("shortenHex", shortenHex);

/**
 * Convert group name, token name and possible prefix into camelCased string, joining everything together
 */
 Pulsar.registerFunction(
  "readableVariableName",
  function (token, tokenGroup) {
    const segments = [...tokenGroup.path];
    segments.push(tokenGroup.name);
    segments.push(token.name);

    let tokenName = segments.join("-");

    tokenName = tokenName.replace('+', '');
    tokenName = tokenName.replace(/[^a-zA-Z0-9_-]/g, '-');

    return tokenName.toLowerCase();
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
  textTokenPrefix: "text"
});


/** Describe complex shadow token */
Pulsar.registerFunction("shadowDescription", function (shadowToken) {
  
  let connectedShadow = "transparent"
  if (shadowToken.shadowLayers) {
    connectedShadow = shadowToken.shadowLayers.reverse().map((shadow) => {
        return shadowTokenValue(shadow)
    }).join(", ")
  } else {
    return shadowTokenValue(shadowToken)
  }

  return connectedShadow ?? ""
})

/** Convert complex shadow value to CSS representation */
function shadowTokenValue(shadowToken) {
  var blurRadius = getValueWithCorrectUnit(nonNegativeValue(shadowToken.value.radius.measure));
  var offsetX = getValueWithCorrectUnit(shadowToken.value.x.measure);
  var offsetY = getValueWithCorrectUnit(shadowToken.value.y.measure);
  var spreadRadius = getValueWithCorrectUnit(shadowToken.value.spread.measure);

  return `${shadowToken.value.type === "Inner" ? "inset " : ""}${offsetX} ${offsetY} ${blurRadius} ${spreadRadius} ${getFormattedRGB(shadowToken.value.color)}`
}


function getValueWithCorrectUnit(value) {
  if (value === 0) {
    return `${value}`
  } else {
    // todo: add support for other units (px, rem, em, etc.)
    return `${value}px`
  }
}

function nonNegativeValue(num) {
  if (num <= 0) {
    return 0
  } else {
    return num
  }
}

/** Convert type to CSS unit */
function measureTypeIntoReadableUnit(type) {
  switch (type) {
    case "Points":
      return "pt"
    case "Pixels":
      return "px"
    case "Percent":
      return "%"
    case "Ems":
      return "em"
  }
}

function getFormattedRGB(colorValue) {
  if (colorValue.a === 0) {
    return `rgb(${colorValue.r},${colorValue.g},${colorValue.b})`
  } else {
    const opacity = Math.round((colorValue.a/255) * 100) / 100;
    return `rgba(${colorValue.r},${colorValue.g},${colorValue.b},${opacity})`
  } 
}