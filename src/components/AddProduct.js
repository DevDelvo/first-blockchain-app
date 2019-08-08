import React, { useState } from 'react';

const AddProduct = (props) => {
    const [state, setState] = useState({
        name: '',
        price: 0,
    })

    const { name, price } = state;
    const { createProduct } = props;

    const handleChange = name => e => {
        setState({...state, [name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const convertedPrice = window.web3.utils.toWei(price.toString(), 'Ether')
        createProduct(name, convertedPrice)
    }

    return (
        <div>
            <h1>Add Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mr-sm-2">
                        <input
                            id="productName"
                            type="text"
                            className="form-control"
                            placeholder="Product Name"
                            onChange={handleChange('name')}
                            required
                        />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                            id="productPrice"
                            type="text"
                            className="form-control"
                            placeholder="Product Price"
                            onChange={handleChange('price')}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
        </div>
    )
}


export default AddProduct;