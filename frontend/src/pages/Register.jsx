import React,{useContext} from 'react'
import {Context}  from '../main'
import { useNavigate,Navigate,Link } from 'react-router-dom';
import  axios from "axios"

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone , setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTO = useNavigate();

  const handleRegister = async(e)=>{
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/user/patient/register",
          { email, password, confirmPassword, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthenticated){
    return <Navigate to={"/"}/>
  }
  return (
   <div className="container form-component register-form">
    <h2>SignUp</h2>
    <p>Please Sign Up to continue</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, laborum.</p>
     

     <form action="" onSubmit={handleRegister}>
      <div>
      <input type="text" name="firstName" value={firstName} onChange={ (e)=> setFirstName(e.target.value)} />
      <input type="text" name="lastName" value={lastName} onChange={ (e)=> setLastName(e.target.value)} />
      </div>

      <div>
      <input type="email" name="email" value={email} onChange={ (e)=> setEmail(e.target.value)} />
      <input type="phone" name="phone" value={phone} onChange={ (e)=> setPhone(e.target.value)} />
      </div>

      <div>
      <input type="number" name="nic" value={nic} onChange={ (e)=> setNic(e.target.value)} />
      <input type="Date" name="dob" value={dob} onChange={ (e)=> setDob(e.target.value)} />
      </div>

      <div>
        <select value={gender} onChange={(e)=>setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      <input type="password" name="password" value={password} onChange={ (e)=> setPassword(e.target.value)} />
      </div>

      <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>
          </div>
      
     </form>



   </div>

  )
}

export default Register