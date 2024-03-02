import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CustomAccordion = ({data}:{data:{title:string, details:string}[]}) => {
    return (
        <div>
            {
                data.map((item, index) => {
                    return (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<KeyboardArrowDownIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography>{item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {item.details}
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
        </div>
    );
}

export default CustomAccordion;