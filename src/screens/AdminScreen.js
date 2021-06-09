import React from "react";
import Orders from "../Components/Orders/Orders";

const AdminScreen = ({ error }) => {
  if (error) return <div>Something went wrong ...</div>;
    return (
      <section>
        <Orders />
      </section>
    );
}

export default AdminScreen;