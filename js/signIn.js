// constants
const myModal3 = document.getElementById("myModal3");// pop up to show roles then users
const signInNow = document.getElementById("SignInNow"); // sign in button 
const adminButton = document.getElementById("adminButton"); // admin role button
const employeeButton = document.getElementById("employeeButton"); // employee role button
const adminRole = document.getElementById("adminRole"); // the div that contain both roles 
const adminUsers = document.getElementById("adminUsers"); // div that contain admin users
const employeeUsers = document.getElementById("employeeUsers"); // div that contain employee users

window.addEventListener("load", ()=> {
    // sign in page 
    signInNow.addEventListener("click", redirect4)
})

//redirect 4 function 
function redirect4() {
    // post request to send data to fake api to confirm and login 
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

// in case of choosing admin role that we clicked on admin button we need to show admin users 
adminButton.addEventListener("click",
()=> {
    adminRole.style.display = "none";// first we hide conatiner that has the 2 roles 
    adminUsers.style.display = "block";// then we show the container for users 
    const get = {
        method: "get",
        headers : { "content-type" : "application/json; charset=UTF-8" },
        }; // here we do a get request for the fake api getting first page of users to be assumed as admin users 
    fetch("https://reqres.in/api/users?page=1", get)
    .then((data) => {
    if (!data.ok) {
        throw Error(data.status);
    }
    return data.json();
    })
    .then((res) => { // now we will loop through data but we need max time to loop 
    const idarrays = (Object.values(res.data)).map((x) => {return x.id}); // we get array of ids 
    const maxid = idarrays.reduce((a, b) => { return Math.max(a, b) }); // we get the max value of these ids 
    const mainUl = document.createElement("ul"); // we create ul element to put li of users inside it 
    mainUl.setAttribute('class', 'list-unstyled row'); // we give it class atribute value 
    adminUsers.appendChild(mainUl); // we inserted inside dom then we loop to generate li inside it 
    for (let count = 0; count < maxid; count++) {
    // here id is starting @0 so we count from zero and make condition < 6 max id 
        let liId = (Object.values(res.data)[count]).id;// we get li id for each user 
        let liName = (Object.values(res.data)[count]).first_name; // we get li name for each user 
        let liAvatar = (Object.values(res.data)[count]).avatar; // we get li avatar for each user 
        const secLi = document.createElement('li'); // then we create li 
        secLi.setAttribute('id', `${liId}`) // set id attribute that we got from looping    
        secLi.setAttribute('class', 'admin col-4') // set class admin to control users that as admin
        // then we start to put all html we need to show in ui inside li we created with dynamic data from looping 
        secLi.innerHTML = `<img src=${liAvatar} id=${liId} /> <p id=${liId}> ${liName} </p> `
        mainUl.appendChild(secLi); // then we append li inside ul we created before 
}
return res 
})
.then((respon)=> {// if we clicked on any user we get from it id and name and avatar and send it by localstorage
    // so i can use it in profile user page in header to show this data 
    adminUsers.addEventListener("click",
    (e)=> {
        if (e.target.class = "admin") {
            let idNum =  e.target.id -1; // we only did that to make sure that id is equal to array order number
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
// choosing employee role // comments are the same but only here we get request page 2 as employee users
// we could do things in variables and functions but for faster moving and low size we go it as copying 
// plus in fake api we don't have the control in real api it's more controllable and easier to deal with
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
    employeeUsers.addEventListener("click",
    (e)=> {
        if (e.target.class = "employee") {
            let idNumE =  e.target.id; 
            let arrayNum = idNumE - 7; // we change it here to represent the actual array order number of elements
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
