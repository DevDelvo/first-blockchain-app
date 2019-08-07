const Marketplace = artifacts.require("Marketplace");
require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('Marketplace', ([deployer, seller, buyer]) => {
    let marketplace

    before(async () => {
        marketplace = await Marketplace.deployed();
    });

    describe('deployment', async() => {
        it('deploys successfully', async () => {
            const address = await marketplace.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });

        it('has a name', async () => {
            const name = await marketplace.name();
            assert.equal(name, 'Art Marketplace');
        });
    });

    describe('products', async () => {
        let result, productCount

        before(async () => {
            result = await marketplace.createProduct('Knight painting', web3.utils.toWei('1', 'Ether'), { from: seller });
            productCount = await marketplace.productCount();
        });

        it('creates products', async () => {
            // SUCCESS
            assert.equal(productCount, 1);
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct');
            assert.equal(event.name, 'Knight painting', 'name is correct');
            assert.equal(event.price, '1000000000000000000', 'price is correct');
            assert.equal(event.owner, seller, 'owner is correct');
            assert.equal(event.purchased, false, 'purchased is correct');

            // FAILURE : Product must have a name
            await marketplace.createProduct(web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
            await marketplace.createProduct('Knight painting', 0, { from: seller }).should.be.rejected;
        });

        it('lists products', async () => {
            const product = await marketplace.products(productCount) // .products(id) takes in an id to find the product
            assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct');
            assert.equal(product.name, 'Knight painting', 'name is correct');
            assert.equal(product.price, '1000000000000000000', 'price is correct');
            assert.equal(product.owner, seller, 'owner is correct');
            assert.equal(product.purchased, false, 'purchased is correct');
        });

        it('sells products', async () => {
            // Track seller balance before purchase
            let oldSellerBalance;
            oldSellerBalance = await web3.eth.getBalance(seller);
            oldSellerBalance = new web3.utils.BN(oldSellerBalance); // convert to big number to use big number addition
            // SUCCESS: Buyer makes purchase
            result = await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') })

            // Check logs
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'Knight painting', 'name is correct')
            assert.equal(event.price, '1000000000000000000', 'price is correct')
            assert.equal(event.owner, buyer, 'owner is now the buyer')
            assert.equal(event.purchased, true, 'purchased is now true')

            // Check that seller received funds
            let newSellerBalance;
            newSellerBalance = await web3.eth.getBalance(seller);
            newSellerBalance = new web3.utils.BN(newSellerBalance);

            let price;
            price = await web3.utils.toWei('1', 'Ether');
            price = new web3.utils.BN(price);

            const expectBalance = oldSellerBalance.add(price);

            assert.equal(newSellerBalance.toString(), expectBalance.toString());

            // FAILURE: Tries to buy a product that does not exist
            await marketplace.purchaseProduct(1337, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
            // FAILURE: Not enough minerals
            await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
            // FAILURE: Purchases it twice
            await marketplace.purchaseProduct(productCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
            // FAILURE: Buyer can't be seller
            await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
        });
    })
});