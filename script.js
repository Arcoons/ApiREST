
document.addEventListener("DOMContentLoaded", loadClients);

function showAlert(message, type) {
    let alertBox = document.getElementById("alert");
    alertBox.innerText = message;
    alertBox.className = "alert " + (type === "success" ? "success" : "error");
    alertBox.style.display = "block";
    setTimeout(() => { alertBox.style.display = "none"; }, 3000);
}

function loadClients() {
    fetch("api.php?endpoint=clients", { method: "GET" })
        .then(response => response.json())
        .then(data => {
            let clientList = document.getElementById("client-list");
            clientList.innerHTML = "";
            data.forEach(client => {
                clientList.innerHTML += `
                    <tr>
                        <td>${client.id}</td>
                        <td>${client.name}</td>
                        <td>${client.email}</td>
                        <td>
                            <button class='btn update' onclick='updateClient(${client.id})'>Editar</button>
                            <button class='btn delete' onclick='deleteClient(${client.id})'>Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error("Error al cargar los clientes:", error));
}

function addClient() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    fetch("api.php?endpoint=clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email })
    })
    .then(response => response.json())
    .then(data => {
        showAlert("Cliente agregado exitosamente", "success");
        loadClients();
    })
    .catch(error => showAlert("Error al agregar cliente", "error"));
}

function deleteClient(id) {
    fetch("api.php?endpoint=clients", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => {
        showAlert("Cliente eliminado", "success");
        loadClients();
    })
    .catch(error => showAlert("Error al eliminar cliente", "error"));
}

function updateClient(id) {
    let newName = prompt("Nuevo nombre:");
    let newEmail = prompt("Nuevo email:");

    if (newName && newEmail) {
        fetch("api.php?endpoint=clients", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id, name: newName, email: newEmail })
        })
        .then(response => response.json())
        .then(data => {
            showAlert("Cliente actualizado", "success");
            loadClients();
        })
        .catch(error => showAlert("Error al actualizar cliente", "error"));
    }
}
