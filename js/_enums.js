/**
 * The names of the gear slots presented in the editor and how they relate to
 * item types, or synonyms thereof.
 */
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

/**
 * The two valid values for affix comparisons.
 */
const COMPARISON_TYPES = Object.freeze({
    LARGER: 'larger',
    SMALLER: 'smaller',
});

/**
 * The three different ways an affix can be marked for varying levels of requirement.
 */
const REQUIREMENT_TYPES = Object.freeze({
    ONE_OF: 'one-of',
    REQUIRED: 'required',
    GREATER: 'greater',
});

/**
 * The explanations for the different requirement types.
 * @see REQUIREMENT_TYPES
 */
const REQUIREMENT_EXPLANATIONS = Object.freeze({
    ONE_OF: 'This affix is optional, according to the Minimum Affixes count',
    REQUIRED: 'This affix must be present',
    GREATER: 'This affix must be present and be a greater affix',
});

/**
 * Various symbols used in the UI.
 */
const SYMBOLS = Object.freeze({
    /**
     * The symbols used for comparison types.
     * @see COMPARISON_TYPES
     */
    COMPARISON: {
        /**
         * The symbol for a larger comparison.
         * @see COMPARISON_TYPES#LARGER
         */
        LARGER: '❯', // &#10095;
        /**
         * The symbol for a smaller comparison.
         * @see COMPARISON_TYPES#SMALLER
         */
        SMALLER: '❮', // &#10094;
    },
    /**
     * The symbols used for requirement
     * @see REQUIREMENT_TYPES
     */
    REQUIREMENT: {
        /**
         * The symbol for a one-of requirement.
         * @see REQUIREMENT_TYPES#ONE_OF
         * @see REQUIREMENT_EXPLANATIONS#ONE_OF
         */
        ONE_OF: '•', // &#8226;
        /**
         * The symbol for a required requirement.
         * @see REQUIREMENT_TYPES#REQUIRED
         * @see REQUIREMENT_EXPLANATIONS#REQUIRED
         */
        REQUIRED: '✔', // &#10004;
        /**
         * The symbol for a greater requirement.
         * @see REQUIREMENT_TYPES#GREATER
         * @see REQUIREMENT_EXPLANATIONS#GREATER
         */
        GREATER: '🞺', // &#128954;
    },
});
