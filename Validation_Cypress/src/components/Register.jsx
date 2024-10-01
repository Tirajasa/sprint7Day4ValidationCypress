import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
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
export const errorMessages={
    name:"Write more than 2 letters ",
    lastname:"Write more than 2 letters",
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
    const [id,setId]=useState("");

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    let regex = 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/; 
    
    useEffect(() => {
      if (
          formData.name.trim().length >= 3 &&
          formData.lastname.trim().length >= 3 &&
          validateEmail(formData.email) &&
          regex.test(formData.password)
      ) {
          setIsValid(true);
      } else {
          setIsValid(false);
      }
  }, [formData.name, formData.lastname, formData.email, formData.password]);

    
    function handleChange(event){

        const{name,value}=event.target;
        setFormData({...formData,[name]:value});
   
        if(name=="name"|| name=="lastname"){
            if(value.trim().length>=3){
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

  axios.post("https://reqres.in/api/users",formData)
  .then(response=>{
    console.log(response);
    setFormData(initialValues);
    setId(response.data.id);
  })
  .catch(error=>{
    console.log(error);
  })
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
                invalid={errors.name}
                data-cy="name-input"
              />
              {errors.name &&<FormFeedback data-cy="error-message">{errorMessages.name}</FormFeedback>}
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
                invalid={errors.lastname}
                data-cy="lastname-input"

              />
               {errors.lastname &&<FormFeedback data-cy="error-message">{errorMessages.lastname}</FormFeedback>}
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
                invalid={errors.email}
                data-cy="email-input"

              />
               {errors.email &&<FormFeedback data-cy="error-message">{errorMessages.email} </FormFeedback>}
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
                invalid={errors.password}
                data-cy="password-input"


              />
               {errors.password &&<FormFeedback data-cy="error-message">{errorMessages.password}</FormFeedback>}
            </FormGroup>
            <Button disabled={!isValid} data-cy="submit-button">Register</Button>
          </Form>
        </CardBody>
        { id && <CardFooter data-cy="id-output">Id:{id}</CardFooter>}
      </Card>
    </>
  );
}