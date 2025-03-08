document.addEventListener('DOMContentLoaded', () => {
    // Redirect to Apple Maps for iOS users
    document.querySelectorAll('.map-link').forEach(link => {
        link.addEventListener('click', function (event) {
            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                event.preventDefault();
                window.location = 'maps://?q=Place+du+Casino,+Monte-Carlo,+Monaco';
            }
        });
    });

    // Language selection functionality
    function changeLanguage() {
        const select = document.getElementById('language-select');
        const selectedLang = select.value;

        // Update displayed language text
        const selectedLanguageText = select.options[select.selectedIndex].text;
        document.getElementById('selected-language').textContent = selectedLanguageText;

        // Change language only for specific text elements, preserving child nodes
        document.querySelectorAll(`h1[data-${selectedLang}], h3[data-${selectedLang}], p[data-${selectedLang}]`).forEach(element => {
            element.textContent = element.getAttribute(`data-${selectedLang}`);
        });

        // Save selected language in localStorage
        localStorage.setItem('selectedLanguage', selectedLang);
    }

    // Apply saved language on page load
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    const select = document.getElementById('language-select');
    select.value = savedLanguage;
    changeLanguage();

    // Attach event listener for language change
    select.addEventListener('change', changeLanguage);
});
