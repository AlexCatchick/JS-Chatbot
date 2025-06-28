const chatbox = document.getElementById("chatbox");
const loading = document.getElementById("loading");
const inputField = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const modeToggle = document.getElementById("modeToggle");

let order = [];
let paid = false;

const menuData = {
  breakfast: [
    { name: "Aloo Paratha", price: 30 },
    { name: "Bread Omlet", price: 35 },
    { name: "Maggie", price: 20 },
    { name: "Puri Sabzi", price: 45 },
    { name: "Macroni", price: 50 },
    { name: "Roti Chawal Sabzi", price: 80 },
    { name: "Tea", price: 10 },
    { name: "Coffee", price: 10 }
  ],
  lunch: [
    { name: "Rice and Dal Fry", price: 45 },
    { name: "Roti Sabzi", price: 45 },
    { name: "Maggie", price: 20 },
    { name: "Dahi", price: 15 },
    { name: "Crackers", price: 15 }
  ],
  dinner: [
    { name: "Veg Pulao", price: 70 },
    { name: "Roti", price: 10 },
    { name: "Maggie", price: 20 },
    { name: "Chicken Biryani", price: 70 },
    { name: "Sabzi", price: 35 },
    { name: "Dal Fry", price: 35 }
  ]
};

function appendMessage(text, isBot = true) {
  const msg = document.createElement("div");
  msg.className = `p-3 rounded-xl max-w-xs break-words ${isBot ? 'bg-blue-100 dark:bg-blue-800' : 'bg-green-100 dark:bg-green-700 self-end'
    } animate-fadeInUp`;
  msg.innerText = text;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function showOptions() {
  appendMessage(`What would you like to have today? :)  
[1] Bring the menu  
[2] Exit  
[3] Paytime`);
}

// Show menu by time
function showMenu() {
  const hour = new Date().getHours();
  let mealType = "breakfast";
  if (hour >= 12 && hour < 18) mealType = "lunch";
  else if (hour >= 18) mealType = "dinner";

  let menuText = `${mealType.toUpperCase()} MENU:\n`;
  menuData[mealType].forEach((item, idx) => {
    menuText += `${idx + 1}) ${item.name} Rs.${item.price}\n`;
  });
  menuText += "\nType the name of the food to order.";
  appendMessage(menuText);
}

// Process order
function processOrder(foodInput) {
  const allItems = [...menuData.breakfast, ...menuData.lunch, ...menuData.dinner];
  const item = allItems.find(i => i.name.toLowerCase() === foodInput.toLowerCase());
  if (!item) {
    appendMessage("Item not found. Please type correctly.");
    return;
  }
  order.push(item);
  appendMessage(`Your ${item.name} will be ready in ${5 + Math.floor(Math.random() * 6)} minutes.`);

  setTimeout(() => {
    const continueOrder = confirm("Do you want to order more?");
    if (continueOrder) {
      showMenu();
    } else {
      showOptions();
    }
  }, 300);
}
function handleInput(userInput) {
  if (!userInput.trim()) return;
  appendMessage(userInput, false);
  const input = userInput.toLowerCase();

  if (input.includes("1")) {
    showMenu();
  } else if (input.includes("2")) {
    handleExit();
  } else if (input.includes("3")) {
    handlePaytime();
  } else {
    processOrder(userInput);
  }

  inputField.value = "";
}
function handleExit() {
  if (order.length === 0) {
    appendMessage("Thank you for your visit! :)");
    showOptions();
  } else if (!paid) {
    const confirmExit = confirm("You ordered something, are you sure you want to exit?");
    if (confirmExit) {
      appendMessage("Thank you for your visit! :)");
      order = [];
      paid = false;
      showOptions();
    } else {
      showOptions();
    }
  } else {
    appendMessage("Thank you for your visit! :)");
    order = [];
    paid = false;
    showOptions();
  }
}

function handlePaytime() {
  if (order.length === 0) {
    appendMessage("You didn't order something!");
    showOptions();
  } else {
    const total = order.reduce((sum, item) => sum + item.price, 0);
    appendMessage(`Your total bill is Rs.${total}.`);

    const btnContainer = document.createElement("div");
    btnContainer.className = "flex space-x-2 mt-2 animate-fadeInUp";

    const onlineBtn = document.createElement("button");
    onlineBtn.className = "bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600";
    onlineBtn.innerText = "Pay Online";
    onlineBtn.onclick = () => {
      loading.classList.remove("hidden");
      setTimeout(() => {
        loading.classList.add("hidden");
        alert("Payment successful!");
        paid = true;
        order = [];
        showOptions();
      }, 15000);
    };

    const cashBtn = document.createElement("button");
    cashBtn.className = "bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600";
    cashBtn.innerText = "Cash";
    cashBtn.onclick = () => {
      appendMessage("Payment received. Thank you!");
      paid = true;
      order = [];
      showOptions();
    };

    btnContainer.appendChild(onlineBtn);
    btnContainer.appendChild(cashBtn);
    chatbox.appendChild(btnContainer);
    chatbox.scrollTop = chatbox.scrollHeight;
  }
}

function handleInput(userInput) {
  if (!userInput.trim()) return;
  appendMessage(userInput, false);
  const input = userInput.toLowerCase();

  if (input.includes("1")) {
    showMenu();
  } else if (input.includes("2")) {
    handleExit();
  } else if (input.includes("3")) {
    handlePaytime();
  } else {
    processOrder(userInput);
    showOptions();
  }

  inputField.value = "";
}

setTimeout(() => {
  appendMessage("👋 Welcome!");
  showOptions();
}, 500);

sendBtn.addEventListener("click", () => {
  handleInput(inputField.value);
});

inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleInput(inputField.value);
  }
});

function applyTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
applyTheme();

modeToggle.addEventListener("click", () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
});
