const addAttribute = function (element) {
  if (element.getAttribute('target') === '_blank') {
    return;
  }
  element.setAttribute('target', '_blank');
};
const findElements = () => {
  const dashboardLinks = document.querySelectorAll('#dashboard a');
  for (let i = 0; i < dashboardLinks.length; i++) {
    addAttribute(dashboardLinks[i]);
  }
  const codeLinks = document.querySelectorAll('.codesearch-results a');
  for (let i = 0; i < codeLinks.length; i++) {
    addAttribute(codeLinks[i]);
  }
  const tagLinks = document.querySelectorAll('.topic-tag-link');
  for (let i = 0; i < tagLinks.length; i++) {
    addAttribute(tagLinks[i]);
  }
};
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    for (let i = 0; i < mutation.addedNodes.length; i++) {
      let element = mutation.addedNodes[i];
      if (!('querySelectorAll' in element)) {
        // some added elements do not have this method
        continue;
      }

      findElements();
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  findElements();

  observer.observe(document, { childList: true, subtree: true });
});
