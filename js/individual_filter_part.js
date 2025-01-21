/**
 * Represents an individual filter part,
 * with {@link affixes}, item data (item type, power, etc.), and any unique aspect.
 * @class
 */
class individual_filter_part {
    /**
     * The slot of the filter part.
     * @type {string|null}
     */
    slot = null;

    /**
     * The item type of the filter part.
     * @type {string|null}
     */
    item_type = null;

    /**
     * Indicates if the filter part is unique.
     * @type {boolean|null}
     */
    unique = null;

    /**
     * The unique aspect of the filter part.
     * @type {string|null}
     */
    unique_aspect = null;

    /**
     * The minimum power of the filter part.
     * @type {number|null}
     */
    minimum_power = null;

    /**
     * The affixes of the filter part.
     * @type {affixes|null}
     */
    affixes = null;

    /**
     * Creates an individual filter part.
     * @param {Object|null} [object_from_yaml=null] - The object from YAML.
     * @param {HTMLElement|null} [html_element=null] - The HTML element.
     */
    constructor(object_from_yaml = null, html_element = null) {
    }

    /**
     * Parses the filter part from YAML.
     * @param {Object} object_from_yaml - The object from YAML.
     * @private
     */
    #from_yaml(object_from_yaml) {
    }

    /**
     * Parses the normal YAML of the filter part.
     * @param {Object} object_from_yaml - The object from YAML.
     * @private
     */
    #parse_normal_yaml(object_from_yaml) {
    }

    /**
     * Parses the unique YAML of the filter part.
     * @param {Object} object_from_yaml - The object from YAML.
     * @private
     */
    #parse_unique_yaml(object_from_yaml) {
    }

    /**
     * Parses the filter part from HTML.
     * @param {HTMLElement} html_element - The HTML element.
     * @private
     */
    #from_html(html_element) {
    }

    /**
     * Toggles between item type and unique filter parts visible in the element.
     * @param {string} current_filter_part - The current filter button.
     * @static
     */
    static toggle_unique(current_filter_part) {
    }

    /**
     * Converts the filter part to HTML.
     * @returns {string|null} The HTML representation of the filter part.
     */
    html() {
    }

    /**
     * Converts the filter part to YAML.
     * @returns {object} The YAML representation of the filter part, ready for
     * js-yaml-write.
     */
    yaml() {
    }
}
