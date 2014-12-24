// Saves options to chrome.storage
function save_options() {
  var whiteListValue = document.getElementById('whiteList').value;
  var redirectMapValue = document.getElementById('redirectMap').value;
  chrome.storage.sync.set({
    whiteList: whiteListValue,
    redirectMap: redirectMapValue
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    whiteList: "",
    redirectMap: ""
  }, function(items) {
    document.getElementById('whiteList').value = items.whiteList;
    document.getElementById('redirectMap').value = items.redirectMap;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);