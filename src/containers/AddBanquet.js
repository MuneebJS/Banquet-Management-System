import React, { Component } from 'react';
import { Link } from 'react-router-dom'
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

// injectTapEventPlugin();
class AddBanquet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            location: '',
            timeTo: '',
            timeFrom: '',
            description: '',
            phoneNumber: '',
            email: '',
            isLoading: '',
            files: [],
            error: {
                message: ''
            }
        }
        this.saveHandler = this.saveHandler.bind(this);
        this.uploadImageAsPromise = this.uploadImageAsPromise.bind(this);
        this.uplaodFiles = this.uplaodFiles.bind(this);
    }
    componentDidMount() {
        //        // var gsReference = storage.refFromURL('gs://bucket/images/stars.jpg')
        // const userUID = getUID('userUID');
        // const nestedRef = banquetRef.child(userUID + '/');
        // const storage = firebase.storage()
        // const storageRef = storage.ref(`banquetImages/${userUID}`)


        // storageRef.getDownloadURL().then(function (url) {
        //     // `url` is the download URL for 'images/stars.jpg'

        //     // This can be downloaded directly:
        //     var xhr = new XMLHttpRequest();
        //     xhr.responseType = 'blob';
        //     xhr.onload = function (event) {
        //         var blob = xhr.response;
        //     };
        //     xhr.open('GET', url);
        //     xhr.send();
        //     console.log("image urll", url)
        //     // Or inserted into an <img> element:
        //     // var img = document.getElementById('myimg');
        //     // img.src = url;
        // }).catch(function (error) {
        //     // Handle any errors
        // });
    }
    saveHandler() {
        const { name, description, location, timeTo, timeFrom, phoneNumber, email, files } = this.state;
        this.setState({
            isLoading: true,
        })
        const userUID = getUID('userUID');
        const nestedRef = banquetRef.child(userUID + '/');
        let imageFiles = [];
        if (files) {
            // imageFiles = files;
            lodash.forEach(files, (val) => {
                imageFiles.push({
                    image: val.base64,
                })
            })
        }
        nestedRef.set({
            name: name,
            description: description,
            location: location,
            phoneNumber: phoneNumber,
            timeTo: JSON.stringify(timeTo),
            timeFrom: JSON.stringify(timeFrom),
            userUID: userUID,
            images: imageFiles
        }).then(result => {
            this.props.history.push('/list')
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
        // for (var i = 0; i < files.length; i++) {
        //     console.log("from loop")
        //     var imageFiles = files[i].base64.split(',')[1];
        //     this.uploadImageAsPromise(imageFiles);
        // }
    }

    //Handle waiting to upload each file using promise
    uploadImageAsPromise(imageFiles) {
        const _this = this;
        return new Promise(function (resolve, reject) {
            // var storageRef = firebase.storage().ref(fullDirectory + "/" + imageFiles.name);
            const banquetUID = getUID('userUID');
            const nestedRef = banquetImagesRef.child(banquetImagesRef + '/');
            //Upload file
            var task = nestedRef.putString(imageFiles, 'base64');
            console.log("upload image very first before task on")
            //Update progress bar
            task.on('state_changed',
                function progress(snapshot) {
                    // var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    // uploader.value = percentage;
                    console.log("snapshot from progress", snapshot)
                },
                function error(err) {
                    console.log("error during file upload", err)
                },
                function complete() {
                    var downloadURL = task.snapshot.downloadURL;
                    console.log("uplaod image complete", downloadURL);
                    _this.props.history.push('/');
                }
            );
        });
    }


    render() {
        return (
            <MuiThemeProvider>
                <div>

                    <div className='form-block'>
                        <Title>Add Banquet</Title>
                        <Error>{this.state.error.message}</Error>
                        <div className='form-group' style={{ marginLeft: '20%', marginRight: '20%' }}>
                            <div> <input className="form-control reg-input" type="text" placeholder='Name' onChange={event => this.setState({ name: event.target.value })} /></div>
                            <div> <input className="form-control reg-input" type="text" placeholder='Description' onChange={event => this.setState({ description: event.target.value })} /></div>
                            <div> <input className="form-control reg-input" type="text" placeholder='Location' onChange={event => this.setState({ location: event.target.value })} /></div>
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
                            <div> <input className="form-control reg-input" type="text" placeholder='Phone Number' onChange={event => this.setState({ phoneNumber: event.target.value })} /></div>
                            <div><input className='form-control reg-input' type="email" placeholder='Email' onChange={event => this.setState({ email: event.target.value })} /></div>
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

export default AddBanquet;
