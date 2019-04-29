(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher


  //    $.ajax({
  //      type: 'GET',
  //      url: serverUrl,
  //     //  cache: false,
  //     //  processData: false,
  //      success: (response) => {
  //       console.log(JSON.stringify(response))
  //      }
  //    });
  //  };
  const ajaxImageFeed = () => {
    $.get(serverUrl + '/background.jpg', (image) => {
      console.log("received response")
      // console.log(image);
      $('body').html(`<h1>A Synchronous Swim</h1>
      <div class="pool background">
        <div class="team">
          <div class="swimmer">↜</div>
          <div class="swimmer">↜</div>
          <div class="swimmer">↜</div>
          <div class="swimmer">↜</div>
        </div>
      </div>
      <h3>Background Image Upload</h3>
      <form>
        <input type="file" class="file" /><br>
        <input type="submit" />
      </form>`)
    })
  }

  ajaxImageFeed();

   const ajaxComandFeed = () => {
   $.get(serverUrl , (data) => {
     SwimTeam.move(data)
   })
   }

   $(document).ready((event) => {

     var recurser = function () {

        ajaxComandFeed()
        setTimeout(() => {
          recurser()
        }, 500);

     }
     recurser()

  });
  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
