import FoodItem from "./js/FoodItem.js";

export function init() {
	customElements.define("food-item", FoodItem);

	var dt = new Date();
	dt.setMilliseconds(0);
	dt.setSeconds(0);
	document.querySelector('input#startTime').valueAsDate = dt;

	createFood("Steak", 10);
	createFood("Potatos", 20);
	createFood("Brocolli", 40);
}

export function createFood(title = "untitled food", duration = 20) {
	let i = document.createElement("food-item");
	i.setup();
	i.setName(title);
	i.setCookingDuration(duration);

	document.querySelector('#list').appendChild(i);
	let input = i.shadow.querySelector('input')

	input.focus();
}

