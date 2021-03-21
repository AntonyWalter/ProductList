import React, { Component } from 'react'
import ProductDetails from './ProductDetails'
import { Table } from "semantic-ui-react";


 class ProductList extends Component {

    constructor (props)
    {
        super(props);
        this.state = {
         filterVal: "", search: null, productList: [],currentIndex: -1
                    };
     this.handleChange = this.handleChange.bind(this);
    
    }

    handleChange(event) {
      this.setState({ filterVal: event.target.value });
      let keyword = event.target.value;
      this.setState({ search: keyword });
  
    }

    handleEdit(prodId)
    {
      console.log(prodId);
      this.setState({currentIndex : prodId});
    }

 
    componentDidMount() {
      let p = new Promise((resolve,reject)=>
   {
    fetch("http://localhost:3006/products" )
    .then(response => response.json())
    
    .then(result=>{
      console.log( this.state.productList);
      this.setState({productList : result });
      localStorage.setItem('productItems',JSON.stringify(result))
      resolve('success:')
    })
    .catch(error => {
      reject('Failed:')
   });
  });

  p.then((message)=>{
    console.log(message, this.state.productList);
  }).catch((message)=>{
    console.error(message,this.state.productList);
  })
  }

  

    render() {

      const items = this.state.search === null ? this.state.productList : this.state.productList.filter((data) => {
        if (data.productName.toLowerCase().includes(this.state.search.toLowerCase()) ||
          data.category.toLowerCase().includes(this.state.search.toLowerCase())) {
           
              return true;
        }
          
        return false;
      })
  
      const Search =<input value={this.state.filterVal} onChange={this.handleChange} />; 
      console.log(items);
  
      const productTbody = items.map(data => 

        < Table.Body >
        <Table.Row key={data.productId}>
          <Table.Cell>{data.productName}</Table.Cell>
          <Table.Cell>{data.category}</Table.Cell>
          <Table.Cell>{data.price}</Table.Cell>
          <Table.Cell>{data.stock}</Table.Cell>
          <Table.Cell>{data.supplierName}</Table.Cell>
          <Table.Cell>{data.productStatus}</Table.Cell>
          <Table.Cell>{data.dateLastUpdated}</Table.Cell>
          <Table.Cell><button onClick={ ()=>this.handleEdit(data.productId)}>Edit</button></Table.Cell>
        </Table.Row>
          </Table.Body >
        
  );
  

        return (
            <div>
                 <ProductDetails list={this.state.productList} onAddorEdit={this.onAddorEdit} currentIndex={this.state.currentIndex}
                 
                 ></ProductDetails>
                  <hr></hr>

                  <div>

        <table><tr><td><h2>Products List</h2></td></tr>

          <tr><td><label>Filter:</label> {Search} </td></tr>

          <tr><td>  <Table >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ProductName</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Stock</Table.HeaderCell>
                <Table.HeaderCell>SupplierName</Table.HeaderCell>
                <Table.HeaderCell>ProductStatus</Table.HeaderCell>
                <Table.HeaderCell>DateLastUpdated</Table.HeaderCell>
              </Table.Row>
            </Table.Header> {productTbody} </Table>

          </td></tr> </table>
      </div>
               
            </div>
        )
    }

    onAddorEdit = (data) =>
    {
        var list =this.state.productList
       if(this.state.currentIndex == -1)
        list.push(data)
       else
         list[this.state.currentIndex] = data
        localStorage.setItem('productItems',JSON.stringify(list))
        this.setState({productList:list})
    }


    
}


export default ProductList