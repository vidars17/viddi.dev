$(".upload-btn").on("click", function (){
    $("#upload-input").click();
    $(".progress-bar").text("0%");
    $(".progress-bar").attr("value", 0);
  });
  
  $("#upload-input").on("change", function(){
  
    var files = $(this).get(0).files;
    var filetype = $("input:radio[name=filetype]:checked").val();
    console.log(filetype);
  
    if (files.length > 0){
      // create a FormData object which will be sent as the data payload in the
      // AJAX request
      var formData = new FormData();
  
      // loop through all the selected files and add them to the formData object
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
  
        // add the files to formData object for the data payload
        formData.append("uploads[]", file, file.name);
      }
  
      $.ajax({
        url: "/convert/" + filetype,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(){
          window.location.reload();
        },
        xhr: function() {
          // create an XMLHttpRequest
          var xhr = new XMLHttpRequest();
  
          // listen to the 'progress' event
          xhr.upload.addEventListener("progress", function(evt) {
  
            if (evt.lengthComputable) {
              // calculate the percentage of upload completed
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);
  
              // update the Bootstrap progress bar with the new percentage
              $(".progress-bar").text(percentComplete + "%");
              $(".progress-bar").attr("value", percentComplete);
  
              // once the upload reaches 100%, set the progress bar text to done
              if (percentComplete === 100) {
                $("#upload-info").text("Upload complete...");
              }
            }
          }, false);
  
          return xhr;
        }
      });
  
    }
  });