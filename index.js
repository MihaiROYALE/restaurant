document.addEventListener('DOMContentLoaded', () => {
    /** Redirects to platform-specific maps when a map link is clicked */
    document.querySelectorAll('.map-link').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); /** Prevents default link behavior */

            const appleMapsURL = "https://maps.apple.com/place?address=%20Place%20du%20Casino%0AMonte-Carlo%0A98000%20Monaco&coordinate=43.738968,7.427490&name=H%C3%B4tel%20de%20Paris&place-id=IC894920769998B68&map=h";
            const googleMapsURL = "https://maps.app.goo.gl/GDUWNtucNFStSLbs8";

            if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) {
                window.location.href = appleMapsURL; /** Redirects Apple users to Apple Maps */
            } else {
                window.location.href = googleMapsURL; /** Redirects others to Google Maps */
            }
        });
    });

    /** Toggles the sidebar navigation if elements exist */
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    if (hamburgerIcon) { // Only proceed if .hamburger-icon exists
        hamburgerIcon.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) { // Only proceed if .sidebar exists
                if (sidebar.style.width === '250px') {
                    sidebar.style.width = '0';
                    hamburgerIcon.textContent = '☰';
                } else {
                    sidebar.style.width = '250px';
                    hamburgerIcon.textContent = '✖';
                }
            }
        });
    }

    /** Handles language changes and updates text content based on selected language */
    function changeLanguage() {
        const select = document.getElementById('language-select');
        const selectedLang = select.value;

        /** Updates displayed language text */
        const selectedLanguageText = select.options[select.selectedIndex].text;
        document.getElementById('selected-language').textContent = selectedLanguageText;

        /** Updates text for elements with data attributes */
        document.querySelectorAll(`[data-${selectedLang}]`).forEach(element => {
            const newText = element.getAttribute(`data-${selectedLang}`);
            if (newText) {
                element.textContent = newText;
            }
        });

        /** Saves selected language in localStorage */
        localStorage.setItem('selectedLanguage', selectedLang);
    }

    /** Applies saved language on page load */
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    const select = document.getElementById('language-select');
    select.value = savedLanguage;
    changeLanguage(); /** Applies the initial language translation */

    /** Attaches event listener for language change */
    select.addEventListener('change', changeLanguage);
});
