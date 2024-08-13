// Selectors
let start = $('#start'); // Splash page
let editor = $('#editor'); // Editor page
let filters = $('#filters'); // Filter container
let filter_template = $('#base-filter > div');
let blank_filter = $('#blank div');
let input = document.createElement('input');

// Constants
const new_filter = true;
const existing_filter = false;
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
const original_editor = editor.clone();
let base_filter_html = $('#base-filter > div');
let blank = $('#blank div');
// Editor available elements
let editor_data = editor_layout;

////////////////////////////////////////////////////////////////////////////////////

// Editor data

// List of all affixes
$.getJSON('https://raw.githubusercontent.com/aeon0/d4lf/main/assets/lang/enUS/affixes.json', function (data) {
  var items = [];
  $.each(data, function (key, value) {
    $('.affix-list').append(
      '<option data-key="' + key + '" data-value="' + value + '">' + value + '</option>'
    );
  });
});

// List of just weapons
$.getJSON('https://raw.githubusercontent.com/aeon0/d4lf/main/assets/lang/enUS/item_types.json', function (data) {
  var items = [];
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
    )
      $('.item-list').append(
        '<option data-key="' + key + '" data-value="' + value + '">' + capitalize(value) + '</option>'
      );
  });
});

////////////////////////////////////////////////////////////////////////////////////

// Editor core

// https://stackoverflow.com/a/1026087/1843510
function capitalize(string) {
  string = string.replace(/_/g, ' ');
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// To get to the editor page, while loading data or just from scratch
function to_editor(filter_selection) {
  // Fail out
  if (filter_selection !== new_filter && filter_selection !== existing_filter)
    return;

  // Open a file dialog to choose a filter
  if (filter_selection === existing_filter) {
    // The .yaml file dialog
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.yaml';
    input.click();

    // Read the filter
    input.onchange = e => {
      // Load the given filter
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file, 'UTF-8');

      // Parse the given filter
      reader.onload = readerEvent => {
        let content = readerEvent.target.result;
        filter = jsyaml.load(content);
        show_editor();
      }
    }
  } else {
    show_editor();
  }
}

// Actually build and show the editor page
function show_editor() {
  // Clear the page
  start.hide();

  editor.show();
  $('body').css('maxWidth', '70em');
  build_editor();
}

// Build the editor HTML from template code (#base-filter)
function build_editor() {
  editor_data = editor_layout;
  editor.html(original_editor.html());

  // Iterate over equipment slots
  editor_data.forEach(function (layout_item) {
    // Fill blank slots
    if (jQuery.isEmptyObject(layout_item)) {
      (blank.clone()).insertBefore('#controls');
      return;
    }

    // Build the editor slots
    // Copy the placeholder
    let new_filter = base_filter_html.clone();
    // Fill the ID
    new_filter.attr('id', layout_item.slot);
    new_filter.find('u').text(capitalize(layout_item.slot));

    // Show selector for weapons
    if (layout_item.slot.includes('hand'))
      new_filter.find('.select-item-type').show();

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

////////////////////////////////////////////////////////////////////////////////////

// Editor Use