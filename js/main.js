//||----------------------------------||//
//||---------Alex Vallorosi-----------||//
//||----------Version 1.0-------------||//
//||-----------Adventure!-------------||//
//||----------12 June 2013------------||//
//||----------------------------------||//


//Helper variable
helpcount = 0;
//Visited Rooms
start = false;
north_fork = false;
easter_egg_tile_2 = false;
//Current Room
currentroom = "start";
//Held Items
itemName = false;
note = false;
sword = false;
//Counters to track Horizontal and Vertical steps - These represent x and y values along x,y axes
counterH = 0;
counterV = 0;

$( document ).ready(function() {
	
	//This function handles the form's submit
	$("form").submit(function(e){
		
		//Gets user inputted value
		var input = $('#commandline').val();
		
		
		//This conditional block handles character controls
		if (input == "go east") {
			counterH = counterH + 1;
		} else if (input == "go west") {
			counterH = counterH - 1;
		} else if (input == "go north") {
			counterV = counterV + 1;
		} else if (input == "go south") {
			counterV = counterV - 1;
		} else if (input == "take note") {
			//This does nothing, just to prevent the game from saying "I don't recognize that!"
		} else if (input == "inspect") {
			//This does nothing, just to prevent the game from saying "I don't recognize that!"
		} else {
			alert("I don't recognize that command!");
			helpcount = helpcount + 1
			if (helpcount >= 3) {
				helpcount = 0;
				$('#console').append("<br />");
				$('#console').append(document.createTextNode("Hint: You can type commands like 'go east' or 'go west'."));
				$('#console').append("<br />");
			}
		}
		
		
		function items(item) {
			
		}
		
		//Clean these lines up, put them somewhere 
		$('#commandline').val("");
		$('.L1').fadeOut("slow");
		$('.L2').fadeOut("slow");
		console.log(counterH + "," + counterV);
		
		
		//This switch should be responsible only for Coordinates. Another switch will use coordinates to organize items found in game
		//Using coordinates (counters) - I find the tile that the player is on and display appropriate message for that tile
		switch(counterH + "," + counterV) {	
			case "0,0":
				if (start == true){
					$('#console').append("<br />");
					$('#console').append(document.createTextNode("You've been here before. Back at the start of your journey!"));
					$('#console').append("<br /><hr>");
					break;
				}
			
			//Tiles East of starting point
			case "1,0": //PLEASE NOTE *** Method chain target is just plain 'ol HTML. You can do this for the rest of them to fade the elements in!
				currentroom = "eastern_long_road";
				$('#console').append("<br />");
				$("<p>You are on a gravel path in the middle of a forest stretching infinitely towards the East and West. Forest surrounds you to the North and South.</p>").hide().appendTo("#console").fadeIn("slow");
				$('#console').append("<br /><hr>");
				break;
				
			case "2,0":
				currentroom = "eastern_long_road_forks";
				$('#console').append("<br />");
				$('#console').append(document.createTextNode("You step forward and find yourself at the fork between two roads. You have a choice: North or South."));
				$('#console').append("<br /><hr>");
				break;
				
			case "2,1":
				currentroom = "north_fork"
				$('#console').append("<br />");
				$("<p>You step onto a more narrow path. A note is pinned to a nearby tree.</p>").hide().appendTo("#console").fadeIn("slow");
				$('#console').append("<br /><hr>");
				north_fork = true;
				if (input == "take note") {
					note = true;
					$('#console').append("<br />");
					$("<p>The note reads: Beware of Blah blah blah this is just text. <br />You fold the note and place it in your pocket.</p>").hide().appendTo("#console").fadeIn("slow");
					$('#console').append("<br /><hr>");
				}
				break;
				
			case "2,-1":
				currentroom = "south_fork"
				break;
			
			
			//Tiles West of starting point	
			case "-1,0":
				currentroom = "western_long_road";
				$('#console').append("<br />");
				$('#console').append(document.createTextNode("You are on a gravel path in the middle of a forest stretching infinitely towards the East and West. Forest surrounds you to the North and South."));
				$('#console').append("<br /><hr>");
				break;
				
			case "-2,0":
				currentroom = "dead_end";
				$('#console').append("<br />");
				$('#console').append(document.createTextNode("You approach a dead end. You stand in the middle of a round gravel path. The ground is soft. Nothing left to do but 'go east'"));
				$('#console').append("<br /><hr>");
				break;
				
			//Easter Egg
			case "0,1":
				currentroom = "easteregg_tile_1"
				message = "<br /><p>You step deep into the forest. There is nothing around but trees.</p><br /><hr>";
				//$(message).hide().appendTo("#console").fadeIn("slow");
				break;
			case "0,2":
				currentroom = "easteregg_tile_2"
				message = "<br /><p>You move deeper into the forest. There is nothing around but trees. Wait... <br /><br />You notice a covering of leaves on the ground nearest you.</p><br /><hr>";
				
				easteregg_tile_2 = true;
				if (input == "inspect") {
					$('#console').append("<br />");
					$("<p>You push the leaves around on the ground. Just as you do this, you fall into a dark hole beneath you!</p>").hide().appendTo("#console").fadeIn("slow");
					$('#console').append("<br /><hr>");
					
					$('#console').append("<br />");
					$("<p>You wake up...<br /><br />The soft glow of a computer screen lights the room.</p>").hide().appendTo("#console").fadeIn("slow");
					$('#console').append("<br /><hr>");
				}
				break;
				
				
			default:
				currentroom = "forest"
				$('#console').append("<br />");
				$('#console').append(document.createTextNode("You step deep into the forest. There is nothing around but trees."));
				$('#console').append("<br /><hr>");
				break;
				
			
				
			
		}
		
		$(message).hide().appendTo("#console").fadeIn("slow");
		
		start = true;
		console.log(currentroom);
		//return false; <-- This is unnecessary
		e.preventDefault();
		
	});
});