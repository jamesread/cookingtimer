export default class CookingPot {
	getLongestDuration() {
		var longest = 0;

		for (var food of document.querySelectorAll("food-item")) {
			let cookingTime = food.getCookingDuration();

			if (cookingTime > longest) {
				longest = cookingTime;
			}
		}

		return longest;
	}

	updatePlan() {
		let longestDuration = this.getLongestDuration();
		var finishTime = new Date(document.querySelector('input#startTime').valueAsDate);
		var newMinutes = finishTime.getMinutes() + longestDuration;
		finishTime.setMinutes(newMinutes)

		for (var food of document.querySelectorAll("food-item")) {
			let cookTime = new Date(finishTime.getTime());
			cookTime.setMinutes(cookTime.getMinutes() - food.getCookingDuration())
			food.setPrefix("" + formatTime(cookTime));
		}

        if (window.updateInterval) {
          clearInterval(window.updateInterval);
        }

        window.updateInterval = setInterval(() => {
          let description = "Ready in <strong>" + longestDuration + "</strong> minutes, at <strong>" + formatTime(finishTime) + "</strong>"; 
          document.querySelector('#results').innerHTML = description;
        }, 1000);
	}
}

function formatTime(dt) {
	let ret = ("" + dt.getHours()).padStart(2, "0") + ":" + ("" + dt.getMinutes()).padStart(2, "0");

	return ret;
}


