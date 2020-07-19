import React,{useState,useEffect} from 'react';
import './contact.styles.scss';
import {viewEmailMessage,addEmailMessage} from '../../firebase/firebase.utils';
import Popup from '../../components/popup-message/pop-up.component';




const Contact = () =>{

  const [emailDetails, setEmailDetails] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    date:'',
    message:'',
    nError:'',
    eError:'',
    mError:'',
    popUp:false
  });
  const { name, email, company, phone,message,nError,eError,mError,popUp,date } = emailDetails;

  useEffect(() =>
   {   
    setEmailDetails({ ...emailDetails, nError:'',eError:'',mError:''}); 
  },[name,email,message]);


//   useEffect(() =>
//   {   
//     setTimeout(function(){setEmailDetails({ ...emailDetails, popUp:false})},9000);
    
//  },[popUp]);
  
  

  const handleChange = event => {
    const { name, value } = event.target;
   
    setEmailDetails({ ...emailDetails, [name]: value });
    console.log(emailDetails);
  };
  
  const validateForm = () => {
    

    if(name === ''|| email === '' || message === ''){
     
      if(name === ''){
        // console.log('failed name validation');
        setEmailDetails({ ...emailDetails, nError: 'Please fill out name!' });
        return false;
      }else if(email === ''){
        // console.log('failed email validation');
        setEmailDetails({ ...emailDetails, eError: 'Please enter your email!' });
        return false;
      }else if(message === ''){
        // console.log('failed message validation');
        setEmailDetails({ ...emailDetails, mError: 'Please enter message!' });
        return false;
      }else{
        console.log('Passed validation');
        return true;
      }

    }
    return true;
    
  }


  const handleSubmit = async event => {
    event.preventDefault();
    const result = validateForm();
    const date = new Date().toISOString();

    if(result){
      console.log('Form Is Submitted');
      addEmailMessage({name, email, company, phone,message,date},function(result){
        let data = result;
        console.log(data);
        setEmailDetails({ ...emailDetails, popUp: data });
        setTimeout(function(){setEmailDetails({ ...emailDetails, popUp:false})},3000);
        
      });
    }else{
      console.log('Form failed to submit');
    }
    

 
  
 
    // viewEmailMessage();



  };



    return(
      
        <div className="container">
          {/* <Popup/> */}
          {popUp ? <Popup /> : null }
    <h1 className="brand"><span>Contact</span> Us</h1>
    <div className="wrapper animated bounceInLeft">
      <div className="company-info">
        <h3>Acme Web Design</h3>
        <ul>
          <li><i className="fa fa-road"></i> 44 Something st</li>
          <li><i className="fa fa-phone"></i> (555) 555-5555</li>
          <li><i className="fa fa-envelope"></i> test@acme.test</li>
        </ul>
      </div>
      <div className="contact">
        <h3>Email Us</h3>
        <form onSubmit={handleSubmit}>
          <p>
    <label>Name* <span className="errorMsg">{nError}</span></label>
            <input type="text" name="name" onChange={handleChange}/>
          </p>
          <p>
            <label>Company</label>
            <input type="text" name="company" onChange={handleChange} />
          </p>
          <p>
            <label>Email Address* <span className="errorMsg">{eError}</span></label>
            <input type="email" name="email" onChange={handleChange}/>
          </p>
          <p>
            <label>Phone Number</label>
            <input type="text" name="phone" onChange={handleChange} />
          </p>
          <p className="full">
            <label>Message* <span className="errorMsg">{mError}</span></label>
            <textarea name="message" rows="5" type="message" onChange={handleChange}></textarea>
          </p>
          <p className="full">
            <button type='submit'>Submit</button>
          </p>
        </form>
      </div>
    </div>
  </div>
    )
}
export default Contact;