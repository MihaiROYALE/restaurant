document.addEventListener('DOMContentLoaded', () => {
    // Redirect to platform-specific maps
    document.querySelectorAll('.map-link').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default navigation

            const appleMapsURL = "https://maps.apple.com/place?address=%20Place%20du%20Casino%0AMonte-Carlo%0A98000%20Monaco&coordinate=43.738968,7.427490&name=H%C3%B4tel%20de%20Paris&place-id=IC894920769998B68&map=h";
            const googleMapsURL = "https://maps.app.goo.gl/GDUWNtucNFStSLbs8";

            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                window.location.href = appleMapsURL; // iOS: Open Apple Maps
            } else {
                window.location.href = googleMapsURL; // Android/Other: Open Google Maps
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
