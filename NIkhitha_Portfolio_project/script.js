$(document).ready(function () {
    $("a.nav-link").click(function (e) {
        e.preventDefault();
        let target = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(target).offset().top - 60
        }, 600);
    });

    $("#contactForm").submit(function (e) {
        e.preventDefault();
        let name = $("#name").val().trim();
        let email = $("#email").val().trim();
        let message = $("#message").val().trim();

        if (!name || !email || !message) {
            alert("Please fill out all fields.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email.");
            return;
        }
        alert("Message sent successfully!");
        $(this)[0].reset();
    });
});
