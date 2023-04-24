import Card from "@mui/material/Card";
import { useState } from "react";
import { useEffect } from "react";

function checkAuth(res){
  if(res.status==401){
    throw Error ("unauthorized");
  }else{
    return res.json();
  }
}
function logout(){
  localStorage.clear();
  window.location.href = "/";
}
export function PhoneList() {
  const [mobileList, setMobileList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/mobiles",{
      headers:{
       'x-auth-token':localStorage.getItem("token") ,
      },
    })
      .then((res) => checkAuth(res))
      .then((data) => setMobileList(data))
      .catch(err=>logout())
  }, []);

  return (
    <div>
      <h1>Welcome to my Mobile Shop </h1>
      <div className="mobile-list">
        {mobileList.map((mobile, index) => (
          <Phone mobile={mobile} key={index} />
        ))}
      </div>
    </div>
  );
}
function Phone({ mobile }) {
  return (
    <div>
      <Card className="mobile" elevation={3}>
        <img className="img" src={mobile.img} alt={mobile.model} />
        <h1>{mobile.model}</h1>
        <p>{mobile.company}</p>
      </Card>
    </div>
  );
}
