/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/**
 * Convert group name, token name and possible prefix into camelCased string, joining everything together
 */
Pulsar.registerFunction("readableVariableName", function (token, tokenGroup, prefix) {
    // Create array with all path segments and token name at the end
    const nameSegments = [];
    // Start path of the group
    tokenGroup.path.forEach(s => nameSegments.push(...splitIntoWords(s)));
    // Append name of the group
    if (!tokenGroup.isRoot && !tokenGroup.isNonVirtualRoot) {
        nameSegments.push(...splitIntoWords(tokenGroup.name));
    }
    // Split the token name into words
    nameSegments.push(...splitIntoWords(token.name));
    // Add prefix if provided from external configuration
    if (prefix && prefix.length > 0) {
        nameSegments.unshift(prefix);
    }
    // Create "sentence" separated by spaces so we can camelcase it all
    let sentence = nameSegments.join(" ");
    // camelcase string from all segments
    sentence = sentence
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    // only allow letters, digits, underscore and hyphen
    sentence = sentence.replace(/[^a-zA-Z0-9_-]/g, "_");
    // prepend underscore if it starts with digit
    if (/^\d/.test(sentence)) {
        sentence = "_" + sentence;
    }
    return sentence;
});
function splitIntoWords(string) {
    return string.match(/([A-Z]?[a-z]+|\d+|[A-Z]+(?![a-z]))/g) || [];
}
function findAliases(token, allTokens) {
    let aliases = allTokens.filter((t) => t.value.referencedToken && t.value.referencedToken.id === token.id);
    for (const t of aliases) {
        aliases = aliases.concat(findAliases(t, allTokens));
    }
    return aliases;
}
Pulsar.registerFunction("findAliases", findAliases);
Pulsar.registerFunction("gradientAngle", function (from, to) {
    var deltaY = to.y - from.y;
    var deltaX = to.x - from.x;
    var radians = Math.atan2(deltaY, deltaX);
    var result = (radians * 180) / Math.PI;
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
});
/** Describe complex shadow token */
Pulsar.registerFunction("shadowDescription", function (shadowToken) {
    let connectedShadow = "transparent";
    if (shadowToken.shadowLayers) {
        connectedShadow = shadowToken.shadowLayers
            .reverse()
            .map((shadow) => {
            return shadowTokenValue(shadow);
        })
            .join(", ");
    }
    else {
        return shadowTokenValue(shadowToken);
    }
    return connectedShadow !== null && connectedShadow !== void 0 ? connectedShadow : "";
});
/** Convert complex shadow value to CSS representation */
function shadowTokenValue(shadowToken) {
    var blurRadius = getValueWithCorrectUnit(nonNegativeValue(shadowToken.value.radius.measure));
    var offsetX = getValueWithCorrectUnit(shadowToken.value.x.measure);
    var offsetY = getValueWithCorrectUnit(shadowToken.value.y.measure);
    var spreadRadius = getValueWithCorrectUnit(shadowToken.value.spread.measure);
    return `${shadowToken.value.type === "Inner" ? "inset " : ""}${offsetX} ${offsetY} ${blurRadius} ${spreadRadius} ${getFormattedRGB(shadowToken.value.color)}`;
}
function getValueWithCorrectUnit(value) {
    if (value === 0) {
        return `${value}`;
    }
    else {
        // todo: add support for other units (px, rem, em, etc.)
        return `${value}px`;
    }
}
function nonNegativeValue(num) {
    if (num <= 0) {
        return 0;
    }
    else {
        return num;
    }
}
/** Convert type to CSS unit */
function measureTypeIntoReadableUnit(type) {
    switch (type) {
        case "Points":
            return "pt";
        case "Pixels":
            return "px";
        case "Percent":
            return "%";
        case "Ems":
            return "em";
    }
}
function getFormattedRGB(colorValue) {
    if (colorValue.a === 0) {
        return `rgb(${colorValue.r},${colorValue.g},${colorValue.b})`;
    }
    else {
        const opacity = Math.round((colorValue.a / 255) * 100) / 100;
        return `rgba(${colorValue.r},${colorValue.g},${colorValue.b},${opacity})`;
    }
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxtREFBbUQsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUseUNBQXlDO0FBQ2hLO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixNQUFNO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixNQUFNO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGFBQWEsR0FBRyxhQUFhLEdBQUcsYUFBYTtBQUNuRTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsYUFBYSxHQUFHLGFBQWEsR0FBRyxhQUFhLEdBQUcsUUFBUTtBQUMvRTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3VwZXJub3ZhLWV4cG9ydGVyLWNzcy1saWtlLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29udmVydCBncm91cCBuYW1lLCB0b2tlbiBuYW1lIGFuZCBwb3NzaWJsZSBwcmVmaXggaW50byBjYW1lbENhc2VkIHN0cmluZywgam9pbmluZyBldmVyeXRoaW5nIHRvZ2V0aGVyXG4gKi9cblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwicmVhZGFibGVWYXJpYWJsZU5hbWVcIiwgZnVuY3Rpb24gKHRva2VuLCB0b2tlbkdyb3VwLCBwcmVmaXgpIHtcbiAgICAvLyBDcmVhdGUgYXJyYXkgd2l0aCBhbGwgcGF0aCBzZWdtZW50cyBhbmQgdG9rZW4gbmFtZSBhdCB0aGUgZW5kXG4gICAgY29uc3QgbmFtZVNlZ21lbnRzID0gW107XG4gICAgLy8gU3RhcnQgcGF0aCBvZiB0aGUgZ3JvdXBcbiAgICB0b2tlbkdyb3VwLnBhdGguZm9yRWFjaChzID0+IG5hbWVTZWdtZW50cy5wdXNoKC4uLnNwbGl0SW50b1dvcmRzKHMpKSk7XG4gICAgLy8gQXBwZW5kIG5hbWUgb2YgdGhlIGdyb3VwXG4gICAgaWYgKCF0b2tlbkdyb3VwLmlzUm9vdCAmJiAhdG9rZW5Hcm91cC5pc05vblZpcnR1YWxSb290KSB7XG4gICAgICAgIG5hbWVTZWdtZW50cy5wdXNoKC4uLnNwbGl0SW50b1dvcmRzKHRva2VuR3JvdXAubmFtZSkpO1xuICAgIH1cbiAgICAvLyBTcGxpdCB0aGUgdG9rZW4gbmFtZSBpbnRvIHdvcmRzXG4gICAgbmFtZVNlZ21lbnRzLnB1c2goLi4uc3BsaXRJbnRvV29yZHModG9rZW4ubmFtZSkpO1xuICAgIC8vIEFkZCBwcmVmaXggaWYgcHJvdmlkZWQgZnJvbSBleHRlcm5hbCBjb25maWd1cmF0aW9uXG4gICAgaWYgKHByZWZpeCAmJiBwcmVmaXgubGVuZ3RoID4gMCkge1xuICAgICAgICBuYW1lU2VnbWVudHMudW5zaGlmdChwcmVmaXgpO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgXCJzZW50ZW5jZVwiIHNlcGFyYXRlZCBieSBzcGFjZXMgc28gd2UgY2FuIGNhbWVsY2FzZSBpdCBhbGxcbiAgICBsZXQgc2VudGVuY2UgPSBuYW1lU2VnbWVudHMuam9pbihcIiBcIik7XG4gICAgLy8gY2FtZWxjYXNlIHN0cmluZyBmcm9tIGFsbCBzZWdtZW50c1xuICAgIHNlbnRlbmNlID0gc2VudGVuY2VcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgLnJlcGxhY2UoL1teYS16QS1aMC05XSsoLikvZywgKG0sIGNocikgPT4gY2hyLnRvVXBwZXJDYXNlKCkpO1xuICAgIC8vIG9ubHkgYWxsb3cgbGV0dGVycywgZGlnaXRzLCB1bmRlcnNjb3JlIGFuZCBoeXBoZW5cbiAgICBzZW50ZW5jZSA9IHNlbnRlbmNlLnJlcGxhY2UoL1teYS16QS1aMC05Xy1dL2csIFwiX1wiKTtcbiAgICAvLyBwcmVwZW5kIHVuZGVyc2NvcmUgaWYgaXQgc3RhcnRzIHdpdGggZGlnaXRcbiAgICBpZiAoL15cXGQvLnRlc3Qoc2VudGVuY2UpKSB7XG4gICAgICAgIHNlbnRlbmNlID0gXCJfXCIgKyBzZW50ZW5jZTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbnRlbmNlO1xufSk7XG5mdW5jdGlvbiBzcGxpdEludG9Xb3JkcyhzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLm1hdGNoKC8oW0EtWl0/W2Etel0rfFxcZCt8W0EtWl0rKD8hW2Etel0pKS9nKSB8fCBbXTtcbn1cbmZ1bmN0aW9uIGZpbmRBbGlhc2VzKHRva2VuLCBhbGxUb2tlbnMpIHtcbiAgICBsZXQgYWxpYXNlcyA9IGFsbFRva2Vucy5maWx0ZXIoKHQpID0+IHQudmFsdWUucmVmZXJlbmNlZFRva2VuICYmIHQudmFsdWUucmVmZXJlbmNlZFRva2VuLmlkID09PSB0b2tlbi5pZCk7XG4gICAgZm9yIChjb25zdCB0IG9mIGFsaWFzZXMpIHtcbiAgICAgICAgYWxpYXNlcyA9IGFsaWFzZXMuY29uY2F0KGZpbmRBbGlhc2VzKHQsIGFsbFRva2VucykpO1xuICAgIH1cbiAgICByZXR1cm4gYWxpYXNlcztcbn1cblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZmluZEFsaWFzZXNcIiwgZmluZEFsaWFzZXMpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJncmFkaWVudEFuZ2xlXCIsIGZ1bmN0aW9uIChmcm9tLCB0bykge1xuICAgIHZhciBkZWx0YVkgPSB0by55IC0gZnJvbS55O1xuICAgIHZhciBkZWx0YVggPSB0by54IC0gZnJvbS54O1xuICAgIHZhciByYWRpYW5zID0gTWF0aC5hdGFuMihkZWx0YVksIGRlbHRhWCk7XG4gICAgdmFyIHJlc3VsdCA9IChyYWRpYW5zICogMTgwKSAvIE1hdGguUEk7XG4gICAgcmVzdWx0ID0gcmVzdWx0ICsgOTA7XG4gICAgcmV0dXJuIChyZXN1bHQgPCAwID8gMzYwICsgcmVzdWx0IDogcmVzdWx0KSAlIDM2MDtcbn0pO1xuLyoqXG4gKiBCZWhhdmlvciBjb25maWd1cmF0aW9uIG9mIHRoZSBleHBvcnRlclxuICogUHJlZml4ZXM6IEFkZCBwcmVmaXggZm9yIGVhY2ggY2F0ZWdvcnkgb2YgdGhlIHRva2Vucy4gRm9yIGV4YW1wbGUsIGFsbCBjb2xvcnMgY2FuIHN0YXJ0IHdpdGggXCJjb2xvciwgaWYgbmVlZGVkXCJcbiAqL1xuUHVsc2FyLnJlZ2lzdGVyUGF5bG9hZChcImJlaGF2aW9yXCIsIHtcbiAgICBjb2xvclRva2VuUHJlZml4OiBcImNvbG9yXCIsXG4gICAgYm9yZGVyVG9rZW5QcmVmaXg6IFwiYm9yZGVyXCIsXG4gICAgZ3JhZGllbnRUb2tlblByZWZpeDogXCJncmFkaWVudFwiLFxuICAgIG1lYXN1cmVUb2tlblByZWZpeDogXCJtZWFzdXJlXCIsXG4gICAgc2hhZG93VG9rZW5QcmVmaXg6IFwic2hhZG93XCIsXG4gICAgdHlwb2dyYXBoeVRva2VuUHJlZml4OiBcInR5cG9ncmFwaHlcIixcbn0pO1xuLyoqIERlc2NyaWJlIGNvbXBsZXggc2hhZG93IHRva2VuICovXG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcInNoYWRvd0Rlc2NyaXB0aW9uXCIsIGZ1bmN0aW9uIChzaGFkb3dUb2tlbikge1xuICAgIGxldCBjb25uZWN0ZWRTaGFkb3cgPSBcInRyYW5zcGFyZW50XCI7XG4gICAgaWYgKHNoYWRvd1Rva2VuLnNoYWRvd0xheWVycykge1xuICAgICAgICBjb25uZWN0ZWRTaGFkb3cgPSBzaGFkb3dUb2tlbi5zaGFkb3dMYXllcnNcbiAgICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAgIC5tYXAoKHNoYWRvdykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNoYWRvd1Rva2VuVmFsdWUoc2hhZG93KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKFwiLCBcIik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gc2hhZG93VG9rZW5WYWx1ZShzaGFkb3dUb2tlbik7XG4gICAgfVxuICAgIHJldHVybiBjb25uZWN0ZWRTaGFkb3cgIT09IG51bGwgJiYgY29ubmVjdGVkU2hhZG93ICE9PSB2b2lkIDAgPyBjb25uZWN0ZWRTaGFkb3cgOiBcIlwiO1xufSk7XG4vKiogQ29udmVydCBjb21wbGV4IHNoYWRvdyB2YWx1ZSB0byBDU1MgcmVwcmVzZW50YXRpb24gKi9cbmZ1bmN0aW9uIHNoYWRvd1Rva2VuVmFsdWUoc2hhZG93VG9rZW4pIHtcbiAgICB2YXIgYmx1clJhZGl1cyA9IGdldFZhbHVlV2l0aENvcnJlY3RVbml0KG5vbk5lZ2F0aXZlVmFsdWUoc2hhZG93VG9rZW4udmFsdWUucmFkaXVzLm1lYXN1cmUpKTtcbiAgICB2YXIgb2Zmc2V0WCA9IGdldFZhbHVlV2l0aENvcnJlY3RVbml0KHNoYWRvd1Rva2VuLnZhbHVlLngubWVhc3VyZSk7XG4gICAgdmFyIG9mZnNldFkgPSBnZXRWYWx1ZVdpdGhDb3JyZWN0VW5pdChzaGFkb3dUb2tlbi52YWx1ZS55Lm1lYXN1cmUpO1xuICAgIHZhciBzcHJlYWRSYWRpdXMgPSBnZXRWYWx1ZVdpdGhDb3JyZWN0VW5pdChzaGFkb3dUb2tlbi52YWx1ZS5zcHJlYWQubWVhc3VyZSk7XG4gICAgcmV0dXJuIGAke3NoYWRvd1Rva2VuLnZhbHVlLnR5cGUgPT09IFwiSW5uZXJcIiA/IFwiaW5zZXQgXCIgOiBcIlwifSR7b2Zmc2V0WH0gJHtvZmZzZXRZfSAke2JsdXJSYWRpdXN9ICR7c3ByZWFkUmFkaXVzfSAke2dldEZvcm1hdHRlZFJHQihzaGFkb3dUb2tlbi52YWx1ZS5jb2xvcil9YDtcbn1cbmZ1bmN0aW9uIGdldFZhbHVlV2l0aENvcnJlY3RVbml0KHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSAwKSB7XG4gICAgICAgIHJldHVybiBgJHt2YWx1ZX1gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gdG9kbzogYWRkIHN1cHBvcnQgZm9yIG90aGVyIHVuaXRzIChweCwgcmVtLCBlbSwgZXRjLilcbiAgICAgICAgcmV0dXJuIGAke3ZhbHVlfXB4YDtcbiAgICB9XG59XG5mdW5jdGlvbiBub25OZWdhdGl2ZVZhbHVlKG51bSkge1xuICAgIGlmIChudW0gPD0gMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBudW07XG4gICAgfVxufVxuLyoqIENvbnZlcnQgdHlwZSB0byBDU1MgdW5pdCAqL1xuZnVuY3Rpb24gbWVhc3VyZVR5cGVJbnRvUmVhZGFibGVVbml0KHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcIlBvaW50c1wiOlxuICAgICAgICAgICAgcmV0dXJuIFwicHRcIjtcbiAgICAgICAgY2FzZSBcIlBpeGVsc1wiOlxuICAgICAgICAgICAgcmV0dXJuIFwicHhcIjtcbiAgICAgICAgY2FzZSBcIlBlcmNlbnRcIjpcbiAgICAgICAgICAgIHJldHVybiBcIiVcIjtcbiAgICAgICAgY2FzZSBcIkVtc1wiOlxuICAgICAgICAgICAgcmV0dXJuIFwiZW1cIjtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRGb3JtYXR0ZWRSR0IoY29sb3JWYWx1ZSkge1xuICAgIGlmIChjb2xvclZhbHVlLmEgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGByZ2IoJHtjb2xvclZhbHVlLnJ9LCR7Y29sb3JWYWx1ZS5nfSwke2NvbG9yVmFsdWUuYn0pYDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IG9wYWNpdHkgPSBNYXRoLnJvdW5kKChjb2xvclZhbHVlLmEgLyAyNTUpICogMTAwKSAvIDEwMDtcbiAgICAgICAgcmV0dXJuIGByZ2JhKCR7Y29sb3JWYWx1ZS5yfSwke2NvbG9yVmFsdWUuZ30sJHtjb2xvclZhbHVlLmJ9LCR7b3BhY2l0eX0pYDtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=