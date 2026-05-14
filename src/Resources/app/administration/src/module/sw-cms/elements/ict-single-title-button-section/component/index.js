import template from './sw-cms-el-ict-single-title-button-section.html.twig';
import './sw-cms-el-ict-single-title-button-section.scss';

const {Mixin} = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    computed: {
        wrapperStyle() {
            const cfg = this.element?.config || {};
            const type = cfg.backgroundType?.value || 'gbColor';

            if (type === 'color') {
                return {
                    backgroundColor: cfg.backgroundColor?.value || '#0b5c8a',
                };
            }

            return {
                background: `linear-gradient(135deg, ${cfg.backgroundGradientColor1?.value || '#0b5c8a'} 0%, ${cfg.backgroundGradientColor2?.value || '#1559d6'} 100%)`,
            };
        },

        leftButtonStyle() {
            const cfg = this.element?.config || {};
            return {
                backgroundColor: cfg.leftSectionButtonBackgroundColor?.value || '#0064ff',
                color: cfg.leftSectionButtonTextColor?.value || '#ffffff',
            };
        },

        rightButtonStyle() {
            const cfg = this.element?.config || {};
            return {
                backgroundColor: cfg.rightSectionButtonBackgroundColor?.value || '#6c757d',
                color: cfg.rightSectionButtonTextColor?.value || '#ffffff',
            };
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('ict-single-title-button-section');
        }
    }
};
