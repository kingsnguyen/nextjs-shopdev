import prisma from "@/src/lib/db/prisma"
import { redirect } from "next/navigation"
import FromSubmitButton from "../../components/FormSubmitButton"
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/configs/auth";

export const metadata = {
  title: "Add Product"
}

async function  addProduct(formData:FormData) {
  'use server';

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const name = formData.get('name')?.toString()
  const imageUrl = formData.get('imageUrl')?.toString()
  const description = formData.get('description')?.toString()
  const price = Number(formData.get('price') || 0)


  if(!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }
  await prisma.product.create({
    data: {
      name, description, imageUrl, price
    }
  });

  redirect('/')
}

export default async function AddProductPage() {
    const session  =  await getServerSession(authOptions)

    if(!session) {
      redirect("/api/auth/signin?callbackUrl=/add-product")
    }
    return (
      <div>
            <h1 className="text-lg mb-3 font-bold">Add Product</h1>
            <form action={addProduct}>
                <input required name="name" placeholder="Name" className="mb-3 w-full input input-bordered" />
                <textarea 
                name="description" required placeholder="Description"
                className="textarea-bordered textarea mb-3 w-full"
                ></textarea>
                <input required name="imageUrl" placeholder="image Url" type="url" className="mb-3 w-full input input-bordered" />
                <input required name="price" placeholder="Price" className="mb-3 w-full input input-bordered" />

                <FromSubmitButton className="btn btn-success btn-block" >Add Product</FromSubmitButton>
            </form>
      </div>
    )
}