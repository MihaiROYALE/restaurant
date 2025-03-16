document.addEventListener('DOMContentLoaded', () => {
    /** Redirects to platform-specific maps when a map link is clicked */
    document.querySelectorAll('.map-link').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const appleMapsURL = "https://maps.apple.com/place?address=%20Place%20du%20Casino%0AMonte-Carlo%0A98000%20Monaco&coordinate=43.738968,7.427490&name=H%C3%B4tel%20de%20Paris&place-id=IC894920769998B68&map=h";
            const googleMapsURL = "https://maps.app.goo.gl/GDUWNtucNFStSLbs8";
            if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) {
                window.location.href = appleMapsURL;
            } else {
                window.location.href = googleMapsURL;
            }
        });
    });

    /** Toggles the sidebar navigation if elements exist */
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const sidebar = document.querySelector('.sidebar');

    if (hamburgerIcon && sidebar) { // Only proceed if both elements exist
        // Function to close sidebar
        const closeSidebar = () => {
            sidebar.style.width = '0';
            hamburgerIcon.textContent = '☰';
        };

        // Hamburger icon click handler
        hamburgerIcon.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevents the click from bubbling up to document
            if (sidebar.style.width === '250px') {
                closeSidebar();
            } else {
                sidebar.style.width = '250px';
                hamburgerIcon.textContent = '✖';
            }
        });

        // Close sidebar on scroll when it's open
        document.addEventListener('wheel', function(e) {
            if (sidebar.style.width === '250px') {
                closeSidebar();
            }
        });

        // Also handle touch scrolling for mobile
        document.addEventListener('touchmove', function(e) {
            if (sidebar.style.width === '250px') {
                closeSidebar();
            }
        });

        // Click outside to close
        document.addEventListener('click', function(e) {
            // Check if sidebar is open and click is outside sidebar and hamburger
            if (sidebar.style.width === '250px' && 
                !sidebar.contains(e.target) && 
                !hamburgerIcon.contains(e.target)) {
                closeSidebar();
            }
        });

        // Prevent clicks inside sidebar from closing it
        sidebar.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    /** Handles language changes and updates text content based on selected language */
    function changeLanguage() {
        const select = document.getElementById('language-select');
        const selectedLang = select.value;

        // Language mapping for initials
        const languageMap = {
            'en': 'EN',
            'fr': 'FR',
            'ru': 'RU',
            'ro': 'RO',
            'it': 'IT',
            'es': 'ES'
        };

        // Update the selected language display with the initial
        document.getElementById('selected-language').textContent = languageMap[selectedLang];

        // Update all elements with data attributes
        document.querySelectorAll(`[data-${selectedLang}]`).forEach(element => {
            const newText = element.getAttribute(`data-${selectedLang}`);
            if (newText) {
                element.textContent = newText;
            }
        });

        // Save the selected language
        localStorage.setItem('selectedLanguage', selectedLang);
    }

    /** Applies saved language on page load */
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    const select = document.getElementById('language-select');
    select.value = savedLanguage;
    changeLanguage(); // Initialize with saved or default language

    select.addEventListener('change', changeLanguage);
});
