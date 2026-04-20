import IctGalleryLightboxPlugin from './plugin/ict-gallery-lightbox/ict-gallery-lightbox.plugin';
import IctContentTabsPlugin from './plugin/ict-content-tabs/ict-content-tabs.plugin';
import IctProductMatrixPlugin from './plugin/ict-product-matrix/ict-product-matrix.plugin';

window.PluginManager.register('IctGalleryLightbox', IctGalleryLightboxPlugin, '[data-ict-gallery]');
window.PluginManager.register('IctContentTabs', IctContentTabsPlugin, '[data-ict-content-tabs]');
window.PluginManager.register('IctProductMatrix', IctProductMatrixPlugin, '[data-ict-product-matrix]');
