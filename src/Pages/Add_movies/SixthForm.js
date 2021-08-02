import React, { Component } from 'react';
import { Form } from "usetheform";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import video from "./video_logo.jpeg";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

let repFileInit = {
    rep_banner_1: '',
    rep_banner_2: '',
    rep_screenshot_1: '',
    rep_screenshot_2: '',
    rep_screenshot_3: '',
    rep_screenshot_4: '',
    rep_trailer1: '',
    rep_trailer2: '',
    rep_movie: ''
}

let isFileInit = {
    file_banner_1: false,
    file_banner_2: false,
    file_screenshot_1: false,
    file_screenshot_2: false,
    file_screenshot_3: false,
    file_screenshot_4: false,
    file_trailer1: false,
    file_trailer2: false,
    file_movie: false
}

let isErrorInit = {
    error_banner_1: '',
    error_banner_2: '',
    error_screenshot_1: '',
    error_screenshot_2: '',
    error_screenshot_3: '',
    error_screenshot_4: '',
    error_trailer1: '',
    error_trailer2: '',
    error_movie: ''
}

export class SixthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileData: {},
            fileNameData: {},
            uploadId: '',
            addMovie_msg: '',
            loader: false,
            upload: 0,
            uploadTitle: '',
            repFile: repFileInit,
            isFile: isFileInit,
            isError: isErrorInit
        }
    }

    onChangeFileHandler = (e) => {
        if (e.target.files[0]) {
            let typeArr = e.target.files[0].type.split('/');
            let type = typeArr[0];
            let fileKey = 'rep_' + e.target.name;
            let showKey = 'file_' + e.target.name;
            let errorKey = 'error_' + e.target.name;

            if (e.target.name === 'banner_1' || e.target.name === 'banner_2' || e.target.name === 'screenshot_1' || e.target.name === 'screenshot_2' || e.target.name === 'screenshot_3' || e.target.name === 'screenshot_4') {
                if (type === 'image') {
                    this.setState({
                        fileData: { ...this.state.fileData, [e.target.name]: e.target.files[0] },
                        repFile: { ...this.state.repFile, [fileKey]: URL.createObjectURL(e.target.files[0]) },
                        isFile: { ...this.state.isFile, [showKey]: true },
                        isError: { ...this.state.isError, [errorKey]: '' }
                    })
                } else {
                    e.target.value = null;
                    this.setState({
                        isError: { ...this.state.isError, [errorKey]: 'Please upload any image file' }
                    })
                }
            } else {
                if (type === 'video') {
                    let fileSelected = e.target.files[0];
                    let fileName = fileSelected.name;
                    this.setState({
                        fileData: { ...this.state.fileData, [e.target.name]: fileSelected },
                        fileNameData:{...this.state.fileNameData, [e.target.name]:fileName},
                        repFile: { ...this.state.repFile, [fileKey]: video },
                        isFile: { ...this.state.isFile, [showKey]: true },
                        isError: { ...this.state.isError, [errorKey]: '' }
                    })
                } else {
                    e.target.value = null;
                    this.setState({
                        isError: { ...this.state.isError, [errorKey]: 'Please upload any video file' }
                    })
                }
            }
        }
    }


    removeFile = (name) => {
        let fileKey = 'rep_' + name;
        let showKey = 'file_' + name;
        let errorKey = 'error_' + name;
        this.setState({
            fileData: { ...this.state.fileData, [name]: null },
            repFile: { ...this.state.repFile, [fileKey]: null },
            isFile: { ...this.state.isFile, [showKey]: false },
            isError: { ...this.state.isError, [errorKey]: '' }
        })
    }

    onSubmitHandler = async (e) => {
        e.preventDefault();
        this.setState({ ...this.state, loader: true });
        let banner_one = new FormData();
        banner_one.append('txt_banner1', this.state.fileData.banner_1);
        banner_one.append('num_movie_id', localStorage.getItem('movie_id'));

        let banner_two = new FormData();
        banner_two.append('txt_banner2', this.state.fileData.banner_2);
        banner_two.append('num_movie_id', localStorage.getItem('movie_id'));

        let screenshot_one = new FormData();
        screenshot_one.append('txt_screenshot1', this.state.fileData.screenshot_1);
        screenshot_one.append('num_movie_id', localStorage.getItem('movie_id'));

        let screenshot_two = new FormData();
        screenshot_two.append('txt_screenshot2', this.state.fileData.screenshot_2);
        screenshot_two.append('num_movie_id', localStorage.getItem('movie_id'));

        let screenshot_three = new FormData();
        screenshot_three.append('txt_screenshot3', this.state.fileData.screenshot_3);
        screenshot_three.append('num_movie_id', localStorage.getItem('movie_id'));

        let screenshot_four = new FormData();
        screenshot_four.append('txt_screenshot4', this.state.fileData.screenshot_4);
        screenshot_four.append('num_movie_id', localStorage.getItem('movie_id'));



        this.setState({uploadTitle: "banner1 is uploading"});
        await axios.post('https://www.api3.digimovieplex.com/api/upload_banner1', banner_one).then((response) => {
            if (response.data.status === "success") {
                this.videoUpload('trailer1').then((resTrailer1) => {
                    if(resTrailer1.status === "success"){
                        this.videoUpload('movie').then((resMovie) => {
                            if(resMovie.status === "success"){
                                axios.post('https://www.api3.digimovieplex.com/api/upload_banner2', banner_two);
                                axios.post('https://www.api3.digimovieplex.com/api/upload_screenshot1', screenshot_one);
                                axios.post('https://www.api3.digimovieplex.com/api/upload_screenshot2', screenshot_two);
                                axios.post('https://www.api3.digimovieplex.com/api/upload_screenshot3', screenshot_three);
                                axios.post('https://www.api3.digimovieplex.com/api/upload_screenshot4', screenshot_four);
                                if(this.state.fileNameData.trailer2){
                                    this.videoUpload('trailer2').then((resTrailer2)=>{
                                        if(resTrailer2.status === "success"){
                                            this.setState({ addMovie_msg: 'Movie uploadation is successful', loader: false }, () => {
                                                setTimeout(() => {
                                                    this.props.next()
                                                }, 500)
                                            });
                                        }
                                    })
                                }else{
                                    this.setState({ addMovie_msg: 'Movie uploadation is successful', loader: false }, () => {
                                        setTimeout(() => {
                                            this.props.next()
                                        }, 500)
                                    });
                                }
                                
                            }else{
                                this.setState({ addMovie_msg: 'Sorry, Banner_1 and Trailer_1 uploadation is success, but Movie uploadation is fail', loader: false });
                            }
                        })
                    }else{
                        this.setState({ addMovie_msg: 'Sorry, Banner_1 uploadation is success, but Trailer_1 uploadation is fail', loader: false });
                    }
                })
            } else {
                this.setState({ addMovie_msg: 'Sorry, banner1 uploadation is fail', loader: false });
            }
        })


       
    }

    videoUpload = async(fname) => {
        this.setState({uploadTitle: `${fname} uploading started`})
        const params = {
            num_movie_id : localStorage.getItem('movie_id'),
            col_name: `txt_${fname}`,
            fileName: (this.state.fileNameData[fname])? this.state.fileNameData[fname] : '',
            fileType: (this.state.fileData[fname])? this.state.fileData[fname].type : ''
        };
        
        // let start_upload = await axios.get(`https://www.api3.digimovieplex.com/start-upload`, {params}).then((resp)=>{
        //     let { uploadId } = resp.data
        //     this.setState({ uploadId : uploadId})
        // })
        let start_upload = await axios.get(`https://www.api3.digimovieplex.com/start-upload`, {params})
        console.log(start_upload.data);
        let { uploadId } = start_upload.data
             this.setState({ uploadId : uploadId})
        console.log("aaaaaaaaaaa",this.state.fileNameData[fname])
        if(this.state.fileNameData[fname]){
            console.log("abhinabatrue")
            return this.uploadMultipartFile(fname);
        }else{
            console.log("abhinabafalse")
            return start_upload.data;
        }

    
    }



    async uploadMultipartFile(fname) {
        try {
          console.log('Inside uploadMultipartFile')
          const CHUNK_SIZE = 10000000 // 10MB
          const fileSize = this.state.fileData[fname].size
          const CHUNKS_COUNT = Math.floor(fileSize / CHUNK_SIZE) + 1
          let promisesArray = []
          let start, end, blob
          
            console.log('fileSize : ', fileSize);

          for (let index = 1; index < CHUNKS_COUNT + 1; index++) {
            start = (index - 1) * CHUNK_SIZE
            end = (index) * CHUNK_SIZE
            blob = (index < CHUNKS_COUNT) ? this.state.fileData[fname].slice(start, end) : this.state.fileData[fname].slice(start)

            console.log(`uid${index} : `,this.state.uploadId)
            console.log('params2 : ',this.state.fileNameData[fname], index, this.state.uploadId)
    
            // Get presigned URL for each part
            let getUploadUrlResp = await axios.get(`https://www.api3.digimovieplex.com/get-upload-url`, {
              params: {
                fileName: this.state.fileNameData[fname],
                partNumber: index,
                uploadId: this.state.uploadId
              }
            })

            
    
            let { presignedUrl } = getUploadUrlResp.data
            console.log('   Presigned URL ' + index + ': ' + presignedUrl + ' filetype ' + this.state.fileData[fname].type)
    
            // Send part aws server
            let uploadResp = axios.put(presignedUrl, blob, {
              headers: {
                'Content-Type': this.state.fileData[fname].type
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
              num_movie_id : localStorage.getItem('movie_id'),
              col_name: `txt_${fname}`,
              fileName: this.state.fileNameData[fname],
              parts: uploadPartsArray,
              uploadId: this.state.uploadId
            }
          })
          
          return completeUploadResp.data;
    
        } catch (err) {
          return false
        }
    }

    async componentDidMount() {
        if (localStorage.getItem('movie_id')) {
            let movie_id = localStorage.getItem('movie_id');
            await axios.post('https://www.api3.digimovieplex.com/api/getMovieLinkDetails', { movie_id }).then((res) => {
                //console.log(res);
                if (res.data.status === 'success') {
                    if (res.data.response.txt_banner1 !== '' && res.data.response.txt_banner1 !== null) {
                        this.setState({
                            repFile: { ...this.state.repFile, rep_banner_1: `https://www.api3.digimovieplex.com/${res.data.response.txt_banner1}` },
                            isFile: { ...this.state.isFile, file_banner_1: true },

                        })
                    }

                    if (res.data.response.txt_banner2 !== '' && res.data.response.txt_banner2 !== null) {
                        this.setState({
                            repFile: { ...this.state.repFile, rep_banner_2: `https://www.api3.digimovieplex.com/${res.data.response.txt_banner2}` },
                            isFile: { ...this.state.isFile, file_banner_2: true },

                        })
                    }

                    if (res.data.response.txt_screenshot1 !== '' && res.data.response.txt_screenshot1 !== null) {
                        this.setState({
                            repFile: { ...this.state.repFile, rep_screenshot_1: `https://www.api3.digimovieplex.com/${res.data.response.txt_screenshot1}` },
                            isFile: { ...this.state.isFile, file_screenshot_1: true },
                        })
                    }

                    if (res.data.response.txt_screenshot2 !== '' && res.data.response.txt_screenshot2 !== null) {
                        this.setState({
                            repFile: { ...this.state.repFile, rep_screenshot_2: `https://www.api3.digimovieplex.com/${res.data.response.txt_screenshot2}` },
                            isFile: { ...this.state.isFile, file_screenshot_2: true },
                        })
                    }

                    if (res.data.response.txt_screenshot3 !== '' && res.data.response.txt_screenshot3 !== null) {
                        this.setState({
                            repFile: { ...this.state.repFile, rep_screenshot_3: `https://www.api3.digimovieplex.com/${res.data.response.txt_screenshot3}` },
                            isFile: { ...this.state.isFile, file_screenshot_3: true },
                        })
                    }

                    if (res.data.response.txt_screenshot4 !== '' && res.data.response.txt_screenshot4 !== null) {
                        this.setState({
                            repFile: { ...this.state.repFile, rep_screenshot_4: `https://www.api3.digimovieplex.com/${res.data.response.txt_screenshot4}` },
                            isFile: { ...this.state.isFile, file_screenshot_4: true },
                        })
                    }

                    if (res.data.response.txt_trailer1 !== '' && res.data.response.txt_trailer1 !== null) {
                        this.setState({
                            repFile: { ...this.state.repFile, rep_trailer1: video },
                            isFile: { ...this.state.isFile, file_trailer1: true },
                        })
                    }

                    if (res.data.response.txt_trailer2 !== '' && res.data.response.txt_trailer2 !== null) {
                        this.setState({
                            repFile: { ...this.state.repFile, rep_trailer2: video },
                            isFile: { ...this.state.isFile, file_trailer2: true },
                        })
                    }

                    if (res.data.response.txt_movie !== '' && res.data.response.txt_movie !== null) {
                        this.setState({
                            repFile: { ...this.state.repFile, rep_movie: video },
                            isFile: { ...this.state.isFile, file_movie: true },
                        })
                    }
                }
            })
        }
    }

    render() {
        //console.log(localStorage.getItem('movie_id'));
        return (
            <Form name="page6" {...this.props}>
                <p>Read these before you start. You will need to keep some image and video files ready.</p>
                <ul>
                    <li>Type the movie name carefully. You are not allowed to change the movie name later.</li>
                    <li>Select genre carefully. You are not allowed to change the genre later.</li>
                    <li>Give proper censor data. Upload censor certificate if you have it.</li>
                    <li>Synopsis is required. Providing synopsis will help us to better understand your movie.</li>
                    <li>Cast and crew data is required. Providing cast-and-crew data will help us to understand the star-cast in your movie.</li>
                    <li>One Banner of size  460(Vertical) x 300 (Horizontal) is required.</li>
                    <li>One Banner file is mandatory.</li>
                    <li>One Trailer file is mandatory.</li>
                    <li> Movie file is mandatory.</li>
                </ul>
                <hr />
                <h2>Movie links </h2>
                <Grid container spacing={2}>
                    <Grid className="add_image" container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            {(this.state.isFile.file_banner_1) ?
                                <>
                                    <img style={{ width: "300px", height: "160px" }} src={this.state.repFile.rep_banner_1} />
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={() => this.removeFile('banner_1')}>Remove File</button>
                                    </div>
                                </>
                                :
                                <>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="file" accept="video/image/*" name="banner_1" label="Banner 1" id="castsss"
                                        onChange={this.onChangeFileHandler}
                                    />
                                    <p className="instructions" >Banner should be 460(V) x 300(H) in size</p>
                                </>
                            }
                            <span style={{ color: '#ff0000', fontSize: '10px' }}>{this.state.isError.error_banner_1 && this.state.isError.error_banner_1}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {(this.state.isFile.file_banner_2) ?
                                <>
                                    <img style={{ width: "300px", height: "160px" }} src={this.state.repFile.rep_banner_2} />
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={() => this.removeFile('banner_2')}>Remove File</button>
                                    </div>
                                </>
                                :
                                <>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="file" accept="video/image/*" name="banner_2" label="Banner 2" id="castsss"
                                        onChange={this.onChangeFileHandler}
                                    />
                                    <p className="instructions" >Banner should be 460(V) x 300(H) in size</p>
                                </>
                            }
                            <span style={{ color: '#ff0000', fontSize: '10px' }}>{this.state.isError.error_banner_2 && this.state.isError.error_banner_2}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {(this.state.isFile.file_screenshot_1) ?
                                <>
                                    <img style={{ width: "300px", height: "160px" }} src={this.state.repFile.rep_screenshot_1} />
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={() => this.removeFile('screenshot_1')}>Remove File</button>
                                    </div>
                                </>
                                :
                                <>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="file" accept="video/image/*" name="screenshot_1" label="Screenshot 1" id="castsss"
                                        onChange={this.onChangeFileHandler}
                                    />
                                      <p className="instructions" >Screenshot should be 460(V) x 300(H) in size</p>
                                </>
                            }
                            <span style={{ color: '#ff0000', fontSize: '10px' }}>{this.state.isError.error_screenshot_1 && this.state.isError.error_screenshot_1}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {(this.state.isFile.file_screenshot_2) ?
                                <>
                                    <img style={{ width: "300px", height: "160px" }} src={this.state.repFile.rep_screenshot_2} />
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={() => this.removeFile('screenshot_2')}>Remove File</button>
                                    </div>
                                </>
                                :
                                <>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="file" accept="video/image/*" name="screenshot_2" label="Screenshot 2" id="castsss"
                                        onChange={this.onChangeFileHandler}
                                    />
                                    <p className="instructions" >Screenshot should be 460(V) x 300(H) in size</p>
                                </>
                            }
                            <span style={{ color: '#ff0000', fontSize: '10px' }}>{this.state.isError.error_screenshot_2 && this.state.isError.error_screenshot_2}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {(this.state.isFile.file_screenshot_3) ?
                                <>
                                    <img style={{ width: "300px", height: "160px" }} src={this.state.repFile.rep_screenshot_3} />
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={() => this.removeFile('screenshot_3')}>Remove File</button>
                                    </div>
                                </>
                                :
                                <>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="file" accept="video/image/*" name="screenshot_3" label="Screenshot 3" id="castsss"
                                        onChange={this.onChangeFileHandler}
                                    />
                                    <p className="instructions" >Screenshot should be 460(V) x 300(H) in size</p>
                                </>
                            }
                            <span style={{ color: '#ff0000', fontSize: '10px' }}>{this.state.isError.error_screenshot_3 && this.state.isError.error_screenshot_3}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {(this.state.isFile.file_screenshot_4) ?
                                <>
                                    <img style={{ width: "300px", height: "160px" }} src={this.state.repFile.rep_screenshot_4} />
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={() => this.removeFile('screenshot_4')}>Remove File</button>
                                    </div>
                                </>
                                :
                                <>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="file" accept="video/image/*" name="screenshot_4" label="Screenshot 4" id="castsss"
                                        onChange={this.onChangeFileHandler}
                                    />
                                    <p className="instructions" >Screenshot should be 460(V) x 300(H) in size</p>
                                </>
                            }
                            <span style={{ color: '#ff0000', fontSize: '10px' }}>{this.state.isError.error_screenshot_4 && this.state.isError.error_screenshot_4}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {(this.state.isFile.file_trailer1) ?
                                <>
                                    <img style={{ width: "300px", height: "160px" }} src={this.state.repFile.rep_trailer1} />
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={() => this.removeFile('trailer1')}>Remove File</button>
                                    </div>
                                </>
                                :
                                <>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="file" accept="video/image/*" name="trailer1" label="Trailer 1" id="castsss"
                                        onChange={this.onChangeFileHandler}
                                    />
                                </>
                            }
                            <span style={{ color: '#ff0000', fontSize: '10px' }}>{this.state.isError.error_trailer1 && this.state.isError.error_trailer1}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {(this.state.isFile.file_trailer2) ?
                                <>
                                    <img style={{ width: "300px", height: "160px" }} src={this.state.repFile.rep_trailer2} />
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={() => this.removeFile('trailer2')}>Remove File</button>
                                    </div>
                                </>
                                :
                                <>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="file" accept="video/image/*" name="trailer2" label="Trailer 2" id="castsss"
                                        onChange={this.onChangeFileHandler}
                                    />
                                </>
                            }
                            <span style={{ color: '#ff0000', fontSize: '10px' }}>{this.state.isError.error_trailer2 && this.state.isError.error_trailer2}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {(this.state.isFile.file_movie) ?
                                <>
                                    <img style={{ width: "300px", height: "160px" }} src={this.state.repFile.rep_movie} />
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={() => this.removeFile('movie')}>Remove File</button>
                                    </div>
                                </>
                                :
                                <>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="file" accept="video/image/*" name="movie" label="Movie" id="castsss"
                                        onChange={this.onChangeFileHandler}
                                    />
                                </>
                            }
                            <span style={{ color: '#ff0000', fontSize: '10px' }}>{this.state.isError.error_movie && this.state.isError.error_movie}</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {this.state.loader ? <div className="loader">
                                <HashLoader color={"green"} />
                                <p>Please wait.. {this.state.uploadTitle}</p>
                            </div> : null}

                        </Grid>
                    </Grid>

                    <h3 className="message">{this.state.addMovie_msg && this.state.addMovie_msg}</h3>


                </Grid>
                <hr />
                <button id="style_button" type="button" onClick={this.props.previous}>Previous Page</button>
                <button id="style_button" type="submit" onClick={this.onSubmitHandler}>Submit and Proceed</button>
            </Form>
        )
    }
}

export default SixthForm;
