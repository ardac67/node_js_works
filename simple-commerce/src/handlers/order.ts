import prisma from "../db";
export const createOrder = async (req, res) => {
    try {
      await prisma.$transaction(async (tx) => {
        const now = new Date();
        const header = await tx.orders.create({
          data: {
            user_id: req.body.user_id,
            order_date: now,
            status: req.body.status,
          },
        });
  
        const orderId = header.order_id;
        const allLines = [];
  
        for (var i = 0; i < req.body.products.length; i++) {
          const line = await tx.order_items.create({
            data: {
              order_id: orderId,
              product_id: req.body.products[i].product_id,
              quantity: req.body.products[i].quantity,
              price_of_purchase: req.body.products[i].price_of_purchase,
            },
          });
  
          allLines.push(line);
        }
  
        res.json({ header: header, line: allLines });
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  };

export const getOrders = async (req,res,next) => {
    try{
        const getAllOrders = await prisma.orders.findMany({
            where:{
                order_id:req.params.filter
            },
            include:{
                order_items:true
            }
        })
        res.json({message:getAllOrders})
    }
    catch(e){
        next(e)
    }
}

export const updateOrders = async (req,res,next) => {
  try{
      const updateOne = await prisma.orders.update({
          where:{
              order_id:req.params.filter
          },
          data:{
            status:req.body.status
          }
      })
      res.json({message:updateOne})
  }
  catch(e){
      next(e)
  }
}