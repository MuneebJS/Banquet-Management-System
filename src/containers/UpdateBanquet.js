import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { firebaseApp } from '../firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TimePicker from 'material-ui/TimePicker';
import AppBar from 'material-ui/AppBar';
import { banquetRef, banquetImagesRef } from '../firebase';
import Error from '../components/Error';
import Title from '../components/Title';
import { getUID } from '../lib/helpers';
import FileBase64 from 'react-file-base64';
import * as firebase from 'firebase';
import lodash from 'lodash';
import Loader from '../components/Loader';


// injectTapEventPlugin();
class AddBanquet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeFrom: '',
            rangeTo: '',
            name: '',
            location: '',
            timeTo: '',
            timeFrom: '',
            description: '',
            phoneNumber: '',
            email: '',
            isLoading: true,
            files: [],
            images: [],
            error: {
                message: ''
            },
            isBanquet: false,


        }
        this.saveHandler = this.saveHandler.bind(this);
        // this.uploadImageAsPromise = this.uploadImageAsPromise.bind(this);
        this.getBanquetDetail = this.getBanquetDetail.bind(this);
        this.uplaodFiles = this.uplaodFiles.bind(this);
    }
    componentDidMount() {
        this.getBanquetDetail()
    }

    getBanquetDetail() {
        // const banquetUID = this.props.match.params.uid;
        const banquetUID = getUID('userUID');
        firebase.database().ref('Banquets/' + banquetUID).once('value').then(snapshot => {
            const details = snapshot.val();
            console.log("result banquet details", details);
            if (details) {
                this.setState({
                    isBanquet: true,
                    name: details.name,
                    description: details.description,
                    location: details.location,
                    timeFrom: details.timeFrom,
                    timeTo: details.timeTo,
                    email: details.email,
                    phoneNumber: details.phoneNumber,
                    isLoading: false,
                    images: details.images,
                    userUID: banquetUID,
                    rangeFrom: details.rangeFrom,
                    rangeTo: details.rangeTo
                })
            } else {
                this.setState({
                    isBanquet: false,
                    isLoading: false
                })
            }
            // this.setState({
            //     details: snapshot.val(),
            //     isLoading: false
            // })
        }).catch(error => {
            console.log("error occured", error)
            this.setState({
                isLoading: false,
                isError: true,
            })
        })
    }
    saveHandler() {
        const { name, description, location, timeTo, timeFrom, phoneNumber, email, files, images, rangeFrom, rangeTo } = this.state;
        this.setState({
            isLoading: true,
        })
        const userUID = getUID('userUID');
        const nestedRef = banquetRef.child(userUID + '/');
        let imageFiles = [];
        if (files && files.length > 0) {
            // imageFiles = files;
            lodash.forEach(files, (val) => {
                imageFiles.push({
                    image: val.base64,
                })
            })
        } else {
            imageFiles = images
        }
        nestedRef.set({
            name: name,
            description: description,
            location: location,
            phoneNumber: phoneNumber,
            timeTo: timeTo,
            timeFrom: timeFrom,
            userUID: userUID,
            images: imageFiles,
            email: email,
            rangeFrom: rangeFrom,
            rangeTo: rangeTo
        }).then(result => {
            this.props.history.push('/banquet/dashboad')
        }).catch(error => {
            this.setState({
                error
            })
            console.log("error occured in saving", error);
        })
    }

    getFiles(files) {
        this.setState({ files: files })
    }

    uplaodFiles() {
        //Get files
        const { files } = this.state;
        // console.log("upload files", files);
        const userUID = getUID('userUID');
        const imageFiles = files[0].base64.split(',')[1];
        const imagesRef = firebase.database().ref('BanquetImage');
        const nestedRef = imagesRef.child(userUID + '/');
        nestedRef.set({
            imageBlob: imageFiles,
        }).then(() => {
            this.props.history.push('/')
        }).catch((err) => console.log("error in uploading file", err))

    }

    render() {
        if (this.state.isLoading) return <Loader />;
        if (!this.state.isBanquet) return (
            <div>
                <h3>No banquet is being registered yet Please add your banquet</h3>
                <div style={{ marginTop: '5px', textAlign: 'center' }}>
                    <button className='btn btn-primary' type='button' onClick={() => this.props.history.push("/addBanquet")}>Add Banquet</button>
                </div>
            </div>
        )
        return (
            <MuiThemeProvider>
                <div>
                    <div className='form-block'>
                        <Title>Update Banquet Details</Title>
                        <Error>{this.state.error.message}</Error>
                        <div className='form-group' style={{ marginLeft: '20%', marginRight: '20%' }}>
                            <div> <input className="form-control reg-input" value={this.state.name} type="text" placeholder='Name' onChange={event => this.setState({ name: event.target.value })} /></div>
                            <div> <input className="form-control reg-input" value={this.state.description} type="text" placeholder='Description' onChange={event => this.setState({ description: event.target.value })} /></div>
                            <div> <input className="form-control reg-input" value={this.state.location} type="text" placeholder='Location' onChange={event => this.setState({ location: event.target.value })} /></div>
                            <div>
                                <TimePicker
                                    format="ampm"
                                    hintText="To"
                                    value={this.state.timeTo}
                                    onChange={(e, date) => this.setState({ timeTo: date })}
                                />
                                <TimePicker
                                    format="ampm"
                                    hintText="From"
                                    value={this.state.timeFrom}
                                    onChange={(e, date) => this.setState({ timeFrom: date })}
                                />
                                <FileBase64
                                    multiple={true}
                                    onDone={this.getFiles.bind(this)} />
                            </div>
                            <div> <input className="form-control reg-input" type="number" value={this.state.phoneNumber} placeholder='Phone Number' onChange={event => this.setState({ phoneNumber: event.target.value })} /></div>
                            <div><input className='form-control reg-input' type="email" value={this.state.email} placeholder='Email' onChange={event => this.setState({ email: event.target.value })} /></div>
                            <div> <input className="form-control reg-input" type="number" value={this.state.rangeFrom} placeholder='Range From' onChange={event => this.setState({ rangeFrom: event.target.value })} /></div>
                            <div><input className='form-control reg-input' type="number" value={this.state.rangeTo} placeholder='Range To' onChange={event => this.setState({ rangeTo: event.target.value })} /></div>

                        </div>

                        <div style={{ marginTop: '5px', textAlign: 'center' }}>
                            <button className='btn btn-primary' type='button' onClick={this.saveHandler}>{this.state.isLoading ? "Saving" : "Save"}</button>
                        </div>
                        <Error />
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withRouter(AddBanquet);
