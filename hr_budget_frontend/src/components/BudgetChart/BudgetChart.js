import React from "react";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';
import './BudgetChart.css';
import image from '../../assets/images/pig.webp';
 
class BudgetChart extends React.Component {

    RADIAN = Math.PI / 180;
    COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            key: 0
        };
    }

    renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * this.RADIAN);
        const y = cy + radius * Math.sin(-midAngle * this.RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    render() {     
        if (this.state.data.length == 0 || this.props.remain <= 0) {
            return (
                <div style={{width: '100%', height:'252px'}}>
                    <img src={image} style={{width:'100%', height: '100%'}} />
                </div>
            )
        }  
        return (          
            <div style={{width: '100%'}}>     
                <ResponsiveContainer  width={'100%'} height={252} >
                    <PieChart>
                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                        <Pie
                            data={this.state.data}
                            cx="40%"
                            cy="50%"
                            labelLine={false}
                            label={this.renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey='value'
                            dataName='name'
                        >
                            {this.state.data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>                         
                </ResponsiveContainer>
            </div>

        )
    }
}
export default BudgetChart;