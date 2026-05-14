import template from './sw-cms-el-ict-two-column-three-image.html.twig';
import './sw-cms-el-ict-two-column-three-image.scss';

const {Mixin, Filter} = Shopware;
export default {
    template,
    compatConfig: Shopware.compatConfig,
    inject: ['feature', 'repositoryFactory'],
    mixins: [Mixin.getByName('cms-element')],

    computed: {
        assetFilter() {
            return Filter.getByName('asset');
        },
        leftMediaUrl() {
            const media = this.element.data?.leftMedia || this.element.data?.leftImage;
            return media?.url ?? this.assetFilter('/administration/static/img/cms/preview_mountain_large.jpg');
        },
        rightTopMediaUrl() {
            const media = this.element.data?.rightTopMedia || this.element.data?.rightTopImage;
            return media?.url ?? this.assetFilter('/administration/static/img/cms/preview_glasses_large.jpg');
        },
        rightBottomMediaUrl() {
            const media = this.element.data?.rightBottomMedia || this.element.data?.rightBottomImage;
            return media?.url ?? this.assetFilter('/administration/static/img/cms/preview_camera_large.jpg');
        },

        leftButtonIconUrl() {
            const media = this.element.data?.leftButtonIcon || null;
            return media?.url || null;
        },

        leftButtonIconSize() {
            const size = Number.parseInt(`${this.element?.config?.leftButtonIconSize?.value || ''}`, 10);
            return Number.isFinite(size) && size > 0 ? size : 20;
        },

        leftButtonStyle() {
            const cfg = this.element?.config || {};
            return {
                backgroundColor: cfg.leftButtonBackgroundColor?.value || '#0066ff',
                borderColor: cfg.leftButtonBorderColor?.value || 'transparent',
                color: cfg.leftButtonTextColor?.value || '#ffffff',
                borderStyle: 'solid',
                borderWidth: '1px',
            };
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('ict-two-column-three-image');
            this.initElementData('ict-two-column-three-image');
        }
    }
};
