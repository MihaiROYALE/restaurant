document.addEventListener('DOMContentLoaded', () => {
    // Redirect to platform-specific maps
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

    // Language selection functionality
    function changeLanguage() {
        const select = document.getElementById('language-select');
        const selectedLang = select.value;

        // Update displayed language text
        const selectedLanguageText = select.options[select.selectedIndex].text;
        document.getElementById('selected-language').textContent = selectedLanguageText;

        // Update text for elements with data attributes, including h2
        document.querySelectorAll(`h1[data-${selectedLang}], h2[data-${selectedLang}], h3[data-${selectedLang}], p[data-${selectedLang}], div[data-${selectedLang}]`).forEach(element => {
            const newText = element.getAttribute(`data-${selectedLang}`);
            if (newText) {
                // Only update text nodes, preserving child elements
                const textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                if (textNode) {
                    textNode.textContent = newText;
                } else {
                    element.textContent = newText; // Fallback if no text node exists
                }
            }
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
