import "./NotFound.css";

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import userStore from "../../Store/userStore";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = userStore();

  useEffect(() => {
    if (location.pathname !== "/404") {
      navigate("/404", { replace: true });
    }
  }, [location.pathname, navigate]);

  const redirect = () => {
    if(user) {
      navigate("/");
    }
    else {
      navigate("/sign-in");
    }
  }

  return (
    <section className="not-found">
      <div className="wrapper">
        <h1>Page Not Found</h1>
        <h6>It seems like you got lost!</h6>
        <button onClick={redirect} className="button-primary">Back to Track</button>
      </div>
    </section>
  );
}
 
export default NotFound;