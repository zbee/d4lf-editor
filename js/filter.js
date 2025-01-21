// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

/**
 * Represents a filter, which is the whole collection of data we are working with.
 * Additionally, imports and exports filters when we load and save them.
 * @class
 */
class filter {
    /**
     * The file name of the filter.
     * @type {string}
     */
    file_name = 'filter';

    /**
     * Indicates if the filter is imported.
     * @type {boolean|null}
     */
    imported = null;

    /**
     * The import link of the filter.
     * @type {string|null}
     * @private
     */
    #import_link = null;

    /**
     * The import date of the filter.
     * @type {string|null}
     * @private
     */
    #import_date = null;

    /**
     * The import version of the filter.
     * @type {string|null}
     * @private
     */
    #import_version = null;

    /**
     * Text-formatted import link+date+version.
     * @type {string|null}
     */
    import_stamp = null;

    /**
     * List of filter objects.
     * @type {individual_filter_part[]}
     */
    parts = [];

    /**
     * Creates a filter.
     * @param {Object|null} [object_from_yaml=null] - The object from YAML.
     * @param {HTMLElement|null} [html_element=null] - The HTML element.
     */
    constructor(object_from_yaml = null, html_element = null) {
    }

    /**
     * Parses the filter from YAML.
     * @param {Object} object_from_yaml - The object from YAML.
     * @private
     */
    #from_yaml(object_from_yaml) {
    }

    /**
     * Parses the filter from HTML.
     * @param {HTMLElement} html_element - The HTML element.
     * @private
     */
    #from_html(html_element) {
    }

    /**
     * Converts the filter to HTML.
     * @returns {string|null} The HTML representation of the filter.
     */
    html() {
    }

    /**
     * Converts the filter to YAML.
     * @returns {object} The YAML representation of the filter, ready for
     * js-yaml-write.
     */
    yaml() {
    }
}
