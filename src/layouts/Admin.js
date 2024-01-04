
import React, { useEffect } from "react";

import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";

var ps;

function Dashboard(props) {
  const token = localStorage.getItem('mytoken')
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  const [brandName, setbrandName] = React.useState();

  useEffect(() => {
    getBrand()
  })

  const getBrand = () => {
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        // brandname = prop.name;

        setbrandName(prop.name)
      }
      return null;
    });
  };


  return (
    <div className="wrapper">

      {token ?
        <Sidebar
          {...props}
          routes={routes}
          bgColor={backgroundColor}
          activeColor={activeColor}
          brandName={brandName}
        />
        :
       
""
      }
      <div className="main-panel" ref={mainPanel}>
        {token ?
          <DemoNavbar {...props} />
          :
          <>
          <h6>LoginRequired</h6>
         <Link to="/adminlogin">Back to Login</Link>
         </>
        }
        <Switch>
          {token ?
            <>
              {routes.map((prop, key) => {
                return (

                  <Route
                    path={prop.layout + prop.path}
                    component={prop.component}
                    key={key}
                  />

                );
              })}
            </>
            : "fdgfdfdd"}
        </Switch>
        {/* <Footer fluid /> */}
      </div>
      {/* </>
        : <Route path="/adminlogin" render={(props) => <Login {...props} />} />} */}
    </div>
  );
}

export default Dashboard;
