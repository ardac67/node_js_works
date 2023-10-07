import prisma from "../db"

export const getProducts= async (req,res) =>{
    const user = await prisma.user.findUnique({
        where:{
            id: req.user.id
        },
        include:{
            product:true
        }
    })
    res.json({data:user.product})
}

export const getOneProduct = async (req,res)=>{
    const id = req.params.id;
    const product = await prisma.product.findFirst({
        where:{
            id,
            belongsToId:req.user.id
        }
    })
    res.json({data:product})
}

export const createProduct = async (req,res) => {
    const product= await prisma.product.create({
        data:{
            name:req.body.name,
            belongsToId:req.user.id,
        }
    })
    res.json({data:product})
}
export const updateProduct = async (req,res) => {
    const updated= await prisma.product.update({
        where:{
          id:req.params.id  
        },
        data:{
            name:req.body.name
        }
    })
    res.json({data:updated})
}

export const deleteProduct = async (req,res) => {
    const deleted = await prisma.product.delete({
        where:{
            id:req.body.id,
            belongsToId:req.user.id
        }
    })
    res.json({data:deleted})
}