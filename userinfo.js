let userName = sessionStorage.getItem("name");
let userAge = sessionStorage.getItem("age");
let userGender = sessionStorage.getItem("gender");

document.querySelector("span.name").textContent = userName;
    document.querySelector("span.age").textContent = userAge;
    document.querySelector("span.gender").textContent = userGender;
    document.querySelector("span.points").textContent = userPoints;
// Retrieve points score from sessionStorage
let userPoints = sessionStorage.getItem("points");

// Display points score if available
if (userPoints) {
    document.querySelector("span.points").innerHTML = user_points;
}