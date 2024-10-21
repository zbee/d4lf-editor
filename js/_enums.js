const EDITOR_SLOTS = Object.freeze({
    HELM: 'helm',
    CHEST: 'chest',
    PANTS: 'pants',
    BOOTS: 'boots',
    MAIN_HAND: 'main_hand',
    OFF_HAND: 'off_hand',
    LEFT_HAND: 'left_hand',
    RIGHT_HAND: 'right_hand',
    AMULET: 'amulet',
    RING: 'ring',
    OTHER_RING: 'other_ring',
});

const COMPARISON_TYPES = Object.freeze({
    LARGER: 'larger',
    SMALLER: 'smaller',
});

const REQUIREMENT_TYPES = Object.freeze({
    ONE_OF: 'one-of',
    REQUIRED: 'required',
    GREATER: 'greater',
});

const REQUIREMENT_EXPLANATIONS = Object.freeze({
    ONE_OF: 'This affix is optional, according to the Minimum Affixes count',
    REQUIRED: 'This affix must be present',
    GREATER: 'This affix must be present and be a greater affix',
});

const SYMBOLS = Object.freeze({
    COMPARISON: {
        LARGER: '❯', // &#10095;
        SMALLER: '❮', // &#10094;
    },
    REQUIREMENT: {
        ONE_OF: '•', // &#8226;
        REQUIRED: '✔', // &#10004;
        GREATER: '🞺', // &#128954;
    },
});
