export default class FoodItem extends HTMLElement {
	constructor() {
		super();
	}

	setup() {
		var foodTemplate = document.querySelector('#food-item');

//		this.shadow = this.attachShadow({mode: 'closed'});
		this.shadow = this;
		this.shadow.appendChild(foodTemplate.content.cloneNode(true));
		this.shadow.querySelector("button").onclick = () => { this.removeFood() }

		let inputs = this.shadow.querySelectorAll("input");

		this.titleElement = inputs[0];
		this.cookingTimeElement = inputs[1];

		this.prefixElement = this.shadow.querySelector(".prefix");
	}

	removeFood() {
		this.remove()
	}

	getName() {
		return this.titleElement.value;
	}

	setName(name) {
		this.titleElement.value = name;
	}

	getCookingDuration() {
		return parseInt(this.cookingTimeElement.value);
	}

	setCookingDuration(time) {
		this.cookingTimeElement.value = time;
	}

	setPrefix(text) {
		this.prefixElement.textContent = text;
	}
}

