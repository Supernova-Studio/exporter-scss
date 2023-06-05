import shortenCssHex from 'shorten-css-hex';

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function shortenHex(hexValue) {
  var shortenedHex = shortenCssHex('#' + hexValue);
  return shortenedHex;
}

Pulsar.registerFunction("shortenHex", shortenHex);
/**
 * Convert group name, token name and possible prefix into camelCased string, joining everything together
 */

Pulsar.registerFunction("readableVariableName", function (token, tokenGroup) {
  var segments = [].concat(tokenGroup.path);
  segments.push(tokenGroup.name);
  segments.push(token.name);
  var tokenName = segments.join("-");
  tokenName = tokenName.replace(/[^a-zA-Z0-9_-]/g, '');
  return tokenName.toLowerCase();
});

function findAliases(token, allTokens) {
  var aliases = allTokens.filter(function (t) {
    return t.value.referencedToken && t.value.referencedToken.id === token.id;
  });

  for (var _iterator = _createForOfIteratorHelperLoose(aliases), _step; !(_step = _iterator()).done;) {
    var t = _step.value;
    aliases = aliases.concat(findAliases(t, allTokens));
  }

  return aliases;
}

Pulsar.registerFunction("findAliases", findAliases);
Pulsar.registerFunction("gradientAngle", function (from, to) {
  var deltaY = to.y - from.y;
  var deltaX = to.x - from.x;
  var radians = Math.atan2(deltaY, deltaX);
  var result = radians * 180 / Math.PI;
  result = result + 90;
  return (result < 0 ? 360 + result : result) % 360;
});
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
  var _connectedShadow;

  var connectedShadow = "transparent";

  if (shadowToken.shadowLayers) {
    connectedShadow = shadowToken.shadowLayers.reverse().map(function (shadow) {
      return shadowTokenValue(shadow);
    }).join(", ");
  } else {
    return shadowTokenValue(shadowToken);
  }

  return (_connectedShadow = connectedShadow) != null ? _connectedShadow : "";
});
/** Convert complex shadow value to CSS representation */

function shadowTokenValue(shadowToken) {
  var blurRadius = getValueWithCorrectUnit(nonNegativeValue(shadowToken.value.radius.measure));
  var offsetX = getValueWithCorrectUnit(shadowToken.value.x.measure);
  var offsetY = getValueWithCorrectUnit(shadowToken.value.y.measure);
  var spreadRadius = getValueWithCorrectUnit(shadowToken.value.spread.measure);
  return "" + (shadowToken.value.type === "Inner" ? "inset " : "") + offsetX + " " + offsetY + " " + blurRadius + " " + spreadRadius + " " + getFormattedRGB(shadowToken.value.color);
}

function getValueWithCorrectUnit(value) {
  if (value === 0) {
    return "" + value;
  } else {
    // todo: add support for other units (px, rem, em, etc.)
    return value + "px";
  }
}

function nonNegativeValue(num) {
  if (num <= 0) {
    return 0;
  } else {
    return num;
  }
}

function getFormattedRGB(colorValue) {
  if (colorValue.a === 0) {
    return "rgb(" + colorValue.r + "," + colorValue.g + "," + colorValue.b + ")";
  } else {
    var opacity = Math.round(colorValue.a / 255 * 100) / 100;
    return "rgba(" + colorValue.r + "," + colorValue.g + "," + colorValue.b + "," + opacity + ")";
  }
}
//# sourceMappingURL=supernova-exporter-css-like.esm.js.map
