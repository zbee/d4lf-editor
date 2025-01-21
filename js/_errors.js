/**
 * Errors ready to throw, separated by class.
 *
 * @remarks
 * The error numbers are supposed to be XXYZZ,
 * where X is the class, Y is the section, and Z is the error number.
 */
const ERRORS = {
    /** @see affix */
    AFFIX:
    {
        /** Constructor received null for all parameters */
        NO_CONTEXT: new Error('#01001 No affix data provided to ctor.'),
        /** HTML parsing received a jQuery selector with no matching element */
        NO_JQUERY: new Error('#01002 No affix element found for selector.'),
        /** parsing resulted in a null value for a required field */
        BAD_DATA: new Error('#01003 Affix data is invalid.'),
        /** data-current for the comparison or requirement toggle was corrupt */
        BAD_KEYS: new Error('#01104 Affix had a corrupted data key'),
    },
    /** @see affixes */
    AFFIXES: {
        /** Constructor received null for all parameters */
        NO_CONTEXT: new Error('#02001 No affix data provided to ctor.'),
        /** parsing resulted in a null value for a required field */
        BAD_DATA: new Error('#02002 Affix data is invalid.'),
    },
    /** @see filter_part */
    FILTER_PART: {},
    /** @see filter */
    FILTER: {},
};
