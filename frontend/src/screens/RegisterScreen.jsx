import { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/formContainer';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { useDispatch,useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';
import '../App.css'


const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('')

const [register,{isLoading}] = useRegisterMutation();

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {userInfo} = useSelector((state)=>state.auth)

  useEffect(()=>{
    if(userInfo){
      navigate('/home')
    }
  },[userInfo,navigate])

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password != confirmPassword){
      toast.error('passwords do not match')
    }else{
      try {
        const res = await register({name,email,password}).unwrap();
        dispatch(setCredentials({...res}));
        navigate('/home')
        
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='pic'>
          <form action="/upload">
          <Form.Label>Profile Pic</Form.Label>
          <Form.Control
            type='file'
            placeholder='Add profile image'
            value={image}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
          <button type='submit' className='btnimg'>upload</button>
          </form>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={image}
            accept='image/*'
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading && <Loader/>}

        <Button type='submit' variant='primary' className='mt-3'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;