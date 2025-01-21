/**
 * Represents all the {@link affix|affixes} for an {@link filter_part}.
 * @class
 */
class affixes {
    /**
     * List of required greater affixes.
     * @type {Array}
     * @private
     */
    #required_greater_affixes = [];

    /**
     * List of required affixes.
     * @type {Array}
     * @private
     */
    #required_affixes = [];

    /**
     * List of optional affixes.
     * @type {Array}
     * @private
     */
    #optional_affixes = [];

    /**
     * List of implicit affixes.
     * @type {Array}
     * @private
     */
    #implicit_affixes = [];

    /**
     * The total number of required affixes.
     * @type {number|null}
     */
    total_required = null;

    /**
     * The number of greater required affixes.
     * @type {number|null}
     */
    greaters_required = null;

    /**
     * Creates affixes.
     * @param {Object|null} [yaml=null] - The object from YAML.
     * @param {JQuery<HTMLElement>|null} [$html=null] - The HTML element.
     */
    constructor(yaml = null, $html = null) {
        // Parse the affix from User Input, YAML, or HTML.
        if (yaml !== null) {
            this.#from_yaml(yaml);
        }
        else if ($html !== null) {
            this.#from_html($html);
        }
        // Error if no context is provided.
        else {
            throw ERRORS.AFFIXES.NO_CONTEXT;
        }

        // Make sure required data is present.
        if (this.total_required == null
            || this.greaters_required == null) {
            throw ERRORS.AFFIXES.BAD_DATA;
        }
    }

    /**
     * Parses the affixes from YAML.
     * @param {Object} yaml - The object from YAML.
     * @private
     */
    #from_yaml(yaml) {
    }

    /**
     * Parses the affixes from HTML.
     * @param {JQuery<HTMLElement>} $html - The HTML element.
     * @private
     */
    #from_html($html) {
    }

    /**
     * Converts the affixes to HTML.
     * @returns {string|null} The HTML representation of the affixes.
     */
    html() {
    }

    /**
     * Converts the affixes to YAML.
     * @returns {object} The YAML representation of the affixes, ready for
     * js-yaml-write.
     */
    yaml() {
    }
}
