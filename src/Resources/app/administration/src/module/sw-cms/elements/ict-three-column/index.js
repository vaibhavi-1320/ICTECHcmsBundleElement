import {
    ELEMENT_NAME,
    createDefaultCardConfig,
} from './utils/default-columns';

Shopware.Component.register('sw-cms-el-preview-ict-three-column', () => import('./preview'));
Shopware.Component.register('sw-cms-el-config-ict-three-column', () => import('./config'));
Shopware.Component.register('sw-cms-el-ict-three-column', () => import('./component'));

Shopware.Service('cmsService').registerCmsElement({
    name: ELEMENT_NAME,
    label: 'ict-cms-bundle-element.cms.elements.ictThreeColumn.label',
    component: 'sw-cms-el-ict-three-column',
    configComponent: 'sw-cms-el-config-ict-three-column',
    previewComponent: 'sw-cms-el-preview-ict-three-column',
    defaultConfig: createDefaultCardConfig(),
});
