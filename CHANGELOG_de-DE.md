# Änderungsprotokoll

## 1.0.2 - 2025-04-21

### Geändert
- Punkte 1 & 2 (Datumsvereinfachung): Nicht anwendbar — keine `date()`/`strtotime()`-Verwendung im Plugin vorhanden
- Null- und Array-Frühausstieg in `IctAlertHintCmsElementResolver::toBool()` zu einer einzigen Bedingung zusammengeführt
- Zwei aufeinanderfolgende `if-return []`-Bedingungen in `IctSubcategoryNavigationCmsElementResolver::loadProductCounts()` zu einer kombinierten Bedingung zusammengeführt
- Punkt 4 (keine Script-Tags in Twig): Nicht anwendbar — das gesamte JavaScript wird über webpack kompiliert und über Shopwares Asset-Pipeline geladen; keine inline `<script>`-Tags in Twig-Templates vorhanden

## 1.0.1 - 2025-04-21

### Geändert
- Schreibweise korrigiert: `$normalised` in `$normalized` umbenannt in `IctVerticalTabCmsElementResolver` für einheitliche Benennung
- Lose Falsy-Prüfung (`! $value`) durch strikte Typprüfung (`!is_string($value) || $value === ''`) in `IctSingleTitleButtonSectionCmsElementResolver::enrich()` ersetzt
- Truthy-Array-Prüfung durch strikten `!== []`-Vergleich in `BuildMediaCriteria::build()` ersetzt

## 1.0.0 - 2025-04-21

### Hinzugefügt
- Erstveröffentlichung von ICTECH CMS Bundle Element für Shopware 6.6
- Layout-Blöcke: 2-spaltig bis 12-spaltig responsive Rasterlayouts
- Inhaltselemente: Akkordeon, Inhalts-Tabs, Vertikale Tabs, Feature-Raster, Übersichtskarten (6-fach)
- Medienelemente: Banner-Slider, Kategorie-Bild-Slider, Bildergalerie, Datei-Download
- Hero-/CTA-Elemente: Hero-Bereich, Hero-Banner, Einzeltitel + Schaltflächen-Bereich
- Navigationselemente: Breadcrumb-Navigation, Unterkategorie-Navigation
- Commerce-Elemente: Produktmatrix, Produktvergleich (manuell & streambasiert)
- Hersteller-Elemente: Herstellerliste, Hersteller-Slider
- Hilfselemente: Alert/Hinweis-Callout, Story-Karte, Zweispaltig-Drei-Bilder-Layout
- Administrations-Snippets für `en-GB` und `de-DE`
- Storefront-Snippets für `en-GB` und `de-DE`
- PHP CMS-Datenresolver für Medien-, Kategorie-, Hersteller- und Produktentitäten
