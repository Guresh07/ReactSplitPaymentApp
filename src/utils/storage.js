export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getData = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};


const user ={
  userData:{
    userName:"Tyrion21",
    email:"Tyrion21@gmail.com"
  }
}

localStorage.setItem("currentUser",JSON.stringify(user)||[])