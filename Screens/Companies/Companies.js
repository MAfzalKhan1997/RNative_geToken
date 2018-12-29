import React from 'react';
import { TextInput, Modal, StyleSheet, TouchableHighlight, TouchableOpacity, View, Alert, Image, } from 'react-native';
import { Container, Header, Content, Button, Text, Form, Item, Input, Label, List, ListItem, Icon, Left, Body, Right, } from 'native-base';
import { Permissions, ImagePicker } from 'expo';

import DateTimePicker from 'react-native-modal-datetime-picker';
import { white } from 'ansi-colors';
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
            locModalVisible: false,

            startDateTimePickerVisible: false,
            endDateTimePickerVisible: false,

            companyName: null,
            since: null,
            images: ['', '', ''],
            startTime: 'N/A',
            endTime: 'N/A'
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
        var time = date.toLocaleTimeString()
        console.log('A Start Time has been picked: ', time);
        if (time.slice(0, 2) > 12) {
            this.setState({ startTime: time.slice(0, 2) - 12 + time.slice(2, 5) + ' PM' })
        }
        else
            if (time.slice(0, 2) == 12) {
                this.setState({ startTime: '12' + time.slice(2, 5) + ' PM' })
            }
            else
                if (time.slice(0, 2) == 0) {
                    this.setState({ startTime: '12' + time.slice(2, 5) + ' AM' })
                }
                else
                    this.setState({ startTime: time.slice(0, 5) + ' AM' })

        this.showStartDateTimePicker(false);
    };

    handleEndDatePicked = (date) => {
        var time = date.toLocaleTimeString()
        console.log('A End Time has been picked: ', time);
        if (time.slice(0, 2) > 12) {
            this.setState({ endTime: time.slice(0, 2) - 12 + time.slice(2, 5) + ' PM' })
        }
        else
            if (time.slice(0, 2) == 12) {
                this.setState({ endTime: '12' + time.slice(2, 5) + ' PM' })
            }
            else
                if (time.slice(0, 2) == 0) {
                    this.setState({ endTime: '12' + time.slice(2, 5) + ' AM' })
                }
                else
                    this.setState({ endTime: time.slice(0, 5) + ' AM' })

        this.showEndDateTimePicker(false);
    };


    // convertTime24to12(time24) {
    //     var tmpArr = time24.split(':'), time12;
    //     if (+tmpArr[0] == 12) {
    //         time12 = tmpArr[0] + ':' + tmpArr[1] + ' pm';
    //     } else {
    //         if (+tmpArr[0] == 00) {
    //             time12 = '12:' + tmpArr[1] + ' am';
    //         } else {
    //             if (+tmpArr[0] > 12) {
    //                 time12 = (+tmpArr[0] - 12) + ':' + tmpArr[1] + ' pm';
    //             } else {
    //                 time12 = (+tmpArr[0]) + ':' + tmpArr[1] + ' am';
    //             }
    //         }
    //     }
    //     return time12;
    // }
    setLocModal(visible) {
        this.setModalVisible(false)
        this.setState({ locModalVisible: visible });
    }

    render() {
        let { companyName, since, images, startTime, endTime, } = this.state;
        console.log(images)
        console.log(companyName, since)
        return (
            <Container>
                <Content padder>

                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                        }}>
                        <View>

                            <Form>
                                <Item floatingLabel>
                                    <Label>Company Name</Label>
                                    <Input
                                        onChangeText={(value) => this.setState({ companyName: value })}
                                        value={companyName}
                                    />
                                </Item>
                                <Item floatingLabel>
                                    <Label>Since</Label>
                                    <Input
                                        onChangeText={(value) => this.setState({ since: value })}
                                        value={since}
                                        keyboardType='numeric' />
                                </Item>
                            </Form>

                            <View style={{ padding: 15 }}>
                                <Text>Certificates | 3*</Text>
                                <View style={{ flexWrap: "wrap", flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
                                </View>

                                <Text>Select Timings</Text>
                                <View style={{ flexWrap: "wrap", flexDirection: 'row', alignItems: 'center' }}>

                                    <TouchableOpacity onPress={() => this.showStartDateTimePicker(true)}>
                                        <Text style={{ fontSize: 20 }} >{startTime}</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 20 }} > - </Text>
                                    <TouchableOpacity onPress={() => this.showEndDateTimePicker(true)}>
                                        <Text style={{ fontSize: 20 }} >{endTime}</Text>
                                    </TouchableOpacity>
                                </View>
                                <DateTimePicker
                                    isVisible={this.state.startDateTimePickerVisible}
                                    onConfirm={this.handleStartDatePicked}
                                    onCancel={() => this.showStartDateTimePicker(false)}
                                    mode='time'
                                    is24Hour={false}
                                // datePickerModeAndroid='spinner/calendar'
                                />
                                <DateTimePicker
                                    isVisible={this.state.endDateTimePickerVisible}
                                    onConfirm={this.handleEndDatePicked}
                                    onCancel={() => this.showEndDateTimePicker(false)}
                                    mode='time'
                                    is24Hour={false}
                                // datePickerModeAndroid='spinner/calendar'
                                />

                            </View>

                            <View>
                                <Button full danger
                                    onPress={() => this.setModalVisible(false)}>
                                    <Text>cancel</Text>
                                </Button>
                                <Button full
                                    onPress={() => this.setLocModal(true)}>
                                    <Text>Next</Text>
                                </Button>
                            </View>

                        </View>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.locModalVisible}
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                        }}>
                        <Container>
                            <Header searchBar rounded style={{ backgroundColor: 'white' }}>
                                <Item>
                                    <Icon name="ios-search" />
                                    <Input placeholder="Search Your Place Here" />
                                    <Icon name="ios-pin" />
                                </Item>
                                {/* <Button>
                                    <Text>Search</Text>
                                </Button> */}
                            </Header>

                            <Form>
                                <Item floatingLabel>
                                    <Label>Company Name</Label>
                                    <Input
                                        onChangeText={(value) => this.setState({ companyName: value })}
                                        value={companyName}
                                    />
                                </Item>
                            </Form>

                            <Button full
                                onPress={() => this.setLocModal(false)}>
                                <Text>cancel</Text>
                            </Button>

                            <Button full
                                success onPress={() => this.addCompany()}>
                                <Text>add my company</Text>
                            </Button>


                        </Container>
                    </Modal>

                    <Button block
                        onPress={() => { this.setModalVisible(true) }}>
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
