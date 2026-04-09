import template from './sw-cms-el-ict-three-column.html.twig';
import './sw-cms-el-ict-three-column.scss';

const ELEMENT_NAME = 'ict-three-column';
const { Mixin } = Shopware;

export default {
    template,

    compatConfig: Shopware.compatConfig,

    props: {
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    computed: {
        media() {
            return this.element.data?.media || null;
        },

        eyebrow() {
            return this.element.config.eyebrow?.value || '';
        },

        title() {
            return this.element.config.title?.value || '';
        },

        text() {
            return this.element.config.text?.value || '';
        },

        linkText() {
            return this.element.config.linkText?.value || '';
        },

        url() {
            return this.element.config.url?.value || '';
        },

        isPlaceholder() {
            return !this.media
                && !this.eyebrow
                && !this.title
                && !this.text
                && !this.linkText
                && !this.url;
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig(ELEMENT_NAME);
            this.initElementData(ELEMENT_NAME);

            if (!this.element.data) {
                this.element.data = {};
            }
        },

        onPlaceholderActivate() {
            if (this.disabled || !this.isPlaceholder) {
                return;
            }

            let parent = this.$parent;

            while (parent) {
                if (typeof parent.onElementButtonClick === 'function') {
                    parent.onElementButtonClick();
                    return;
                }

                parent = parent.$parent;
            }
        },
    },
};
