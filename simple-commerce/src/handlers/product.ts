import prisma from "../db";

export const createProduct = async (req,res,next) => {
    try{
        const product = await prisma.product.create({
            data:{
                product_name:req.body.product_name,
                price:req.body.price,
                category_id:req.body.category_id
            }
        })
        res.status(200)
        res.json({message:product});
    }
    catch(e){
        next(e)
    }
    
}

export const getAllProducts = async (req,res) => {
    const product = await prisma.product.findMany()
    res.status(200)
    res.json({message:product});
}

export const getProduct = async (req,res) => {
    const product = await prisma.product.findMany({
        where:{
            product_name:req.params.filter
        }
    })
    res.status(200)
    res.json({message:product});
}