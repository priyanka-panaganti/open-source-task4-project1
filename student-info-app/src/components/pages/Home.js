import { Typography, Box,  Grid, TextField, Button } from "@mui/material"
import { ThemeProvider, makeStyles } from '@mui/styles';
import { deepPurple, green , brown, pink } from '@mui/material/colors';
import List from "../student/List";
import axios from "axios";
import { useState } from "react";


const useStyles = makeStyles({
    headingColor: {
     backgroundColor: brown[900],
     color: "white"
    },
    addStuColor: {
     backgroundColor: green[400],
     color: "white",
     
    },
   })
   
   const Home = () => {
    const classes = useStyles();
    const [student, setStudent] = useState({
     stuname: "",
     email: ""
    });
    const [status, setStatus] = useState();
   
    function onTextFieldChange(e) {
     setStudent({
      ...student,
      [e.target.name]: e.target.value
     })
    }
   
    async function onFormSubmit(e) {
     e.preventDefault()
     try {
      await axios.post(`http://localhost:3333/students`, student)
      setStatus(true);
     } catch (error) {
      console.log("Something is Wrong");
     }
    }
    if (status) {
     return <Home />
    }
   return (
   <>
   <Box textAlign="center"   className={classes.headingColor} p={1} mb={2} >
    <Typography variant="h3">Student Basic Details</Typography>
   </Box>
   <Grid container justify="center" spacing={4}>
    <Grid item md={20} xs={12}>
     <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
      <Typography variant="h4">Add Student</Typography>
     </Box>
     <form noValidate>
      <Grid container spacing={2}>
       <Grid item xs={12} >
        <TextField autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="stuname" label="Name" onChange={e => onTextFieldChange(e)}
        />
       </Grid>
       <Grid item xs={12} >
        <TextField autoComplete="age" name="age" variant="outlined" required fullWidth id="age" label="age" onChange={e => onTextFieldChange(e)}
        />
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" onChange={e => onTextFieldChange(e)} />
       </Grid>
       <Grid item xs={12} >
        <TextField autoComplete="phone" name="phone" variant="outlined" required fullWidth id="phone" label="phone" onChange={e => onTextFieldChange(e)}
        />
       </Grid>
       <Grid item xs={12} >
        <TextField autoComplete="skills" name="skills" variant="outlined" required fullWidth id="skills" label="skills" onChange={e => onTextFieldChange(e)}
        />
       </Grid>
       <Grid item xs={12} >
        <TextField autoComplete="intrests" name="intrests" variant="outlined" required fullWidth id="intrests" label="intrests" onChange={e => onTextFieldChange(e)}
        />
       </Grid>
      </Grid>
      <Box m={3}>
       <Button type="submit" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}>Add</Button>
      </Box>
     </form>
    </Grid>

    <Grid item md={15} xs={12}>
     <List />

    </Grid>
   </Grid>
  </>
 )
}

export default Home