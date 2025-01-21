/**
 * Represents an individual affix.
 * @class
 */
class affix {
    /**
     * The real name of the affix.
     * @type {string|null}
     */
    key = null;

    /**
     * The human-readable name of the affix.
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
     * If created from {@link yaml}, {@link affix#requirement} must be set.<br/>
     * If created from {@link $input}, the affix's {@link affix#html|element} will also be
     * added to the HTML.
     * @constructor
     */
    constructor(
        $input = null,
        yaml = null,
        $html = null
    ) {
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
            this.key === null
            || this.name === null
            || this.comparison === null
            || this.value === null
            || this.requirement === null) {
            throw ERRORS.AFFIX.BAD_DATA;
        }

        // Add the affix to the HTML if made from user input.
        if ($input !== null && !affix.already_exists($input, this.key)) {
            let new_element = this.html();
            // noinspection JSCheckFunctionSignatures
            $input.parent().find('.affixes').append(new_element);
            new_element.fadeIn('slow');
        }
    }

    /**
     * Parses the affix from user input.
     * @param {JQuery<HTMLElement>} $new_selection_element
     * The HTML element the user input from.
     * @throws {ERRORS.AFFIX.NO_JQUERY}
     * @private
     */
    #from_user_addition($new_selection_element) {
        if ($new_selection_element.length === 0) {
            throw ERRORS.AFFIX.NO_JQUERY;
        }

        let selected_affix = $new_selection_element
            .find('select')
            .children('option:selected')

        this.key = selected_affix.data('key');
        this.name = selected_affix.data('value');

        this.#fill_defaults()
    }

    /**
     * Parses the affix from YAML.
     * @param {Object|Array|String} object_from_yaml - The object from YAML.
     * @throws {ERRORS.AFFIX.BAD_DATA}
     * @remarks Requires {@link affix#requirement} to be set.
     * @private
     */
    #from_yaml(object_from_yaml) {
        if (typeof affix === 'object') {
            if (!object_from_yaml.hasOwnProperty('name')) {
                throw ERRORS.AFFIX.BAD_DATA;
            }

            this.key = object_from_yaml['name'];
            if (object_from_yaml.hasOwnProperty('value')) {
                this.value = object_from_yaml['value'];
            }
            if (object_from_yaml.hasOwnProperty('comparison')) {
                this.comparison = object_from_yaml['comparison'];
            }
        }
        if (Array.isArray(affix)) {
            if (object_from_yaml.length === 0) {
                throw ERRORS.AFFIX.BAD_DATA;
            }

            this.key = object_from_yaml[0];
            if (object_from_yaml.length > 1) {
                this.value = object_from_yaml[1];
            }
            if (object_from_yaml.length > 2) {
                this.comparison = object_from_yaml[2];
            }
        }
        if (typeof affix === 'string') {
            if (object_from_yaml === '') {
                throw ERRORS.AFFIX.BAD_DATA;
            }

            this.key = object_from_yaml;
        }

        // Check that the key is valid
        if (!AFFIXES_DATA.hasOwnProperty(this.key)) {
            this.key = null;
            throw ERRORS.AFFIX.BAD_DATA;
        }

        this.#fill_defaults()
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

        this.key = $html.data('key');
        this.name = $html.find('p').text();
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
     * Fills in default values for affix attributes.
     * @private
     */
    #fill_defaults() {
        if (this.name === null) {
            this.name = AFFIXES_DATA[this.key];
        }
        if (this.value === null) {
            this.value = 0;
        }
        if (this.comparison === null) {
            this.comparison = COMPARISON_TYPES.LARGER;
        }
        if (this.requirement === null) {
            this.requirement = REQUIREMENT_TYPES.ONE_OF;
        }
    }

    /**
     * Checks if the affix the user is trying to add already exists.
     * @param {JQuery<HTMLElement>} $html
     * The jQuery HTML addition element the user input from.
     * @param {string} key The real name of the affix to check for.
     * @returns {boolean} If the affix already exists.
     */
    static already_exists($html, key) {
        return (new affixes(null, $html)).has_affix(key);
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
     * @param {string|null} [specific_requirement=null]
     * The specific requirement to switch to.
     * @throws {ERRORS.AFFIX.BAD_KEYS}
     * @remarks A loop in the order of: one-of -> required -> greater
     * @see REQUIREMENT_TYPES
     * @static
     */
    static toggle_requirement($html, specific_requirement = null) {
        let current_requirement = $html.data('current');

        let bad_keys = false;
        if (current_requirement !== REQUIREMENT_TYPES.ONE_OF
            && current_requirement !== REQUIREMENT_TYPES.REQUIRED
            && current_requirement !== REQUIREMENT_TYPES.GREATER) {
            bad_keys = true;
        }

        // one-of -> required
        if (current_requirement === REQUIREMENT_TYPES.ONE_OF
            || specific_requirement === REQUIREMENT_TYPES.REQUIRED) {
            $html
                .html(SYMBOLS.REQUIREMENT.REQUIRED)
                .attr('data-current', REQUIREMENT_TYPES.REQUIRED)
                .data('current', REQUIREMENT_TYPES.REQUIRED)
                .attr('title', REQUIREMENT_EXPLANATIONS.REQUIRED);
        }
        // required -> greater
        else if (current_requirement === REQUIREMENT_TYPES.REQUIRED
            || specific_requirement === REQUIREMENT_TYPES.GREATER) {
            $html
                .html(SYMBOLS.REQUIREMENT.GREATER)
                .attr('data-current', REQUIREMENT_TYPES.GREATER)
                .data('current', REQUIREMENT_TYPES.GREATER)
                .attr('title', REQUIREMENT_EXPLANATIONS.GREATER);
        }
        // greater -> one-of (and catch-all)
        else if (current_requirement === REQUIREMENT_TYPES.GREATER
            || specific_requirement === REQUIREMENT_TYPES.ONE_OF
            || bad_keys) {
            $html
                .html(SYMBOLS.REQUIREMENT.ONE_OF)
                .attr('data-current', REQUIREMENT_TYPES.ONE_OF)
                .data('current', REQUIREMENT_TYPES.ONE_OF)
                .attr('title', REQUIREMENT_EXPLANATIONS.ONE_OF);
        }

        if (bad_keys) {
            throw ERRORS.AFFIX.BAD_KEYS;
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
     * @remarks
     * {@link JQuery#fadeIn|fadeIn("slow")} should be used if page already drawn.
     */
    html() {
        let new_affix_element = affix_template.clone();

        // Clean up the template
        new_affix_element
            .removeAttr('id')
            .show().fadeOut(0); // Set it be hidden "correctly"

        // Set the key and name
        // noinspection JSCheckFunctionSignatures
        new_affix_element
            .data('key', this.key)
            .attr('data-key', this.key)
            .find('[data-key="affix-key"]');
        new_affix_element.find('p').text(this.name);

        // Set the comparison if not default
        if (this.comparison !== COMPARISON_TYPES.LARGER) {
            // noinspection JSCheckFunctionSignatures
            affix.toggle_comparison(
                new_affix_element.find('[data-key="affix-comparison"]')
            );
        }

        // Set the requirement if not default
        if (this.requirement === REQUIREMENT_TYPES.ONE_OF) {
            // noinspection JSCheckFunctionSignatures
            affix.toggle_requirement(
                new_affix_element.find('[data-key="affix-pooling"]'),
                this.requirement
            );
        }

        return new_affix_element;
    }

    /**
     * Converts the affix to YAML.
     * @returns {object} The YAML representation of the affix, ready for
     * js-yaml-write.
     */
    yaml() {
        return {
            name: this.key,
            value: this.value,
            comparison: this.comparison,
        };
    }
}
