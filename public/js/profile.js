$(document).ready(function() {
    executeOnLoadTasks();
});

function executeOnLoadTasks() { 

    $('.logout-button').click(function() {
        window.location.href = '/logout';
        return false;
    });



}