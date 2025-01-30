const post = async (e,formData,url) => {
    e.preventDefault();
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("User registered successfully!");
        console.log("Success:", result);
       /* setFormData({
          user_name: "",
          father_name: "",
          mother_name: "",
          dob: "",
          address: "",
          email: "",
          phone: "",
          district: "",
          state: "",
          pincode: "",
          details_id: "",
        });*/
      } else {
        alert(result.error || "Registration failed.");
        console.error("Error:", result);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    }
  };
const post_1 =  ()=>{
  
document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log("Success:", result);
            alert(result.message);
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Registration failed.");
        });
});
  
}

const post_2 = ()=>{
  document.getElementById("user_detail_add").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("http://localhost:3000/user_detail_add", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
}












export {post};