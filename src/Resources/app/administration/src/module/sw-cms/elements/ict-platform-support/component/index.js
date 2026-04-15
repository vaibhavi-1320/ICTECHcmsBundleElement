import template from './sw-cms-el-ict-platform-support.html.twig';
import './sw-cms-el-ict-platform-support.scss';

const { Mixin } = Shopware;

export default {
    template,
    compatConfig: Shopware.compatConfig,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    computed: {
        platformItems() {
            if (!this.element.config?.platformItems?.value || this.element.config.platformItems.value.length === 0) {
                const dummies = [];
                for (let i = 0; i < 5; i++) {
                    dummies.push(JSON.parse(JSON.stringify(this.cmsElements['ict-platform-support'].platformSupportTemplates)));
                }
                return dummies;
            }
            return this.element.config.platformItems.value;
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('ict-platform-support');
            this.initElementData('ict-platform-support');

            if (!this.element.config.platformItems.value) {
                this.element.config.platformItems.value = [];
            }

            if (this.element.config.platformItems.value.length === 0) {
                for (let i = 0; i < 5; i++) {
                    this.addPlatformItem();
                }
            }
        },

        addPlatformItem() {
            if (!this.element.config.platformItems.value) {
                this.element.config.platformItems.value = [];
            }
            const template = JSON.parse(JSON.stringify(this.cmsElements['ict-platform-support'].platformSupportTemplates));
            this.element.config.platformItems.value.push(template);
        }
    }
};
