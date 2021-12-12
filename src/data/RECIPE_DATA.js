const RECIPE_DATA = [
  {
    id: 0,
    title: "Night Market Style Honey Chicken Wings",
    image: require("../assets/images/recipe1.jpg"),
    by: "Adib Nawfal",
    category: "Dinner",
    cuisineType: "Malaysian",
    time: "40 Min",
    difficulty: "Normal",
    rating: 4.8,
    ingredient: [
      {
        id: 0,
        name: "Chicken Wings",
        measure: "1 kg",
      },
      {
        id: 1,
        name: "Ginger",
        measure: "1 inch",
      },
      {
        id: 2,
        name: "Garlic",
        measure: "3 cloves",
      },
      {
        id: 3,
        name: "Oyster sauce",
        measure: "2 tbsp",
      },
      {
        id: 4,
        name: "Chilli sauce",
        measure: "2 tbsp",
      },
      {
        id: 5,
        name: "Sweet Soy Souce",
        measure: "1 tsp",
      },
      {
        id: 6,
        name: "Honey",
        measure: "1/2 cup",
      },
      {
        id: 7,
        name: "Ground chilli",
        measure: "3 tbsp",
      },
    ],
    step: [
      {
        id: 0,
        txt: "Mix the chicken wings with red dye or rose syrup.",
      },
      {
        id: 1,
        txt: "Lightly fry the chicken wings first. Lift and set aside.",
      },
      {
        id: 2,
        txt: "Sauté the ginger and garlic until fragrant, then add the ground chilli, the sauce ingredients, and the chicken wings. Mix well until slightly dry.",
      },
      {
        id: 3,
        txt: "Can be eaten straight away or cook for a while in the oven. Good luck!",
      },
    ],
    star: [
      {
        id: 0,
        bool: false,
      },
      {
        id: 1,
        bool: false,
      },
      {
        id: 2,
        bool: false,
      },
      {
        id: 3,
        bool: false,
      },
      {
        id: 4,
        bool: false,
      },
    ],
  },
  {
    id: 1,
    title: "Vegan Tropical Smoothie",
    image: require("../assets/images/recipe2.jpg"),
    by: "Muhammad Thariq",
    category: "Beverages",
    cuisineType: "Other Cuisine",
    time: "5 Min",
    difficulty: "Easy",
    rating: 4.6,
    ingredient: [
      {
        id: 0,
        name: "Frozen mango chunks",
        measure: "1 cup",
      },
      {
        id: 1,
        name: "Frozen pineapple chunks",
        measure: "1 cup",
      },
      {
        id: 2,
        name: "Banana (slightly ripe)",
        measure: "1 kg",
      },
      {
        id: 3,
        name: "Coconut milk	",
        measure: "1/2 cup",
      },
      {
        id: 4,
        name: "Coconut water",
        measure: "1/4 cup",
      },
    ],
    step: [
      {
        id: 0,
        txt: "Place the unfrozen fruit (i.e., banana) at the bottom of the blender jug. Then, add the frozen fruits on top and finally the liquids.",
      },
      {
        id: 1,
        txt: "Blend and serve.",
      },
    ],
    star: [
      {
        id: 0,
        bool: false,
      },
      {
        id: 1,
        bool: false,
      },
      {
        id: 2,
        bool: false,
      },
      {
        id: 3,
        bool: false,
      },
      {
        id: 4,
        bool: false,
      },
    ],
  },
  {
    id: 2,
    title: "Toast Bread with Blueberry Jam",
    image: require("../assets/images/recipe3.jpg"),
    by: "Uthmann Al-Syuareem",
    category: "Simple & Quick",
    cuisineType: "America",
    time: "10 Min",
    difficulty: "Easy",
    rating: 4.4,
    ingredient: [
      {
        id: 0,
        name: "Bread",
        measure: "2 piece",
      },
      {
        id: 1,
        name: "Blueberry jam",
        measure: "1 pot",
      },
      {
        id: 2,
        name: "Butter",
        measure: "1 stick",
      },
    ],
    step: [
      {
        id: 0,
        txt: "Put a bit of butter on the bread.",
      },
      {
        id: 1,
        txt: "Toast the bread for a minute.",
      },
      {
        id: 2,
        txt: "Add on a bit of blueberry jam on top.",
      },
      {
        id: 3,
        txt: "Ready to eat.",
      },
    ],
    star: [
      {
        id: 0,
        bool: false,
      },
      {
        id: 1,
        bool: false,
      },
      {
        id: 2,
        bool: false,
      },
      {
        id: 3,
        bool: false,
      },
      {
        id: 4,
        bool: false,
      },
    ],
  },
  {
    id: 3,
    title: "Taco",
    image: require("../assets/images/recipe4.jpg"),
    by: "Aiman Syafiq",
    category: "Dinner",
    cuisineType: "Mexican",
    time: "45 Min",
    difficulty: "Easy",
    rating: 4.5,
    ingredient: [
      {
        id: 0,
        name: "Kosher salt",
        measure: "2 tsp",
      },
      {
        id: 1,
        name: "Ground black pepper",
        measure: "1 tsp",
      },
      {
        id: 2,
        name: "Ground cumin",
        measure: "1 tsp",
      },
      {
        id: 3,
        name: "Garlic powder",
        measure: "1 tsp",
      },
      {
        id: 4,
        name: "Chili powder",
        measure: "1 tbsp",
      },
      {
        id: 5,
        name: "Flank steak",
        measure: "1 kg",
      },
      {
        id: 6,
        name: "Extra virgin olive oil (divided)",
        measure: "2 tbsp",
      },
      {
        id: 7,
        name: "Green bell pepper (seeded, sliced)",
        measure: "1 piece",
      },
      {
        id: 8,
        name: "Sliced mushrooms",
        measure: "1 cup",
      },
      {
        id: 9,
        name: "Red bell pepper (seeded, sliced)",
        measure: "1 piece",
      },
      {
        id: 10,
        name: "Red onion (thinly sliced)",
        measure: "1 piece",
      },
      {
        id: 11,
        name: "Head broccoli (cut into florets)",
        measure: "1 piece",
      },
      {
        id: 12,
        name: "Small corn tortillas",
        measure: "12 pieces",
      },
      {
        id: 13,
        name: "Greek yogurt",
        measure: "1/2 cup",
      },
      {
        id: 14,
        name: "Lime juice",
        measure: "1 tbsp",
      },
      {
        id: 15,
        name: "Lime zest",
        measure: "1/4 tsp",
      },
      {
        id: 16,
        name: "Kosher salt (to taste)",
        measure: "1/8 tsp",
      },
    ],
    step: [
      {
        id: 0,
        txt: "Preheat the oven to 180°C and line two baking sheets with parchment paper.",
      },
      {
        id: 1,
        txt: "Make the taco seasoning : Mix the salt, pepper, cumin, garlic powder, and chili	powder together in a small bowl.",
      },
      {
        id: 2,
        txt: "Add the flank steak to a baking sheet. Drizzle with 2 teaspoons of olive oil and rub to coat, then sprinkle with 2 teaspoons of the taco seasoning and rub to coat evenly.",
      },
      {
        id: 3,
        txt: "To the other baking sheet, add the green bell pepper, mushrooms, red bell pepper, red onion broccoli. Drizzle with 1 tablespoon of olive oil and sprinkle with 2 teaspoons of taco seasoning. Toss to coat.",
      },
      {
        id: 4,
        txt: "Wrap the tortillas in foil, add to the baking sheet with veggies, and bake until the vegetables are browned and the steak is cooked to your liking, about 20 minutes. Let rest for 5 minutes, then thinly slice the steak against the grain.",
      },
      {
        id: 5,
        txt: "Make the lime crema: combine the Greek yogurt, lime juice and zest in a small bowl. Season with salt.",
      },
      {
        id: 6,
        txt: "Serve the roasted steak and vegetables with the lime crema and put your favorite toppings to create a taco.",
      },
    ],
    star: [
      {
        id: 0,
        bool: false,
      },
      {
        id: 1,
        bool: false,
      },
      {
        id: 2,
        bool: false,
      },
      {
        id: 3,
        bool: false,
      },
      {
        id: 4,
        bool: false,
      },
    ],
  },
  {
    id: 4,
    title: "Gulab Jamun",
    image: require("../assets/images/recipe5.jpg"),
    by: "Tiviyarsiri",
    category: "Dessert",
    cuisineType: "Indian",
    time: "40 Min",
    difficulty: "Normal",
    rating: 4.7,
    ingredient: [
      {
        id: 0,
        name: "Sugar",
        measure: "4 cup",
      },
      {
        id: 1,
        name: "Water",
        measure: "4 cup",
      },
      {
        id: 2,
        name: "Cardamom (crushed)",
        measure: "4 pieces",
      },
      {
        id: 3,
        name: "Saffron",
        measure: "1/2 tsp",
      },
      {
        id: 4,
        name: "Lemon juice",
        measure: "2 tsp",
      },
      {
        id: 5,
        name: "Rose water",
        measure: "2 tsp",
      },
      {
        id: 6,
        name: "Milk powder",
        measure: "100 grams",
      },
      {
        id: 7,
        name: "All purpose flour / maida",
        measure: "60 grams",
      },
      {
        id: 8,
        name: "Baking soda",
        measure: "1 pinch",
      },
      {
        id: 9,
        name: "Ghee",
        measure: "4 tsp",
      },
      {
        id: 10,
        name: "Milk (kneading)",
        measure: "3 tbsp",
      },
      {
        id: 11,
        name: "Ghee / oil (for frying)",
        measure: "1 quart",
      },
    ],
    step: [
      {
        id: 0,
        txt: "Jamun: Firstly, in a large bowl take 3/4 cup milk powder, 1/2 cup maida and 1/2 tsp baking powder.",
      },
      {
        id: 1,
        txt: "Mix well, homemade gulab jamun mix is ready.",
      },
      {
        id: 2,
        txt: "Now add 2 tbsp ghee and mix well, making the flour moist.",
      },
      {
        id: 3,
        txt: "Further, add milk as required and start to combine.",
      },
      {
        id: 4,
        txt: "Combine well, forming a soft dough. do not knead the dough.",
      },
      {
        id: 5,
        txt: "Cover and rest for 10 minutes.",
      },
      {
        id: 6,
        txt: "Sugar syrup: Take 2 cup sugar, 2 cup water, 2 cardamom and 1/4 tsp saffron.",
      },
      {
        id: 7,
        txt: "Mix well and boil for 5 minutes or until the sugar syrup turns sticky.",
      },
      {
        id: 8,
        txt: "Turn off the flame and add 1 tsp lemon juice and 1 tsp rose water.",
      },
      {
        id: 10,
        txt: "Jamun (After 10 minutes): After 10 minutes or resting the dough, start to prepare small ball sized jamuns.",
      },
      {
        id: 11,
        txt: "Make sure there are no cracks in the jamun. if there are cracks then there are high chances for jamuns to break while frying.",
      },
      {
        id: 12,
        txt: "Deep fry in medium hot oil or ghee.",
      },
      {
        id: 13,
        txt: "Stir continuously and fry on low flame.",
      },
      {
        id: 14,
        txt: "Fry until the jamuns turn golden brown.",
      },
      {
        id: 15,
        txt: "Drain off and transfer the jamun into a hot sugar syrup.",
      },
      {
        id: 16,
        txt: "Cover and rest for 2 hours or until jamuns absorb the sugar syrup and doubles in size.",
      },
    ],
    star: [
      {
        id: 0,
        bool: false,
      },
      {
        id: 1,
        bool: false,
      },
      {
        id: 2,
        bool: false,
      },
      {
        id: 3,
        bool: false,
      },
      {
        id: 4,
        bool: false,
      },
    ],
  },
];

export { RECIPE_DATA };
