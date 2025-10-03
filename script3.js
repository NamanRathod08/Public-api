const userList = document.getElementById("userList");
const errorMsg = document.getElementById("errorMsg");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUsers() {
  userList.innerHTML = "<p>Loading...</p>";
  errorMsg.textContent = "";

  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch data. Status: " + response.status);
    }
    let users = await response.json();

    userList.innerHTML = ""; // Clear old content

    users.forEach(user => {
      const card = document.createElement("div");
      card.classList.add("user-card");
      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;
      userList.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    errorMsg.textContent = "❌ Error fetching data. Please check your connection.";
    userList.innerHTML = "";
  }
}

// Reload button
reloadBtn.addEventListener("click", fetchUsers);

// Initial fetch
fetchUsers();
