import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { auth } from "@/lib/auth"
import { scrap_data, categorise } from '@/lib/urlHandler';

async function addRecord(url:string, email: any, title:string, description:string, category:string, image: string, logo : string) {
    const client = await clientPromise;
    const db = client.db();
    const newRecord = {url: url, title: title, description: description, image: image, logo: logo, category: category, createdAt: new Date()}
    const result = await db.collection('users').updateOne(
        { email: email},
        { $push: { record: newRecord } }
    );
    return result;
}


export async function POST(request: Request) {
    try {
        
        const { url, manual, category, title, description } = await request.json();
        const client = await clientPromise;
        const db = client.db(); 
        const session = await auth();
        if (!session || !session.user) {
            throw Error("Cannot find user!")
        }
        const user = await db.collection('users').findOne({ email: session.user.email });
        if (!user) {
            throw Error("No user found " + session.user.email)
        }
        
        if (manual) {
            const cat = String(category)
            const result = await addRecord(url, user.email, title, description, category, "", "")
            return NextResponse.json(result)
        } else {
            const url_data = await scrap_data(url);
            const category = await categorise(url, url_data, user.categories)
            
            const result = await addRecord(url,user.email, url_data.title, url_data.description, category, url_data.image, url_data.logo);
            return NextResponse.json({success: true});
        }

    } catch(err : any) {
         return NextResponse.json(
            { error: err.message ||'Error' },
            { status: 500 }
        );
    }
};