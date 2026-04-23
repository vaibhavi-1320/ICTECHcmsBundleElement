# Changelog

## 1.0.2 - 2025-04-21

### Changed
- Items 1 & 2 (date simplification): Not applicable — no `date()`/`strtotime()` usage exists in the plugin
- Merged `null` and `array` early-return guards into one condition in `IctAlertHintCmsElementResolver::toBool()`
- Merged two consecutive `if-return []` guards in `IctSubcategoryNavigationCmsElementResolver::loadProductCounts()` into a single combined condition
- Item 4 (no script tags in Twig): Not applicable — all JS is compiled via webpack and loaded through Shopware's asset pipeline; no inline `<script>` tags exist in any Twig template

## 1.0.1 - 2025-04-21

### Changed
- Fixed spelling: renamed `$normalised` to `$normalized` in `IctVerticalTabCmsElementResolver` for consistency
- Replaced loose falsy check (`! $value`) with strict type check (`!is_string($value) || $value === ''`) in `IctSingleTitleButtonSectionCmsElementResolver::enrich()`
- Replaced truthy array check with strict `!== []` comparison in `BuildMediaCriteria::build()`

## 1.0.0 - 2025-04-21

### Added
- Initial release of ICTECH CMS Bundle Element for Shopware 6.6
- Layout blocks: 2-column through 12-column responsive grid layouts
- Content elements: Accordion, Content Tabs, Vertical Tabs, Feature Grid, Overview Cards (6-up)
- Media elements: Banner Slider, Category Image Slider, Image Gallery, File Download
- Hero / CTA elements: Hero Section, Hero Banner, Single Title + Button Section
- Navigation elements: Breadcrumb Navigation, Subcategory Navigation
- Commerce elements: Product Matrix, Product Comparison (manual & stream-based)
- Manufacturer elements: Manufacturer List, Manufacturer Slider
- Utility elements: Alert/Hint callout, Story Card, Two-Column Three-Image layout
- Administration snippets for `en-GB` and `de-DE`
- Storefront snippets for `en-GB` and `de-DE`
- PHP CMS data resolvers for media, category, manufacturer and product entities
