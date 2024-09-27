function validateForm() {
    var name = document.getElementById("name").value;
    var roll = document.getElementById("roll").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    if(name == ""){
        alert("Name is required");
        return false;
    }

    if(roll == ""){
        alert("Roll Number is required");
        return false;
    }

    if(age == ""){
        alert("Age is required");
        return false;
    }
    else if (age < 3){
        alert("Age must not be 0 or less than 0");
        return false;
    }

    if(address == ""){
        alert("Address is required");
        return false;
    }

    if(email == ""){
        alert("Email is required");
        return false;
    }
    else if(!email.includes("@")) {
        alert("Invald email addresss");
        return false;
    }
    if(phone == ""){
        alert("Number is required");
        return false;
    }
    return true;
    

}

function showData() {
    var peopleList;
    if(localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.roll + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.phone + "</td>";
        html += '<td><button onclick = "deleteData(' + index + ')" class = "btn btn-danger">Delete</button><button onclick = "updateData(' + index + ')" class = "btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = 
    html;
}

document.onload = showData();

function AddData(){
    // if form is validate
    if(validateForm() == true) {
        var name = document.getElementById("name").value;
        var roll = document.getElementById("roll").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;

        var peopleList;
        if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }
        peopleList.push ({
            name : name,
            roll : roll,
            age : age,
            address : address,
            email : email,
            phone : phone,
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("roll").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
    }
}

function deleteData(index) {
    var peopleList;
    if(localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

function updateData(index) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList;
    if(localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("roll").value = peopleList[index].roll;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("phone").value = peopleList[index].phone;

    document.querySelector("#Update").onclick = function() {
        if(validateForm() == true){
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].roll = document.getElementById("roll").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].email = document.getElementById("email").value;
            peopleList[index].phone = document.getElementById("phone").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();

            document.getElementById("name").value = "";
            document.getElementById("roll").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}
