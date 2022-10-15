var addAttribute = function (element) {
  if (element.getAttribute('target') === '_blank') {
    return;
  }
  element.setAttribute('target', '_blank');
};

var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    for (var i = 0; i < mutation.addedNodes.length; i++) {
      var element = mutation.addedNodes[i];
      if (!('querySelectorAll' in element)) {
        // some added elements do not have this method
        continue;
      }

      var links = document.querySelectorAll('a');
      for (var i = 0; i < links.length; i++) {
        addAttribute(links[i]);
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var links = document.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    addAttribute(links[i]);
  }

  observer.observe(document, { childList: true, subtree: true });
});
