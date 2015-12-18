$(document).ready(function() {
    executeOnLoadTasks();
});

function executeOnLoadTasks() { 

    $('.logout-button').click(function() {
    	var ev = {
    		eventCategory: 'profile',
    		eventAction: 'logout',
    		eventLabel: ''
    	};

    	analytics.send('event', ev);
        window.location.href = '/logout';
        return false;
    });



}