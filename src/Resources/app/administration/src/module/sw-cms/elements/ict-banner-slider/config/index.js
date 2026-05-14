import template from './sw-cms-el-config-ict-banner-slider.html.twig';
import './sw-cms-el-config-ict-banner-slider.scss';

const ELEMENT_NAME = 'ict-banner-slider';
const { Mixin } = Shopware;

export default {
    template,

    compatConfig: Shopware.compatConfig,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    inject: ['repositoryFactory'],

    emits: ['element-update'],

    data() {
        return {
            mediaModalIsOpen: false,
            validationErrors: {},
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        uploadTag() {
            return `cms-element-ict-banner-slider-config-${this.element.id}`;
        },

        sliderItems() {
            if (!this.element.config.sliderItems.value) {
                this.element.config.sliderItems.value = [];
            }
            return this.element.config.sliderItems.value;
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig(ELEMENT_NAME);
        },

        getEmailError(index) {
            const error = this.validationErrors?.[index]?.email;
            return error ? { detail: error } : null;
        },

        getPhoneError(index) {
            const error = this.validationErrors?.[index]?.phone;
            return error ? { detail: error } : null;
        },

        validateSliderItems() {
            const errors = {};

            this.sliderItems.forEach((item, index) => {
                const email = (item?.emailButtonAddress ?? '').toString().trim();
                const phone = (item?.callButtonNumber ?? '').toString().trim();

                if (email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    errors[index] = errors[index] ?? {};
                    errors[index].email = 'Please enter a valid email address.';
                }

                if (phone.length > 0) {
                    const normalizedPhone = phone.replace(/[\s().-]/g, '');
                    const validPhone = /^[+]?[\d]{7,15}$/.test(normalizedPhone);

                    if (!validPhone) {
                        errors[index] = errors[index] ?? {};
                        errors[index].phone = 'Please enter a valid phone number.';
                    }
                }
            });

            this.validationErrors = errors;
        },

        emitElementUpdate() {
            this.validateSliderItems();
            this.$emit('element-update', this.element);
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },

        onCloseMediaModal() {
            this.mediaModalIsOpen = false;
        },

        addMediaItem(media) {
            if (!media || typeof media.id !== 'string') {
                return;
            }

            const exists = this.sliderItems.some((item) => item && item.mediaId === media.id);
            if (exists) {
                return;
            }

            this.sliderItems.push({
                mediaId: media.id,
                mediaUrl: media.url,
                mainTitle: '',
                mainTitleColor: '#ffffff',
                subTitle: '',
                subTitleColor: '#ffffff',
                description: '',
                descriptionColor: '#ffffff',
                callButtonText: '',
                callButtonNumber: '',
                emailButtonText: '',
                emailButtonAddress: '',
                buttonColor: '#f15a24',
                buttonTextColor: '#ffffff',
            });

            this.emitElementUpdate();
        },

        onMediaSelectionChange(selectedMedia) {
            if (!Array.isArray(selectedMedia)) {
                return;
            }

            selectedMedia.forEach((media) => {
                this.addMediaItem(media);
            });
        },

        onRemoveItem(index) {
            this.sliderItems.splice(index, 1);
            this.emitElementUpdate();
        },

        async onImageUpload({ targetId } = {}) {
            if (typeof targetId !== 'string' || targetId.length === 0) {
                return;
            }

            const mediaEntity = await this.mediaRepository.get(targetId, Shopware.Context.api);
            this.addMediaItem(mediaEntity);
        },
    },
};
