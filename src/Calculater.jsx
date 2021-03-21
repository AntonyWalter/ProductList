import React from "react"
import ReactDom from "react-dom";

class Calculater extends React.Component 
{
    constructor(props)
    
    {
        super(props);
        this.state = {calculateValue:0,resultVal:0};
        this.handleChange = this.handleChange.bind(this);
        this.CalculateEvent = this.CalculateEvent.bind(this);
    }

    CalculateEvent(){
    //(CalculateEvent) => {
    
        console.log("testing1");
       // this.setState({value: event.target.value});
       this.setState({resultVal:this.state.calculateValue});
    }

    handleChange(event) {
        this.setState({calculateValue: event.target.value});
      }
   
      render() {

        console.log("render")
        const label =  this.state.resultVal ==0 ? "Simple Calculater": "another calculator"
        
        return <div>
           <p>{this.props.calculateValue}</p>
            <table>
                <tbody>
                    <tr><td colSpan="3"> <label>{label}</label></td></tr>
                    <tr><td colSpan="3">
                    <input  value={this.state.calculateValue} onChange={this.handleChange} />
                        </td></tr>
                    <tr><td colSpan="3"><input value={this.state.resultVal}></input></td></tr>
                    <tr><td><button name ="1">1</button></td><td><button name ="2">2</button></td><td><button name ="3">3</button></td></tr>
                    <tr><td><button name ="4">4</button></td><td><button name ="5">5</button></td><td><button name ="6">6</button></td></tr>
                    <tr><td><button name ="7">7</button></td><td><button name ="8">8</button></td><td><button name ="9">9</button></td></tr>
                    <tr><td colSpan="3"><button name ="0">0</button></td></tr>
                    <tr><td><button name="Add">+</button></td><td><button name="sub">-</button></td>
                    <td><button onClick={this.CalculateEvent}>=</button></td></tr>
                </tbody>
            </table>
        </div>;
      }
}

export default Calculater;

