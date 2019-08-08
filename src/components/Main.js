import React from 'react';
import BuyProducts from './BuyProducts';

const Main = (props) => {
    const { createProduct } = props;
    return (
        <div id="content">
            {/* <h1>Add Product</h1>
            <form>
                <div className="form-group mr-sm-2">
                    <input
                        id="productName"
                        type="text"
                        className="form-control"
                        placeholder="Product Name"
                        required
                    />
                </div>
                <div className="form-group mr-sm-2">
                    <input
                        id="productPrice"
                        type="text"
                        className="form-control"
                        placeholder="Product Name"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form> */}
            <BuyProducts createProduct={createProduct} />
            <p>&nbsp;</p>
            <h2>Buy Product</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Owner</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody id="productList">
                    <tr>
                        <th scope="row">1</th>
                        <td>Knight Painting</td>
                        <td>1.5 Eth</td>
                        <td>213cdsf123v23</td>
                        <td><button className="buyButton">Buy</button></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Asuka painting</td>
                        <td>3 Eth</td>
                        <td></td>
                        <td><button className="buyButton">Buy</button></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Chaeyoung</td>
                        <td>5 Eth</td>
                        <td></td>
                        <td><button className="buyButton">Buy</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Main;
