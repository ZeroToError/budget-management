import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './BudgetStatus.css';


class BudgetStatus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.percentRemain
        };
    }

    render() {       
        return (
            <Box className='progressBox'>
                <LinearProgress variant="determinate" value={this.state.data} />
            </Box>
        );
    }
}

export default BudgetStatus;