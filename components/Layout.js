import React from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";
 
const Layout = (props) => {
    return (
        <Container>
            <Header />
            <h1>Im a Header</h1>
            {props.children}
        </Container>
    );
};

export default Layout;