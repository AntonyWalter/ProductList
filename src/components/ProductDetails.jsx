import React, { Component } from 'react'

class ProductDetails extends Component {

    state={
        ...this.returnStateObject()
        }

        returnStateObject()
        {
            if(this.props.currentIndex == -1)
            return {
                    productId:0,
                    productName:'',
                    category:'',supplier:'',price:'',ProductStatus:'',DateLastUpdated:''
                }
            else 
                return   this.props.productList[this.props.currentIndex]
                 
        }

        //handleInputChange = this.handleInputChange.bind(this);


    handleInputChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
       }

       handleSubmit = (e) => {
       e.preventDefault()
       this.props.onAddorEdit(this.state)
    }

    componentDidUpdate(prevProps)
    {
if(prevProps.currentIndex != this.props.currentIndex)
      this.setState({...this.returnStateObject()})
    }

    

    render() {
        return (
            <div>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <input name="productName" placeholder="Product Name" value={this.state.productName} onChange={this.handleInputChange}></input><br/>
                    <input name="category" placeholder="category" value={this.state.category} onChange={this.handleInputChange}></input><br/>
                    <input name="supplier" placeholder="Supplier" value={this.state.supplier} onChange={this.handleInputChange}></input><br/>
                    <input name="ProductStatus" placeholder="ProductStatus " value={this.state.ProductStatus} onChange={this.handleInputChange}></input><br/>
                    <input name="price" placeholder="price" value={this.state.price} onChange={this.handleInputChange}></input>
                    <br/>
                    <button type="submit" >Submit</button>
                </form>
            </div>
        )
    }
}
export default  ProductDetails