import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { MenuItem } from '@mui/material'


function InputDisplay({data, ChangeValue, isSubmitting}) {
    
    // Fixes the FieldNames
    const FixNames = (string) => {
        let word = string.replace(/([A-Z])/g, ' $1').trim();
        word = word.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        return word
    }

    // Calls ChangeValue on Parent Component
    const SetValue = (value) => {
        ChangeValue(data.fieldName, value)
    }


    return (
        <div>
            <Box sx={{mb:3, width:1, border:0}}>


                {/* TEXT FIELD */}
                {data.type != 'multiline' && data.type != 'select' ?
                    <div>
                        <TextField
                            id="text-input"
                            label={FixNames(data.fieldName)}
                            defaultValue={data.value}
                            sx ={{width:1}}
                            onChange={e => SetValue(e.target.value)}
                            type={data.type}
                            disabled={isSubmitting}
                        />
                    </div>
                : null}

                {/* SELECT FIELD */}
                {data.type == 'select' ?
                    <div>
                        <TextField
                            id="select-input"
                            select
                            label={FixNames(data.fieldName)}
                            value={data.value}
                            fullWidth
                            onChange={e => SetValue(e.target.value)}
                            disabled={isSubmitting}
                        >
                            {data.options.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                : null}

                {/* MULTILINE FIELD */}
                {data.type == 'multiline' ?
                    <div>
                        <TextField
                            id="multiline-input"
                            label={FixNames(data.fieldName)}
                            multiline
                            rows={4}
                            defaultValue={data.value}
                            fullWidth
                            onChange={e => SetValue(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                : null}
                
            </Box>
        </div>
    )
}


export default InputDisplay