// Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.onscroll = () => {
  sections.forEach((sec) => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove('active-link');
        document
          .querySelector('nav a[href*=' + id + ']')
          .classList.add('active-link');
      });
    }
  });
};

// Open Menu
const sideMenu = document.querySelector('#sidemenu');
function openmenu() {
  sideMenu.style.right = '0';
}
function closemenu() {
  sideMenu.style.right = '-200px';
}

// Close menu when a menu item is clicked
const menuLinks = document.querySelectorAll('#sidemenu a');
menuLinks.forEach((link) => {
  link.addEventListener('click', closemenu);
});

// Close menu when clicking outside of it
document.addEventListener('click', function (event) {
  const isClickInside =
    sideMenu.contains(event.target) || event.target.matches('.menu-icon');
  if (!isClickInside) {
    closemenu();
  }
});

// Tab Section
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

// Submit messages to Google sheet
const hideMessage = () => {
  setTimeout(() => {
    message.classList.remove('success', 'error', 'sending');
  }, 5000);
};

const scriptURL =
  'https://script.google.com/macros/s/AKfycbzCyKUCewBteYA3eLeuAxPbK6zw_SBmjwKNouBni5i8Y5V3prnZGpvS1RstSW8V1peA1Q/exec';
const form = document.forms['submit-to-google-sheet'];
const message = document.querySelector('.form-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  message.textContent = 'Your message in the process of sending ...';
  message.classList.add('sending');

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then((response) => {
      console.log('Success!', response);
      message.textContent = 'The message is sent successfully!';
      message.classList.add('success');
      hideMessage();
    })
    .catch((error) => {
      console.error('Error!', error.message);
      message.textContent = 'Error when sending a message!';
      message.classList.add('error');
    });
});
