import template from './sw-cms-el-preview-ict-single-title-button-section.html.twig';
import './sw-cms-el-preview-ict-single-title-button-section.scss';

export default {
    template,

    props: {
        element: {
            type: Object,
            required: false,
            default() {
                return {
                    config: {
                        backgroundType: { value: 'gbColor' },
                        backgroundColor: { value: '#0b5c8a' },
                        backgroundGradientColor1: { value: '#0b5c8a' },
                        backgroundGradientColor2: { value: '#1559d6' },
                        title: { value: 'Create Your Spectacular Video Wall' },
                        description: { value: 'Let our experts design and install the perfect video wall solution for your space' },
                        leftSectionButtonText: { value: 'Download Video Wall Guide' },
                        leftSectionButtonBackgroundColor: { value: '#0064ff' },
                        leftSectionButtonTextColor: { value: '#ffffff' },
                        rightSectionButtonText: { value: 'Schedule Consultation' },
                        rightSectionButtonBackgroundColor: { value: '#6c757d' },
                        rightSectionButtonTextColor: { value: '#ffffff' },
                    },
                };
            },
        },
    },

    computed: {
        title() {
            return this.element?.config?.title?.value || 'Create Your Spectacular Video Wall';
        },

        description() {
            const value = this.element?.config?.description?.value;
            return value || 'Let our experts design and install the perfect video wall solution for your space';
        },

        leftText() {
            return this.element?.config?.leftSectionButtonText?.value || 'Download Video Wall Guide';
        },

        rightText() {
            return this.element?.config?.rightSectionButtonText?.value || 'Schedule Consultation';
        },

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
};
