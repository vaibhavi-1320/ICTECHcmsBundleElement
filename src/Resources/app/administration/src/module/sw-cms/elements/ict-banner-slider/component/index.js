import template from './sw-cms-el-ict-banner-slider.html.twig';
import './sw-cms-el-ict-banner-slider.scss';

const { Mixin } = Shopware;

export default {
    template,

    compatConfig: Shopware.compatConfig,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },

        sliderItems() {
            if (!this.element.config.sliderItems.value) {
                return this.previewItems;
            }

            if (!Array.isArray(this.element.config.sliderItems.value) || this.element.config.sliderItems.value.length === 0) {
                return this.previewItems;
            }

            return this.element.config.sliderItems.value;
        },

        previewItems() {
            return [
                {
                    mediaUrl: this.assetFilter('administration/static/img/cms/preview_mountain_large.jpg'),
                    mainTitle: 'Banner Slider',
                    subTitle: '',
                    description: '',
                    callButtonText: '',
                    callButtonNumber: '',
                    emailButtonText: '',
                    emailButtonAddress: '',
                    isPreview: true,
                },
            ];
        },

        displayMode() {
            return this.element.config.displayMode.value;
        },

        styles() {
            return {
                'min-height': '300px',
                'background-color': '#f9fafb',
            };
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('ict-banner-slider');
        },
    },
};
