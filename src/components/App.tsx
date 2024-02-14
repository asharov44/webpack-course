import classes from "./App.module.scss"
import {Link, Outlet} from "react-router-dom";
export const App = () => {

  return (
      <div className={classes.app}>
        <Link to="/shop">shop</Link>
        <br/>
        <Link to="/about">about</Link>
        <br/>
        HELLO
        <Outlet/>
      </div>
  );
};
