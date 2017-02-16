(function() {
  
  function init() {
    const sendButton = document.getElementById("send");
    const pageSelector = document.getElementById("page");
    const typeSelector = document.getElementById("type");
    const contentSection = document.getElementById('content');
    
    
    
    sendButton.onclick = function() {
      const pageValue = pageSelector.value;
      const typeValue = typeSelector.value;
      
      const request = new XMLHttpRequest();
      
      request.onload = function() {
        contentSection.innerHTML = request.response;
      };
      
      request.open('GET', pageValue, true);
      request.setRequestHeader("Accept", typeValue);
      
      request.send();
    };
  }
  
  window.onload = init;
}());