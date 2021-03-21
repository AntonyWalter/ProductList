import React from 'react';
import './Calculater.css'

const Button = (props) => {
    return <button type="button" onClick={() => { props.onButtonClick(props.value)}}>{props.value}</button>
}


class CalculaterNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = { result: "", operandA: null, operandB: null, operation: "" };
        this.onNumbersClick = this.onNumbersClick.bind(this);
    }

    onNumbersClick(val) {
        //if it is first number    
        if (this.state.operandA === null || this.state.operation === "") {
            this.setState({ operandA: val, result: val });
        } else {
            //if it is second no
            if (this.state.operation !== "") {
                this.setState({ result: this.calculateResult(this.state.operandA, val, this.state.operation) })
            } else {
                this.setState({ operandB: val });
            }
        }
    }

    calculateResult = (op1, op2, operation) => {
        switch (operation) {
            case "add":
                return op1 + op2
            case "multiply":
                return op1 * op2
            default:
                return ""

        }
    }

    clear = () => {
        this.setState({ result: "", operandA: null, operandB: null, operation: "" })
    }


    render() {
        const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const buttonsDisplay = buttons.map(item => <Button value={item} onButtonClick={this.onNumbersClick} />
        );

        return (<div className="calculator">
            <label>{this.props.title}</label><p/>
            <input type="text" value={this.state.result} />
            <div className="button-style">{buttonsDisplay}
            <button type="button" onClick={() => 
                this.setState({ operation: "add" })}>+</button>
                <button type="button" onClick={() => this.setState({ operation: "multiply" })}>*</button>
            <button onClick={() => this.clear()}>clear</button>
            </div>
        </div>);
    }
}

export default CalculaterNew;