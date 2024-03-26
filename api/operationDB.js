const config = require("./config");
const sql = require("mssql");

//User
const getUser = async ({ username, password }) => {
  try {
    // console.log(username, password);
    const pool = await sql.connect(config);

    const result = await pool.request().query(
      `
     SELECT * FROM [dbo].[tbl_Member_Data] WHERE USERNAME = '${username}' AND PASS = '${password}'  
    `,
    );

    return result;
  } catch (err) {
    console.error("Error creating user:", err);
  }
};

//Products
const getItems = async () => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request().query(
      `
     SELECT * FROM [Chaha].[dbo].[TBL_PRODUCT_MASTER]
     `,
    );

    return result;
  } catch (err) {
    console.error("Error creating transaction:", err);
  }
};
const addProduct = async ({ name, price }) => {
  const currDate = new Date().toISOString();
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(
      `
      INSERT INTO [dbo].[TBL_PRODUCT_MASTER] (PRODUCT_NAME, MRP, DATE, ACTIVE)
      VALUES ('${name}', ${price}, '${currDate}', 1)
    `,
    );

    return result;
  } catch (err) {
    console.error("Error creating transaction:", err);
  }
};
const toggleProductStatus = async ({ status, itemId }) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(
      `  UPDATE [Chaha].[dbo].[TBL_PRODUCT_MASTER] SET ACTIVE = ${status} WHERE PID = ${itemId};
    `,
    );

    return result;
  } catch (err) {
    console.error("Error creating transaction:", err);
  }
};
const updateProduct = async ({ id, name, price }) => {
  const currDate = new Date().toISOString();
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(
      `  UPDATE [Chaha].[dbo].[TBL_PRODUCT_MASTER] SET PRODUCT_NAME = N'${name}' , MRP =${price}, DATE='${currDate}' WHERE PID = ${id};
    `,
    );
    console.log(result);
    return result;
  } catch (err) {
    console.error("Error updating product:", err);
  }
};

//Transaction
const getTransactions = async () => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request().query(
      `
     SELECT * FROM [Chaha].[dbo].[TBL_TRANSACTION_DETAILS]
    `,
    );

    return result;
  } catch (err) {
    console.error("Error creating transaction:", err);
  }
};
const createTransaction = async ({
  items,
  paymentMethod,
  username,
  customerName,
}) => {
  const currDate = new Date().toISOString();

  try {
    const pool = await sql.connect(config);
    const values = items
      .filter((item) => {
        return item.count >= 1;
      })
      .map((item) => {
        return `(${item.id}, ${item.count}, ${item.price}, ${item.pricePerUnit}, N'${paymentMethod}', '${currDate}', '${username}', N'${customerName}')`;
      })
      .join(", ");

    // console.log(items);

    const result = await pool.request().query(
      `
      INSERT INTO [Chaha].[dbo].[TBL_TRANSACTION_DETAILS] (PID, QTY, TOTAL_AMT, MRP, PAYTYPE, DATE, USERNAME, CUSTOMER_NAME)
      VALUES ${values}
    `,
    );

    return result;
  } catch (err) {
    console.error("Error creating transaction:", err);
  }
};

//Payment Methods
const getPayType = async () => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request().query(
      `
     SELECT * FROM [Chaha].[dbo].[tbl_PayType_Master]
    `,
    );

    return result;
  } catch (err) {
    console.error("Error creating transaction:", err);
  }
};
const addPayType = async ({ name, status }) => {
  const currDate = new Date().toISOString();
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(
      `
      INSERT INTO [dbo].[tbl_PayType_Master]
      VALUES (N'${name}', '${currDate}', ${status})
    `,
    );

    return result;
  } catch (err) {
    console.error("Error creating transaction:", err);
  }
};
const togglePayTypeStatus = async ({ status, payTypeId }) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(
      ` UPDATE [Chaha].[dbo].[tbl_PayType_Master] SET ACTIVE = ${status} WHERE PTID = ${payTypeId};
    `,
    );

    return result;
  } catch (err) {
    console.error("Error creating transaction:", err);
  }
};
module.exports = {
  getUser,
  getItems,
  addProduct,
  toggleProductStatus,
  updateProduct,
  getTransactions,
  createTransaction,
  getPayType,
  addPayType,
  togglePayTypeStatus,
};
