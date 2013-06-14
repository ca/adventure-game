//      ___       __                 __                  __  //
//     /   | ____/ /   _____  ____  / /___  __________  / /  //
//    / /| |/ __  / | / / _ \/ __ \/ __/ / / / ___/ _ \/ /   //
//   / ___ / /_/ /| |/ /  __/ / / / /_/ /_/ / /  /  __/_/    //
//  /_/  |_\__,_/ |___/\___/_/ /_/\__/\__,_/_/   \___(_)     //                                             
//                                                           //
//                       Version 1.0                         //
//                    By: Alex Vallorosi                     //
//                      12 June 2013                         //
//                                                           //


//Helper variable
helpcount = 0;
//Visited Rooms
start = false;
north_fork = false;
easteregg_tile_2 = false;
//Current Room
currentroom = "start";
//Held Items
note = false;
sword = false;
//Counters to track Horizontal and Vertical steps - These represent x and y values along x,y axes
counterH = 0;
counterV = 0;

//document.ready is just like form load sub
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
		} else if (input == "inspect computer") {
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
		
		$('#commandline').val("");
		$('.L1').fadeOut("slow");
		$('.L2').fadeOut("slow");
		console.log(counterH + "," + counterV);
		
		
		//This switch should be responsible only for Coordinates.
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
			case "1,0":
				currentroom = "eastern_long_road";
				message = "<br /><p>You are on a gravel path in the middle of a forest stretching infinitely towards the East and West. Forest surrounds you to the North and South.</p><br /><hr>";
				break;
				
			case "2,0":
				currentroom = "eastern_long_road_forks";
				message = "<br /><p>You step forward and find yourself at the fork between two roads. You have a choice: North or South.</p><br /><hr>";
				break;
				
			case "2,1":
				currentroom = "north_fork";
				message = "<br /><p>You step onto a more narrow path. A note is pinned to a nearby tree.</p><br /><hr>";
				north_fork = true;
				if (input == "take note") {
					note = true;
					message = "<br /><p>The note reads: 'You have entered a mystical forest. There are other forces at work here. Travel deep into the woods and you will discover the truth!'. <br />You fold the note and place it in your pocket.</p><br /><hr>";
				}
				break;
				
			case "2,-1":
				currentroom = "south_fork";
				message = "<br /><p>Suddenly, a ferocious bear jumps out of the forest to your right! He swings at you with his giant paw. You are dead.</p><br /><hr>";
				gameover();
				break;
			
			
			//Tiles West of starting point	
			case "-1,0":
				currentroom = "western_long_road";
				message = "<br /><p>You are on a gravel path in the middle of a forest stretching infinitely towards the East and West. Forest surrounds you to the North and South.</p><br /><hr>";
				break;
				
			case "-2,0":
				currentroom = "dead_end";
				message = "<br /><p>You approach a dead end. You stand in the middle of a round gravel path. The ground is soft. Nothing left to do but 'go east'</p><br /><hr>";
				break;
				
				
			//Tiles North of starting point
			case "0,1":
				currentroom = "easteregg_tile_1";
				message = "<br /><p>You step deep into the forest. There is nothing around but trees.</p><br /><hr>";
				break;
				
			case "0,2":
				currentroom = "easteregg_tile_2";
				if (easteregg_tile_2 == false) {
					message = "";
					$("<br /><p>You move deeper into the forest. There is nothing around but trees. Wait... <br /><br />You notice a covering of leaves on the ground nearest you.</p><br /><hr>").hide().appendTo("#console").fadeIn("slow");
					easteregg_tile_2 = true;
				}
								
				if (input == "inspect") {
					$("<br /><p>You push the leaves around on the ground. Just as you do this, you fall into a dark hole beneath you!</p><br /><hr>").hide().appendTo("#console").fadeIn("slow");
					$("<br /><p>You wake up...<br /><br />The soft glow of a computer screen lights the room.</p><br /><hr>").hide().appendTo("#console").fadeIn("slow");
				}
				
				if (input == "inspect computer") {
					$("<br /><b>... You step very close to the computer. There is a message on the screen. It says:<b><br />").hide().appendTo("#console").fadeIn("slow");
					youwin();
					counterH = 5000;
					counterV = 5000;
				}
				break;
			
			//Real Easter egg here
			case "5001,5000":
				message = "<a href='http://www.youtube.com/watch?v=dQw4w9WgXcQ'>Click Me!</a>";
				break;
			
			//Default Case
			default:
				currentroom = "forest"
				message = "<br /><p>You step deep into the forest. There is nothing around but trees.</p><br /><hr>";
				break;

		}
		
		
		//These functions (which are similar to VB Subs) handle the gameover and youwin procedures
		function gameover() {
			$("<h2 style='color:red;'>Game Over</h2>").hide().appendTo("#console").fadeIn("5000");
			start = false;
			counterH = 0;
			counterV = 0;
			$('#console p').fadeOut("slow");
			$('#console hr').fadeOut("slow");
			$('#console br').fadeOut("slow");
			
		}
		
		function youwin() {
			$("<h2 style='color:white;'>You win!!! Congrats!</h2>").hide().appendTo("#console").fadeIn("5000");
			$('#console p').fadeOut("slow");
			$('#console hr').fadeOut("slow");
			$('#console br').fadeOut("slow");
		}
		
		//This statement prints the 'message' variable which is set in each case
		$(message).hide().appendTo("#console").fadeIn("slow");
		
		start = true;
		console.log(currentroom);
		e.preventDefault();
		
	});
});