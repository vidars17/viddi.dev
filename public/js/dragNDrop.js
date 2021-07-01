// Reference: https://stackoverflow.com/a/6756680
// Prevents the browser from opening dragged files on the local machine
// F.x. when a user drops a photo it would open in the tab as
// file://User/Home/DCIM/photos/photo_that_was_dragged_here.jpg
window.addEventListener("drop", function (e) {
    e = e || event;
    e.preventDefault();
  }, false);
  
  // Controls different messages for the handleDragLeave function
  var hasEntered = false;
  
  var targetElement = document.getElementById("container-body");
  
  // Shorthand function for changing the text and background color
  // in the upload panel
  function changeInfo(infotext) {
    let info = document.getElementById("upload-info");
    info.textContent = infotext;
  }
  
  function changeColor() {
    targetElement.style = "box-shadow: 0 0.5em 1em -0.125em #3179b0, 0 0px 0 1px #3179b0;";
  }
  
  function removeColor() {
    targetElement.style = "";
  }
  
  // Fires when a user drags files onto the panel body
  function handleDragEnter(e) {
    if (e.target == targetElement) {
      hasEntered = true;
    }
    e.preventDefault();
    e.stopPropagation();
    changeInfo("Now, drop the files here");
    changeColor();
  }
  
  // Fires when a user starts draggin his files over the browser window
  function handleDragStart(e) {
    e.preventDefault();
    e.stopPropagation();
    changeInfo("Drag files over here");
  }
  
  // Fires every few hundres milliseconds while a drag event is detected
  // over the panel body
  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    changeInfo("Now, drop the files here");
    changeColor();
  }
  
  // Fires when files are dropped onto the panel body
  function handleDrop(e) {
    let files = e.dataTransfer.files;
  
    // Look at upload.js
    // There is already a listener on the #upload-input element
    // We simply change the element from here and fire the upload event
  
    let uploadInput = document.getElementById("upload-input");
    uploadInput.files = files;
  
    //https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
    let event = new Event("change");
    uploadInput.dispatchEvent(event);
  
    changeInfo("Uploading...");
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    let message = "Come back with those files!";
    if (!hasEntered) {
      message = "Drop files here, please!";
    }
    changeInfo(message);
    removeColor();
  }
  
  // Reference used: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
  
  // The above functions are registered with the drag events onto the panel body
  targetElement.addEventListener("dragenter", handleDragEnter, false);
  targetElement.addEventListener("dragstart", handleDragStart, false);
  targetElement.addEventListener("dragover", handleDragOver, false);
  targetElement.addEventListener("drop", handleDrop, false);
  
  // Display a message when user leaves the correct drop target
  let body = document.getElementsByTagName("body")[0];
  
  body.addEventListener("dragenter", handleDragLeave, false);