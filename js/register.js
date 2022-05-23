// constants 
const Done = document.getElementById("RegisterDone");
const myModal = document.getElementById("myModal");
const myModal2 = document.getElementById("myModal2");

window.addEventListener("load", ()=> {
//register-page
Done.addEventListener("click", redirect3)
})



    // redirect3 function is for registering user 
function redirect3() {
    // how to make post request in javascript
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
const update = {
    email: email,
    password: password,
  };
  const post = {
    method: "POST",
    headers : { "content-type" : "application/json; charset=UTF-8" },
    body: JSON.stringify(update),
  };

  fetch("https://reqres.in/api/register", post)
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
    myModal.style.display = "block";
  }
)
  .catch((error) => {
    console.log(error);
    myModal2.style.display = "block";
  });
}