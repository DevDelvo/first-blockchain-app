import React from 'react';

const BuyProducts = (props) => {
    const { account, products, handlePurchase } = props;

    const renderProducts = (products) => {
        return products.map((product, key) => {
            const { id, name, price, owner } = product;
            const convertedPrice = window.web3.utils.fromWei(price.toString(), 'Ether');
            return account !== owner
                    ? (
                        <tr key={key}>
                            <th scope="row">{id.toString()}</th>
                            <td>{name}</td>
                            <td>{convertedPrice} Eth</td>
                            <td>{owner}</td>
                            <td>
                                {
                                !product.purchased
                                ? <button className="buyButton" onClick={() => {
                                    handlePurchase(id, price)
                                }}>
                                    Buy
                                </button>
                                : null
                                }
                            </td>
                        </tr>
                      )
                    : (
                        <tr key={key}>
                            <th scope="row">{id.toString()}</th>
                            <td>{name}</td>
                            <td>{convertedPrice} Eth</td>
                            <td>{owner}</td>
                            <td>
                                {
                                !product.purchased
                                ? <button className="removeButton">
                                    Remove
                                </button>
                                : null
                                }
                            </td>
                        </tr>
                      )
        })
    }

    return (
        <div>
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
                    { renderProducts(products) }
                </tbody>
            </table>
        </div>
    )
}


export default BuyProducts;