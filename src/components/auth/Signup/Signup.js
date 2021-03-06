import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {signup} from '../../../store/actions/authAction';
import './Signup.css'
const Signup =(props) =>{
    const [firstName,setFirstName]= useState('');
    const [lastName,setLastName]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [conFirmPassword,setConFirmPassword]= useState('');
    
    const handleChange =(e) =>{
        let field= e.target.className
        switch (field){
            case "First":
                setFirstName(e.target.value)
                return;
            case "Last":
                setLastName(e.target.value)
                return;
            case "Email":
                setEmail(e.target.value)
                return;
            case "password":
                setPassword(e.target.value)
                return;
            case "confirmpassword":
                setConFirmPassword(e.target.value)
                return;
            default:
                return;
        }
    }
    const handleSubmit =(e)=>{
        // console.log(firstName)
        // console.log(lastName)
        // console.log(email)
        // console.log(password)
        // console.log(conFirmPassword)
        // console.log(props);
        e.preventDefault();
        if (conFirmPassword===password){
            props.signup({
               email:email,
               firstName:firstName,
               lastName:lastName,
               password:password,
            //    conFirmPassword:conFirmPassword
            })
            // props.signup({email,firstName,lastName,password});
        }
    }
    if (props.auth.uid) return <Redirect to="/"/>
    return(
        <div className="Signup">
                <form onSubmit={handleSubmit}>
                <h1 className="signup-topic">Sign Up</h1>
                <p className="text-pleasefill">Please fill in this form to create an account!</p>
                <ul className="form-column">
                    <li className="FirstLast">
                        <input className="First" type="text" placeholder="First Name" onChange={handleChange} ></input>
                        <input  className="Last" type="text" placeholder="Last Name" onChange={handleChange} ></input>
                    </li>

                    <li>
                        <input className="Email" type="text" placeholder="Email" onChange={handleChange} ></input>
                    </li> 

                    <li>
                        <input  className="password" type="password" placeholder="Password" onChange={handleChange} ></input>
                    </li>

                    <li>
                        <input  className="confirmpassword" type="password" placeholder="Confirm password" onChange={handleChange} ></input>
                    </li>


                    <li className="checkbox"> <input type="checkbox"/>
                        {' '}I accept the <span>Terms of Use</span> & <span> Privacy Policy</span>
                    </li>
                    <li>
                        <button  className="button-Signup" type="submit">Sign Up</button>
                    </li>
                </ul>
                </form>
        </div>
    );
}
const mapStateToProps = (state) =>{
    return{
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        signup:(cre) => dispatch(signup(cre))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Signup)