import React from 'react';
import AddProduct from './AddProduct';
import BuyProducts from './BuyProducts';

const Main = (props) => {
    const { account, createProduct, products, handlePurchase } = props;
    return (
        <div id="content">
            <AddProduct createProduct={createProduct} />
            <p>&nbsp;</p>
            <BuyProducts account={account} products={products} handlePurchase={handlePurchase} />
        </div>
    )
}

export default Main;
