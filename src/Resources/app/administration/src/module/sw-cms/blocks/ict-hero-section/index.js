Shopware.Component.register('sw-cms-block-ict-hero-section', () => import('./component'));
Shopware.Component.register('sw-cms-preview-ict-hero-section', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'ict-hero-section',
    label: 'sw-cms.blocks.ictHeroSection.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-ict-hero-section',
    previewComponent: 'sw-cms-preview-ict-hero-section',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        heroSection: {
            type: 'ict-hero-section',
            default: {
                config: {
                    labelText: {
                        source: 'static',
                        value: 'Label Text'
                    },
                    headlineText: {
                        source: 'static',
                        value: 'Headline'
                    },
                    descriptionText: {
                        source: 'static',
                        value: 'Description'
                    },
                    primaryButtonText: {
                        source: 'static',
                        value: 'Button Text →'
                    },
                    secondaryButtonText: {
                        source: 'static',
                        value: 'Button Text'
                    },
                    showSecondaryButton: {
                        source: 'static',
                        value: true
                    },
                    backgroundType: {
                        source: 'static',
                        value: 'gbColor'
                    },
                    featureItems: {
                        source: 'static',
                        value: [
                            {
                                title: 'Lorem feature one',
                                description: 'Lorem short text.',
                            },
                            {
                                title: 'Lorem feature two',
                                description: 'Lorem short text.',
                            },
                            {
                                title: 'Lorem feature three',
                                description: 'Lorem short text.',
                            },
                            {
                                title: 'Lorem feature four',
                                description: 'Lorem short text.',
                            }
                        ]
                    }
                },
                data: {}
            }
        }
    }
});
