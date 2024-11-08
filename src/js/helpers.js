/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/**
 * Convert group name, token name and possible prefix into camelCased string, joining everything together
 */
Pulsar.registerFunction("readableVariableName", function (token, tokenGroup, prefix) {
    // Create array with all path segments and token name at the end
    const segments = [...tokenGroup.path];
    if (!tokenGroup.isRoot && !tokenGroup.isNonVirtualRoot) {
        segments.push(tokenGroup.name);
    }
    // Split the token name into words
    segments.push(...(token.name.match(/([A-Z]?[a-z]+|\d+|[A-Z]+(?![a-z]))/g) || []));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbURBQW1ELEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLHlDQUF5QztBQUNoSztBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsTUFBTTtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsTUFBTTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixhQUFhLEdBQUcsYUFBYSxHQUFHLGFBQWE7QUFDbkU7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWEsR0FBRyxhQUFhLEdBQUcsYUFBYSxHQUFHLFFBQVE7QUFDL0U7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N1cGVybm92YS1leHBvcnRlci1jc3MtbGlrZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbnZlcnQgZ3JvdXAgbmFtZSwgdG9rZW4gbmFtZSBhbmQgcG9zc2libGUgcHJlZml4IGludG8gY2FtZWxDYXNlZCBzdHJpbmcsIGpvaW5pbmcgZXZlcnl0aGluZyB0b2dldGhlclxuICovXG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcInJlYWRhYmxlVmFyaWFibGVOYW1lXCIsIGZ1bmN0aW9uICh0b2tlbiwgdG9rZW5Hcm91cCwgcHJlZml4KSB7XG4gICAgLy8gQ3JlYXRlIGFycmF5IHdpdGggYWxsIHBhdGggc2VnbWVudHMgYW5kIHRva2VuIG5hbWUgYXQgdGhlIGVuZFxuICAgIGNvbnN0IHNlZ21lbnRzID0gWy4uLnRva2VuR3JvdXAucGF0aF07XG4gICAgaWYgKCF0b2tlbkdyb3VwLmlzUm9vdCAmJiAhdG9rZW5Hcm91cC5pc05vblZpcnR1YWxSb290KSB7XG4gICAgICAgIHNlZ21lbnRzLnB1c2godG9rZW5Hcm91cC5uYW1lKTtcbiAgICB9XG4gICAgLy8gU3BsaXQgdGhlIHRva2VuIG5hbWUgaW50byB3b3Jkc1xuICAgIHNlZ21lbnRzLnB1c2goLi4uKHRva2VuLm5hbWUubWF0Y2goLyhbQS1aXT9bYS16XSt8XFxkK3xbQS1aXSsoPyFbYS16XSkpL2cpIHx8IFtdKSk7XG4gICAgaWYgKHByZWZpeCAmJiBwcmVmaXgubGVuZ3RoID4gMCkge1xuICAgICAgICBzZWdtZW50cy51bnNoaWZ0KHByZWZpeCk7XG4gICAgfVxuICAgIC8vIENyZWF0ZSBcInNlbnRlbmNlXCIgc2VwYXJhdGVkIGJ5IHNwYWNlcyBzbyB3ZSBjYW4gY2FtZWxjYXNlIGl0IGFsbFxuICAgIGxldCBzZW50ZW5jZSA9IHNlZ21lbnRzLmpvaW4oXCIgXCIpO1xuICAgIC8vIGNhbWVsY2FzZSBzdHJpbmcgZnJvbSBhbGwgc2VnbWVudHNcbiAgICBzZW50ZW5jZSA9IHNlbnRlbmNlXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgIC5yZXBsYWNlKC9bXmEtekEtWjAtOV0rKC4pL2csIChtLCBjaHIpID0+IGNoci50b1VwcGVyQ2FzZSgpKTtcbiAgICAvLyBvbmx5IGFsbG93IGxldHRlcnMsIGRpZ2l0cywgdW5kZXJzY29yZSBhbmQgaHlwaGVuXG4gICAgc2VudGVuY2UgPSBzZW50ZW5jZS5yZXBsYWNlKC9bXmEtekEtWjAtOV8tXS9nLCBcIl9cIik7XG4gICAgLy8gcHJlcGVuZCB1bmRlcnNjb3JlIGlmIGl0IHN0YXJ0cyB3aXRoIGRpZ2l0XG4gICAgaWYgKC9eXFxkLy50ZXN0KHNlbnRlbmNlKSkge1xuICAgICAgICBzZW50ZW5jZSA9IFwiX1wiICsgc2VudGVuY2U7XG4gICAgfVxuICAgIHJldHVybiBzZW50ZW5jZTtcbn0pO1xuZnVuY3Rpb24gZmluZEFsaWFzZXModG9rZW4sIGFsbFRva2Vucykge1xuICAgIGxldCBhbGlhc2VzID0gYWxsVG9rZW5zLmZpbHRlcigodCkgPT4gdC52YWx1ZS5yZWZlcmVuY2VkVG9rZW4gJiYgdC52YWx1ZS5yZWZlcmVuY2VkVG9rZW4uaWQgPT09IHRva2VuLmlkKTtcbiAgICBmb3IgKGNvbnN0IHQgb2YgYWxpYXNlcykge1xuICAgICAgICBhbGlhc2VzID0gYWxpYXNlcy5jb25jYXQoZmluZEFsaWFzZXModCwgYWxsVG9rZW5zKSk7XG4gICAgfVxuICAgIHJldHVybiBhbGlhc2VzO1xufVxuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJmaW5kQWxpYXNlc1wiLCBmaW5kQWxpYXNlcyk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImdyYWRpZW50QW5nbGVcIiwgZnVuY3Rpb24gKGZyb20sIHRvKSB7XG4gICAgdmFyIGRlbHRhWSA9IHRvLnkgLSBmcm9tLnk7XG4gICAgdmFyIGRlbHRhWCA9IHRvLnggLSBmcm9tLng7XG4gICAgdmFyIHJhZGlhbnMgPSBNYXRoLmF0YW4yKGRlbHRhWSwgZGVsdGFYKTtcbiAgICB2YXIgcmVzdWx0ID0gKHJhZGlhbnMgKiAxODApIC8gTWF0aC5QSTtcbiAgICByZXN1bHQgPSByZXN1bHQgKyA5MDtcbiAgICByZXR1cm4gKHJlc3VsdCA8IDAgPyAzNjAgKyByZXN1bHQgOiByZXN1bHQpICUgMzYwO1xufSk7XG4vKipcbiAqIEJlaGF2aW9yIGNvbmZpZ3VyYXRpb24gb2YgdGhlIGV4cG9ydGVyXG4gKiBQcmVmaXhlczogQWRkIHByZWZpeCBmb3IgZWFjaCBjYXRlZ29yeSBvZiB0aGUgdG9rZW5zLiBGb3IgZXhhbXBsZSwgYWxsIGNvbG9ycyBjYW4gc3RhcnQgd2l0aCBcImNvbG9yLCBpZiBuZWVkZWRcIlxuICovXG5QdWxzYXIucmVnaXN0ZXJQYXlsb2FkKFwiYmVoYXZpb3JcIiwge1xuICAgIGNvbG9yVG9rZW5QcmVmaXg6IFwiY29sb3JcIixcbiAgICBib3JkZXJUb2tlblByZWZpeDogXCJib3JkZXJcIixcbiAgICBncmFkaWVudFRva2VuUHJlZml4OiBcImdyYWRpZW50XCIsXG4gICAgbWVhc3VyZVRva2VuUHJlZml4OiBcIm1lYXN1cmVcIixcbiAgICBzaGFkb3dUb2tlblByZWZpeDogXCJzaGFkb3dcIixcbiAgICB0eXBvZ3JhcGh5VG9rZW5QcmVmaXg6IFwidHlwb2dyYXBoeVwiLFxufSk7XG4vKiogRGVzY3JpYmUgY29tcGxleCBzaGFkb3cgdG9rZW4gKi9cblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwic2hhZG93RGVzY3JpcHRpb25cIiwgZnVuY3Rpb24gKHNoYWRvd1Rva2VuKSB7XG4gICAgbGV0IGNvbm5lY3RlZFNoYWRvdyA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICBpZiAoc2hhZG93VG9rZW4uc2hhZG93TGF5ZXJzKSB7XG4gICAgICAgIGNvbm5lY3RlZFNoYWRvdyA9IHNoYWRvd1Rva2VuLnNoYWRvd0xheWVyc1xuICAgICAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAgICAgLm1hcCgoc2hhZG93KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2hhZG93VG9rZW5WYWx1ZShzaGFkb3cpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oXCIsIFwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzaGFkb3dUb2tlblZhbHVlKHNoYWRvd1Rva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbm5lY3RlZFNoYWRvdyAhPT0gbnVsbCAmJiBjb25uZWN0ZWRTaGFkb3cgIT09IHZvaWQgMCA/IGNvbm5lY3RlZFNoYWRvdyA6IFwiXCI7XG59KTtcbi8qKiBDb252ZXJ0IGNvbXBsZXggc2hhZG93IHZhbHVlIHRvIENTUyByZXByZXNlbnRhdGlvbiAqL1xuZnVuY3Rpb24gc2hhZG93VG9rZW5WYWx1ZShzaGFkb3dUb2tlbikge1xuICAgIHZhciBibHVyUmFkaXVzID0gZ2V0VmFsdWVXaXRoQ29ycmVjdFVuaXQobm9uTmVnYXRpdmVWYWx1ZShzaGFkb3dUb2tlbi52YWx1ZS5yYWRpdXMubWVhc3VyZSkpO1xuICAgIHZhciBvZmZzZXRYID0gZ2V0VmFsdWVXaXRoQ29ycmVjdFVuaXQoc2hhZG93VG9rZW4udmFsdWUueC5tZWFzdXJlKTtcbiAgICB2YXIgb2Zmc2V0WSA9IGdldFZhbHVlV2l0aENvcnJlY3RVbml0KHNoYWRvd1Rva2VuLnZhbHVlLnkubWVhc3VyZSk7XG4gICAgdmFyIHNwcmVhZFJhZGl1cyA9IGdldFZhbHVlV2l0aENvcnJlY3RVbml0KHNoYWRvd1Rva2VuLnZhbHVlLnNwcmVhZC5tZWFzdXJlKTtcbiAgICByZXR1cm4gYCR7c2hhZG93VG9rZW4udmFsdWUudHlwZSA9PT0gXCJJbm5lclwiID8gXCJpbnNldCBcIiA6IFwiXCJ9JHtvZmZzZXRYfSAke29mZnNldFl9ICR7Ymx1clJhZGl1c30gJHtzcHJlYWRSYWRpdXN9ICR7Z2V0Rm9ybWF0dGVkUkdCKHNoYWRvd1Rva2VuLnZhbHVlLmNvbG9yKX1gO1xufVxuZnVuY3Rpb24gZ2V0VmFsdWVXaXRoQ29ycmVjdFVuaXQodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGAke3ZhbHVlfWA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyB0b2RvOiBhZGQgc3VwcG9ydCBmb3Igb3RoZXIgdW5pdHMgKHB4LCByZW0sIGVtLCBldGMuKVxuICAgICAgICByZXR1cm4gYCR7dmFsdWV9cHhgO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG5vbk5lZ2F0aXZlVmFsdWUobnVtKSB7XG4gICAgaWYgKG51bSA8PSAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICB9XG59XG4vKiogQ29udmVydCB0eXBlIHRvIENTUyB1bml0ICovXG5mdW5jdGlvbiBtZWFzdXJlVHlwZUludG9SZWFkYWJsZVVuaXQodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiUG9pbnRzXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJwdFwiO1xuICAgICAgICBjYXNlIFwiUGl4ZWxzXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJweFwiO1xuICAgICAgICBjYXNlIFwiUGVyY2VudFwiOlxuICAgICAgICAgICAgcmV0dXJuIFwiJVwiO1xuICAgICAgICBjYXNlIFwiRW1zXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJlbVwiO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldEZvcm1hdHRlZFJHQihjb2xvclZhbHVlKSB7XG4gICAgaWYgKGNvbG9yVmFsdWUuYSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYHJnYigke2NvbG9yVmFsdWUucn0sJHtjb2xvclZhbHVlLmd9LCR7Y29sb3JWYWx1ZS5ifSlgO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3Qgb3BhY2l0eSA9IE1hdGgucm91bmQoKGNvbG9yVmFsdWUuYSAvIDI1NSkgKiAxMDApIC8gMTAwO1xuICAgICAgICByZXR1cm4gYHJnYmEoJHtjb2xvclZhbHVlLnJ9LCR7Y29sb3JWYWx1ZS5nfSwke2NvbG9yVmFsdWUuYn0sJHtvcGFjaXR5fSlgO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==