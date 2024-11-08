/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/**
 * Convert group name, token name and possible prefix into camelCased string, joining everything together
 */
Pulsar.registerFunction("readableVariableName", function (token, tokenGroup, prefix) {
    var _a;
    // Create array with all path segments and token name at the end
    const segments = [...tokenGroup.path];
    if (!tokenGroup.isRoot && !tokenGroup.isNonVirtualRoot) {
        segments.push(tokenGroup.name);
    }
    segments.push(...((_a = token.name.match(/([A-Z]?[a-z]+|[A-Z]+)/g)) !== null && _a !== void 0 ? _a : []));
    if (prefix && prefix.length > 0) {
        segments.unshift(prefix);
    }
    // Create "sentence" separated by spaces so we can camelcase it all
    let sentence = segments.join(" ");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbURBQW1ELEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLHlDQUF5QztBQUNoSztBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsTUFBTTtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsTUFBTTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixhQUFhLEdBQUcsYUFBYSxHQUFHLGFBQWE7QUFDbkU7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWEsR0FBRyxhQUFhLEdBQUcsYUFBYSxHQUFHLFFBQVE7QUFDL0U7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N1cGVybm92YS1leHBvcnRlci1jc3MtbGlrZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbnZlcnQgZ3JvdXAgbmFtZSwgdG9rZW4gbmFtZSBhbmQgcG9zc2libGUgcHJlZml4IGludG8gY2FtZWxDYXNlZCBzdHJpbmcsIGpvaW5pbmcgZXZlcnl0aGluZyB0b2dldGhlclxuICovXG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcInJlYWRhYmxlVmFyaWFibGVOYW1lXCIsIGZ1bmN0aW9uICh0b2tlbiwgdG9rZW5Hcm91cCwgcHJlZml4KSB7XG4gICAgdmFyIF9hO1xuICAgIC8vIENyZWF0ZSBhcnJheSB3aXRoIGFsbCBwYXRoIHNlZ21lbnRzIGFuZCB0b2tlbiBuYW1lIGF0IHRoZSBlbmRcbiAgICBjb25zdCBzZWdtZW50cyA9IFsuLi50b2tlbkdyb3VwLnBhdGhdO1xuICAgIGlmICghdG9rZW5Hcm91cC5pc1Jvb3QgJiYgIXRva2VuR3JvdXAuaXNOb25WaXJ0dWFsUm9vdCkge1xuICAgICAgICBzZWdtZW50cy5wdXNoKHRva2VuR3JvdXAubmFtZSk7XG4gICAgfVxuICAgIHNlZ21lbnRzLnB1c2goLi4uKChfYSA9IHRva2VuLm5hbWUubWF0Y2goLyhbQS1aXT9bYS16XSt8W0EtWl0rKS9nKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW10pKTtcbiAgICBpZiAocHJlZml4ICYmIHByZWZpeC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNlZ21lbnRzLnVuc2hpZnQocHJlZml4KTtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIFwic2VudGVuY2VcIiBzZXBhcmF0ZWQgYnkgc3BhY2VzIHNvIHdlIGNhbiBjYW1lbGNhc2UgaXQgYWxsXG4gICAgbGV0IHNlbnRlbmNlID0gc2VnbWVudHMuam9pbihcIiBcIik7XG4gICAgLy8gY2FtZWxjYXNlIHN0cmluZyBmcm9tIGFsbCBzZWdtZW50c1xuICAgIHNlbnRlbmNlID0gc2VudGVuY2VcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgLnJlcGxhY2UoL1teYS16QS1aMC05XSsoLikvZywgKG0sIGNocikgPT4gY2hyLnRvVXBwZXJDYXNlKCkpO1xuICAgIC8vIG9ubHkgYWxsb3cgbGV0dGVycywgZGlnaXRzLCB1bmRlcnNjb3JlIGFuZCBoeXBoZW5cbiAgICBzZW50ZW5jZSA9IHNlbnRlbmNlLnJlcGxhY2UoL1teYS16QS1aMC05Xy1dL2csIFwiX1wiKTtcbiAgICAvLyBwcmVwZW5kIHVuZGVyc2NvcmUgaWYgaXQgc3RhcnRzIHdpdGggZGlnaXRcbiAgICBpZiAoL15cXGQvLnRlc3Qoc2VudGVuY2UpKSB7XG4gICAgICAgIHNlbnRlbmNlID0gXCJfXCIgKyBzZW50ZW5jZTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbnRlbmNlO1xufSk7XG5mdW5jdGlvbiBmaW5kQWxpYXNlcyh0b2tlbiwgYWxsVG9rZW5zKSB7XG4gICAgbGV0IGFsaWFzZXMgPSBhbGxUb2tlbnMuZmlsdGVyKCh0KSA9PiB0LnZhbHVlLnJlZmVyZW5jZWRUb2tlbiAmJiB0LnZhbHVlLnJlZmVyZW5jZWRUb2tlbi5pZCA9PT0gdG9rZW4uaWQpO1xuICAgIGZvciAoY29uc3QgdCBvZiBhbGlhc2VzKSB7XG4gICAgICAgIGFsaWFzZXMgPSBhbGlhc2VzLmNvbmNhdChmaW5kQWxpYXNlcyh0LCBhbGxUb2tlbnMpKTtcbiAgICB9XG4gICAgcmV0dXJuIGFsaWFzZXM7XG59XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImZpbmRBbGlhc2VzXCIsIGZpbmRBbGlhc2VzKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZ3JhZGllbnRBbmdsZVwiLCBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgICB2YXIgZGVsdGFZID0gdG8ueSAtIGZyb20ueTtcbiAgICB2YXIgZGVsdGFYID0gdG8ueCAtIGZyb20ueDtcbiAgICB2YXIgcmFkaWFucyA9IE1hdGguYXRhbjIoZGVsdGFZLCBkZWx0YVgpO1xuICAgIHZhciByZXN1bHQgPSAocmFkaWFucyAqIDE4MCkgLyBNYXRoLlBJO1xuICAgIHJlc3VsdCA9IHJlc3VsdCArIDkwO1xuICAgIHJldHVybiAocmVzdWx0IDwgMCA/IDM2MCArIHJlc3VsdCA6IHJlc3VsdCkgJSAzNjA7XG59KTtcbi8qKlxuICogQmVoYXZpb3IgY29uZmlndXJhdGlvbiBvZiB0aGUgZXhwb3J0ZXJcbiAqIFByZWZpeGVzOiBBZGQgcHJlZml4IGZvciBlYWNoIGNhdGVnb3J5IG9mIHRoZSB0b2tlbnMuIEZvciBleGFtcGxlLCBhbGwgY29sb3JzIGNhbiBzdGFydCB3aXRoIFwiY29sb3IsIGlmIG5lZWRlZFwiXG4gKi9cblB1bHNhci5yZWdpc3RlclBheWxvYWQoXCJiZWhhdmlvclwiLCB7XG4gICAgY29sb3JUb2tlblByZWZpeDogXCJjb2xvclwiLFxuICAgIGJvcmRlclRva2VuUHJlZml4OiBcImJvcmRlclwiLFxuICAgIGdyYWRpZW50VG9rZW5QcmVmaXg6IFwiZ3JhZGllbnRcIixcbiAgICBtZWFzdXJlVG9rZW5QcmVmaXg6IFwibWVhc3VyZVwiLFxuICAgIHNoYWRvd1Rva2VuUHJlZml4OiBcInNoYWRvd1wiLFxuICAgIHR5cG9ncmFwaHlUb2tlblByZWZpeDogXCJ0eXBvZ3JhcGh5XCIsXG59KTtcbi8qKiBEZXNjcmliZSBjb21wbGV4IHNoYWRvdyB0b2tlbiAqL1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJzaGFkb3dEZXNjcmlwdGlvblwiLCBmdW5jdGlvbiAoc2hhZG93VG9rZW4pIHtcbiAgICBsZXQgY29ubmVjdGVkU2hhZG93ID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgIGlmIChzaGFkb3dUb2tlbi5zaGFkb3dMYXllcnMpIHtcbiAgICAgICAgY29ubmVjdGVkU2hhZG93ID0gc2hhZG93VG9rZW4uc2hhZG93TGF5ZXJzXG4gICAgICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgICAgICAubWFwKChzaGFkb3cpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzaGFkb3dUb2tlblZhbHVlKHNoYWRvdyk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbihcIiwgXCIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNoYWRvd1Rva2VuVmFsdWUoc2hhZG93VG9rZW4pO1xuICAgIH1cbiAgICByZXR1cm4gY29ubmVjdGVkU2hhZG93ICE9PSBudWxsICYmIGNvbm5lY3RlZFNoYWRvdyAhPT0gdm9pZCAwID8gY29ubmVjdGVkU2hhZG93IDogXCJcIjtcbn0pO1xuLyoqIENvbnZlcnQgY29tcGxleCBzaGFkb3cgdmFsdWUgdG8gQ1NTIHJlcHJlc2VudGF0aW9uICovXG5mdW5jdGlvbiBzaGFkb3dUb2tlblZhbHVlKHNoYWRvd1Rva2VuKSB7XG4gICAgdmFyIGJsdXJSYWRpdXMgPSBnZXRWYWx1ZVdpdGhDb3JyZWN0VW5pdChub25OZWdhdGl2ZVZhbHVlKHNoYWRvd1Rva2VuLnZhbHVlLnJhZGl1cy5tZWFzdXJlKSk7XG4gICAgdmFyIG9mZnNldFggPSBnZXRWYWx1ZVdpdGhDb3JyZWN0VW5pdChzaGFkb3dUb2tlbi52YWx1ZS54Lm1lYXN1cmUpO1xuICAgIHZhciBvZmZzZXRZID0gZ2V0VmFsdWVXaXRoQ29ycmVjdFVuaXQoc2hhZG93VG9rZW4udmFsdWUueS5tZWFzdXJlKTtcbiAgICB2YXIgc3ByZWFkUmFkaXVzID0gZ2V0VmFsdWVXaXRoQ29ycmVjdFVuaXQoc2hhZG93VG9rZW4udmFsdWUuc3ByZWFkLm1lYXN1cmUpO1xuICAgIHJldHVybiBgJHtzaGFkb3dUb2tlbi52YWx1ZS50eXBlID09PSBcIklubmVyXCIgPyBcImluc2V0IFwiIDogXCJcIn0ke29mZnNldFh9ICR7b2Zmc2V0WX0gJHtibHVyUmFkaXVzfSAke3NwcmVhZFJhZGl1c30gJHtnZXRGb3JtYXR0ZWRSR0Ioc2hhZG93VG9rZW4udmFsdWUuY29sb3IpfWA7XG59XG5mdW5jdGlvbiBnZXRWYWx1ZVdpdGhDb3JyZWN0VW5pdCh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYCR7dmFsdWV9YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIHRvZG86IGFkZCBzdXBwb3J0IGZvciBvdGhlciB1bml0cyAocHgsIHJlbSwgZW0sIGV0Yy4pXG4gICAgICAgIHJldHVybiBgJHt2YWx1ZX1weGA7XG4gICAgfVxufVxuZnVuY3Rpb24gbm9uTmVnYXRpdmVWYWx1ZShudW0pIHtcbiAgICBpZiAobnVtIDw9IDApIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVtO1xuICAgIH1cbn1cbi8qKiBDb252ZXJ0IHR5cGUgdG8gQ1NTIHVuaXQgKi9cbmZ1bmN0aW9uIG1lYXN1cmVUeXBlSW50b1JlYWRhYmxlVW5pdCh0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJQb2ludHNcIjpcbiAgICAgICAgICAgIHJldHVybiBcInB0XCI7XG4gICAgICAgIGNhc2UgXCJQaXhlbHNcIjpcbiAgICAgICAgICAgIHJldHVybiBcInB4XCI7XG4gICAgICAgIGNhc2UgXCJQZXJjZW50XCI6XG4gICAgICAgICAgICByZXR1cm4gXCIlXCI7XG4gICAgICAgIGNhc2UgXCJFbXNcIjpcbiAgICAgICAgICAgIHJldHVybiBcImVtXCI7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0Rm9ybWF0dGVkUkdCKGNvbG9yVmFsdWUpIHtcbiAgICBpZiAoY29sb3JWYWx1ZS5hID09PSAwKSB7XG4gICAgICAgIHJldHVybiBgcmdiKCR7Y29sb3JWYWx1ZS5yfSwke2NvbG9yVmFsdWUuZ30sJHtjb2xvclZhbHVlLmJ9KWA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBvcGFjaXR5ID0gTWF0aC5yb3VuZCgoY29sb3JWYWx1ZS5hIC8gMjU1KSAqIDEwMCkgLyAxMDA7XG4gICAgICAgIHJldHVybiBgcmdiYSgke2NvbG9yVmFsdWUucn0sJHtjb2xvclZhbHVlLmd9LCR7Y29sb3JWYWx1ZS5ifSwke29wYWNpdHl9KWA7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9