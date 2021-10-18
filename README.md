# Custom SCSS Exporter for Talend

The SCSS Exporter exports a theme into SCSS variables. It runs for:

- [x] Color definitions
- [x] Text Styles
- [x] Gradients
- [x] Shadows
- [x] Borders

It outputs variables prefaced with `$coral` and contains references to CSS custom properties hydrated with CSS files extracted elsewhere.  


```scss
$coralColorNeutralText: var(--coralColorNeutralText, hsla(0,0.0%,12.5%,255));
$coralColorNeutralTextWeak: var(--coralColorNeutralTextWeak, hsla(0,0.0%,47.5%,255));
$coralColorNeutralTextDisabled: var(--coralColorNeutralTextDisabled, hsla(0,0.0%,65.1%,255));
$coralColorNeutralBackground: var(--coralColorNeutralBackground, hsla(0,0.0%,100.0%,255));
$coralColorNeutralBackgroundMedium: var(--coralColorNeutralBackgroundMedium, hsla(0,0.0%,95.7%,255));
$coralColorNeutralBackgroundStrong: var(--coralColorNeutralBackgroundStrong, hsla(0,0.0%,91.0%,255));
$coralColorNeutralBorder: var(--coralColorNeutralBorder, hsla(0,0.0%,47.5%,255));
$coralColorNeutralBorderHover: var(--coralColorNeutralBorderHover, hsla(0,0.0%,12.5%,255));
$coralColorPrimaryText: var(--coralColorPrimaryText, hsla(204,94.0%,39.0%,255));
$coralColorPrimaryTextHover: var(--coralColorPrimaryTextHover, hsla(204,94.9%,31.0%,255));
$coralColorPrimaryTextActive: var(--coralColorPrimaryTextActive, hsla(204,94.9%,23.1%,255));
...
```


