//jshint esversion:8

function fetchAllFromAuthRoute() {
    const fetch_url = `http://localhost:3000/authtest/getall`;
    const accessToken = localStorage.getItem("SessionToken");

    const response = fetch(fetch_url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: accessToken
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        });
}

function postToAuthRouteCreate() {
    const fetch_url = `http://localhost:3000/authtest/create`;
    const accessToken = localStorage.getItem("SessionToken");

    let authTestDataInput = document.getElementById("authTestData").value;

    let authInputData = {
        authTestData: {
            item: authTestDataInput
        }
    };

    const response = fetch(fetch_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: accessToken
            },
            body: JSON.stringify(authInputData)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        });
}

function userSignIn() {
    let userName = document.getElementById('userSignin').value;
    let userPass = document.getElementById('passSignin').value;
    console.log(userName, userPass);

    let userData = {
        user: {
            username: userName,
            password: userPass
        }
    };
    fetch('http://localhost:3000/api/user/signin', { //<---signin route used
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(function (response) {
            console.log(response.sessionToken);
            let token = response.sessionToken;
            localStorage.setItem('SessionToken', token);
        });
}

function getOneByUser() {
    let postIdNumber = document.getElementById("getNumber").value;

    const fetch_url = `http://localhost:3000/authtest/${postIdNumber}`;
    const accessToken = localStorage.getItem('SessionToken');

    const response = fetch(fetch_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }
        })
        .then(response => {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            var myItem = document.getElementById('getItemValue');
            myItem.innerHTML = response.authTestData;
        });
}

function updateItem() {
    let postIdNumber = document.getElementById("updateNumber").value;
    let authTestDataInput = document.getElementById('updateValue').value;

    const fetch_url = `http://localhost:3000/authtest/update/${postIdNumber}`;
    const accessToken = localStorage.getItem('SessionToken');

    let authInputData = {
        authTestData: {
            item: authTestDataInput
        }
    };
    const response = fetch(fetch_url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify(authInputData)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            var myItem = document.getElementById('newItemValue');
            myItem.innerHTML = data.authtestdata;
            fetchAllFromAuthRoute();
        });
}


function showCurrentData(e) {
    const fetch_url = `http://localhost:3000/authtest/${e.value}`;
    const accessToken = localStorage.getItem('SessionToken');
    fetch(fetch_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'applicaiton/json',
                'Authorization': accessToken
            }
        })
        .then(response => {
            return response.json();
        })
        .then(response => {
            console.log(response)
            var myItem = document.getElementById('updateValue');
            if (!response) return;
            else myItem.value = response.authtestdata;
        });
}


function deleteItem() {
    let postIdNumber = document.getElementById("deleteNumber").value;

    const fetch_url = `http://localhost:3000/authtest/delete/${postIdNumber}`;
    const accessToken = localStorage.getItem('SessionToken');

    const response = fetch(fetch_url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }
        })
        .then(response => {
            console.log(response);
            fetchAllFromAuthRoute();
        });
}


function fetchFromOneDisplayData() {
    const url = 'http://localhost:3000/authtest/getall';
    const accessToken = localStorage.getItem('SessionToken');

    fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': accessToken
            })
        }).then(
            function (response) {
                return response.json();
            })
        .catch(
            function (error) {
                console.error('Error:', error);
            })
        .then(
            function (response) {
                let text = '';
                var myList = document.querySelector('ul#fourteen');
                while (myList.firstChild) {
                    myList.removeChild(myList.firstChild);
                }

                console.log(response);
                for (r of response) {
                    var listItem = document.createElement('li');
                    var textData = r.id + ' ' + r.authtestdata;
                    listItem.innerHTML = textData;
                    listItem.setAttribute('id', r.id);
                    myList.appendChild(listItem);
                    myList.addEventListener('click', removeItem);
                }
            });
}
