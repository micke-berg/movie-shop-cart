import React from "react";
import Orders from "../Components/Orders/Orders";

const AdminScreen = ({ error }) => {
  if (error) return <div>Something went wrong ...</div>;
    return (
      <div>
        <Orders />
      </div>
    );
}

export default AdminScreen;