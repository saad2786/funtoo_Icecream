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
    console.log(result);

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
    console.log(result);
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
    console.log(result);
    return result;
  } catch (err) {
    console.error("Error creating transaction:", err);
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
    console.log(result);

    return result;
  } catch (err) {
    console.error("Error creating transaction:", err);
  }
};
const createTransaction = async ({ items, paymentMethod }) => {
  const currDate = new Date().toISOString();

  try {
    const pool = await sql.connect(config);
    const values = items
      .filter((item) => {
        return item.count >= 1;
      })
      .map((item) => {
        return `(${item.id}, ${item.count}, ${item.price}, ${item.pricePerUnit}, '${paymentMethod}', '${currDate}')`;
      })
      .join(", ");
    console.log(values);
    // console.log(items);

    const result = await pool.request().query(
      `
      INSERT INTO [Chaha].[dbo].[TBL_TRANSACTION_DETAILS] (PID, QTY, TOTAL_AMT, MRP, PAYTYPE, DATE)
      VALUES ${values}
    `,
    );
    console.log(result);
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
    console.log(result);

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
      VALUES ('${name}', '${currDate}', ${status})
    `,
    );
    console.log(result);
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
    console.log(result);
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
  getTransactions,
  createTransaction,
  getPayType,
  addPayType,
  togglePayTypeStatus,
};
