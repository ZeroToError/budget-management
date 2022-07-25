import React from "react";
import { Card } from "@mui/material";
import { TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './RemoveBudgetForm.css'
import { Button } from "@mui/material";
import { SERVER } from "../../../constant";
import Validation from "../../Validation/Validation";

class RemoveBudgetForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: { 
                reason: '',
                amount: 0,
                detailReason: '',
                source: '',
                typeFlag: -1,
                createdBy: '',
                updatedBy: ''
            },
            isLoaded: true,
            error: '',
        };
        this.child = React.createRef();
    }

    handleChangeAmount = (event) => {
        let newData  = Object.assign({}, this.state.data);
        newData.amount = event.target.value;
        this.setState({data: newData});
        if(newData.amount && newData.amount >0) {
            document.getElementById("spend-amount-fc").classList.remove("error");
        }
    };

    handleChangeReason = (event) => {
        let newData  = Object.assign({}, this.state.data);
        newData.reason = event.target.value;
        this.setState({data: newData});
        document.getElementById("spend-reason-fc").classList.remove("error");
    };

    handleChangeSource = (event) => {
        let newData  = Object.assign({}, this.state.data);
        newData.source = event.target.value;
        this.setState({data: newData});
        if(newData.source) {
            document.getElementById("spend-source-fc").classList.remove("error");
        }
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

        let message = '';
        if (!this.state.data.reason) {
            message = 'Lý do tiêu tiền là bắt buộc.';
            this.setState({validationMessage: message});
            this.child.current.showValidationMessage();
            document.getElementById("spend-reason-fc").classList.add("error");
            document.getElementById("spend-reason-select").focus();
            return;
        }

        if(!this.state.data.source) {
            message = 'Đích đến của tiền là bắt buộc.';
            this.setState({validationMessage: message});
            this.child.current.showValidationMessage();
            document.getElementById("spend-source-fc").classList.add("error");
            document.getElementById("spend-source-text").focus();
            return;
        }

        if(!this.state.data.amount || this.state.data.amount == 0) {
            message = 'Tổng tiền tiêu là bắt buộc.';
            this.setState({validationMessage: message});
            this.child.current.showValidationMessage();
            document.getElementById("spend-amount-fc").classList.add("error");
            document.getElementById("spend-amount-number").focus();
            return;
        }

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
            <Card className='removeBudgetForm' sx={{ width: '100%', height: '500px' }}>
                <h1>Khai báo tiêu tiền</h1>
                <FormControl sx={{ width: '100%' }} id="spend-reason-fc">
                    <InputLabel id="spend-reason-label">Lý do tiêu tiền *</InputLabel>
                    <Select
                        labelId="spend-reason-label"
                        id="spend-reason-select"
                        label="Lý do tiêu tiền"
                        onChange={this.handleChangeReason}
                    >
                        <MenuItem value={'Nhậu'}>Nhậu</MenuItem>
                        <MenuItem value={'Ăn trái cây'}>Ăn trái cây</MenuItem>
                        <MenuItem value={'Trà sữa'}>Trà sữa</MenuItem>
                        <MenuItem value={'Lý do khác'}>Lý do khác</MenuItem>
                    </Select>
                </FormControl>  
                <FormControl sx={{ width: '100%' }} id="spend-source-fc">
                    <TextField
                        id="spend-source-text"
                        label="Đích đến của tiền *"
                        multiline
                        maxRows={4}
                        minRows={2}
                        onChange={this.handleChangeSource}
                        sx={{
                            width: '100%'
                        }}
                    />  
                </FormControl>
                <FormControl sx={{ width: '100%' }} id="spend-amount-fc">
                    <TextField
                        id="spend-amount-number"
                        label="Tổng thiệt hại (Đơn vị NGHÌN ĐỒNG) *"
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
                <FormControl sx={{  width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Validation message = {this.state.validationMessage} ref={this.child}></Validation>     
                </FormControl>                       
            </Card>
        )
    }
}
export default RemoveBudgetForm;