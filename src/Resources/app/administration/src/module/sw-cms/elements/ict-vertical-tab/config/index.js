import template from './sw-cms-el-config-ict-vertical-tab.html.twig';
import './sw-cms-el-config-ict-vertical-tab.scss';

const { Mixin } = Shopware;

export default {
    template,

    compatConfig: Shopware.compatConfig,

    emits: ['element-update'],

    mixins: [Mixin.getByName('cms-element')],

    data() {
        return {
            expandedIndex: 0,
            _prevLinkTypes: [],
        };
    },

    computed: {
        tabs() {
            return this.element?.config?.tabs?.value ?? [];
        },

        linkTypeOptions() {
            return [
                { value: 'url', label: this.$tc('ict-cms-bundle-element.cms.elements.ictVerticalTab.config.linkTypeUrl') },
                { value: 'internal', label: this.$tc('ict-cms-bundle-element.cms.elements.ictVerticalTab.config.linkTypeInternal') },
            ];
        },
    },

    created() {
        this.initElementConfig('ict-vertical-tab');
        this._prevLinkTypes = (this.tabs || []).map(t => t.linkType);
    },

    watch: {
        tabs: {
            deep: true,
            handler(tabs) {
                tabs.forEach((tab, i) => {
                    if (this._prevLinkTypes[i] !== undefined && tab.linkType !== this._prevLinkTypes[i]) {
                        tab.linkUrl = null;
                        this.onUpdate();
                    }
                    this._prevLinkTypes[i] = tab.linkType;
                });
            },
        },
    },

    methods: {
        onUpdate() {
            this.$emit('element-update', this.element);
        },

        toggleExpand(index) {
            this.expandedIndex = this.expandedIndex === index ? -1 : index;
        },

        addTab() {
            const count = this.tabs.length + 1;
            this.tabs.push({
                title: `Tab ${count}`,
                header: '',
                content: '',
                buttonText: '',
                linkType: 'url',
                linkUrl: '',
                openInNewTab: false,
            });
            this.expandedIndex = this.tabs.length - 1;
            this.onUpdate();
        },

        removeTab(index) {
            this.tabs.splice(index, 1);
            if (this.expandedIndex >= this.tabs.length) {
                this.expandedIndex = this.tabs.length - 1;
            }
            this.onUpdate();
        },

        onTabLinkTypeChange(tab) {
            tab.linkUrl = '';
            this.onUpdate();
        },

        onTabExternalUrlChange(tab) {
            if (tab.linkUrl && !/^https?:\/\//i.test(tab.linkUrl)) {
                tab.linkUrl = `https://${tab.linkUrl}`;
            }
            this.onUpdate();
        },

        onRemoveLink(tab) {
            tab.linkUrl = '';
            this.onUpdate();
        },
    },
};
