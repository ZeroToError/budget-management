import React from "react";
import { Card } from "@mui/material";
import { TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './AddBudgetForm.css'
import { Button } from "@mui/material";
import { SERVER } from "../../../constant";

class AddBudgetForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: { 
                reason: '',
                amount: 0,
                detailReason: '',
                source: '',
                typeFlag: 1,
                createdBy: '',
                updatedBy: ''
            },
            isLoaded: true,
            error: '',
        };
    }

    handleChangeAmount = (event) => {
        let newData  = Object.assign({}, this.state.data);
        newData.amount = event.target.value;
        this.setState({data: newData});
    };

    handleChangeReason = (event) => {
        let newData  = Object.assign({}, this.state.data);
        newData.reason = event.target.value;
        this.setState({data: newData});
    };

    handleChangeSource = (event) => {
        let newData  = Object.assign({}, this.state.data);
        newData.source = event.target.value;
        this.setState({data: newData});
    };

    handleChangeNote = (event) => {
        let newData  = Object.assign({}, this.state.data);
        newData.detailReason = event.target.value;
        this.setState({data: newData});
    };

    handleChangeCreator = (event) => {
        let newData  = Object.assign({}, this.state.data);
        newData.createdBy = event.target.value;
        newData.updatedBy = event.target.value;
        this.setState({data: newData});
    };

    handleSubmitForm = (event) => {
        const requestJson = JSON.stringify(this.state.data);
        fetch(SERVER, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestJson,
        })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true
                    });
                    this.props.closeFormHandler();
                    this.props.handlers[0]();
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    this.props.handlers[1]();
                }
            );
    }

    render() {    
        
        return (
            <Card className='addBudgetForm' sx={{ width: '100%', height: '500px' }}>
                <h1>Khai báo nạp tiền</h1>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="fund-reason-label">Lý do nạp tiền</InputLabel>
                    <Select
                        labelId="fund-reason-label"
                        id="fund-reason-select"
                        label="Lý do nạp tiền"
                        onChange={this.handleChangeReason}
                    >
                        <MenuItem value={'Nộp quỹ'}>Nộp quỹ</MenuItem>
                        <MenuItem value={'Nộp phạt'}>Nộp phạt</MenuItem>
                        <MenuItem value={'Tiền thưởng'}>Tiền thưởng</MenuItem>
                        <MenuItem value={'Lý do khác'}>Lý do khác</MenuItem>
                    </Select>
                </FormControl>  
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="source-label">Nguồn tiền</InputLabel>
                    <Select
                        labelId="source-label"
                        id="source-select"
                        label="Nguồn tiền"
                        onChange={this.handleChangeSource}
                    >
                        <MenuItem value={'Hưng'}>Hưng</MenuItem>
                        <MenuItem value={'Vinh'}>Vinh</MenuItem>
                        <MenuItem value={'Chị Tâm'}>Chị Tâm</MenuItem>
                        <MenuItem value={'Chị Hằng'}>Chị Hằng</MenuItem>
                        <MenuItem value={'Chị Huyền'}>Chị Huyền</MenuItem>
                        <MenuItem value={'Chị Nga'}>Chị Nga</MenuItem>
                        <MenuItem value={'Chị Hương'}>Chị Hương</MenuItem>
                        <MenuItem value={'Hương bên đèo'}>Hương bên đèo</MenuItem>
                        <MenuItem value={'Loan'}>Loan</MenuItem>
                        <MenuItem value={'Hoàn'}>Hoàn</MenuItem>
                        <MenuItem value={'Nguồn khác'}>Nguồn khác</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ width: '100%' }}>
                    <TextField
                        id="outlined-number"
                        label="Tổng tiền thêm"
                        type="number"
                        onChange={this.handleChangeAmount}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl> 
                <FormControl sx={{  width: '100%' }}>
                    <TextField
                        id="filled-multiline-flexible"
                        label="Lý do chi tiết"
                        multiline
                        maxRows={4}
                        minRows={2}
                        onChange={this.handleChangeNote}
                        sx={{
                            width: '100%'
                        }}
                    />  
                </FormControl>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="creator-label">Bạn là ai?</InputLabel>
                    <Select
                        labelId="creator-label"
                        id="creator-select"
                        label="Bạn là ai?"
                        onChange={this.handleChangeCreator}
                    >
                        <MenuItem value={'Hưng'}>Hưng</MenuItem>
                        <MenuItem value={'Vinh'}>Vinh</MenuItem>
                        <MenuItem value={'Chị Tâm'}>Chị Tâm</MenuItem>
                        <MenuItem value={'Chị Hằng'}>Chị Hằng</MenuItem>
                        <MenuItem value={'Chị Huyền'}>Chị Huyền</MenuItem>
                        <MenuItem value={'Chị Nga'}>Chị Nga</MenuItem>
                        <MenuItem value={'Chị Hương'}>Chị Hương</MenuItem>
                        <MenuItem value={'Hương bên đèo'}>Hương bên đèo</MenuItem>
                        <MenuItem value={'Loan'}>Loan</MenuItem>
                        <MenuItem value={'Hoàn'}>Hoàn</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{  width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>                    
                    <Button variant="contained" color="error" onClick={this.props.closeFormHandler}>
                        Hủy
                    </Button>   
                    <Button variant="contained" color="success" sx={{width: '30%'}} onClick={this.handleSubmitForm} >
                        Lưu
                    </Button>              
                </FormControl>                  
            </Card>
        )
    }
}
export default AddBudgetForm;