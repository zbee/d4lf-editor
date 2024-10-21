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

/**
 * Represents an individual filter part.
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

/**
 * Represents affixes.
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
     * @param {HTMLElement|null} [html_element=null] - The HTML element.
     */
    constructor(object_from_yaml = null, html_element = null) {
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
     * @param {HTMLElement} html_element - The HTML element.
     * @private
     */
    #from_html(html_element) {
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

/**
 * Represents an affix.
 * @class
 */
class affix {
    /**
     * The name of the affix.
     * @type {string|null}
     */
    name = null;

    /**
     * The value of the affix.
     * @type {number|null}
     */
    value = null;

    /**
     * The comparison type of the affix.
     * @type {string|null}
     */
    comparison = null;

    /**
     * Whether and how the affix is required.
     * @type {string|null}
     * @see REQUIREMENT_TYPES
     */
    requirement = null;

    /**
     * Creates an affix.
     * @param {JQuery<HTMLElement>|null} [$input=null]
     * The jQuery HTML addition element the user input from.
     * @param {Object|null} [yaml=null] - The object from YAML.
     * @param {JQuery<HTMLElement>|null} [$html=null] - The jQuery HTML element.
     * @throws {ERRORS.AFFIX.NO_CONTEXT}
     * @throws {ERRORS.AFFIX.BAD_DATA}
     * @remarks
     * If created from {@link $input}, the affix's {@link affix#html|element} will also be
     * added to the HTML.
     */
    constructor($input = null, yaml = null, $html = null) {
        // Parse the affix from User Input, YAML, or HTML.
        if ($input !== null) {
            this.#from_user_addition($input);
        }
        else if (yaml !== null) {
            this.#from_yaml(yaml);
        }
        else if ($html !== null) {
            this.#from_html($html);
        }
        // Error if no context is provided.
        else {
            throw ERRORS.AFFIX.NO_CONTEXT;
        }

        // Error if any values are still null.
        if (
            this.name === null
            || this.comparison === null
            || this.value === null
            || this.requirement === null) {
            throw ERRORS.AFFIX.BAD_DATA;
        }

        // Add the affix to the HTML if made from user input.
        if ($input !== null) {
            // noinspection JSCheckFunctionSignatures
            $input.parent().find('.affixes').append(this.html());
        }
    }

    /**
     * Parses the affix from user input.
     * @param {JQuery<HTMLElement>} $new_selection_element
     * The HTML element the user input from.
     * @throws {ERRORS.AFFIX.NO_JQUERY}
     */
    #from_user_addition($new_selection_element) {
        if ($new_selection_element.length === 0) {
            throw ERRORS.AFFIX.NO_JQUERY;
        }

        let selected_affix = $new_selection_element
            .find('select')
            .children('option:selected')

        this.name = selected_affix.data('key');
        this.value = +selected_affix.data('value');
        this.comparison = COMPARISON_TYPES.LARGER; // default
        this.requirement = REQUIREMENT_TYPES.ONE_OF; // default
    }

    /**
     * Parses the affix from YAML.
     * @param {Object} object_from_yaml - The object from YAML.
     * @private
     */
    #from_yaml(object_from_yaml) {
    }

    /**
     * Parses the affix from HTML.
     * @param {JQuery<HTMLElement>} $html - The HTML element.
     * @throws {ERRORS.AFFIX.NO_JQUERY}
     * @private
     */
    #from_html($html) {
        if ($html.length === 0) {
            throw ERRORS.AFFIX.NO_JQUERY;
        }

        this.name = $html.data('key');
        // noinspection JSCheckFunctionSignatures
        this.value = +$html
            .find('[data-key="affix-value"]')
            .val();
        // noinspection JSCheckFunctionSignatures
        this.comparison = $html
            .find('[data-key="affix-comparison"]')
            .data('current')
        // noinspection JSCheckFunctionSignatures
        this.requirement = $html
            .find('[data-key="affix-pooling"]')
            .data('current');
    }

    /**
     * Toggles the comparison between larger and smaller.
     * @param {JQuery<HTMLElement>} $html - The HTML comparison button element.
     * @throws {ERRORS.AFFIX.BAD_KEYS}
     * @see COMPARISON_TYPES
     * @static
     */
    static toggle_comparison($html) {
        let current_comparison = $html.data('current');

        if (current_comparison === COMPARISON_TYPES.LARGER) {
            $html
                .html(SYMBOLS.COMPARISON.SMALLER)
                .attr('data-current', COMPARISON_TYPES.SMALLER)
                .data('current', COMPARISON_TYPES.SMALLER);
        }
        else {
            $html
                .html(SYMBOLS.COMPARISON.LARGER)
                .attr('data-current', COMPARISON_TYPES.LARGER)
                .data('current', COMPARISON_TYPES.LARGER);

            // We use else to catch any other options than what are expected, but
            // still want to report when it is an unexpected value
            if (current_comparison !== COMPARISON_TYPES.SMALLER) {
                throw ERRORS.AFFIX.BAD_KEYS;
            }
        }
    }

    /**
     * Toggles the requirement between not-required, required, and required greater.
     * @param {JQuery<HTMLElement>} $html - The HTML requirement button element.
     * @throws {ERRORS.AFFIX.BAD_KEYS}
     * @remarks A loop in the order of: one-of -> required -> greater
     * @see REQUIREMENT_TYPES
     * @static
     */
    static toggle_requirement($html) {
        let current_requirement = $html.data('current');

        // one-of -> required
        if (current_requirement === REQUIREMENT_TYPES.ONE_OF) {
            $html
                .html(SYMBOLS.REQUIREMENT.REQUIRED)
                .attr('data-current', REQUIREMENT_TYPES.REQUIRED)
                .data('current', REQUIREMENT_TYPES.REQUIRED)
                .attr('title', REQUIREMENT_EXPLANATIONS.REQUIRED);
        }
        // required -> greater
        else if (current_requirement === REQUIREMENT_TYPES.REQUIRED) {
            $html
                .html(SYMBOLS.REQUIREMENT.GREATER)
                .attr('data-current', REQUIREMENT_TYPES.GREATER)
                .data('current', REQUIREMENT_TYPES.GREATER)
                .attr('title', REQUIREMENT_EXPLANATIONS.GREATER);
        }
        // greater -> one-of
        else {
            $html
                .html(SYMBOLS.REQUIREMENT.ONE_OF)
                .attr('data-current', REQUIREMENT_TYPES.ONE_OF)
                .data('current', REQUIREMENT_TYPES.ONE_OF)
                .attr('title', REQUIREMENT_EXPLANATIONS.ONE_OF);

            // We use else to catch any other options than what are expected, but
            // still want to report when it is an unexpected value
            if (current_requirement !== REQUIREMENT_TYPES.GREATER) {
                throw ERRORS.AFFIX.BAD_KEYS;
            }
        }
    }

    /**
     * Removes the affix from the HTML.
     * @param {JQuery<HTMLElement>} $html - The HTML affix element.
     */
    static remove($html) {
        $html.remove();
    }

    /**
     * Converts the affix to HTML.
     * @returns {JQuery<HTMLElement>} The HTML representation of the affix.
     */
    html() {

    }

    /**
     * Converts the affix to YAML.
     * @returns {object} The YAML representation of the affix, ready for
     * js-yaml-write.
     */
    yaml() {
    }
}
