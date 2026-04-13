import IctGalleryLightboxPlugin from './plugin/ict-gallery-lightbox/ict-gallery-lightbox.plugin';
import IctBannerSliderPlugin from './plugin/ict-banner-slider/ict-banner-slider.plugin';

window.PluginManager.register('IctGalleryLightbox', IctGalleryLightboxPlugin, '[data-ict-gallery]');
window.PluginManager.register('IctBannerSlider', IctBannerSliderPlugin, '[data-ict-banner-slider]');
