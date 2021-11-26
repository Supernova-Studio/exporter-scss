# Custom SCSS Exporter for Talend

The SCSS Exporter exports a theme into SCSS variables. It runs for:

- [x] Colors
- [x] Text Styles
- [x] Sizes
- [x] Shadows
- [x] Borders
- [x] Opacities
- [x] Radii

It outputs variables prefaced with `$coral` and contains references to CSS custom properties hydrated with CSS files extracted elsewhere.

```scss
$coral-color-neutral-text: var(--coral-color-neutral-text, hsla(0,0%,13%,1));
$coral-color-neutral-text-weak: var(--coral-color-neutral-text-weak, hsla(0,0%,42%,1));
$coral-color-neutral-text-disabled: var(--coral-color-neutral-text-disabled, hsla(0,0%,55%,1));
$coral-color-neutral-text-inverted: var(--coral-color-neutral-text-inverted, hsla(0,0%,100%,1));
$coral-color-neutral-background: var(--coral-color-neutral-background, hsla(0,0%,100%,1));
$coral-color-neutral-background-medium: var(--coral-color-neutral-background-medium, hsla(0,0%,97%,1));
$coral-color-neutral-background-strong: var(--coral-color-neutral-background-strong, hsla(0,0%,91%,1));
$coral-color-neutral-background-disabled: var(--coral-color-neutral-background-disabled, hsla(0,0%,97%,1));
$coral-color-neutral-border: var(--coral-color-neutral-border, hsla(0,0%,42%,1));
$coral-color-neutral-border-weak: var(--coral-color-neutral-border-weak, hsla(0,0%,91%,1));
$coral-color-neutral-border-hover: var(--coral-color-neutral-border-hover, hsla(0,0%,13%,1));
...
```
