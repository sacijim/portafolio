document.addEventListener('DOMContentLoaded', () => {
	if (window.lucide) window.lucide.createIcons();

	const menuButton = document.querySelector('.menu-toggle');
	const header = document.querySelector('.topbar');
	const navigationLinks = document.querySelectorAll('.desktop-nav a');

	menuButton.addEventListener('click', () => {
		const isOpen = header.classList.toggle('menu-open');
		menuButton.setAttribute('aria-expanded', String(isOpen));
		menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
	});

	navigationLinks.forEach((link) => {
		link.addEventListener('click', () => {
			header.classList.remove('menu-open');
			menuButton.setAttribute('aria-expanded', 'false');
			menuButton.setAttribute('aria-label', 'Abrir menú');
		});
	});

	const sections = document.querySelectorAll('main section[id]');
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			navigationLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
		});
	}, { rootMargin: '-35% 0px -55% 0px' });
	sections.forEach((section) => observer.observe(section));
});
