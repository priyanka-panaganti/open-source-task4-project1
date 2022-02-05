import { Typography, Box,  Grid, TextField, Button } from "@mui/material"
import { makeStyles } from "@mui/styles";
import {  green , cyan } from '@mui/material/colors';
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles({
 headingColor: {
  backgroundColor: cyan[900],
  color: "white"
 },
 addStuColor: {
  backgroundColor: green[400],
  color: "white"
 },

});

const Edit = () => {
 const classes = useStyles();
 const { id } = useParams();
 const history = useHistory();
 const [student, setStudent] = useState({
  stuname: "",
  age:"",
  email: "",
  phone:"",
  skills:"",
  intrests:""
 });
 useEffect(() => {
  async function getStudent() {
   try {
    const student = await axios.get(`http://localhost:3333/students/${id}`)
    // console.log(student.data);
    setStudent(student.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getStudent();
 }, [id]);

 function onTextFieldChange(e) {
  setStudent({
   ...student,
   [e.target.name]: e.target.value
  })
 }

 async function onFormSubmit(e) {
  e.preventDefault()
  try {
   await axios.put(`http://localhost:3333/students/${id}`, student)
   history.push("/")
  } catch (error) {
   console.log("Something is Wrong");
  }
 }
 function handleClick() {
  history.push("/")
 }
 return (
  <>
   <Box textAlign="center" p={1} className={classes.headingColor} mb={2}>
   <Typography variant="h3">Student Basic Details</Typography>
   </Box>

   <Grid container justify="center" spacing={4}>
    <Grid item md={20} xs={12}>
     <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
      <Typography variant="h4">Edit Student</Typography>
     </Box>
     <form>
      <Grid container spacing={2}>
       <Grid item xs={12} sm={6}>
        <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={id} disabled />
       </Grid>
       <Grid item xs={12} sm={6}>
        <TextField autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="stuname" label="Name" value={student.stuname} onChange={e => onTextFieldChange(e)} />
       </Grid>
       <Grid item xs={12}   sm={6}>
        <TextField autoComplete="age" name="age" variant="outlined" required fullWidth id="age" label="age" value={student.age} onChange={e => onTextFieldChange(e)}
        />
       </Grid>
       <Grid item xs={12}  sm={6}>
        <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" value={student.email} onChange={e => onTextFieldChange(e)} />
       </Grid>
       <Grid item xs={12}  sm={6} >
        <TextField autoComplete="phone" name="phone" variant="outlined" required fullWidth id="phone" label="phone" value={student.phone} onChange={e => onTextFieldChange(e)}
        />
       </Grid>
       <Grid item xs={12}   sm={6}>
        <TextField autoComplete="skills" name="skills" variant="outlined" required fullWidth id="skills" label="skills" value={student.skills} onChange={e => onTextFieldChange(e)}
        />
       </Grid>
       <Grid item xs={12} >
        <TextField autoComplete="intrests" name="intrests" variant="outlined" required fullWidth id="intrests" label="intrests" value={student.intrests} onChange={e => onTextFieldChange(e)}
        />
       </Grid>
      </Grid>
      <Box m={3}>
       <Button type="button" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}> Update </Button>
      </Box>
     </form>
     <Box m={3} textAlign="center">
      <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
     </Box>
    </Grid>
   </Grid >
  </>
 )
}

export default Edit