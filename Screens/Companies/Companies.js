import React from 'react';
import { AsyncStorage, View, Image, } from 'react-native';
import { Container, Content, Button, Text, Form, Item, Input, Label } from 'native-base';
import { Modal, TouchableHighlight, View, Alert } from 'react-native';
import { ImagePicker } from 'expo';

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

            image: null,
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

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    }

    render() {
        let { image } = this.state;

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

                            <Form>
                                <Item floatingLabel>
                                    <Label>Company Name</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel last >
                                    <Label>Since</Label>
                                    <Input keyboardType='numeric' />
                                </Item>

                                <Button full success
                                    onPress={this._pickImage}>
                                    <Text>Pick an image from camera roll</Text>
                                </Button>

                                {/* <Button
                                    title="Pick an image from camera roll"
                                    onPress={this._pickImage}
                                /> */}

                                {image &&
                                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                            </Form>

                            <View>

                                <Button full
                                    onPress={() => this.setModalVisible(false)}>
                                    <Text>cancel</Text>
                                </Button>

                                <Button full
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