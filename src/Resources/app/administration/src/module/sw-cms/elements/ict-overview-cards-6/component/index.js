import template from './sw-cms-el-ict-overview-cards-6.html.twig';
import './sw-cms-el-ict-overview-cards-6.scss';

const { Mixin } = Shopware;

export default {
    template,
    compatConfig: Shopware.compatConfig,

    mixins: [Mixin.getByName('cms-element')],

    created() {
        this.createdComponent();
    },

    methods: {
        createButton(overrides = {}) {
            return Object.assign({
                show: true, buttonText: 'Learn More', buttonLinkType: 'internal', buttonUrl: '',
                buttonTarget: '_self', buttonAlignment: 'left', buttonShowIcon: true, buttonIcon: null,
                buttonIconColor: '#FFFFFF', buttonIconHoverColor: '#000000', buttonIconHoverActive: true,
                buttonIconSize: '20', buttonBackgroundColor: '#005AE5', buttonHoverBackgroundColor: '#0044bb',
                buttonTextColor: '#FFFFFF', buttonHoverTextColor: '#FFFFFF', buttonBorderColor: 'transparent',
                buttonHoverBorderColor: 'transparent', buttonBorderStyle: 'solid', buttonBorderWidth: 0,
                buttonBorderRadius: 6, buttonFontSize: '13', buttonShadowColor: 'rgba(0,0,0,0)',
                buttonShadowLeft: 0, buttonShadowRight: 0, buttonShadowTop: 0, buttonShadowBottom: 0
            }, overrides);
        },

        createDetailRow(overrides = {}) {
            return Object.assign({ title: 'Title', value: 'Value', titleColor: '#1a1a2e', valueColor: '#52667a' }, overrides);
        },

        createTag(overrides = {}) {
            return Object.assign({
                text: 'TAG', textColor: '#005AE5', backgroundColor: '#e8f0fe',
                outlineColor: '#a8c4f8', outlineThickness: 1, fontSize: '10', lineHeight: '1'
            }, overrides);
        },

        createButtonFromLegacyCard(card) {
            return this.createButton({
                show: card?.show, buttonText: card?.buttonText, buttonLinkType: card?.buttonLinkType,
                buttonUrl: card?.buttonUrl, buttonTarget: card?.buttonTarget, buttonAlignment: card?.buttonAlignment,
                buttonShowIcon: card?.buttonShowIcon, buttonIcon: card?.buttonIcon, buttonIconColor: card?.buttonIconColor,
                buttonIconHoverColor: card?.buttonIconHoverColor, buttonIconHoverActive: card?.buttonIconHoverActive,
                buttonIconSize: card?.buttonIconSize, buttonBackgroundColor: card?.buttonBackgroundColor,
                buttonHoverBackgroundColor: card?.buttonHoverBackgroundColor, buttonTextColor: card?.buttonTextColor,
                buttonHoverTextColor: card?.buttonHoverTextColor, buttonBorderColor: card?.buttonBorderColor,
                buttonHoverBorderColor: card?.buttonHoverBorderColor, buttonBorderStyle: card?.buttonBorderStyle,
                buttonBorderWidth: card?.buttonBorderWidth, buttonBorderRadius: card?.buttonBorderRadius,
                buttonFontSize: card?.buttonFontSize, buttonShadowColor: card?.buttonShadowColor,
                buttonShadowLeft: card?.buttonShadowLeft, buttonShadowRight: card?.buttonShadowRight,
                buttonShadowTop: card?.buttonShadowTop, buttonShadowBottom: card?.buttonShadowBottom
            });
        },

        createdComponent() {
            this.initElementConfig('ict-overview-cards-6');
            this.ensureCardsInitialized();
        },

        cloneCardTemplate() {
            const template = this.cmsElements?.['ict-overview-cards-6']?.cardTemplates;
            if (template && typeof template === 'object') {
                return JSON.parse(JSON.stringify(template));
            }
            return { detailRows: [], buttons: [this.createButton()] };
        },

        createCard(overrides = {}) {
            return Object.assign(this.cloneCardTemplate(), overrides);
        },

        getInitialCards() {
            return [
                this.createCard({ headline: 'Card Title 1', bodyText: 'Description for card one.' }),
                this.createCard({ headline: 'Card Title 2', bodyText: 'Description for card two.' }),
                this.createCard({ headline: 'Card Title 3', bodyText: 'Description for card three.' })
            ];
        },

        ensureCardsInitialized() {
            if (!this.element?.config?.cards) return;
            if (!Array.isArray(this.element.config.cards.value)) {
                this.element.config.cards.value = [];
            }
            if (this.element.config.cards.value.length === 0) {
                this.element.config.cards.value = this.getInitialCards();
            }
        },

        isNumericSizeValue(v) {
            if (v === null || v === undefined) return false;
            return /^\d+(\.\d+)?$/.test(String(v).trim());
        },

        getCssSizeValue(v, fallback) {
            if (v === null || v === undefined) return fallback;
            const s = String(v).trim();
            if (!s) return fallback;
            return this.isNumericSizeValue(s) ? `${s}px` : s;
        },

        getLineHeightValue(v, fallback, allowUnitless = false) {
            const s = v === null || v === undefined ? '' : String(v).trim();
            if (!s) return fallback;
            if (allowUnitless && this.isNumericSizeValue(s)) return s;
            return this.isNumericSizeValue(s) ? `${s}px` : s;
        },

        getHeadlineLineHeight(sizeValue) {
            const s = sizeValue === null || sizeValue === undefined ? '' : String(sizeValue).trim();
            if (!s) return '28px';
            if (s === '24' || s === '24px') return '28px';
            if (s === '42' || s === '42px') return '55px';
            return this.isNumericSizeValue(s) ? `${s}px` : this.getCssSizeValue(s, '28px');
        },

        getSubheadlineLineHeight(sizeValue) {
            const s = sizeValue === null || sizeValue === undefined ? '' : String(sizeValue).trim();
            if (!s) return '25px';
            if (s === '20' || s === '20px') return '25px';
            return this.isNumericSizeValue(s) ? `${s}px` : this.getCssSizeValue(s, '25px');
        },

        getTextAlignment(alignment, fallback = 'left') {
            return ['left', 'center', 'right'].includes(alignment) ? alignment : fallback;
        },

        getCardButtons(card) {
            if (Array.isArray(card?.buttons) && card.buttons.length) {
                return card.buttons.filter(b => b?.show !== false);
            }
            if (card?.showButton) {
                return [this.createButtonFromLegacyCard(card)].filter(b => b?.show !== false);
            }
            return [];
        },


        getCardDetailRows(card) {
            if (!card?.showDetailRows || !Array.isArray(card?.detailRows)) return [];
            return card.detailRows.filter(r => r && typeof r === 'object' && (String(r.title || '').trim() || String(r.value || '').trim()));
        },

        getButtonJustifyContent(alignment) {
            if (alignment === 'center') return 'center';
            if (alignment === 'right') return 'flex-end';
            return 'flex-start';
        },

        getMediaDisplayMode(card) {
            return ['fill', 'fit', 'crop', 'tile'].includes(card?.mediaDisplayMode) ? card.mediaDisplayMode : 'fill';
        },

        getMediaHeight(card) {
            return this.getCssSizeValue(card?.mediaHeight, '200px');
        },

        getMediaImageFit(card) {
            const mode = this.getMediaDisplayMode(card);
            if (mode === 'crop') return 'cover';
            if (mode === 'fill') return 'fill';
            return 'contain';
        },

        getButtonIconMediaItem(cardIndex, buttonIndex) {
            const key = `${cardIndex}-${buttonIndex}`;
            return this.element.data?.buttonIcons?.[key] || (buttonIndex === 0 ? this.element.data?.buttonIcons?.[cardIndex] : null) || null;
        },

        getLegacyCardShadowPreset(shadowType, isHover = false) {
            const t = (shadowType || '').toString().trim().toLowerCase();
            if (t === 'light') return { top: '0', right: '4', bottom: '12', left: '0', color: 'rgba(0,0,0,0.08)' };
            if (t === 'medium') return { top: '0', right: '8', bottom: '24', left: '0', color: 'rgba(0,0,0,0.12)' };
            if (t === 'heavy') return { top: '0', right: '12', bottom: '32', left: '0', color: 'rgba(0,0,0,0.18)' };
            return { top: '0', right: '0', bottom: '0', left: '0', color: 'rgba(0,0,0,0)' };
        },

        hasAnyCustomShadowValue(card, prefix) {
            return ['Top', 'Right', 'Bottom', 'Left', 'Color'].some(s => {
                const v = card?.[`${prefix}${s}`];
                return v !== undefined && v !== null && String(v).trim() !== '';
            });
        },

        buildCardShadowValue(card, isHover = false) {
            const prefix = isHover ? 'cardHoverShadow' : 'cardShadow';
            const preset = this.getLegacyCardShadowPreset(card?.[prefix] || (isHover ? 'light' : 'none'), isHover);
            const has = this.hasAnyCustomShadowValue(card, prefix);
            const top = this.getCssSizeValue(has ? card?.[`${prefix}Top`] : preset.top, `${preset.top}px`);
            const right = this.getCssSizeValue(has ? card?.[`${prefix}Right`] : preset.right, `${preset.right}px`);
            const bottom = this.getCssSizeValue(has ? card?.[`${prefix}Bottom`] : preset.bottom, `${preset.bottom}px`);
            const left = this.getCssSizeValue(has ? card?.[`${prefix}Left`] : preset.left, `${preset.left}px`);
            let color = preset.color;
            const cc = card?.[`${prefix}Color`];
            if (has && cc !== undefined && cc !== null && String(cc).trim() !== '') color = String(cc).trim();
            return `${top} ${right} ${bottom} ${left} ${color}`;
        },

        getCardShadowValue(card) { return this.buildCardShadowValue(card, false); },
        getCardHoverShadowValue(card) { return this.buildCardShadowValue(card, true); },

        isSvgUrl(url) {
            if (!url || typeof url !== 'string') return false;
            return url.toLowerCase().includes('.svg');
        },

        getYoutubeEmbedUrl(url) {
            if (!url || typeof url !== 'string') return '';
            const id = url.replace('https://www.youtube.com/watch?v=', '').replace('https://youtu.be/', '').split('&')[0];
            if (!id) return '';
            return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0`;
        }
    }
};
