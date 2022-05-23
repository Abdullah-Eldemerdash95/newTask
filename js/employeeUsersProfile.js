const employeeContainer = document.querySelector(".employee-container")
const employeeontainerPara = document.querySelector(".employee-container p");
const employeeontainerImg = document.querySelector(".employee-container img");
const logout = document.getElementById("logout");
const contentContainer = document.getElementById("contentContainer");

employeeContainer.setAttribute("id", localStorage.getItem("id"))
employeeContainerPara.textContent = "Hello " + localStorage.getItem('firstName'); 
employeeContainerImg.setAttribute("src", localStorage.getItem('avatar'));




window.addEventListener("load", 
()=> 
{
    logout.addEventListener("click",()=>{
        localStorage.clear();
        window.location.href='index.html'
    });
    let checkcode = localStorage.getItem("id");
if (checkcode != null) {
    console.log("well it's safe", checkcode)
} else {
    window.location.href="index.html";
};
})


window.addEventListener("load",
()=> {// getting employee users to dispaly
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
        <div class="dynamic-content">
        <p id="perRev${liId3}"></p>
        </div>
        <div class="dynamic-content feedbacks col-4">
        <h3> feedback </h3>
        <button id="viewFeedback${liId3}" class="btn btn-outline-success">View</button>
        <button id="addFeedback${liId3}" class="btn btn-outline-primary">Add</button>
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

        let myModal4 = document.getElementById(`myModal4${liId3}`);
        let viewFed = document.getElementById(`viewFeedback${liId3}`); 
        let closeModal = document.getElementById(`closeModal${liId3}`);
        let myModal5 = document.getElementById(`myModal5${liId3}`);
        let addFed = document.getElementById(`addFeedback${liId3}`); 
        let sumbitFed = document.getElementById(`sumbit${liId3}`);
        let newFed = document.getElementById(`newFed${liId3}`);
        let perFed = document.getElementById(`perFed${liId3}`);
                       
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

}})
    .catch((error) => {
    console.log(error);
    });
    
   
})


  
