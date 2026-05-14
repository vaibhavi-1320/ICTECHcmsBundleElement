import template from './sw-cms-el-config-ict-hero-section-simple.html.twig';
import './config.scss';

const { Mixin } = Shopware;

export default {
    template,
    emits: ['element-update'],
    mixins: [
        Mixin.getByName('cms-element'),
    ],

    created() {
        this.initElementConfig('ict-hero-section');
        // Do not auto-normalize here: it can overwrite saved values in some cases.
    },

    methods: {
        onInput() {
            this.normalizeFeatureItems();
            this.$emit('element-update', this.element);
        },

        normalizeFeatureItems() {
            const items = this.element?.config?.featureItems?.value;

            // Do not inject defaults here. Defaults belong to the cms element definition.
            // Injecting here can override persisted user changes on re-open.
            if (items === null || items === undefined) {
                this.element.config.featureItems.value = [];
                return;
            }

            // Shopware may hydrate the config value as JSON string in edge cases.
            if (typeof items === 'string') {
                try {
                    const parsed = JSON.parse(items);
                    this.element.config.featureItems.value = Array.isArray(parsed) ? parsed : [];
                } catch (_) {
                    this.element.config.featureItems.value = [];
                }
                return;
            }

            // Respect intentional removal (allow empty list).
            if (!Array.isArray(items)) {
                return;
            }

            this.element.config.featureItems.value = items
                .filter(item => item && typeof item === 'object')
                .map((item) => ({
                    title: `${item?.title || ''}`.trim() || 'Lorem feature',
                    description: `${item?.description || ''}`.trim() || 'Lorem short text.',
                }));
        },

        addFeatureItem() {
            const currentItems = Array.isArray(this.element.config.featureItems.value)
                ? this.element.config.featureItems.value
                : [];

            this.element.config.featureItems.value = [
                ...currentItems,
                {
                    title: 'Lorem feature',
                    description: 'Lorem short text.',
                },
            ];
            this.onInput();
        },

        removeFeatureItem(index) {
            const currentItems = Array.isArray(this.element.config.featureItems.value)
                ? this.element.config.featureItems.value
                : [];

            this.element.config.featureItems.value = currentItems.filter((_, i) => i !== index);
            this.onInput();
        },
    },
};
