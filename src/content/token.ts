import { NamingHelper, CSSHelper, ColorFormat, StringCase, ColorHelper } from "@supernovaio/export-helpers"
import { AnyStringToken, ColorToken, DimensionToken, GradientToken, ProductCopyToken, ShadowToken, StringToken, Token, TokenGroup } from "@supernovaio/sdk-exporters"
import shortenCssHex = require("shorten-css-hex");

export function colorTokenToCSS(token: ColorToken, mappedTokens: Map<string, Token>, tokenGroups: Array<TokenGroup>): string {
  // First creating the name of the token, using helper function which turns any token name / path into a valid variable name
  const name = tokenVariableName(token, tokenGroups)
  let value: string;
  // If opacity is less than 100%, convert it to RGBA
  if(token.value.opacity.measure < 1) {
    const r = token.value.color.r
    const g = token.value.color.g
    const b = token.value.color.b
    const a = Math.round(token.value.opacity.measure * 100) / 100
    value = `rgba(${r}, ${g}, ${b}, ${a})`
  } else {
    // Shortens Hex value to shorthand if possible
    value = shortenCssHex(token.toHex6())
  }
  return `$${name}: ${value};`
}

//Gradient tokens
export function gradientTokensToSCSS(token: GradientToken, mappedTokens: Map<string, Token>, tokenGroups: Array<TokenGroup>): string {
  const name = tokenVariableName(token, tokenGroups)
  const degree = `${calculateGradientAngle(token.value[0].from, token.value[0].to)}deg`
  let stops = token.value[0].stops
    .map((stop) => {
      return `${CSSHelper.colorTokenValueToCSS(stop.color, mappedTokens, {
        allowReferences: false,
        decimals: 2,
        colorFormat: ColorFormat.rgba,
        tokenToVariableRef: function (token: Token): string {
          throw new Error("Function not implemented.");
        }
      })} ${ColorHelper.roundToDecimals(
        stop.position * 100,
        2
      )}%`
    })
    .join(', ')
  const value = `linear-gradient(${degree}, ${stops})`
  return `$${name}: ${value};`
}

function calculateGradientAngle(from, to) {
  var deltaY = (to.y - from.y);
  var deltaX = (to.x - from.x);
  var radians = Math.atan2(deltaY, deltaX); 
  var result = radians * 180 / Math.PI; 
  result = result + 90; 
  return  ((result < 0) ? (360 + result) : result) % 360;
}

// Dimension tokens
export function dimensionTokentoSCSS(token: DimensionToken, mappedTokens: Map<string, Token>, tokenGroups: Array<TokenGroup>): string {
  const name = tokenVariableName(token, tokenGroups)
  const value = token.value.measure;
  const unit = convertDimensionUnit(token.propertyValues['tokenUnit']);
  return `$${name}: ${value}${unit};`
}

//Shadow tokens
export function shadowTokenToSCSS(token: ShadowToken, mappedTokens: Map<string, Token>, tokenGroups: Array<TokenGroup>): string {
  const name = tokenVariableName(token, tokenGroups)
  const shadowValue = token.value[0]
  const x = shadowValue.x
  const y = shadowValue.y
  const radius = shadowValue.radius
  const spread = shadowValue.spread
  const color = shadowValue.color.color
  const r = color.r
  const g = color.g
  const b = color.b
  const opacity = Math.round(shadowValue.opacity.measure * 100) / 100
  const value = `${x}px ${y}px ${radius}px ${spread}px rgba(${r}, ${g}, ${b}, ${opacity})`
  return `$${name}: ${value};`
}

export function copyTokenToSCSS(token: AnyStringToken, mappedTokens: Map<string, Token>, tokenGroups: Array<TokenGroup>): string {
  const name = tokenVariableName(token, tokenGroups)
  const value = token.value.text
  return `$${name}: ${value};`
}

// Converts the Dimension Unit custom property to readable string
function convertDimensionUnit(unit) {
  switch (unit) {
      case "4af0c343-2012-4d49-85b0-306d0aed89c2":
      case "f973a87d-3624-4b9f-b703-1f6df37f5b35": 
        return 'px'; 
      case "012bbecc-e1bf-45b9-b64a-098b2088917c":
      case "f50cba06-7b84-4dca-8e32-89b6c051d850": 
        return ''; 
      case "5f64ed08-8420-45a8-bbff-05a53e971c8f":
      case "e453a56a-ab62-47ad-b7dc-b52c32fdd5a9": 
        return 'em'; 
      case "b2dc092e-d140-48b0-97c2-2b5e8b7e18c1":
      case "5c5e3a43-5641-4df2-b94a-ccc7e94577e1": 
        return '%'; 
      case "2074af76-6d13-43aa-9713-1e796b0a1b76":
      case "d9db0336-aadc-4afa-88d0-7e7ba71ceaf6": 
        return 's'; 
  }
}

function tokenVariableName(token: Token, tokenGroups: Array<TokenGroup>): string {
  const parent = tokenGroups.find((group) => group.id === token.parentGroupId)!
  return NamingHelper.codeSafeVariableNameForToken(token, StringCase.paramCase, parent, "")
}