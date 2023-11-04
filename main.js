function validateForm() {
    let email = document.getElementById('inputEmail').value;
    let name = document.getElementById('inputName').value;
    let apellido = document.getElementById('inputApellido').value;
    let phone = document.getElementById('inputPhone').value;
    let dni = document.getElementById('inputDni').value;
    let domicilio = document.getElementById('inputDomicilio').value;
    let carrera = document.getElementById('inputCarrera').value;

    if (email == "") {
        alert('El correo es requerido');
        return false;
    } else if (!email.includes("@")) {
        alert('El correo no es valido');
        return false;
    }

    if (name == "") {
        alert('El nombre es requerido');
        return false;
    }

    if (apellido == "") {
        alert('El Apellido es requerido');
        return false;
    }

    if (phone == "") {
        alert('El telefono es requerido');
        return false;
    }

    if (dni == "") {
        alert('El DNI es requerido');
        return false;
    }

    if (domicilio == "") {
        alert('El domicilio es requerido');
        return false;
    }

    if (carrera == "") {
        alert('La carrera es requerida');
        return false;
    }

    return true;
}

// Función para mostrar los datos
function showData() {
    let listPeople;

    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    var html = "";

    listPeople.forEach(function(element, index) {
        html += "<tr>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.apellido + "</td>";
        html += "<td>" + element.phone + "</td>";
        html += "<td>" + element.dni + "</td>";
        html += "<td>" + element.domicilio + "</td>";
        html += "<td>" + element.carrera + "</td>";
    
        // Cambiar el color del botón "Eliminar dato" a rojo y el botón "Editar dato" a un verde más oscuro
        html += '<td><button onclick="deleteData(' + index + ')" class="btn" style="background-color: #FF0000; color: #FFF;">Eliminar dato</button> <button onclick="updateData(' + index + ')" class="btn" style="background-color: #008000; color: #FFF;">Editar dato</button></td>';
        html += "</tr>";
    });
    

    document.querySelector('#tableData tbody').innerHTML = html;
}

// Función para agregar datos
function AddData() {
    if (validateForm() == true) {
        let email = document.getElementById('inputEmail').value;
        let name = document.getElementById('inputName').value;
        let apellido = document.getElementById('inputApellido').value;
        let phone = document.getElementById('inputPhone').value;
        let dni = document.getElementById('inputDni').value;
        let domicilio = document.getElementById('inputDomicilio').value;
        let carrera = document.getElementById('inputCarrera').value;

        var listPeople;
        if (localStorage.getItem('listPeople') == null) {
            listPeople = [];
        } else {
            listPeople = JSON.parse(localStorage.getItem("listPeople"));
        }

        listPeople.push({
            email: email,
            name: name,
            apellido: apellido,
            phone: phone,
            dni: dni,
            domicilio: domicilio,
            carrera: carrera,
        });

        localStorage.setItem('listPeople', JSON.stringify(listPeople));

        showData();

        document.getElementById('inputEmail').value = "";
        document.getElementById('inputName').value = "";
        document.getElementById('inputApellido').value = "";
        document.getElementById('inputPhone').value = "";
        document.getElementById('inputDni').value = "";
        document.getElementById('inputDomicilio').value = "";
        document.getElementById('inputCarrera').value = "";
    }
}

// Función para eliminar datos
function deleteData(index) {
    var listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));
    showData();
}

// Función para actualizar datos
function updateData(index) {
    document.getElementById("btnAdd").style.display = 'none';
    document.getElementById("btnUpdate").style.display = 'block';

    var listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    document.getElementById('inputEmail').value = listPeople[index].email;
    document.getElementById('inputName').value = listPeople[index].name;
    document.getElementById('inputApellido').value = listPeople[index].apellido;
    document.getElementById('inputPhone').value = listPeople[index].phone;
    document.getElementById('inputDni').value = listPeople[index].dni;
    document.getElementById('inputDomicilio').value = listPeople[index].domicilio;
    document.getElementById('inputCarrera').value = listPeople[index].carrera;

    document.querySelector("#btnUpdate").onclick = function () {
        if (validateForm() == true) {
            listPeople[index].email = document.getElementById('inputEmail').value;
            listPeople[index].name = document.getElementById('inputName').value;
            listPeople[index].apellido = document.getElementById('inputApellido').value;
            listPeople[index].phone = document.getElementById('inputPhone').value;
            listPeople[index].dni = document.getElementById('inputDni').value;
            listPeople[index].domicilio = document.getElementById('inputDomicilio').value;
            listPeople[index].carrera = document.getElementById('inputCarrera').value;

            localStorage.setItem('listPeople', JSON.stringify(listPeople));
            showData();

            document.getElementById('inputEmail').value = "";
            document.getElementById('inputName').value = "";
            document.getElementById('inputApellido').value = "";
            document.getElementById('inputPhone').value = "";
            document.getElementById('inputDni').value = "";
            document.getElementById('inputDomicilio').value = "";
            document.getElementById('inputCarrera').value = "";

            document.getElementById("btnAdd").style.display = 'block';
            document.getElementById("btnUpdate").style.display = 'none';
        }
    };
}

// Llamar a la función showData al cargar el documento
document.addEventListener("DOMContentLoaded", showData);
