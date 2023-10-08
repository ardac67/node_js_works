import prisma from "../db";

export const createCategory = async (req,res) => {
    const category = await prisma.category.create({
        data:{
            category_name:req.body.category_name,
        }
    })
    res.status(200)
    res.json({message:category});
}
export const getAllCategories = async (req,res) => {
    const category = await prisma.category.findMany()
    res.status(200)
    res.json({message:category})
}

export const getCategoryId = async (req,res) => {
    const categoryId = await prisma.category.findUnique({
        select:{
            category_id:true
        },
        where:{
            category_name:req.params.categoryName
        }
    })
    res.status(200)
    res.json({message:categoryId})
}

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk2NzUxOTMzfQ.r8Gs142_JlJLAQMGaHXfrf-exqt4Ij6E3O77pIrEOKA
*/