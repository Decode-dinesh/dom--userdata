async function getUser() {
    const data = await fetch("https://611f26549771bf001785c746.mockapi.io/users/", { method: "GET" });
    const users = await data.json();
    document.querySelector(".user-list").innerHTML = ``;

    users.forEach(user => createUser(user));
}


function createUser({ avatar, name, createdAt, id }) {

    const container = document.createElement('div');
    container.setAttribute('class', 'container');

    container.innerHTML = `
    <div class="avatar-container">
        <img class="avatar" src=${avatar} width="75px" height="75px" />
    </div>
    <div class="details">
    <h2>${name}</h2>
    <p>${new Date(createdAt).toDateString()}</p>
    <button onclick="deleteUser(${id})">Delete</button>
    
    <button class="open-button" onclick="openForm()">Edit</button>

    <button onclick="editUser(${id})">Done</button>
    </div>`

    document.querySelector(".user-list").append(container);
}

getUser();




async function deleteUser(id) {
    const data = await fetch(`https://611f26549771bf001785c746.mockapi.io/users/${id}`, { method: "DELETE" });
    const users = await data.json();
    getUser();
}

async function addUser() {
    const data = await fetch("https://611f26549771bf001785c746.mockapi.io/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.querySelector('.username').value,
            avatar: document.querySelector('.add-avatar').addEventListener('change', (Event) => Event.target.files),
            createdAt: new Date().toISOString()
        })
    });
    const users = await data.json();
    getUser();

}


async function editUser(id) {
    const data = await fetch(`https://611f26549771bf001785c746.mockapi.io/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.querySelector('.editUse').value
        })
    });
    const users = await data.json();
    getUser();
}