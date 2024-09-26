import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
const initialValues={
    name:"",
    lastname:"",
    email:"",
    password:"",
};
const errorMessages={
    name:"Write more than 2 letters ",
    lastname:"rite more than 2 letters",
    email:"Write a validated email.",
    password:"at least 8 characters it must have which should consist of  an uppercase,a lowercase,a digit and a symbol",
}
export default function Register() {
    const [formData,setFormData]=useState(initialValues);
    const [errors,setErrors]=useState({
        name:false,
        lastname:false,
        email:false,
        password:false,
    });
    const [isValid,setIsValid]=useState(false);

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    let regex = 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/; 
    

    useEffect(()=>{
        if(formData.name.trim().length>=3&&formData.lastname.trim().length>=3&&
    validateEmail(formData.email)&& regex.test(formData.password)){
        setIsValid(true);
        }else{
            setIsValid(false);
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[formData]);
    
    function handleChange(event){

        const{name,value}=event.target;
        setFormData({...formData,[name]:value});
   
        if(name=="name"|| name=="lastname"){
            if(value.trim().lenght>=3){
                setErrors({...errors,[name]: false});
             
            }else{ 
                setErrors({...errors,[name]: true});
                
            }
        }
        if(name=="email"){
            if(validateEmail(value)){
                setErrors({...errors,[name]: false});
            }else{
                setErrors({...errors,[name]: true});
            }
        }
        if(name=="password"){
            if (regex.test(value)) { 
                setErrors({...errors,[name]: false});
        }else{
            setErrors({...errors,[name]: true});
        }
    }
}
    function handleSubmit(event){
        event.preventDefault();
        if(!isValid)return;
    }
  return (
    <>
      <Card>
        <CardHeader>Register</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input
                id="name"
                name="name"
                placeholder="Write your name"
                type="text"
                onChange={handleChange}
                value={formData.name}
              />
              {errors.name &&<FormFeedback>
                {errorMessages.name}
            </FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="lastname">Lastname:</Label>
              <Input
                id="lastname"
                name="lastname"
                placeholder="Write your lastname"
                type="text"
                onChange={handleChange}
                value={formData.lastname}
              />
               {errors.lastname &&<FormFeedback>
                {errorMessages.lastname}
            </FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                id="email"
                name="email"
                placeholder="Write your professional email"
                type="email"
                onChange={handleChange}
                value={formData.email}
              />
               {errors.email &&<FormFeedback>
                {errorMessages.email}
            </FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input
                id="password"
                name="password"
                placeholder="Choose a strong password "
                type="password"
                onChange={handleChange}
                value={formData.password}
              />
               {errors.password &&<FormFeedback>
                {errorMessages.password}
            </FormFeedback>}
            </FormGroup>
            <Button disabled={!isValid}>Register</Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}