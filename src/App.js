// Material UI stuffs
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress'
import { Stack } from '@mui/material';
import { Skeleton } from '@mui/material';

// Components
import Appbar from './components/Appbar';
import InputDisplay from './components/InputDisplay';

// Imports
import {useState, useEffect} from 'react'
import axios from 'axios'

const api_url = process.env.REACT_APP_API_URL

function App() {

  
  // Use Effect
  useEffect(() => {
    fetchData()
  }, [])

  // States
  const [apiData, SetApiData] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [receivedData, setReceivedData] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // Fetch Data from API
  const fetchData = () => {
    axios.get(api_url)
          .then(res => {
            const data = res.data.data
            SetApiData(data)
          })
          .catch(err => {
            console.log(err)
          })
  }

  // Track changes on values by user
  const ChangeValue = (key, value) => {
    const found = apiData.find(element => element.fieldName == key)
    found.value = value
  }

  // Handles submition
  const SubmitData = () => {

    // Creates a new object to be submitted
    const newdata = {}
    const AppendData = (item) => {
      newdata[item.fieldName] = item.value
    }
    apiData.forEach(AppendData)

    // Disables Input Fields
    setIsSubmitting(true)
    setHasSubmitted(false)
    
    // Submit post
    axios.post(api_url, newdata)
          .then(res => {
            const received = JSON.stringify(res.data)
            setReceivedData(received)
            setHasSubmitted(true)

            // Re-enables input
            setIsSubmitting(false)
          })
          .catch(err => {
            console.log(err)
            setIsSubmitting(false)
          })
  }

  return (
    <div>
      <Appbar/>

      <Container maxWidth="md">    
          <Box sx={{ mt: 3, mb:3}}>
              
              <Typography sx={{mb:0}} variant="h2" component="div" gutterBottom>
                  Dynamic Form
              </Typography>

              <Typography sx={{mb:5}} variant="subtitle1" component="div" gutterBottom>
                  A test project by Dran.
              </Typography>

              {/* HANDLES SKELETON (OPTIONAL) */}
              {apiData.length != 0 ?
              <div>

                {/* INPUT FIELDS */}
                <Box sx={{mt:3}}>
                  {apiData ?
                    <div>
                      {apiData.map(data => (
                        <div key={data.value}>
                            <InputDisplay data={data} ChangeValue={ChangeValue} isSubmitting = {isSubmitting} />
                        </div>
                      ))}
                    </div>
                  : null}
                </Box>


                {/* SUBMIT BUTTON */}
                <Stack direction="row" justifyContent="center">
                    {!isSubmitting ?
                        <div>
                            <Button onClick={SubmitData} variant="contained">Submit</Button>
                        </div>
                    :
                        <div>
                            <CircularProgress />
                        </div>
                    }
                </Stack>  
                

                {/* RESPONSE */}
                <Box style={{width:'100%'}}>
                  {hasSubmitted ?
                    <div style={{width:'100%'}}>
                        <Typography variant="h6" sx={{mt:3, mb:1}}>
                          Response
                        </Typography>

                        <Typography
                          variant="body2"
                          style={{ wordWrap: "break-word"}}
                        >
                          {receivedData}
                        </Typography>
                    </div>
                  : null}      
                </Box>

                
              {/* SKELETON */}
              </div>
              : 
              <div>
                <Skeleton height={50}/>
                <Skeleton height={50}/>
                <Skeleton height={50}/>
              </div>}
          </Box>
      </Container>
      
    </div>
  );
}

export default App;
