const adminContainer = document.querySelector(".admin-container")// as header container for user data
const adminContainerPara = document.querySelector(".admin-container p");// name
const adminContainerImg = document.querySelector(".admin-container img");// avatar
const logout = document.getElementById("logout");// logout button
const contentContainer = document.getElementById("contentContainer"); // users container
// using local storage to save data when clicking on any users and get it's data to use it in header
adminContainer.setAttribute("id", localStorage.getItem("id")) // id we got from choosing in sign in page 
adminContainerPara.textContent = "Hello " + localStorage.getItem('firstName'); // name
adminContainerImg.setAttribute("src", localStorage.getItem('avatar'));// avatar




window.addEventListener("load", 
()=> 
{ // logout function when clicking on logout button to clear local storage to delete all data and id plus send back to def page
    logout.addEventListener("click",()=>{
        localStorage.clear();
        window.location.href='index.html'
    });
    let checkcode = localStorage.getItem("id"); // here is it's check function to get sure each time we redirect to page 
    // it have the id in url if there's no id means u skip steps and write address so it send u back to def page
if (checkcode != null) {
    console.log("well it's safe", checkcode)
} else {
    window.location.href="index.html";
};
})


window.addEventListener("load",
()=> {// getting admin users to dispaly 
    const get3 = {
        method: "get",
        headers : { "content-type" : "application/json; charset=UTF-8" },
        };
    fetch("https://reqres.in/api/users?page=1", get3)
    .then((data) => {
    if (!data.ok) {
        throw Error(data.status);
    }
    return data.json();
    })
    .then((res) => {
    const idarrays3 = (Object.values(res.data)).map((x) => {return x.id});
    const maxid3 = idarrays3.reduce((a, b) => { return Math.max(a, b) });
    const mainUl3 = document.createElement("ul");
    mainUl3.setAttribute('class', 'list-unstyled row');
    contentContainer.appendChild(mainUl3);
    for (let count3 = 0; count3 < maxid3; count3++) {
    // w explained before most of these data how it comes and how we dealt that code 
    // we will explain new ui things that will be extra in this page
        let liId3 = (Object.values(res.data)[count3]).id;
        let liName3 = (Object.values(res.data)[count3]).first_name;
        let liAvatar3 = (Object.values(res.data)[count3]).avatar;
        const secLi3 = document.createElement('li');
        secLi3.setAttribute('id', `${liId3}`)
        secLi3.setAttribute('class', 'user row col-12')
        secLi3.innerHTML = `<div class="text-center col-2"><img src=${liAvatar3} id=${liId3} /> <p id=${liId3}> ${liName3} </p> </div>
        <div class="dynamic-content col-3">
           <select id="mySelect${liId3}" >
           <option class="option${liId3}" value="none" Selected="selected" disabled >  evaluation </option>
           <option class="option${liId3}" value="Bad"> Bad </option>
           <option class="option${liId3}" value="Good"> Good </option>
           <option class="option${liId3}" value="Excellent"> Excellent </option>
           </select>
        </div>
        <div class="dynamic-content">
        <p id="perRev${liId3}"></p>
        </div>
        <div class="dynamic-content feedbacks col-4">
        <h3> feedback </h3>
        <button id="viewFeedback${liId3}" class="btn btn-outline-success">View</button>
        <button id="addFeedback${liId3}" class="btn btn-outline-primary">Add</button>
        <button id="delete${liId3}" name=${liId3} class="btn btn-outline-danger">delete User</button>
        </div>
        <div id="myModal4${liId3}" class="modal">
                <div class="modal-content">
                    <div>
                        <p> this trial feed back for ${liName3}</p>
                        <p id="perFed${liId3}"></p>
                    </div>
                    <button id="closeModal${liId3}" class="btn btn-danger close"> X </button>
                </div>
            </div>
            <div id="myModal5${liId3}" class="modal">
                <div class="modal-content">
                    <div>
                        <textarea id="newFed${liId3}" value="" class="textArea-edit" placeholder="add your feed back"></textarea>
                    </div>
                    <button id="sumbit${liId3}" class="btn btn-danger sumbit"> sumbit </button>
                </div>
                
            </div>
        `
        mainUl3.appendChild(secLi3);
        let mainSelect = document.querySelector(`#mySelect${liId3}`); // select for performance reviews 
        mainSelect.addEventListener("change", (e)=> { // put dynamic content into p inside area of showing performance review
            // and each time we change the select it changes in showing in ui but in extra we put name of user that choose 
            document.getElementById(`perRev${liId3}`).textContent= `${e.target.value} it's reviewed by ${localStorage.getItem('firstName')}`
        });
        let myModal4 = document.getElementById(`myModal4${liId3}`); // this one for viewing feedbacks show when click on view
        let viewFed = document.getElementById(`viewFeedback${liId3}`); // view buttong to popup modal
        let closeModal = document.getElementById(`closeModal${liId3}`); // close button to popup modal
        let myModal5 = document.getElementById(`myModal5${liId3}`);// modal for sumbiting new feed back
        let addFed = document.getElementById(`addFeedback${liId3}`); // add feed back that showing popup modal that has textarea
        let sumbitFed = document.getElementById(`sumbit${liId3}`); // sumbit button to save feedback in the first popup
        let newFed = document.getElementById(`newFed${liId3}`); // container for new feedback
        let perFed = document.getElementById(`perFed${liId3}`); // container for the static content of feedback
        let deleteUser = document.getElementById(`delete${liId3}`); // delete user button
                       // showing and hiding modals depending on clicks on buttons 
        viewFed.addEventListener("click", ()=> {
            myModal4.style.display = "block";
        })
        closeModal.addEventListener("click", ()=> {
            myModal4.style.display = "none";
        })
        addFed.addEventListener("click", ()=> {
            myModal5.style.display = "block";
        })
        sumbitFed.addEventListener("click", ()=> {
            myModal5.style.display = "none";
            myModal4.style.display = "block";
            // inserting text area value inside container and user name who authencated to give feedback
            perFed.textContent = `${newFed.value} this feedback added by ${localStorage.getItem('firstName')}`
            addFed.setAttribute('disabled', "disabled") // disabling readding feedbacks after first one
        })
        // deleting users through api call through fake api 
        deleteUser.addEventListener("click", (e)=>{
            fetch('https://reqres.in/api/users/' + e.target.name ,  {
                method: 'DELETE'
              }).then(// hiding element from ui as fake api didn't work for deleting
                  secLi3.style.display = "none"   
              )
        })
}})
    .catch((error) => {
    console.log(error);
    });
    
    { // then we completing in displaying the employee users through get request for page2 
        const get3 = {
            method: "get",
            headers : { "content-type" : "application/json; charset=UTF-8" },
            };
        fetch("https://reqres.in/api/users?page=2", get3)
        .then((data) => {
        if (!data.ok) {
            throw Error(data.status);
        }
        return data.json();
        })
        .then((res) => {
        const idarrays3 = (Object.values(res.data)).map((x) => {return x.id});
        const maxid3 = idarrays3.reduce((a, b) => { return Math.max(a, b) });
        const mainUl3 = document.createElement("ul");
        mainUl3.setAttribute('class', 'list-unstyled row');
        contentContainer.appendChild(mainUl3);
        for (let count3 = 0; count3 < maxid3; count3++) {
        
            let liId3 = (Object.values(res.data)[count3]).id;
            let liName3 = (Object.values(res.data)[count3]).first_name;
            let liAvatar3 = (Object.values(res.data)[count3]).avatar;
            const secLi3 = document.createElement('li');
            secLi3.setAttribute('id', `${liId3}`)
            secLi3.setAttribute('class', 'user row col-12')
            secLi3.innerHTML = `<div class="text-center col-2"><img src=${liAvatar3} id=${liId3} /> <p id=${liId3}> ${liName3} </p> </div>
            <div class="dynamic-content col-3">
               <select id="mySelect${liId3}" >
               <option class="option${liId3}" value="none" Selected="selected" disabled >  evaluation </option>
               <option class="option${liId3}" value="Bad"> Bad </option>
               <option class="option${liId3}" value="Good"> Good </option>
               <option class="option${liId3}" value="Excellent"> Excellent </option>
               </select>
            </div>
            <div class="dynamic-content">
            <p id="perRev${liId3}"></p>
            </div>
            <div class="dynamic-content feedbacks col-4">
            <h3> feedback </h3>
            <button id="viewFeedback${liId3}" class="btn btn-outline-success">View</button>
            <button id="addFeedback${liId3}" class="btn btn-outline-primary">Add</button>
            <button id="delete${liId3}" name=${liId3} class="btn btn-outline-danger">delete User</button>
            </div>
            <div id="myModal4${liId3}" class="modal">
                    <div class="modal-content">
                        <div>
                            <p> this trial feed back for ${liName3}</p>
                            <p id="perFed${liId3}"></p>
                        </div>
                        <button id="closeModal${liId3}" class="btn btn-danger close"> X </button>
                    </div>
                </div>
                <div id="myModal5${liId3}" class="modal">
                    <div class="modal-content">
                        <div>
                            <textarea id="newFed${liId3}" value="" class="textArea-edit" placeholder="add your feed back"></textarea>
                        </div>
                        <button id="sumbit${liId3}" class="btn btn-danger sumbit"> sumbit </button>
                    </div>
                    
                </div>
            `
            mainUl3.appendChild(secLi3);
            let mainSelect = document.querySelector(`#mySelect${liId3}`);
            mainSelect.addEventListener("change", (e)=> {
                document.getElementById(`perRev${liId3}`).textContent= `${e.target.value} it's reviewed by ${localStorage.getItem('firstName')}`
            });
            let myModal4 = document.getElementById(`myModal4${liId3}`);
            let viewFed = document.getElementById(`viewFeedback${liId3}`); 
            let closeModal = document.getElementById(`closeModal${liId3}`);
            let myModal5 = document.getElementById(`myModal5${liId3}`);
            let addFed = document.getElementById(`addFeedback${liId3}`); 
            let sumbitFed = document.getElementById(`sumbit${liId3}`);
            let newFed = document.getElementById(`newFed${liId3}`);
            let perFed = document.getElementById(`perFed${liId3}`);
            let deleteUser = document.getElementById(`delete${liId3}`);
                           
            viewFed.addEventListener("click", ()=> {
                myModal4.style.display = "block";
            })
            closeModal.addEventListener("click", ()=> {
                myModal4.style.display = "none";
            })
            addFed.addEventListener("click", ()=> {
                myModal5.style.display = "block";
            })
            sumbitFed.addEventListener("click", ()=> {
                myModal5.style.display = "none";
                myModal4.style.display = "block";
                perFed.textContent = `${newFed.value} this feedback added by ${localStorage.getItem('firstName')}`
                addFed.setAttribute('disabled', "disabled")
            })
            deleteUser.addEventListener("click", (e)=>{
                fetch('https://reqres.in/api/users/' + e.target.name ,  {
                    method: 'DELETE'
                  }).then(
                      secLi3.style.display = "none"
                  )
            })
    }})
        .catch((error) => {
        console.log(error);
        });
    }
})


  
