import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import './BudgetButton.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddBudgetForm from '../BudgetForm/AddBudgetForm/AddBudgetForm';
import RemoveBudgetForm from '../BudgetForm/RemoveBudgetForm/RemoveBudgetForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-55%, -50%)',
    width: 400
};

export default function BudgetButton(props) {
    const [openFormAdd, setOpenFormAdd] = React.useState(false);
    const handleOpenFormAdd = () => {
        setOpenFormAdd(true);
    }
    const handleCloseFormAdd = () => {
        setOpenFormAdd(false);
        props.handlers[2]();
    }

    const [openFormRemove, setOpenFormRemove] = React.useState(false);
    const handleOpenFormRemove = () => setOpenFormRemove(true);
    const handleCloseFormRemove = () =>  {
        setOpenFormRemove(false);
        props.handlers[2]();
    }
  
    return (
        <Stack className='Stack' direction="row" spacing={1} justifyContent='space-around'>
            <IconButton aria-label="delete" sx={{width: '35%', boxShadow: '0px 4px 10px 6px lightgray'}}  onClick={handleOpenFormRemove}  >       
                <RemoveCircleOutlineIcon color="warning"  sx={{width: '100%', height: '100%'}} />
            </IconButton>
            <IconButton aria-label="add" sx={{width: '35%', boxShadow: '0px 4px 10px 6px lightgray'}} onClick={handleOpenFormAdd} >
                <AddCircleOutlineIcon color="success"  sx={{width: '100%', height: '100%' }}/>
            </IconButton>   
            <Modal
                open={openFormAdd}
                onClose={handleCloseFormAdd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='boxModal'>
                   <AddBudgetForm closeFormHandler={handleCloseFormAdd} handlers={props.handlers}/>
                </Box>
            </Modal>
            <Modal
                open={openFormRemove}
                onClose={handleCloseFormRemove}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='boxModal'>
                   <RemoveBudgetForm closeFormHandler={handleCloseFormRemove} handlers={props.handlers}/>
                </Box>
            </Modal>
        </Stack>
    );
}
