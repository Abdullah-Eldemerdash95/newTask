// constants
const myModal3 = document.getElementById("myModal3");
const signInNow = document.getElementById("SignInNow");
const adminButton = document.getElementById("adminButton");
const employeeButton = document.getElementById("employeeButton");
const adminRole = document.getElementById("adminRole"); 
const adminUsers = document.getElementById("adminUsers");
const employeeUsers = document.getElementById("employeeUsers");

window.addEventListener("load", ()=> {
    // sign in page 
    signInNow.addEventListener("click", redirect4)
})






//redirect 4 function 
function redirect4() {
    // how to make post request in javascript
    const email = document.getElementById("email1").value;
    const password = document.getElementById("password1").value;
const update = {
    email: email,
    password: password,
    };
    const post = {
    method: "POST",
    headers : { "content-type" : "application/json; charset=UTF-8" },
    body: JSON.stringify(update),
    };

    fetch("https://reqres.in/api/login", post)
    .then((data) => {
    if (!data.ok) {
        throw Error(data.status);
    }
    return data.json();
    })
    .then((update) => {
    console.log(update);
    })
    .then(() => {
    myModal3.style.display = "block";
    })
    .catch((error) => {
    console.log(error);
    });
}

// choosing admin role 
adminButton.addEventListener("click",
()=> {
    adminRole.style.display = "none";
    adminUsers.style.display = "block";
    const get = {
        method: "get",
        headers : { "content-type" : "application/json; charset=UTF-8" },
        };
    fetch("https://reqres.in/api/users?page=1", get)
    .then((data) => {
    if (!data.ok) {
        throw Error(data.status);
    }
    return data.json();
    })
    .then((res) => {
    const idarrays = (Object.values(res.data)).map((x) => {return x.id});
    const maxid = idarrays.reduce((a, b) => { return Math.max(a, b) });
    const mainUl = document.createElement("ul");
    mainUl.setAttribute('class', 'list-unstyled row');
    adminUsers.appendChild(mainUl);
    for (let count = 0; count < maxid; count++) {
    
        let liId = (Object.values(res.data)[count]).id;
        let liName = (Object.values(res.data)[count]).first_name;
        let liAvatar = (Object.values(res.data)[count]).avatar;
        const secLi = document.createElement('li');
        secLi.setAttribute('id', `${liId}`)
        secLi.setAttribute('class', 'admin col-4')
        secLi.innerHTML = `<img src=${liAvatar} id=${liId} /> <p id=${liId}> ${liName} </p> `
        mainUl.appendChild(secLi);
}
return res 
})
.then((respon)=> {
    adminUsersProfile = document.getElementsByClassName('admin');
    console.log(respon)
    adminUsers.addEventListener("click",
    (e)=> {
        if (e.target.class = "admin") {
            let idNum =  e.target.id -1;
            localStorage.setItem('id', idNum );
            localStorage.setItem("firstName",(Object.values(respon.data)[idNum]).first_name);
            localStorage.setItem("avatar",(Object.values(respon.data)[idNum]).avatar);
            window.location.href= `/adminUsersProfile.html?id=${idNum}`;
        }
         
    })
})
    .catch((error) => {
    console.log(error);
    });
})
// choosing employee role 
employeeButton.addEventListener("click",()=> {
    adminRole.style.display = "none";
    employeeUsers.style.display = "block";
    const get = {
        method: "get",
        headers : { "content-type" : "application/json; charset=UTF-8" },
        };
    fetch("https://reqres.in/api/users?page=2", get)
    .then((data) => {
    if (!data.ok) {
        throw Error(data.status);
    }
    return data.json();
    })
    .then((res) => {
    const idarraysE = (Object.values(res.data)).map((x) => {return x.id});
    const maxidE = idarraysE.reduce((a, b) => { return Math.max(a, b) }) -6;
    const mainUlE = document.createElement("ul");
    mainUlE.setAttribute('class', 'list-unstyled row');
    employeeUsers.appendChild(mainUlE);
    for (let countE = 0; countE < maxidE; countE++) {
    console.log((Object.values(res.data)[countE]))
        let liIdE = (Object.values(res.data)[countE]).id;
        let liNameE = (Object.values(res.data)[countE]).first_name;
        let liAvatarE = (Object.values(res.data)[countE]).avatar;
        const secLiE = document.createElement('li');
        secLiE.setAttribute('id', `${liIdE}`)
        secLiE.setAttribute('class', 'employee col-4')
        secLiE.innerHTML = `<img src=${liAvatarE} id=${liIdE} /> <p id=${liIdE}> ${liNameE} </p> `
        mainUlE.appendChild(secLiE);
}
return res
})
.then((respon)=> {
    EmployeeUsersProfile = document.getElementsByClassName('Employee');
    console.log(respon)
    employeeUsers.addEventListener("click",
    (e)=> {
        if (e.target.class = "employee") {
            let idNumE =  e.target.id;
            let arrayNum = idNumE - 7;
            localStorage.setItem('id', idNumE );
            localStorage.setItem("firstName",(Object.values(respon.data)[arrayNum]).first_name);
            localStorage.setItem("avatar",(Object.values(respon.data)[arrayNum]).avatar);
            window.location.href= `/employeeUsersProfile.html?id=${idNumE}`;
        }
         
    })
})
    .catch((error) => {
    console.log(error);
    });
})
