const url = "https://665736e39f970b3b36c86772.mockapi.io/users";

async function post(user) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await response.json();
}

async function getusers() {
  const response = await fetch(url);
  return await response.json();
}

function check(user) {
  if (user.name.length < 3 || user.password.length < 4) {
    throw " name or password is too short";
  }
}

async function register(name, password, email) {
  const user = {
    name,
    password,
    email,
  };

  check(user);
  const usersE = await getusers();
  usersE.forEach((userE) => {
    if (userE.email === user.email) {
      throw "email is already taken";
    }
  });
  const response = await post(user);

  return  response;
}


async function login(email, password) {

    const usersE = await getusers();
    const user = usersE.find((userE) => userE.email === email && userE.password === password);
    if (!user) {
      throw "email or password is incorrect";
    }
    return user;
  
}

const registerForm = document.querySelector("#register-form");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = registerForm.name.value;
        const password = registerForm.password.value;
        const email = registerForm.email.value;
        try {
            const response = await register(name, password, email);
           location.href = "./login.html";
        } catch (error) {
            alert(error);
        }
    });
}

const loginForm = document.querySelector("#login-form");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
       
        const password = loginForm.password.value;
        const email = loginForm.email.value;
        try {
            const response = await login( email, password);
            localStorage.setItem("user", JSON.stringify(response));
           location.href = "./home.html";
        } catch (error) {
            alert(error);
        }
    });
}

const home = document.querySelector("#home");

if (home) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("name").innerHTML = user.name;
      document.getElementById("logout")
       .addEventListener("click", () => {
            localStorage.removeItem("user");
            location.href = "./login.html";
        });
    } else {
        location.href = "./login.html";

    }


}