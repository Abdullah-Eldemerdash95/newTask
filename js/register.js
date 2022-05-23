// constants 
const Done = document.getElementById("RegisterDone");// reigster button 
const myModal = document.getElementById("myModal");// popup for right register
const myModal2 = document.getElementById("myModal2");// popup for wrong register

window.addEventListener("load", ()=> {
//register-page
Done.addEventListener("click", redirect3)
})

    // redirect3 function is for registering user 
function redirect3() {
    // post request to send data to fake api 
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
    myModal.style.display = "block"; // msg that show registeration went right
  }
)
  .catch((error) => {
    console.log(error);
    myModal2.style.display = "block"; // msg that show registeration went wrong
  });
}