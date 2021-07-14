import React from 'react';
import{Container} from 'react-bootstrap';

// const Layout = (props) => (
//         {/* <NavBar></NavBar> */}
//         <Container>
//             {props.children}
//         </Container>
// );

// export default Layout;

const Layout = (props) => (
    <Container>
        {props.children}
    </Container>
)

export default Layout;