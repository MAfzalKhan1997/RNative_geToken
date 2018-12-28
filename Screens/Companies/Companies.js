import React from 'react';
import { Modal, StyleSheet, TouchableHighlight, TouchableOpacity, View, Alert, Image, } from 'react-native';
import { Container, Content, Button, Text, Form, Item, Input, Label, List, ListItem, Icon, Left, Body, Right, } from 'native-base';
import { Permissions, ImagePicker } from 'expo';

import DateTimePicker from 'react-native-modal-datetime-picker';
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
            // innerModalVisible: false,
            startDateTimePickerVisible: false,
            endDateTimePickerVisible: false,

            images: ['', '', ''],
        };
    }


    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    // setInnerModalVisible(visible) {
    //     this.setState({ innerModalVisible: visible });
    // }
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

    async _pickImage(index) {
        const { images } = this.state;
        let status;

        status = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        let statusCamRoll = status.status;
        console.log("Camera_Roll Permissions: ", statusCamRoll);


        if (statusCamRoll !== "granted") {
            console.log("Requesting Camera_Roll Permissions");
            status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            statusCamRoll = status.status;
        }

        if (statusCamRoll !== "granted") {
            console.log("Permission not granted");
            return;
        }
        console.log("Permission Granted!");

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        // console.log(result);

        if (!result.cancelled) {
            images[index] = result.uri;
            this.setState({ images });
        }
    }

    async _clickImage(index) {
        const { images } = this.state;
        let status;

        status = await Permissions.getAsync(Permissions.CAMERA);
        let statusCam = status.status;
        console.log("Camera Permissions: ", statusCam);

        status = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        let statusCamRoll = status.status;
        console.log("Camera_Roll Permissions: ", statusCamRoll);

        if (statusCam !== "granted") {
            console.log("Requesting Camera Permissions");
            status = await Permissions.askAsync(Permissions.CAMERA);
            statusCam = status.status;
        }

        if (statusCamRoll !== "granted") {
            console.log("Requesting Camera_Roll Permissions");
            status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            statusCamRoll = status.status;
        }

        if (statusCam !== "granted" || statusCamRoll !== "granted") {
            console.log("Permissions not granted");
            return;
        }
        console.log("Permissions Granted!");

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        // console.log(result);

        if (!result.cancelled) {
            images[index] = result.uri;
            this.setState({ images });
        }
    }

    showStartDateTimePicker(visible) {
        this.setState({ startDateTimePickerVisible: visible });
    }

    showEndDateTimePicker(visible) {
        this.setState({ endDateTimePickerVisible: visible });
    }

    handleStartDatePicked = (date) => {
        console.log('A Start Time has been picked: ', date.toLocaleTimeString());
        this.showStartDateTimePicker(false);
    };

    handleEndDatePicked = (date) => {
        console.log('A End Time has been picked: ', date.toLocaleTimeString());
        this.showEndDateTimePicker(false);
    };

    render() {
        let { images } = this.state;
        console.log(images)
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
                                    <Text>Certificates | 3*</Text>
                                    {

                                        images.map((value, index) => {
                                            return (
                                                <TouchableOpacity key={index} onPress={() =>
                                                    Alert.alert(
                                                        'Upload Image',
                                                        'Choose...',
                                                        [
                                                            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                                            { text: 'Camera', onPress: () => this._clickImage(index) },
                                                            { text: 'Gallery', onPress: () => this._pickImage(index) },
                                                        ],
                                                    )
                                                }>

                                                    {images[index] !== '' ?
                                                        <Image source={{ uri: images[index] }} style={{ width: 100, height: 100 }} /> :
                                                        <View style={{ width: 100, height: 100, backgroundColor: '#d7e2f4', paddingHorizontal: 23, paddingVertical: 35 }}>
                                                            <Text>Upload</Text>
                                                        </View>
                                                    }
                                                </TouchableOpacity>
                                            )
                                        })
                                    }

                                    <TouchableOpacity onPress={() => this.showStartDateTimePicker(true)}>
                                        <Text>Start DatePicker</Text>
                                    </TouchableOpacity>
                                    <DateTimePicker
                                        isVisible={this.state.startDateTimePickerVisible}
                                        onConfirm={this.handleStartDatePicked}
                                        onCancel={() => this.showStartDateTimePicker(false)}
                                        mode='time'
                                    // is24Hour={false}
                                    // datePickerModeAndroid='spinner/calendar'
                                    />

                                    <TouchableOpacity onPress={() => this.showEndDateTimePicker(true)}>
                                        <Text>End DatePicker</Text>
                                    </TouchableOpacity>
                                    <DateTimePicker
                                        isVisible={this.state.endDateTimePickerVisible}
                                        onConfirm={this.handleEndDatePicked}
                                        onCancel={() => this.showEndDateTimePicker(false)}
                                        mode='time'
                                    // is24Hour={false}
                                    // datePickerModeAndroid='spinner/calendar'
                                    />

                                    <Item disabled>
                                        {/* <TouchableOpacity onPress={() => this.showStartDateTimePicker(true)}> */}
                                        <Input
                                            value='hello'
                                            disabled placeholder='Disabled Textbox' />
                                        {/* </TouchableOpacity> */}

                                        {/* <TouchableOpacity onPress={() => this.showEndDateTimePicker(true)}>
                                            <Input
                                                value='hello'
                                                disabled placeholder='Disabled Textbox' />
                                        </TouchableOpacity> */}
                                        {/* <Icon name='information-circle' /> */}
                                    </Item>

                                </Form>
                            </View>

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
