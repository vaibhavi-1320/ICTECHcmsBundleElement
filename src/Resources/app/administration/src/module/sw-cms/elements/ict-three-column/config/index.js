import template from './sw-cms-el-config-ict-three-column.html.twig';
import './sw-cms-el-config-ict-three-column.scss';

const ELEMENT_NAME = 'ict-three-column';
const { Mixin } = Shopware;

export default {
    template,

    compatConfig: Shopware.compatConfig,

    inject: ['repositoryFactory'],

    emits: ['element-update'],

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {
            mediaModalIsOpen: false,
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig(ELEMENT_NAME);
        },

        getUploadTag() {
            return `cms-element-ict-three-column-media-config-${this.element.id}`;
        },

        previewSource() {
            if (this.element?.data?.media?.id) {
                return this.element.data.media;
            }

            return this.element.config.media.value;
        },

        emitUpdateElement() {
            this.$emit('element-update', this.element);
        },

        updateElementData(media = null) {
            const mediaId = media?.id || null;

            if (!this.element.data) {
                if (this.isCompatEnabled('INSTANCE_SET')) {
                    this.$set(this.element, 'data', { mediaId, media });
                } else {
                    this.element.data = { mediaId, media };
                }

                return;
            }

            if (this.isCompatEnabled('INSTANCE_SET')) {
                this.$set(this.element.data, 'mediaId', mediaId);
                this.$set(this.element.data, 'media', media);
            } else {
                this.element.data.mediaId = mediaId;
                this.element.data.media = media;
            }
        },

        async onImageUpload({ targetId }) {
            const mediaEntity = await this.mediaRepository.get(targetId, Shopware.Context.api);

            this.element.config.media.value = mediaEntity.id;
            this.element.config.media.source = 'static';

            this.updateElementData(mediaEntity);
            this.$emit('element-update', this.element);
        },

        onImageRemove() {
            this.element.config.media.value = null;

            this.updateElementData();
            this.$emit('element-update', this.element);
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        onSelectionChanges(selection) {
            const mediaEntity = selection[0] || null;

            if (!mediaEntity) {
                return;
            }

            this.element.config.media.value = mediaEntity.id;
            this.element.config.media.source = 'static';

            this.updateElementData(mediaEntity);
            this.$emit('element-update', this.element);
            this.onCloseModal();
        },
    },
};
