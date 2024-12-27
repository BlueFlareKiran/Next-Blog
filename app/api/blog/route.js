import { NextResponse } from "next/server"
import {writeFile} from "fs/promises";
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";

const LoadDB = async ()=>{
    await ConnectDB();
}

LoadDB(); 

export async function GET(request) {
    console.log("blog get hit")
    return NextResponse.json({message:"Api is working"})
}

export async function POST(request) {

    const formData= await request.formData();
    const timestamp=new Date.now();

    const image=formData.get('image');
    const imageByteData=await image.arrayBuffer();
    const buffer=Buffer.from(imageByteData);
    const path=`./public/${timestamp}_${image.name}`;
    await writeFile(path,buffer);
    const imgUrl=`/${timestamp}_${image.name}`;

    const blogData={
        title:`${formData.get('title')}`,
        description:`${formData.get('description')}`,
        catagory:`${formData.get('catagory')}`,
        author:`${formData.get('author')}`,
        image:`${imgUrl}`,
        authorImg:`${formData.get('authorImg')}`

    }

    await BlogModel.create(blogData);
    console.log("Blog saved")

    return NextResponse.json({success:true,msg:"Blog saved"})
}