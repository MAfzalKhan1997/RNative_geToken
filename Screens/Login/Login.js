import React from 'react';
// import { View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

export default class Login extends React.Component {
    render() {
        return (
            <Container>
                <Content padder>
                    <Button>
                        <Text>Click Me!</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}