import React from "react";
import { Snackbar, Alert } from "@mui/material";

class Validation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        } 
    }
    showValidationMessage = () => {
        this.setState({open: true});
    }
    
    handleCloseValidationMessage = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({open: false});
    };

    render() {
        return (
            <Snackbar sx={{width: '100%', marginLeft: '20px' }} open={this.state.open} autoHideDuration={5000} onClose={this.handleCloseValidationMessage}  anchorOrigin={{ vertical: 'top', horizontal: 'center'}}  >
                <Alert onClose={this.handleCloseValidationMessage} severity="warning" sx={{ width: '100%', fontSize: '16px' }} >
                    {this.props.message}
                </Alert>  
            </Snackbar>
        );
    }
}

export default Validation;