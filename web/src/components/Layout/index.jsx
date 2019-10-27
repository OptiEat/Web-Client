import React, {useEffect} from 'react';
import './index.scss'
import Header from '../Header';
function Layout(props) {

    useEffect(() => {
        const script = document.createElement('script');
      
        script.src = "https://developer.edamam.com/attribution/badge.js";
        script.async = true;
      
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);

    return (
        <div className="Layout">
        <Header/>
            <div className="container">
            {props.children}
            </div>
            <footer><div id="edamam-badge" data-color="white"></div></footer>
        </div>
    )
}

export default Layout
