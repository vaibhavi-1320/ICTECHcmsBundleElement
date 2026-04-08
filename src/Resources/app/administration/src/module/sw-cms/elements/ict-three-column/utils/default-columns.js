export const ELEMENT_NAME = 'ict-three-column';
export const BLOCK_CATEGORY = 'ict-cms-layouts';

const DEFAULT_CARD_VALUES = Object.freeze({
    media: null,
    eyebrow: '',
    title: '',
    text: '',
    linkText: '',
    url: '',
    newTab: false,
});

export function createDefaultCardConfig(overrides = {}) {
    const values = {
        ...DEFAULT_CARD_VALUES,
        ...overrides,
    };

    return {
        media: {
            source: 'static',
            value: values.media,
            entity: {
                name: 'media',
            },
        },
        eyebrow: {
            source: 'static',
            value: values.eyebrow,
        },
        title: {
            source: 'static',
            value: values.title,
        },
        text: {
            source: 'static',
            value: values.text,
        },
        linkText: {
            source: 'static',
            value: values.linkText,
        },
        url: {
            source: 'static',
            value: values.url,
        },
        newTab: {
            source: 'static',
            value: values.newTab,
        },
    };
}
