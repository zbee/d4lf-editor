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
// Loaded filter data
let filter = {};
// Saved selectors
let start = $('#start');
let editor = $('#editor');
let filters = $('#filters');
let base_filter_html = $('#base-filter > div');
let blank = $('#blank div');
// Editor available elements
let editor_data = editor_layout;

////////////////////////////////////////////////////////////////////////////////////

$.getJSON('https://raw.githubusercontent.com/aeon0/d4lf/main/assets/lang/enUS/affixes.json', function (data) {
  var items = [];
  $.each(data, function (key, value) {
    console.log(key, value)
    $('.affix-list').append(
      '<option data-key="' + key + '" data-value="' + value + '">' + value + '</option>'
    );
  });
});

////////////////////////////////////////////////////////////////////////////////////

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
      }
    }
  }

  // Clear the page
  start.hide();
  editor.show();
  $('body').css('maxWidth', '70em');
  build_editor();
}

// Build the editor HTML from template code (#base-filter)
function build_editor() {
  editor_data = editor_layout;

  // Iterate over equipment slots
  editor_data.forEach(function (layout_item) {
    // Fill blank slots
    if (jQuery.isEmptyObject(layout_item)) {
      (blank.clone()).insertBefore('#controls');
      return;
    }

    // Build the editor slots
    let id = layout_item.slot;

    // Copy the placeholder
    let new_filter = base_filter_html.clone();
    // Fill the ID
    new_filter.attr('id', id);
    new_filter.find('u').text(capitalize(layout_item.slot));

    // Place the editor slot
    new_filter.insertBefore('#controls');
  })
}

// Return to the home page
function to_home() {
  filter = {};
  editor = original_editor;

  start.show();
  editor.hide();
  $('body').css('maxWidth', '38em');
}