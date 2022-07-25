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
import Validation from "../../Validation/Validation";

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
            validationMessage: ''
        };
        this.child = React.createRef();
    }

    handleChangeAmount = (event) => {
        let newData  = Object.assign({}, this.state.data);
        newData.amount = event.target.value;
        this.setState({data: newData});
        if (newData.amount && newData.amount != 0) {
            document.getElementById("amount-fc").classList.remove("error");
        }
    };

    handleChangeReason = (event) => {
        let newData  = Object.assign({}, this.state.data);
        newData.reason = event.target.value;
        this.setState({data: newData});
        document.getElementById("reason-fc").classList.remove("error");
    };

    handleChangeSource = (event) => {
        let newData  = Object.assign({}, this.state.data);
        newData.source = event.target.value;
        this.setState({data: newData});
        document.getElementById("source-fc").classList.remove("error");
    };

    handleChangeNote = (event) => {
        let newData  = Object.assign({}, this.state.data);
        newData.detailReason = event.target.value;
        this.setState({data: newData});
        if (newData.detailReason) {
            document.getElementById("detail-reason-fc").classList.remove("error");
        }
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
            message = 'Lý do nạp tiền là bắt buộc.';
            this.setState({validationMessage: message});
            this.child.current.showValidationMessage();
            document.getElementById("reason-fc").classList.add("error");
            document.getElementById("fund-reason-select").focus();
            return;
        }

        // if(!this.state.data.source) {
        //     message = 'Nguồn tiền là bắt buộc.';
        //     this.setState({validationMessage: message});
        //     this.child.current.showValidationMessage();
        //     document.getElementById("source-fc").classList.add("error");
        //     document.getElementById("source-select").focus();
        //     return;
        // }

        if(!this.state.data.amount || this.state.data.amount == 0) {
            message = 'Tổng tiền thêm là bắt buộc.';
            this.setState({validationMessage: message});
            this.child.current.showValidationMessage();
            document.getElementById("amount-fc").classList.add("error");
            document.getElementById("amount-number").focus();
            return;
        }

        if(this.state.data.source == 'Nguồn khác' && (!this.state.data.detailReason)) {
            message = 'Nội dung chi tiết cho nguồn khác là bắt buộc';
            this.setState({validationMessage: message});
            this.child.current.showValidationMessage();
            document.getElementById("detail-reason-fc").classList.add("error");
            document.getElementById("detail-reason-text").focus();
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
                    if(result.status == 201) {           
                        this.props.closeFormHandler();
                        this.props.handlers[0]();
                    } else {
                        this.setState({
                            error: true
                        });
                        this.props.closeFormHandler();
                        this.props.handlers[1]();
                    }
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
                <FormControl sx={{ width: '100%' }} id="reason-fc">
                    <InputLabel id="fund-reason-label">Lý do nạp tiền *</InputLabel>
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
                <FormControl sx={{ width: '100%' }} id="source-fc">
                    <InputLabel id="source-label">Nguồn tiền *</InputLabel>
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
                <FormControl sx={{ width: '100%' }} id='amount-fc'>
                    <TextField
                        id="amount-number"
                        label="Tổng tiền thêm *"
                        type="number"
                        onChange={this.handleChangeAmount}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl> 
                <FormControl sx={{  width: '100%' }} id="detail-reason-fc">
                    <TextField
                        id="detail-reason-text"
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
export default AddBudgetForm;