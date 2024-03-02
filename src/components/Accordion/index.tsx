import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const CustomAccordion = ({data}:{data:{title:string, details:string}[]}) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    return (
        <div className={`${theme === 'dark' ? 'shadow-black/70' : ''} shadow-md rounded-md`}>
            {
                data.map((item, index) => {
                    return (
                        <Accordion sx={{color:'inherit', backgroundColor:'inherit', boxShadow:'none'}}>
                            <AccordionSummary
                                expandIcon={<KeyboardArrowDownIcon sx={{color:theme === 'dark' ? 'white' : 'black'}} />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography>{item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={'opacity-70'}>
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