/**
 * Represents all the {@link affix|affixes} for an {@link filter_part}.
 * @class
 */
class affixes {
    /**
     * List of required greater affixes.
     * @type {Array<affix>}
     * @private
     */
    #required_greater_affixes = [];

    /**
     * List of required affixes.
     * @type {Array<affix>}
     * @private
     */
    #required_affixes = [];

    /**
     * List of optional affixes.
     * @type {Array<affix>}
     * @private
     */
    #optional_affixes = [];

    /**
     * List of implicit affixes.
     * @type {Array<affix>}
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
     * @throws ERRORS.AFFIXES.NO_JQUERY If the jQuery selector has no matching element.
     * @throws ERRORS.AFFIXES.DUPLICATE_KEYS If duplicate affix keys are found.
     * @private
     */
    #from_html($html) {
        if ($html.length === 0) {
            throw ERRORS.AFFIXES.NO_JQUERY;
        }

        // noinspection JSCheckFunctionSignatures
        this.greaters_required = parseInt($html
            .find('[data-key="minGreaterAffixCount"]')
            .find('input')
            .val(), 10);
        // noinspection JSCheckFunctionSignatures
        this.total_required = parseInt($html
            .find('[data-key="minCount"]')
            .find('input')
            .val(), 10);

        // noinspection JSCheckFunctionSignatures
        $html = $html.find('.affixes');

        // Build and place all affixes.
        $html.find('code').each((index, element) => {
            let this_affix = new affix(null, element);
            if (this_affix.is_implicit) {
                this.#implicit_affixes.push(this_affix);
                return;
            }
            switch (this_affix.requirement) {
                case REQUIREMENT_TYPES.REQUIRED:
                    this.#required_affixes.push(this_affix);
                    break;
                case REQUIREMENT_TYPES.GREATER:
                    this.#required_greater_affixes.push(this_affix);
                    break;
                case REQUIREMENT_TYPES.ONE_OF:
                default:
                    this.#optional_affixes.push(this_affix);
                    break;
            }
        });

        // Check for duplicates
        this.#check_for_duplicates();

        // Sanity-check total_required
        if (this.total_required > this.#optional_affixes.length) {
            this.total_required = this.#optional_affixes.length;
        }
        // Sanity-check greaters_required
        if (this.greaters_required > this.#required_greater_affixes.length) {
            this.greaters_required = this.#required_greater_affixes.length;
        }
    }

    /**
     * Checks for duplicate affix keys.
     * @throws ERRORS.AFFIXES.DUPLICATE_KEYS If duplicate affix keys are found.
     * @private
     */
    #check_for_duplicates() {
        const all_affixes = [
            ...this.#required_affixes,
            ...this.#required_greater_affixes,
            ...this.#optional_affixes,
            ...this.#implicit_affixes
        ];
        const seen_keys = new Set();
        for (const affix of all_affixes) {
            if (seen_keys.has(affix.key)) {
                throw ERRORS.AFFIXES.DUPLICATE_KEYS;
            }
            seen_keys.add(affix.key);
        }
    }

    /**
     * Checks if an affix is present in the list of affixes.
     * @param affix the affix.key to check for.
     * @returns {boolean} True if the affix is present.
     * @throws ERRORS.AFFIXES.DUPLICATE_KEYS If duplicate affix keys are found.
     */
    has_affix(affix) {
        // Check for duplicates
        this.#check_for_duplicates();

        return this.#required_affixes.some(a => a.key === affix)
            || this.#required_greater_affixes.some(a => a.key === affix)
            || this.#optional_affixes.some(a => a.key === affix)
            || this.#implicit_affixes.some(a => a.key === affix);
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
