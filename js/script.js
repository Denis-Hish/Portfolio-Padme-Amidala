const tabLinks = document.querySelectorAll('.tab-links');
const tabContents = document.querySelectorAll('.tab-contents');

tabLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    tabContents.forEach((content) => {
      content.classList.remove('active-tab');
    });

    tabLinks.forEach((link) => {
      link.classList.remove('active-link');
    });

    const tabId = event.target.getAttribute('onclick').split("'")[1];

    const tabContent = document.getElementById(tabId);
    tabContent.classList.add('active-tab');

    link.classList.add('active-link');
  });
});
