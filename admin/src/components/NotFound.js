import React from "react";
import NOT_FOUND from "./../assets/Error.png";
function NotFoundPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden bg-black ">
      <img src={NOT_FOUND} className="w-1/3" alt=""></img>
    </div>
  );
}

export default NotFoundPage;
