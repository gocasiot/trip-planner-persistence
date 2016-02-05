var ajaxDaysModule = (function(){
	
	var $dayButtons, $dayTitle, $addButton, $removeDay, $button;
  	$(function(){
    $dayButtons = $('.day-buttons');
    $removeDay = $('#day-title > button.remove');
    $dayTitle = $('#day-title > span');
    $addButton = $('#day-add');
    
  	})



	function addDay(){
		var num = 1;
		return $.ajax({
		    method: 'POST',
		    url: '/api/days',
		    data: {
		    	"number": num
		    },
		    success: function (responseData) {
		        console.log("A day was added");
		        $button = $('<button class="btn btn-circle day-btn"></button>');
		        $button.text(num);
		        num++;
		        return $button.appendTo($dayButtons);
		    },
		    error: function (errorObj) {
		        // some code to run if the request errors out
		    }
		});
	}

	$(function(){
		$addButton.on('click', addDay)
	})


	var methods = {
	    load: function(){
	      $(addDay);
	    }
	}

	return methods;

}());

//the day buttons are a direct reference to the items in the DB
