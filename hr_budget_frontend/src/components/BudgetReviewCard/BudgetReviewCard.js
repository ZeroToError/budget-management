import * as React from 'react';
import Card from '@mui/material/Card';
import BudgetChart from '../BudgetChart/BudgetChart';
import BudgetButton from '../BudgetButton/BudgetButton';
import BudgetStatus from '../BudgetStatus/BudgetStatus';
import './BudgetReviewCard.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { SERVER } from '../../constant';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

class BudgetReviewCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data:  {},
            tab: 0,
            error: null,
            isLoaded: false,
            successSnackBarOpen: false,
            errorSnackBarOpen: false,
            alertOutBudget: false,
            keyUpdate: 0
        };
    }

    openSnackSuccess = () => this.setState({successSnackBarOpen: true});
    openSnackError = () => this.setState({errorSnackBarOpen: true});
    openSnackBudget = () => this.setState({alertOutBudget: true});

    handleCloseSnackSuccess = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({successSnackBarOpen: false});
    };

    handleCloseSnackError = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({errorSnackBarOpen: false});
    };

    handleCloseAlertBudget = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({alertOutBudget: false});
    };

    loadData = () => {
        fetch(SERVER + '/report')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                    this.setState({keyUpdate: Math.random()})
                    if (result.statusReport.remain <= 0) {
                        this.openSnackBudget();
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    componentDidMount() {
        this.loadData();
    }

    handleChange = (event, newValue) => {
        this.setState({tab: newValue});
    };

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Card className='budgetCard' sx={{ width: '100%', height: '640px' }}>
                    <div style={{height: '50%', width: '100%'}}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={this.state.tab} onChange={this.handleChange} aria-label="basic tabs example">
                                <Tab label="Các khoản đã chi" {...a11yProps(0)} />
                                <Tab label="Các khoản đã thu" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={this.state.tab} index={0}>
                            <BudgetChart data = {this.state.data.spendReport} remain = {this.state.data.statusReport.remain} key={this.state.keyUpdate} />
                        </TabPanel>
                        <TabPanel value={this.state.tab} index={1}>
                            <BudgetChart data = {this.state.data.fundReport} remain = {this.state.data.statusReport.remain}  key={this.state.keyUpdate} />
                        </TabPanel>
                    </div>
                    <div className='budgetStatus' style={{height: '15%', width: '100%'}} >
                        <div className='budgetProgress'>
                            <div style={{width: '20%'}}>
                                Còn lại
                            </div>
                            <div style={{width: '60%'}}>
                                Tổng tiền: {this.state.data.statusReport.total}
                            </div>
                            <div style={{width: '20%'}}>
                                Đã xài
                            </div>
                        </div>
                        <div className='budgetProgress'>
                            <div style={{width: '20%'}}>
                                {this.state.data.statusReport.remain}
                            </div>
                            <div style={{width: '60%'}}>
                                <BudgetStatus percentRemain = {this.state.data.statusReport.remain * 100 / this.state.data.statusReport.total} key={this.state.keyUpdate} />
                            </div>
                            <div style={{width: '20%'}}>
                                {this.state.data.statusReport.spent}
                            </div>
                        </div>
                    </div>
                    <div style={{height: '35%'}}>
                        <BudgetButton handlers={[this.openSnackSuccess, this.openSnackError, this.loadData]} />
                    </div>              
                    <Snackbar sx={{width: '100%'}} open={this.state.successSnackBarOpen} autoHideDuration={4000} onClose={this.handleCloseSnackSuccess}  anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}} >
                        <Alert onClose={this.handleCloseSnackSuccess} severity="success" sx={{ width: '100%' }} >
                            Thêm thành công
                        </Alert>  
                    </Snackbar>   
                    <Snackbar sx={{width: '100%'}} open={this.state.errorSnackBarOpen} autoHideDuration={4000} onClose={this.handleCloseSnackError}  anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}  >
                        <Alert onClose={this.handleCloseSnackError} severity="error" sx={{ width: '100%' }} >
                            Lỗi cmnr!
                        </Alert>  
                    </Snackbar>  
                    <Snackbar sx={{width: '100%'}} open={this.state.alertOutBudget} autoHideDuration={10000} onClose={this.handleCloseAlertBudget}  anchorOrigin={{ vertical: 'top', horizontal: 'center'}}  >
                        <Alert onClose={this.handleCloseAlertBudget} severity="warning" sx={{ width: '100%', fontSize: '40px' }} >
                            Hết tiền cmnr, nộp quỹ đi!!!!
                        </Alert>  
                    </Snackbar>   
                </Card>
            );
        }
    }
}

export default BudgetReviewCard;