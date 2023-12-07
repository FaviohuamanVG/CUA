function toggleMenu() {
    const navMenu = document.querySelector('.nav__link--menu');
    navMenu.style.display = (navMenu.style.display === 'none' || navMenu.style.display === '') ? 'block' : 'none';
  }