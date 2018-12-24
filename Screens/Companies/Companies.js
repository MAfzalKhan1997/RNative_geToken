import React from 'react';
// import { AsyncStorage, View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import { Modal, TouchableHighlight, View, Alert } from 'react-native';

// import AuthState from '../../Helper/AuthState'
// import firebase from '../../Config/firebase';

export default class Companies extends React.Component {

    static navigationOptions = {
        title: 'All Companies',
    };

    constructor() {
        super()

        this.state = {
            modalVisible: false,
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    // componentWillMount() {
    //     AuthState()
    //     // this.check()
    // }

    // check = async () => {
    //     const userObject = JSON.parse(await AsyncStorage.getItem('userObject'));
    //     console.log('Home userObject', userObject)
    // }

    addCompany() {
        alert()
    }

    render() {
        return (
            <Container>
                <Content padder>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                        }}>
                        <View>

                            <View
                            // style={{
                            //     flex: 1,
                            //     flexDirection: 'row',
                            //     justifyContent: 'center',
                            //     alignItems: 'stretch',
                            // }}
                            >

                                <Button full
                                    // style={{
                                    //     flex: 1,
                                    //     // flexDirection: 'row',
                                    //     justifyContent: 'center',
                                    //     alignItems: 'center',
                                    // }}
                                    onPress={() => this.setModalVisible(false)}>
                                    <Text>cancel</Text>
                                </Button>
                                <Button full
                                    // style={{
                                    //     flex: 1,
                                    //     // flexDirection: 'row',
                                    //     justifyContent: 'center',
                                    //     alignItems: 'center',
                                    // }}
                                    info onPress={() => this.addCompany()}>
                                    <Text>add my company</Text>
                                </Button>

                            </View>
                        </View>
                    </Modal>


                    <Button block onPress={() => {
                        this.setModalVisible(true)
                    }}>
                        <Text>add</Text>
                    </Button>

                </Content>
            </Container>
        );
    }
}