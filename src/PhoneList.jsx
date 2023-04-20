import Card from "@mui/material/Card";
import { useState } from "react";
import { useEffect } from "react";

export function PhoneList() {
  const [mobileList, setMobileList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/mobiles")
      .then((res) => res.json())
      .then((data) => setMobileList(data));
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
