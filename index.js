function changeLanguage() {
    const select = document.getElementById('language-select');
    const selectedLang = select.value;

    // Update the displayed language in the span
    const selectedLanguageText = select.options[select.selectedIndex].text;
    document.getElementById('selected-language').textContent = selectedLanguageText;

    // Change language for all elements with data-* attributes
    document.querySelectorAll('[data-' + selectedLang + ']').forEach((element) => {
        const text = element.getAttribute('data-' + selectedLang);
        element.textContent = text;
    });

    // Save the selected language in localStorage to persist it across page reloads
    localStorage.setItem('selectedLanguage', selectedLang);
}

// Apply saved language if available
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    const select = document.getElementById('language-select');
    select.value = savedLanguage;
    changeLanguage();  // Apply saved language on page load
});