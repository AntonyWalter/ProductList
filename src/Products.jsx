import React from "react"
import ReactDom from "react-dom";
import { Table } from "semantic-ui-react";


class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterVal: "", search: null, productList: [
      ]
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({ filterVal: event.target.value });
    let keyword = event.target.value;
    this.setState({ search: keyword });
  }

  componentDidMount() {
    
    /* fetch("http://localhost:7000/productlist")
    .then(response => response.json())
    
    .then(result => {
      
      this.setState({productList : result });
      console.log('Success:', this.state.productList);
    })
    .catch(error => {
      console.error('Error:', error);
    });
 */
    let p = new Promise((resolve,reject)=>
     {
      fetch("http://localhost:3006/products" )
      .then(response => response.json())
      
      .then(result=>{
        console.log( this.state.productList);
        this.setState({productList : result });
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

    /* fetch("http://localhost:7000/productlist")
    .then(response=> response.json())
    .then (result => {
      if (result.ok) {
          this.setState({productList :  result});
          console.log('Success:', this.state.productList);
      }
      else
       Promise.reject(Error('error'))
    }).catch(error => {
      console.error('Error:', error);
    }); */



  }

  render() {
    
    const items = this.state.search === null ? this.state.productList : this.state.productList.filter((data) => {
      if (data.ProductName.toLowerCase().includes(this.state.search.toLowerCase()) ||
        data.Category.toLowerCase().includes(this.state.search.toLowerCase())) {
        return true;
      }

      return false;
    })

    const Search =<input value={this.state.filterVal} onChange={this.handleChange} />; 

   
    const k = items.map(data => 

      < Table.Body >
      <Table.Row key={data.ProductId}>
        <Table.Cell>{data.ProductName}</Table.Cell>
        <Table.Cell>{data.Category}</Table.Cell>
        <Table.Cell>{data.Price}</Table.Cell>
        <Table.Cell>{data.Stock}</Table.Cell>
        <Table.Cell>{data.SupplierName}</Table.Cell>
        <Table.Cell>{data.ProductStatus}</Table.Cell>
        <Table.Cell>{data.DateLastUpdated}</Table.Cell>
      </Table.Row>
        </Table.Body >
);


    return (


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
            </Table.Header> {k} </Table>

          </td></tr> </table>
      </div>

    );
  }
}

export default Products;