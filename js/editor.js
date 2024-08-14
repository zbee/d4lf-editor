// Selectors
let start = $('#start'); // Splash page
let editor = $('#editor'); // Editor page
let filter_template = $('#base-filter > div');
let blank_filter = $('#blank div');
let input = document.createElement('input');

// Constants
// For editor
const original_editor = editor.clone();
const editor_layout = [
    {slot: 'helm', filters: {},},
    {slot: 'main_hand', filters: {},},
    {},

    {slot: 'chest', filters: {},},
    {slot: 'off_hand', filters: {},},
    {slot: 'amulet', filters: {},},

    {slot: 'gloves', filters: {},},
    {},
    {slot: 'ring', filters: {},},

    {slot: 'pants', filters: {},},
    {slot: 'left_hand', filters: {},},
    {slot: 'other_ring', filters: {},},

    {slot: 'boots', filters: {},},
    {slot: 'right_hand', filters: {},},
];
const implicit_affixes = {
    'boots': [
        'evade_grants_movement_speed_for_second',
        'attacks_reduce_evades_cooldown_by_seconds',
        'maximum_evade_charges',
    ],
    // 'Inherent' in D4LF
    // https://d4builds.gg/database/gear-affixes/
}
const comparison = {
    'larger': '&#10095;',
    'smaller': '&#10094;',
};
const new_filter = true;
const existing_filter = false;
// For affixes
const affix_abbreviations = {
    'evade_grants_movement_speed_for_second': 'evade gives speed',
    'attacks_reduce_evades_cooldown_by_seconds': 'attacks reduce evade cd',
    'maximum_evade_charges': 'max evades',
    'cooldown_reduction': 'cdr',
    'resistance_to_all_elements': 'resist all',
}
const affix_dynamic_abbreviations = {
    'lucky_hit_': [
        ['lucky_hit', 'lucky hit'],
        ['critical_strikes_have', '(crit)'],
        ['_up_to_a_chance_to', ':'],
        ['for_seconds', ''],
    ],
    'chance_for_': [
        ['chance_for', 'cast:'],
        ['to_cast_twice', ''], // x2, but have to handle it with custom logic,
        ['a_second', ''], // x2, but have to handle it with custom logic
        ['when_cast', ''],
    ],
    'resource_generation_w': [
        ['resource_generation', 'extra gen:'],
    ],
    'critical_strike_chance_against_': [
        ['critical_strike_chance_against', 'crit vs:'],
    ],
};
// For the editor itself
const version = '0.0.0(season5)';
const supported_d4lf = 'v5.7.3';
const yaml_header_comment = ''
    + '# Generated by D4LF-editor version ' + version + '\n'
    + '# For D4LF version ' + supported_d4lf + '\n' + '\n';
// Writing the version numbers to the web page
$('.version').text(version);
$('.supported-d4lf').text(supported_d4lf);

// Working data
let editor_source = null;
let editor_data = editor_layout; // Editor working data
let filter = {}; // Loaded filter data
let file = null; // Uploaded file
let reader = new FileReader(); // File reader

////////////////////////////////////////////////////////////////////////////////////

// Editor data

// List of all affixes
$.getJSON(
    'https://raw.githubusercontent.com/aeon0/d4lf/main/assets/lang/enUS/affixes.json',
    function (data) {
        $.each(data, function (key, value) {
            $('.affix-list').append(
                '<option data-key="' + key + '" data-value="' + value + '">' +
                value +
                '</option>'
            );
        });
    }
);

// List of just weapons
$.getJSON(
    'https://raw.githubusercontent.com/aeon0/d4lf/main/assets/lang/enUS/item_types.json',
    function (data) {
        $.each(data, function (key, value) {
            let key_check = key.toLowerCase();
            if (
                key_check.includes('axe')
                || key_check.includes('bow')
                || key_check.includes('dagger')
                || key_check.includes('focus')
                || key_check.includes('mace')
                || key_check.includes('totem')
                || key_check.includes('polearm')
                || key_check.includes('scythe')
                || key_check.includes('shield')
                || key_check.includes('staff')
                || key_check.includes('sword')
                || key_check.includes('wand')
            ) {
                $('.item-list').append(
                    '<option data-key="' + key + '" data-value="' + value + '">' +
                    capitalize(value) +
                    '</option>'
                );
            }
        });
    }
);

// List of all uniques
$.getJSON(
    'https://raw.githubusercontent.com/aeon0/d4lf/main/assets/lang/enUS/uniques.json',
    function (data) {
        $.each(data, function (key, value) {
            // Filter out some of the dud values
            if (key.toString().includes('(')
                || key.toString().includes('[')
                || key.toString().includes('boost')
                || value['desc'].toLowerCase().includes('test item')
                || value['desc'].toLowerCase().includes('tbd')) {
                return;
            }

            $('.unique-list').append(
                '<option data-key="' + key + '" data-value="' + value['desc'] + '">' +
                capitalize(key) +
                '</option>'
            );
        });
    }
);

////////////////////////////////////////////////////////////////////////////////////

// Editor utilities

// https://stackoverflow.com/a/1026087/1843510
function capitalize(string) {
    string = string.replace(/_/g, ' ');
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// To get to the editor page, while loading data or just from scratch
function to_editor(filter_selection) {
    // Fail out
    if (filter_selection !== new_filter
        && filter_selection !== existing_filter) {
        return;
    }

    // Open a file dialog to choose a filter
    if (filter_selection === existing_filter) {
        // The .yaml file dialog
        input.type = 'file';
        input.accept = '.yaml';
        input.click();
        // Triggers input.onchange below, then reader.onload
    } else {
        editor_source = new_filter;
        show_editor();
    }
}

// Load the given filter file
input.onchange = e => {
    file = e.target.files[0];
    reader.readAsText(file, 'UTF-8');
}

// Parse the given filter
reader.onload = readerEvent => {
    let content = readerEvent.target.result;
    try {
        // Load the filter
        // noinspection JSCheckFunctionSignatures
        filter = jsyaml.load(content);
        console.debug(filter);

        // Save the filter
        editor_data = editor_layout;
        editor_source = existing_filter;
        // Show the editor
        show_editor();
    } catch (e) {
        console.debug(content);
        console.debug(filter);
        console.error(e);
    }
}

// Actually build and show the editor page
function show_editor() {
    // Clear the page
    start.hide();

    // Show the editor
    $('body').css('maxWidth', '70em');
    editor.show();
    // Build the editor
    build_editor();
}

// Build the editor HTML from template code (#base-filter)
function build_editor() {
    editor.html(original_editor.html());

    // Iterate over equipment slots
    editor_data.forEach(function (layout_item) {
        // Fill blank slots
        if (jQuery.isEmptyObject(layout_item)) {
            (blank_filter.clone()).insertBefore('#controls');
            return;
        }

        // Build the editor slots
        // Copy the template
        let new_filter = filter_template.clone();
        // Fill the ID into the template
        new_filter.attr('id', layout_item.slot);
        new_filter.find('u').text(capitalize(layout_item.slot));

        // Show Item-Type selector for weapons
        if (layout_item.slot.includes('hand')) {
            new_filter.find('.select-item-type').show();
        }

        // Place the editor slot
        new_filter.insertBefore('#controls');
    })
}

// Return to the home page
function to_home() {
    filter = {};
    editor.html(original_editor.html());

    start.show();
    editor.hide();
    $('body').css('maxWidth', '38em');
}

// Check if affix is one that is dynamically abbreviated, and abbreviate it if so
function abbreviate_affix(affix_key) {
    // Abbreviate the affix if the key is in the list or if it's too long
    if (affix_abbreviations.hasOwnProperty(affix_key)) {
        return affix_abbreviations[affix_key];
    }

    // If key starts with a dynamic abbreviation, replace each segment of it
    for (const [abbreviation, replacements]
        of Object.entries(affix_dynamic_abbreviations)) {
        if (affix_key.startsWith(abbreviation)) {
            for (const [segment, replacement] of replacements) {
                affix_key = affix_key.replace(segment, replacement);
            }
        }
    }

    // Replace underscores with spaces
    affix_key = affix_key.replace(/_/g, ' ');

    // Abbreviate the affix if it's too long
    if (affix_key.length > 38) {
        affix_key = affix_key.substring(0, 35) + '...';
    }

    return affix_key;
}

// Build list of affixes in the element
function build_affixes(element) {
    let affixes = element.find('.affixes').children();
    let affix_list = [];

    // Iterate over the affixes
    affixes.each(function () {
        let affix = $(this).find('p').data('key');
        affix_list.push(affix);
    });

    return affix_list;
}

////////////////////////////////////////////////////////////////////////////////////

// Editor Use

// Alternate the comparison operator for an aspect or affix
function change_comparison(element) {
    let current_comparison = element.data('current');
    if (current_comparison === 'larger') {
        element.data('current', 'smaller');
        element.html(comparison['smaller']);
    } else {
        element.data('current', 'larger');
        element.html(comparison['larger']);
    }
}

// Show both Item-Type and Unique selectors without values, with values: only
// show one or the other
function toggle_unique_or_item(element) {
    let value = element.children('option:selected').val();

    // Show both
    if (value === '') {
        $('.select-item-type').fadeIn("slow");
        $('.unique-selection').fadeIn("slow");
    }
    // Hide the other
    else {
        let parent_class = element.parent().attr('class');

        if (parent_class === 'select-item-type') {
            element.parent().parent().find('.unique-selection').hide();
        } else {
            element.parent().parent().find('.select-item-type').hide();
        }
    }
}

// Show the Unique sub-option to control the Unique's aspect only when a Unique
// is selected
function toggle_unique_aspect(element) {
    let value = element.children('option:selected').val();

    // Show the Unique sub-option for the Unique aspect
    if (value === '') {
        element.parent().parent().find('.unique-roll').hide();
    }
    // Hide the Unique sub-option
    else {
        element.parent().parent().find('.unique-roll').fadeIn("slow");
    }
}

// Add an affix to the affix list
function add_affix(element) {
    // Get the affix key and value
    let affix = element.find('select').children('option:selected');
    let affix_key = affix.data('key');
    let affix_value = affix.data('value');

    // Bail if affix already in list
    let current_affixes = build_affixes(element.parent());
    if (current_affixes.includes(affix_key)) {
        return;
    }

    // Bail if no value
    if (affix_value === '') {
        return;
    }

    // Add the affix to .affixes, based off of #base-affix
    let new_affix = $('#base-affix').clone();
    new_affix.show();
    new_affix.fadeOut(0);
    let affix_text = new_affix.find('p');
    affix_text.data('key', affix_key);
    affix_text.text(affix_value);

    // Abbreviate the affix if it's too long, or if it's on the list with shorter names
    let abbr = abbreviate_affix(affix_key);
    if (abbr !== affix_key) {
        affix_text.html('<abbr title="' + affix_value + '">' + abbr + '</abbr>');
    }

    // Add the affix to the affix list
    element.parent().find('.affixes').append(new_affix);
    new_affix.fadeIn("slow");
}
