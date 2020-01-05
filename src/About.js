import React from "react";
import MyHeader from './components/Header';
import MyFooter from './components/Footer';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const About = () => (
    <React.Fragment>
    <CssBaseline />
    <MyHeader/>
        <Container>
        <h2>About</h2>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis orci et est eleifend porttitor id in tellus. Ut libero diam, convallis eget elementum ut, fringilla id nibh. Nullam sodales maximus quam, semper tristique purus porttitor vitae. Maecenas varius, magna quis ullamcorper pharetra, erat turpis scelerisque ligula, non suscipit sem lacus id diam. Fusce tempus odio sed placerat auctor. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean vel dignissim dui, eu tempor sapien. Suspendisse nibh velit, ultrices in accumsan ac, egestas et lorem. In rhoncus mi purus, non consectetur massa scelerisque hendrerit.
        </p>
        </Container>
    <MyFooter/>
    </React.Fragment>
);

export default About;