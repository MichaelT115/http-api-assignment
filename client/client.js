(() => {
  const init = () => {
    // Gets elements on the page.
    const sendButton = document.getElementById('send');
    const pageSelector = document.getElementById('page');
    const typeSelector = document.getElementById('type');
    const contentSection = document.getElementById('content');

    // When the button is clicked, we create the request.
    sendButton.onclick = () => {
      const pageValue = pageSelector.value; // The name of the page.
      const typeValue = typeSelector.value; // The Accepted filetype for the request.

      // Create the request.
      const request = new XMLHttpRequest();

      // When the request is loaded, we set new content in the content section.
      request.onload = () => {
        let id;       // Given ID
        let message;  // Given message

        // Sets variables differently depending on the content type.
        if (request.getResponseHeader('Content-Type') === 'text/xml') {
          const xml = request.responseXML;
          id = xml.querySelector('id') ? xml.querySelector('id').firstChild.nodeValue : 'Success';
          message = xml.querySelector('message').firstChild.nodeValue;
        } else {
          const json = JSON.parse(request.responseText);
          id = json.id || 'Success';
          message = json.message;
        }

        // Put html on page.
        let html = '';
        html += `<h2>${id}</h2>`;
        html += `<p>${message}</p>`;
        contentSection.innerHTML = html;
      };

      // Open the request
      request.open('GET', pageValue, true);
      request.setRequestHeader('Accept', typeValue);  // Set the "Accept" header. This tells the server the filetype we want.

      // Send the request
      request.send();
    };
  };

  window.onload = init;
})(window);
