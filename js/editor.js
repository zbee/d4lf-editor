const new_filter = true;
const existing_filter = false;
let filter = {};

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
  $('#start').remove();
}