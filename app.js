    // event handler and fetch data
    
    const searchFoodItems = () =>{
        const searchFood = document.getElementById('search-food').value;
            document.getElementById("search-food").value = "";
                    
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFood}`)
            .then(response => response.json())
            .then(data => {
                if(searchFood == ''){
                    alert('Enter a food name for searching your desired item');
                }else{
                    displayFoodItems(data.meals);
                }
            });
    };


    // displaying searched items using foreach loop
    const displayFoodItems = meals =>{
        let foodBank = document.getElementById('foodBank');
        foodBank.innerHTML="";
        meals.forEach(meal => {
            const foodBankDiv = document.createElement('div');
            foodBankDiv.className = 'food';
            const foodInfo = `
                <div onclick= "foodIngredients('${meal.idMeal}')">
                    <img class="food-image" src="${meal.strMealThumb}">
                    <h4>${meal.strMeal}</h4>
                </div>
            `;
            foodBankDiv.innerHTML = foodInfo;
            foodBank.appendChild(foodBankDiv);
        });
    };
    
    const foodIngredients = details => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`)
        .then(response => response.json())
        .then(data => displayFoodIngredients(data.meals[0]));
    };


    // displaying food ingredients
    const displayFoodIngredients = meal =>{
        const ingredientsDiv = document.getElementById('ingredients');
        ingredientsDiv.innerHTML = `
            <div class= "description">
                <img class="food-image selected-Image" src="${meal.strMealThumb}">
                <h4>${meal.strMeal}</h4>
                <ul id="list-item">
                
                </ul>
            </div>
        `;
        const ul = document.getElementById('list-item');
        for (let i = 1; i < 21; i++) {
            let ingredient = 'strIngredient' + i;
            let quantity = 'strMeasure' + i;
            const li = document.createElement('li');
            li.innerHTML = `
                <li>${meal[quantity]} ${meal[ingredient]}</li>
            `;      
            ul.appendChild(li);  
        }
    };

    