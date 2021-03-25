import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class Example extends PureComponent{
  
  state = {
    activeIndex: 0,
  };

  handleClick = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    
    const { activeIndex} = this.state;
    const {data} = this.props.propsData
    const activeItem = data[activeIndex];

    return (
      <div style={{ width: '50%', margin:'10vh auto',padding:"20px",display:"flex", flexFlow:"column",backgroundColor:"lightgrey",border:"2px solid black", borderRadius:"10px" }}>
        <p style={{fontWeight:"bold",textAlign:"center"}}>{`Average Tempetures of ${this.props.propsData.cityname}`}</p>
        <ResponsiveContainer width="100%" height={180}>
          
          <BarChart width={100} height={120} data={data}>
            <Bar dataKey="uv" onClick={this.handleClick}>
              {data.map((entry, index) => (
                <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p style={{fontWeight:"bold"}} className="content">{`Average Temperature of  "${activeItem.name}": ${activeItem.uv}`}<span>&#8451;</span></p>
        <p style={{fontWeight:"bold"}} className="content">Please click on columns to see the average values. </p>
      </div>
    );
  }
}
