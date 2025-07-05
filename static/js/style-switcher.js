document.addEventListener('DOMContentLoaded', function() {
    // Style switcher toggle
    const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
    const styleSwitcher = document.querySelector(".style-switcher");
    const dayNight = document.querySelector(".day-night");
    const alternateStyles = document.querySelectorAll(".alternate-style");

    // Toggle switcher visibility
   
    // Hide on scroll
    window.addEventListener("scroll", () => {
        if (styleSwitcher?.classList.contains("open")) {
            styleSwitcher.classList.remove("open");
        }
    });

    // Color switching function
    function setActiveStyle(color) {
        alternateStyles.forEach((style) => {
            if (color === style.getAttribute("title")) {
                style.removeAttribute("disabled");
                localStorage.setItem('color-theme', color); // Save color preference
            } else {
                style.setAttribute("disabled", "true");
            }
        });
    }

    // Color switcher event listeners
    document.querySelectorAll(".colors span").forEach(span => {
        span.addEventListener("click", function() {
            const colorClass = Array.from(this.classList).find(cls => cls.startsWith('color-'));
            if (colorClass) {
                setActiveStyle(colorClass);
            }
        });
    });

    // Day/Night mode toggle
    if (dayNight) {
        dayNight.addEventListener("click", () => {
            const icon = dayNight.querySelector("i");
            icon?.classList.toggle("fa-sun");
            icon?.classList.toggle("fa-moon");
            document.body.classList.toggle("dark");
            localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        });
    }

    // Load saved preferences
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        const icon = document.querySelector('.day-night i');
        if (icon) {
            icon.classList.add('fa-sun');
            icon.classList.remove('fa-moon');
        }
    }

    const savedColor = localStorage.getItem('color-theme');
    if (savedColor) {
        setActiveStyle(savedColor);
    }
});