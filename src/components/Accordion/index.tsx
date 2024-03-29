import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {IAccordion} from "./type";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CustomAccordion = ({data}: IAccordion) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    return (
        <div className={`${theme === 'dark' ? 'shadow-black/70' : ''} shadow-md rounded-md w-full`}>
            {
                data.map((item, index) => {
                    return (
                        <Accordion key={`${index}` + item}
                                   sx={{
                                       width: '100%',
                                       color: 'inherit',
                                       backgroundColor: 'inherit',
                                       boxShadow: 'none'
                                   }}>
                            <AccordionSummary
                                expandIcon={<KeyboardArrowDownIcon sx={{color: theme === 'dark' ? 'white' : 'black'}}/>}
                            >
                                <Typography>{item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={'opacity-70'}>
                                <Markdown remarkPlugins={[remarkGfm]}>
                                    {item.details}
                                </Markdown>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
        </div>
    );
}

export default React.memo(CustomAccordion);