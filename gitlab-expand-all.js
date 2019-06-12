// ==UserScript==
// @name     Gitlab: Merge Requests: Expand All whenever a button is available
// @version  1
// @match https://path.to.your.gitlab.com/*/*/merge_requests/*/diffs*
// CHANGE ME ^
// ==/UserScript==


(function () {
  
  // Handy cross-browser clicking function
  ef = (el, etype, val) => {
    if (el) {

      if (el.fireEvent) {
        el.fireEvent('on' + etype);
      } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    }
  }
  
  // Poll for button visibility and action
  function pollForButton() {
    var xpath = "//*[contains(text(),'Expand all')]";
    var expandButton = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  
    if (!expandButton) {
      setTimeout(pollForButton, 500);
    } else {
      ef(expandButton, 'click');
    }
  }
  
  // Start polling
  pollForButton();
})();
