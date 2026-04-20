import template from './sw-cms-el-ict-feature-grid.html.twig';
import './sw-cms-el-ict-feature-grid.scss';

const { Mixin } = Shopware;

export default {
    template,
    compatConfig: Shopware.compatConfig,

    mixins: [Mixin.getByName('cms-element')],

    created() {
        this.initElementConfig('ict-feature-grid');
        this.ensureCards();
    },

    methods: {
        ensureCards() {
            if (!this.element?.config?.cards) return;
            if (!Array.isArray(this.element.config.cards.value)) {
                this.element.config.cards.value = [];
            }
            if (this.element.config.cards.value.length === 0) {
                this.element.config.cards.value = this.buildInitialCards();
            }
        },

        buildInitialCards() {
            return [
                this.makeCard({ headline: 'Feature One', bodyText: 'Describe the first key feature here.' }),
                this.makeCard({ headline: 'Feature Two', bodyText: 'Describe the second key feature here.' }),
                this.makeCard({ headline: 'Feature Three', bodyText: 'Describe the third key feature here.' }),
            ];
        },

        makeCard(overrides = {}) {
            return Object.assign({
                headline: 'Feature',
                subheadline: '',
                bodyText: 'Short description.',
                headlineColor: '#1e293b',
                subheadlineColor: '#64748b',
                bodyTextColor: '#64748b',
                iconImage: null,
                iconColor: '#6366f1',
                buttons: [this.makeButton()],
                cardBackgroundColor: '#ffffff',
                cardAccentColor: '#6366f1',
                mediaDisplayMode: 'crop',
                mediaHeight: '200',
                cardBackgroundImage: null,
                cardBackgroundVideo: null,
                cardBackgroundVideoUploadType: 'file',
                cardBackgroundVideoUploadUrl: '',
            }, overrides);
        },

        makeButton(overrides = {}) {
            return Object.assign({
                show: true,
                buttonText: 'Learn More',
                buttonLinkType: 'internal',
                buttonUrl: '',
                buttonTarget: '_self',
                buttonTextColor: '#ffffff',
                buttonHoverTextColor: '#ffffff',
                buttonBorderColor: 'transparent',
                buttonHoverBorderColor: 'transparent',
                buttonBorderStyle: 'solid',
                buttonBorderWidth: 0,
                buttonBorderRadius: 6,
            }, overrides);
        },

        getActiveButton(card) {
            if (!Array.isArray(card?.buttons)) return null;
            return card.buttons.find(b => b?.show !== false) ?? null;
        },

        isSvgUrl(url) {
            return typeof url === 'string' && url.toLowerCase().includes('.svg');
        },

        getMediaObjectFit(card) {
            return card?.mediaDisplayMode === 'crop' ? 'cover' : 'contain';
        },

        getMediaHeightCss(card) {
            const raw = String(card?.mediaHeight ?? '200').trim();
            return /^\d+(\.\d+)?$/.test(raw) ? `${raw}px` : raw;
        },

        getYoutubeEmbedUrl(url) {
            if (!url || typeof url !== 'string') return '';
            let id = '';
            const clean = url.split('#')[0];
            if (clean.includes('v=')) {
                id = clean.split('v=')[1].split('&')[0].split('?')[0];
            } else if (clean.includes('youtu.be/')) {
                id = clean.split('youtu.be/')[1].split('?')[0].split('&')[0];
            } else if (clean.includes('/live/')) {
                id = clean.split('/live/')[1].split('?')[0].split('&')[0];
            } else if (clean.includes('/shorts/')) {
                id = clean.split('/shorts/')[1].split('?')[0].split('&')[0];
            } else if (clean.includes('/embed/')) {
                id = clean.split('/embed/')[1].split('?')[0].split('&')[0];
            }
            return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0` : '';
        },
    },
};
