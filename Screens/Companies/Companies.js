import React from 'react';
import { TextInput, Modal, StyleSheet, TouchableHighlight, TouchableOpacity, View, Alert, Image, ScrollView } from 'react-native';
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
            endTime: 'N/A',

            searchLocations: [],
            nearLocations: [],
            search: null,
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

    // getLoc() {
    //     const { latitude, longitude } = this.state.myProfile.coords;
    //     // console.log("lat,long", latitude, longitude)

    //     fetch(`https://api.foursquare.com/v2/venues/explore?client_id=1MVO3SD3541GVNH2NO42OXQWNLN502CKOL3GEZR3CT1R3UAI&client_secret=GW511GOZVZYRQFQWW0H5SRKODAX1Y2MHYWVUUMCW004OVGFS&v=20180323&ll=${latitude},${longitude}&radius=5000&limit=5&sortByDistance=1`)
    //         .then((res) => {
    //             // console.log("api", res.json())
    //             return res.json()
    //         }).then(result => {
    //             let { nearLocations } = this.state;
    //             nearLocations = result.response.groups[0].items
    //             // console.log("result", nearLocations)
    //             this.setState({
    //                 nearLocations
    //             })
    //         })
    // }

    async searchLoc(search) {
        // const { searchQuery } = this.state
        // let search = e.target.value
        console.log(search)

        await this.setState({
            search,
        })


        fetch(`https://api.foursquare.com/v2/venues/search?client_id=ASVQG5NV45XVLQH401WI41QZARQPYIJC4EBF3Q3QXY4YJ2ST&client_secret=SCIPOTJRWOT5PGT5ORQPAVEA5LHHMSE40SLO4KSAIKWEH2ZB&v=20180323&query=${search}&ll=24.883460,67.047375&radius=5000`)
            .then((res) => {
                // console.log("api", res)
                return res.json()
            }).then(result => {
                // console.log("result", result.response.venues)
                let { searchLocations } = this.state;
                searchLocations = result.response.venues
                console.log("search result", searchLocations)
                this.setState({
                    searchLocations
                })
            })
    }

    render() {
        let { companyName, since, images, startTime, endTime, searchLocations } = this.state;
        // console.log(images)
        // console.log(companyName, since)
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
                                    <Icon name="close" />
                                    <Input placeholder="Search Your Place Here"
                                        onChangeText={(value) => this.searchLoc(value)}
                                    />
                                    <Icon name="ios-search" />
                                </Item>
                                {/* <Button>
                                    <Text>Search</Text>
                                </Button> */}
                            </Header>
                            <ScrollView>
                                {
                                    searchLocations.map((value, index) => {
                                        return (
                                            <ListItem icon key={index}>
                                                <Left>
                                                    {/* <Button style={{ backgroundColor: "#FF9501" }}> */}
                                                    <Icon name="pin" />
                                                    {/* </Button> */}
                                                </Left>
                                                <Body>
                                                    <Text>{value.name}</Text>
                                                </Body>
                                                <Right>
                                                    <Icon name="arrow-forward" />
                                                </Right>
                                            </ListItem>)
                                    })

                                }
                            </ScrollView>
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
