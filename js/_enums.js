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

/**
 * Affixes that are only Implicit.
 * @type {Readonly<string[]>}
 * @see {@link https://d4builds.gg/database/gear-affixes/|D4Builds.gg Affix List}
 */
const IMPLICIT_AFFIXES = Object.freeze([
    'attacks_reduce_evades_cooldown_by_seconds',
    'maximum_evade_charges',
    'evade_grants_attack_speed_for_seconds',
]);

//
// D4LF Imported JSON Enums
//

/**
 * @see https://github.com/aeon0/d4lf/blob/main/assets/lang/enUS/affixes.json
 * @private
 */
const URL_AFFIXES = 'https://d4lf-editor.zbee.codes/json/affixes.json';
/**
 * @see https://github.com/aeon0/d4lf/blob/main/assets/lang/enUS/item_types.json
 * @private
 */
const URL_ITEM_TYPES = 'https://d4lf-editor.zbee.codes/json/item_types.json'
/**
 * @see https://github.com/aeon0/d4lf/blob/main/assets/lang/enUS/uniques.json
 * @private
 */
const URL_UNIQUES = 'https://d4lf-editor.zbee.codes/json/uniques.json';

/** @private */
let _affixes = {};
$.getJSON(URL_AFFIXES, function (data) {
    _affixes = data;
});
/**
 * The affix data, as imported from the JSON file.
 * @see URL_AFFIXES
 */
const AFFIXES_DATA = Object.freeze(_affixes);

/** @private */
let _item_types = {};
$.getJSON(URL_ITEM_TYPES, function (data) {
    _item_types = data;
});
/**
 * The item type data, as imported from the JSON file.
 * @see URL_ITEM_TYPES
 */
const ITEM_TYPES_DATA = Object.freeze(_item_types);

/** @private */
let _uniques = {};
$.getJSON(URL_UNIQUES, function (data) {
    _uniques = data;
});
/**
 * The unique data, as imported from the JSON file.
 * @see URL_UNIQUES
 */
const UNIQUES_DATA = Object.freeze(_uniques);

//
// Affix Abbreviations
//

/**
 * Direct abbreviations for full affix names.
 */
const AFFIX_ABBREVIATIONS = Object.freeze({
    'evade_grants_movement_speed_for_second': 'evade gives speed',
    'attacks_reduce_evades_cooldown_by_seconds': 'attacks reduce evade cd',
    'maximum_evade_charges': 'max evades',
    'cooldown_reduction': 'cdr',
    'resistance_to_all_elements': 'resist all',
    'maximum_life': 'max hp',
    'critical_strike_chance': 'crit chance',
    'critical_strike_damage': 'crit damage',
    'attack_speed': 'atk speed',
    'movement_speed': 'move speed',
});

/**
 * Sections of affix names that can be abbreviated.
 */
const AFFIX_DYNAMIC_ABBREVIATIONS = Object.freeze({
    'lucky_hit_': [
        ['lucky_hit', 'lucky hit'],
        ['critical_strikes_have', '(crit)'],
        ['_up_to_a_chance_to', ':'],
        ['_for_seconds', ''],
    ],
    'chance_for_': [
        ['chance_for', 'cast:'],
        ['to_cast_twice', ''], // "x2"?
        ['a_second', ''], // "x2"?
        ['when_cast', ''],
    ],
    'resource_generation_w': [
        ['resource_generation', 'extra gen:'],
    ],
    'critical_strike_chance_against_': [
        ['critical_strike_chance_against', 'crit vs:'],
    ],
});
