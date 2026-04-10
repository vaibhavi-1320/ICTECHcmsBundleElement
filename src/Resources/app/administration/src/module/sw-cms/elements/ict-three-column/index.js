const ELEMENT_NAME = 'ict-three-column';
Shopware.Component.register('sw-cms-el-ict-three-column', () => import('./component'));

Shopware.Service('cmsService').registerCmsElement({
    name: ELEMENT_NAME,
    
    label: 'ict-cms-bundle-element.cms.elements.ictThreeColumn.label',
    component: 'sw-cms-el-ict-three-column',
    hidden: true,
    defaultData: {
        media: null,
        mediaId: null,
    },
});
