const Pool = require("../db/index");

const productController = {};

productController.getAll = async (req, res) => {
    try {
        const [rows, fields] = await Pool.query("select * from users");
        res.send(rows);
    } catch (err) { }
};

productController.buyProduct = async (req, res) => {
    // res.send(req.params)
    try {
        const id = req.params.id
        const { refid, quantity, uid } = req.body
        const INSERT_IN_ORDER_LIST = 'INSERT INTO  `order-list` (uid,refid,pid,date) VALUES (?, ?, ?, ?)';
        const FINDUID_QUERY = 'SELECT * FROM products WHERE id = ?';
        const UPDATE_PRODUCT_QUERY = "UPDATE products SET quantity = ? WHERE id = ?";

        const [product, fields] = await Pool.query(FINDUID_QUERY, [id]);
        // console.log(product)
        if (product.length > 0) {
            if (product[0].quantity >= quantity) {
                const date = new Date().toISOString().split('T')[0]
                const updateQuantity = product[0].quantity - quantity
                console.log(updateQuantity)
                // console.log(date)
                await Pool.query(INSERT_IN_ORDER_LIST, [uid, refid, id, date]);
                await Pool.query(UPDATE_PRODUCT_QUERY, [updateQuantity, id])
                res.status(200).json({ success: true, message: "product order succesfully!" })

            }
            else {
                res.json({ success: false, message: "stcok out" })
            }





            // const myincome =(product[0].price*2)/100
            // const myrefincome =(product[0].price*5)/100


        }
        else {
            res.status(404).json({ success: false, message: "No product found" })
        }
        // res.send(product)


    } catch (err) {
        console.log(err)
    }
}

// admin


productController.productAccept = async (req, res) => {
    // res.send(req.params)
    try {
        const orderid = req.params.id
       
        const INSERT_IN_ORDER_LIST = 'INSERT INTO  `transaction_history` (uid,pid,amount,date,status,text) VALUES (?, ?, ?, ?, ?, ?)';
        const FIND_ORDER_QUERY = 'SELECT * FROM `order-list` WHERE id = ?';
        const FINDPRODUCT_QUERY = 'SELECT * FROM products WHERE id = ?';
        const UPDATE_PRODUCT_QUERY = "UPDATE products SET quantity = ? WHERE id = ?";
        

    
        const [order, fields] = await Pool.query(FIND_ORDER_QUERY, [orderid]);
   
        if (order.length > 0) {         
        const [product, fields] = await Pool.query(FINDPRODUCT_QUERY, [order[0].pid]);

            const myincome =(product[0].price*2)/100
            const myrefincome =(product[0].price*5)/100

            // console.log(myincome,myrefincome)
        }
        else {
            res.status(404).json({ success: false, message: "No product found" })
        }
        // res.send(product)


    } catch (err) {
        console.log(err)
    }
}




module.exports = productController;
