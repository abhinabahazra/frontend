import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import axios from "axios";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NativeSelect from '@material-ui/core/NativeSelect';
import GoogleLogin from 'react-google-login';
//import Swal from "sweetalert"; 
import Swal from "sweetalert2";
import "./Login.css";
import swal from 'sweetalert';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ close, login, getUserState }) => {
  const classes = useStyles();
  console.log(login)
  const [showLogin, setShowLogin] = useState(login);
  const showSignupScreen = () => {
    setShowLogin(false)
  }

  const showLoginScreen = () => {
    setShowLogin(true)
  }

  /**********otp****************/
  const loginWithOtp = async () => {
    close();
    Swal.fire({
      title: 'Enter your Phone Number',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (mobile) => {
        if (mobile) {
          let mobilePattern = /^[0-9]{10}$/;
          if (mobilePattern.test(mobile)) {
            let data = {
              mobile: mobile
            }
            return fetch(`https://www.api3.digimovieplex.com/api/otp_sent/`, {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                "Content-Type": 'application/json',
              }
            }).then(response => {
              return response.json()
            }).then((res) => {
              return { res, mobile }
            }).catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
          } else {
            Swal.showValidationMessage(
              `Please enter correct phone number`
            )
          }

        } else {
          Swal.showValidationMessage(
            `Please give your mobile number`
          )
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed === true) {
        let phone = result.value.mobile;
        let otp = result.value.res.response.otp;
        Swal.fire({
          title: ' Enter the OTP sent to your number',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          confirmButtonText: 'Submit',
          showLoaderOnConfirm: true,
          preConfirm: (otpInput) => {
            if (otpInput) {
              if (otp === parseInt(otpInput)) {
                let data = {
                  mobile: phone
                }
                return fetch(`https://www.api3.digimovieplex.com/api/otp_check/`, {
                  method: 'POST',
                  body: JSON.stringify(data),
                  headers: {
                    "Content-Type": 'application/json',
                  }
                }).then(response => {
                  return response.json()
                }).catch(error => {
                  Swal.showValidationMessage(
                    `Request failed: ${error}`
                  )
                })
              } else {
                Swal.showValidationMessage(
                  `OTP not matched`
                )
              }
            } else {
              Swal.showValidationMessage(
                `Please enter your OTP`
              )
            }
          }
        }).then((data) => {
          //console.log(data.value)
          let userInfo = {
            token: data.value.response.token,
            name: `${data.value.response.first_name} ${data.value.response.last_name}`,
            num_master_id: data.value.response.num_master_id,
            num_user_id: data.value.response.num_user_id,
            txt_user_id: data.value.response.txt_user_id,
            txt_emailid: data.value.response.txt_emailid,
            num_mobile_no: data.value.response.num_mobile_no,
            txt_profile_pic: data.value.response.txt_profile_pic
          };
          sessionStorage.setItem('auth', JSON.stringify(userInfo));
          close();
          window.location.reload(true);
        })
      }
    })
  };
  //forgot password ********************************************************************************************

  const forgotPassword = async () => {
    close();
    Swal.fire({
      title: 'Registered Email Id',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        if (email) {
          let emailRegx = /^[A-za-z0-9._$#]{1,}@[A-Za-z0-9]{3,}[.]{1}[A-Za-z0-9.]{1,}$/
          if (emailRegx.test(email)) {
            let data = {
              user_email: email
            }
            return fetch(`https://www.api3.digimovieplex.com/api/forgot_password_link`, {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                "Content-Type": 'application/json',
              }
            }).then(response => {
              return response.json()
            }).then((res) => {
              // console.log({res, email})
              return { res, email }
            }).catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
          } else {
            Swal.showValidationMessage(
              `Email is not Valid`
            )
          }
        } else {
          Swal.showValidationMessage(
            `Please give your email`
          )
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed === true) {
        Swal.fire({
          icon: (result.value.res.status === "success") ? 'success' : 'error',
          title: result.value.email,
          text: result.value.res.message,
        })
      }
    })
  };

  /****************************************************************************************************************** */
  const [phoneValidation, setPhoneValidation] = useState("")

  const [first_name, setFirstName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [last_name, setLastName] = useState("")
  const [usertype, setUserType] = useState("")
  const [joining_code, setJoiningcode] = useState("")
  const [phone, setPhone] = useState("")
  const [user_country, setCountry] = useState("")

  const [signup_msg, setMsg] = useState("")

  const [username, setUsername] = useState("")
  const [passwordIn, setPasswordIn] = useState("")
  const [signIn_msg, setSign] = useState("")
  const [type, setType] = useState([]);


  const [name, setname] = useState("")
  const [url, seturl] = useState("")



  const responseGoogle = async (response) => {
    //console.log(response.profileObj);
    let googleResponse = {
      // first_name: response.profileObj.givenName,
      // last_name: response.profileObj.familyName,
      // email: response.profileObj.email,
      // googleId: response.profileObj.googleId,
      // profile_pic: response.profileObj.imageUrl
    }
    await fetch("https://www.api3.digimovieplex.com/api/google_login", {
      method: 'POST',
      body: JSON.stringify(googleResponse),
      headers: {
        "Content-Type": 'application/json',
      }
    }).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data.response)
      if (data.status === "success") {
        let userInfo = {
          token: data.response.token,
          name: `${data.response.first_name} ${data.response.last_name}`,
          num_master_id: data.response.num_master_id,
          num_user_id: data.response.num_user_id,
          txt_user_id: data.response.txt_user_id,
          txt_emailid: data.response.txt_emailid,
          num_mobile_no: data.response.num_mobile_no,
          txt_profile_pic: data.response.txt_profile_pic
        };
        sessionStorage.setItem('auth', JSON.stringify(userInfo));
        close();
        window.location.reload(true);
        
      } else {
        setSign(data.message)
      }
    })
  }

  useEffect(() => {
    axios.get('https://www.api3.digimovieplex.com/api/user_type_list').then(res => {
      setType(res.data.response)
    })


  }, [])
  //  sign up/////////////////////////////////////////////////
  const producerPhoneValidation = () => {
    //console.log('trtrt',typeof type);
    if (usertype === '2') {
      if (phone) {
        setPhoneValidation("")
        return true;
      } else {
        setPhoneValidation(alert("Phone Number is mandatory for Producer."))
        return false;
      }
    } else {
      setPhoneValidation("")
      return true;
    }
  }
  async function signUp(e) {

    e.preventDefault()
    let item = { first_name: first_name, last_name: last_name,user_country:user_country, phone: phone, joining_code: joining_code, usertype: usertype, password: password, email: email, type: 'both', gender: 'M', }


    if (producerPhoneValidation()) {
      // let result = await fetch("https://www.api3.digimovieplex.com/api/user_signup", {
      //   method: 'POST',
      //   body: JSON.stringify(item),
      //   headers: {
      //     "Content-Type": 'application/json',
      //   }
      // })
      //   .then((resp) => resp.json().then(r => {
      //     setMsg(r.message)
      //     setTimeout(() => {
      //       close();
      //     }, 6000)
      //   }))
      console.log("aaaaaaaaaaaaa", item);
      axios.post('https://www.api3.digimovieplex.com/api/user_signup', item).then((res) => {
        if (res.data.status === 'success') {
          swal({
            title: res.data.title,
            text: res.data.text,
            icon: res.data.icon,
            successMode: true,
          }).then(res => {
            if (res) {
              window.location.href = "/"
            }
          });
        } else {
          swal({
            title: res.data.title,
            text: res.data.text,
            icon: res.data.icon,
            successMode: true,
          })

        }
      })
    }

  }

  // sign in /////////////////////////
  async function signIn(e) {
    e.preventDefault()
    let item = { username: username, password: passwordIn }

    console.warn(item)
    if (item.username !== '' && item.password !== '') {
      let result = await fetch("https://www.api3.digimovieplex.com/api/user_signin", {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          "Content-Type": 'application/json',
        }
      })
        .then((resp) => {
          return resp.json();
        }).then((data) => {
          console.log(data)
          if (data.status === 'success') {
            let userInfo = {
              token: data.response.token,
              name: `${data.response.first_name} ${data.response.last_name}`,
              num_master_id: data.response.num_master_id,
              num_user_id: data.response.num_user_id,
              txt_user_id: data.response.txt_user_id,
              txt_emailid: data.response.txt_emailid,
              num_mobile_no: data.response.num_mobile_no,
              txt_profile_pic: data.response.txt_profile_pic,
              yn_mobile_verified: data.response.yn_mobile_verified
            };

            sessionStorage.setItem('auth', JSON.stringify(userInfo));
            close();
            window.location.reload(true);
            
          } else {
      swal({
            title: data.message,
            text: data.text,
            icon: data.icon,
            successMode: true,
          })
          }
        })
    } else {
      setSign(swal({
        title:"Username & Password Both are required!",
        icon: "warning",
        successMode: true,
      }));

    }
  }

  if (showLogin) {

    return <Container component="main" maxWidth="xs">

      <div className="modal-header">
        <span className="close" onClick={close}>&times;</span>
      </div>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPasswordIn(e.target.value)}
            autoComplete="current-password"
            required
          />


          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signIn}
          >
            Log in
          </Button>
         
          <Button
            onClick={loginWithOtp}
            fullWidth
            variant="contained"
            color="primary"
          >
            Log in using phone no
          </Button>
          <p className="info_messages">(Only for Audience/Viewers)</p>


          <GoogleLogin className="google_login"
            clientId="41630675457-j2237ot593hf0douldh01qb55jtms3ie.apps.googleusercontent.com"
            buttonText="LOG IN"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          <p className="info_messages">(Only for Audience/Viewers)</p>



          <Grid container>
            <Grid item xs>
              <Link onClick={forgotPassword} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={showSignupScreen} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  }
  return <>
    <Container component="main" maxWidth="xs" >

      <div className="modal-header">
        <span className="close" onClick={close}>&times;</span>
      </div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={first_name}
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
                value={last_name}
                autoComplete="lname"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="email"
              />
              <p>(It will be your Login Username.)</p>
            </Grid>
            <Grid item xs={12}>
              <div>
                <label > Country</label>
                <select
                  id="inputState"
                  class="form-control"
                  name="user_country"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option selected>~ SELECT ~</option>
                  <option value="India" selected={user_country === 'India'}>India</option>
                  <option value="Outside India" selected={user_country === 'Outside India'}>Outside India</option>
                </select>
              </div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={usertype == 2}
                fullWidth
                id="phone"
                label="Phone No"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                name="phone"
                value={phone}
                autoComplete="phone"
              />
              <span style={{ color: '#ff0000', fontSize: '10px' }}>{phoneValidation && phoneValidation}</span>
            </Grid>


            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="joining_code"
                label="Referral Code"
                type="text"
                onChange={(e) => setJoiningcode(e.target.value)}
                name="joiningCode"
                value={joining_code}
                autoComplete="joining_code"
              />
            </Grid>


            <Grid item xs={12}>
              <div class="form-group" >
                <label >User Type</label>
                <select id="inputState" class="form-control" onChange={(e) => setUserType(e.target.value)}>
                  <option selected>~ SELECT ~</option>
                  {type && type.map((item, i) => (
                    <option value={item.num_master_id}>{item.txt_user_type}</option>
                  ))}
                </select>
              </div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="name"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                autoComplete="current-password"
              />
              <p className="hints">Password must be 8 Characters</p>
              <p className="hints">Password must be minimum 1 Uppercase</p>
              <p className="hints">Password must be minimum 1 Lowercase</p>
              <p className="hints">Password must be minimum 1 Special Character</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm password"
                label="Confirm Password"
                type="password"
                id="password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={signUp}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={showLoginScreen} variant="body2">
                Already have an account? Log in
              </Link>
              <h3 className="message">{signup_msg}</h3>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  </>
}

export default Login
