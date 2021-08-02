import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import video from "./video_logo.jpeg";

class UploadPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie_id: '',
            fileSelected: null,
            uploadId: '',
            fileName: '',
            addMovie_msg: '',
            loader: false,
            upload: 0,
            uploadTitle: '',
            repFile: '',
            isFile: false,
            isError: ''
        }
    }

    onChangeFileHandler = (event) => {
        if (event.target.files[0]) {
            let typeArr = event.target.files[0].type.split('/');
            let type = typeArr[0];
            if (type === 'video') {
                let fileSelected = event.target.files[0];
                console.log(fileSelected.size)
                let fileName = fileSelected.name;
                this.setState({
                    fileSelected, fileName,
                    repFile: video,
                    isFile: true,
                    isError: ''
                });
            } else {
                event.target.value = null;
                this.setState({
                    isError: 'Please upload any video file'
                })
            }
        }
    }

    removeFile = () => {
        this.setState({
            fileSelected: null,
            fileName: '',
            repFile: null,
            isFile: false,
            isError: ''
        })
    }

    submitHandler = async (event) => {
        try {
            event.preventDefault()
            const params = {
                num_movie_id: this.state.movie_id,
                col_name: 'txt_livecast',
                fileName: this.state.fileName,
                fileType: this.state.fileSelected.type
            };
            this.setState({ ...this.state, loader: true });
            let sos = await axios.get(`https://www.api3.digimovieplex.com/start-upload`, {params})
            console.log(sos);
            let { uploadId } = sos.data;
            this.setState({ uploadId : uploadId});
            this.uploadMultipartFile().then((res)=>{
                if(res.status === "success"){
                    this.setState({ addMovie_msg: 'Preview uploadation is successful', loader: false })

                }
                let {num_user_id} = (sessionStorage.getItem('auth')) ? JSON.parse(sessionStorage.getItem('auth')) : null ;

                let approveData = {
                    movie_id      :  this.state.movie_id,
                    approval_type : "3",
                    upload_id     : num_user_id
                }
                axios.post('https://www.api3.digimovieplex.com/api/add_approval/',approveData).then((res1) => {
                    if(res1.data.status === 'success'){
                        this.setState({ addMovie_msg: 'Your upload is send to admin approval.', loader: false })
                    }
                });
            })
        } catch (err) {
            console.log(err)
        }
    }

    async uploadMultipartFile() {
        try {
          console.log('Inside uploadMultipartFile')
          const CHUNK_SIZE = 10000000 // 10MB
          const fileSize = this.state.fileSelected.size
          const CHUNKS_COUNT = Math.floor(fileSize / CHUNK_SIZE) + 1
          let promisesArray = []
          let start, end, blob
          
            console.log('fileSize : ', fileSize);

          for (let index = 1; index < CHUNKS_COUNT + 1; index++) {
            start = (index - 1) * CHUNK_SIZE
            end = (index) * CHUNK_SIZE
            blob = (index < CHUNKS_COUNT) ? this.state.fileSelected.slice(start, end) : this.state.fileSelected.slice(start)

            // console.log(`uid${index} : `,this.state.uploadId)
            // console.log('params2 : ',this.state.fileNameData[fname], index, this.state.uploadId)
    
            // Get presigned URL for each part
            let getUploadUrlResp = await axios.get(`https://www.api3.digimovieplex.com/get-upload-url`, {
              params: {
                fileName: this.state.fileName,
                partNumber: index,
                uploadId: this.state.uploadId
              }
            })

            
    
            let { presignedUrl } = getUploadUrlResp.data
            console.log('   Presigned URL ' + index + ': ' + presignedUrl + ' filetype ' + this.state.fileSelected.type)
    
            // Send part aws server
            let uploadResp = axios.put(presignedUrl, blob, {
              headers: {
                'Content-Type': this.state.fileSelected.type
              }
            });
            promisesArray.push(uploadResp)
          }
    
          let resolvedArray = await Promise.all(promisesArray)
          console.log(resolvedArray, ' resolvedAr')
    
          let uploadPartsArray = []
          resolvedArray.forEach((resolvedPromise, index) => {
            uploadPartsArray.push({
              ETag: resolvedPromise.headers.etag,
              PartNumber: index + 1
            })
          })
          
          // CompleteMultipartUpload in the backend server
          let completeUploadResp = await axios.post(`https://www.api3.digimovieplex.com/complete-upload`, {
            params: {
                num_movie_id: this.state.movie_id,
                col_name: 'txt_livecast',
                fileName: this.state.fileName,
                parts: uploadPartsArray,
                uploadId: this.state.uploadId
            }
          })
          
          return completeUploadResp.data;
    
        } catch (err) {
          return false
        }
    }

    componentDidMount() {
        //console.log(this.props.match.params)
        let { id } = this.props.match.params;
        this.setState({
            movie_id: atob(id)
        },()=>{
            console.log(this.state.movie_id)
        })
    }


    render() {
        return (
            <div>
                <h2>Upload Your Preview here.</h2>
                <Grid item xs={12} sm={3} className="add_description">
                    {(this.state.isFile) ?
                        <>
                            <img style={{ width: "300px", height: "160px" }} src={this.state.repFile} />
                            <div style={{ textAlign: "center" }}>
                                <button onClick={this.removeFile}>Remove File</button>
                            </div>
                        </>
                        :
                        <>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="file" accept="video/image/*" name="trailer1" label="Preview" id="castsss"
                                onChange={this.onChangeFileHandler}
                            />
                        </>
                    }
                    <span style={{ color: '#ff0000', fontSize: '10px' }}>{this.state.isError && this.state.isError}</span>
                    
                </Grid>
                <Grid item xs={12} sm={3}>
                            {this.state.loader ? <div className="loader">
                                <HashLoader color={"green"} />
                                <p>Please wait.. {this.state.uploadTitle}</p>
                            </div> : null}

                        </Grid>
                <Link id="style_button" type="button" to={"/"}>Back to Home</Link>
                <button id="style_button"
                    onClick={this.submitHandler}
                    type="submit"
                >
                    <strong>Submit Data</strong>
                </button>
            </div>
        );
    }
}



export default UploadPreview;