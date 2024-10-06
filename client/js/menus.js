const typeStarter = document.querySelector(".starter");
const typeMain = document.querySelector(".main");
const typeDessert = document.querySelector(".dessert");
const typeDrink = document.querySelector(".drink");

const nameList = async () => {
  try {
    const result = await fetch("../api/stock", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    return data;
  } catch {}
};

const generateStarter = async (starter) => {
  try {
    for (let i = 0; i < starter.length; i++) {
      const divStock = document.createElement("div");
      const name = document.createElement("p");
      const price = document.createElement("p");
      const description = document.createElement("p");
      const image = document.createElement("img");

      divStock.classList.add("listItems");
      price.classList.add("descriptionHover");
      price.classList.add("price");
      description.classList.add("descriptionHover");
      description.classList.add("description");

      name.textContent = starter[i].name;
      price.textContent = starter[i].price + " €";
      description.textContent = starter[i].description;
      if (starter[i].picture === "") {
        image.src = "..\\assets\\images\\meal\\vaisselle.png";
      } else {
        image.src = "..\\assets\\images\\meal\\" + starter[i].picture;
      }

      typeStarter.appendChild(divStock);
      divStock.appendChild(image);
      divStock.appendChild(name);
      divStock.appendChild(price);
      divStock.appendChild(description);

      if (starter[i].available === false) {
        const available = document.createElement("p");
        available.classList.add("available");
        available.textContent = "Épuisé";
        divStock.appendChild(available);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const generateMain = async (main) => {
  try {
    for (let i = 0; i < main.length; i++) {
      const divStock = document.createElement("div");
      const name = document.createElement("p");
      const price = document.createElement("p");
      const description = document.createElement("p");
      const image = document.createElement("img");

      divStock.classList.add("listItems");
      price.classList.add("descriptionHover");
      price.classList.add("price");
      description.classList.add("descriptionHover");
      description.classList.add("description");
      name.textContent = main[i].name;
      price.textContent = main[i].price + " €";
      description.textContent = main[i].description;

      if (main[i].picture === "") {
        image.src = "..\\assets\\images\\meal\\vaisselle.png";
      } else {
        image.src = "..\\assets\\images\\meal\\" + main[i].picture;
      }
      typeMain.appendChild(divStock);
      divStock.appendChild(image);
      divStock.appendChild(name);
      divStock.appendChild(price);
      divStock.appendChild(description);

      if (main[i].available === false) {
        const available = document.createElement("p");
        available.classList.add("available");
        available.textContent = "Épuisé";
        divStock.appendChild(available);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const generateDessert = async (dessert) => {
  try {
    for (let i = 0; i < dessert.length; i++) {
      const divStock = document.createElement("div");
      const name = document.createElement("p");
      const price = document.createElement("p");
      const description = document.createElement("p");
      const image = document.createElement("img");

      divStock.classList.add("listItems");
      price.classList.add("descriptionHover");
      price.classList.add("price");
      description.classList.add("descriptionHover");
      description.classList.add("description");
      name.textContent = dessert[i].name;
      price.textContent = dessert[i].price + " €";
      description.textContent = dessert[i].description;

      if (dessert[i].picture === "") {
        image.src = "..\\assets\\images\\meal\\vaisselle.png";
      } else {
        image.src = "..\\assets\\images\\meal\\" + dessert[i].picture;
      }

      typeDessert.appendChild(divStock);
      divStock.appendChild(image);
      divStock.appendChild(name);
      divStock.appendChild(price);
      divStock.appendChild(description);

      if (dessert[i].available === false) {
        const available = document.createElement("p");
        available.classList.add("available");
        available.textContent = "Épuisé";
        divStock.appendChild(available);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const generateDrink = async (drink) => {
  try {
    for (let i = 0; i < drink.length; i++) {
      const divStock = document.createElement("div");
      const name = document.createElement("p");
      const price = document.createElement("p");
      const description = document.createElement("p");
      const image = document.createElement("img");

      divStock.classList.add("listItems");
      price.classList.add("descriptionHover");
      price.classList.add("price");
      description.classList.add("descriptionHover");
      description.classList.add("description");
      name.textContent = drink[i].name;
      price.textContent = drink[i].price + " €";
      description.textContent = drink[i].description;

      if (drink[i].picture === "") {
        image.src = "..\\assets\\images\\meal\\vaisselle.png";
      } else {
        image.src = "..\\assets\\images\\meal\\" + drink[i].picture;
      }

      typeDrink.appendChild(divStock);
      divStock.appendChild(image);
      divStock.appendChild(name);
      divStock.appendChild(price);
      divStock.appendChild(description);

      if (drink[i].available === false) {
        const available = document.createElement("p");
        available.classList.add("available");
        available.textContent = "Épuisé";
        divStock.appendChild(available);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const generateMenu = async () => {
  try {
    const list = await nameList();
    const type_Starter = list.filter((stock) => stock.type === "Starter");
    const type_Main = list.filter((stock) => stock.type === "Main");
    const type_Dessert = list.filter((stock) => stock.type === "Dessert");
    const type_Drink = list.filter((stock) => stock.type === "Drink");
    generateStarter(type_Starter);
    generateMain(type_Main);
    generateDessert(type_Dessert);
    generateDrink(type_Drink);
  } catch (err) {
    console.log(err);
  }
};

generateMenu();
