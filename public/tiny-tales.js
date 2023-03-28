const radioButtons = document.querySelectorAll('.story-type input[type="radio"]');

radioButtons.forEach(function (element) {
    element.addEventListener("change", function (event) {
        var item = event.target.value;

        var story_dropdowns = document.querySelectorAll('.story-dropdown');

        story_dropdowns.forEach(function (element) {
            element.classList.remove('active');
        });

        var selected_dropdown = document.querySelectorAll('#' + item);

        selected_dropdown.forEach(function (element) {
            element.classList.add('active');
        });

        
    });
});
