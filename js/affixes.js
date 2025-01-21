/**
 * Represents all the {@link affix|affixes} for an {@link individual_filter_part}.
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
     * The affixes object.
     * @type {Object|null}
     */
    affixes = null;

    /**
     * Creates affixes.
     * @param {Object|null} [object_from_yaml=null] - The object from YAML.
     * @param {JQuery<HTMLElement>|null} [$html=null] - The HTML element.
     */
    constructor(object_from_yaml = null, $html = null) {
    }

    /**
     * Parses the affixes from YAML.
     * @param {Object} object_from_yaml - The object from YAML.
     * @private
     */
    #from_yaml(object_from_yaml) {
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
