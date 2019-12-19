//jshint esversion:8
function userSignUp() {
    let userName = document.getElementById('userSignUp').value; //1
    let userPass = document.getElementById('passSignUp').value;
    console.log(userName, userPass);

    let newUserData = {
        user: {
            username: userName,
            password: userPass
        }
    }; //2
    fetch('http://localhost:3000/api/user/createuser', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData) //3
    })
        .then(res => res.json())
        .then(json=>{
            console.log(json);
            let token = json.sessionToken;
            localStorage.setItem("SessionToken", token);
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
        .then(res => res.json())
        .then(json => {
            console.log(json);
            // store token variable
            // store token in localstorage with SessionToken = token
            var token = json.sessionToken;
            localStorage.setItem('SessionToken', token);
        });
}

function getSessionToken() {
    let token = localStorage.getItem("SessionToken");
    console.log(token);
}
