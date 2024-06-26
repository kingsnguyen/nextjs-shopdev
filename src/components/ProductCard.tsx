import {Product} from "@prisma/client"
import Link from "next/link"
import PriceTag from "./PriceTag"
import Image from "next/image"

interface ProductCardProps {
    product: Product
}

export default function ProductCard({product}: ProductCardProps) {
    const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000*60860*24*7
    return (
        <Link href={"/products/" + product.id} className="card w-full bg-base-100 hover:shadow-xl">
            <figure>
                <Image src={product.imageUrl} alt="images" width={800} height={400} className="h-48 object-cover "/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                {isNew && <div className="badge badge-secondary">New</div>}
                <p>{product.description}</p>
                <PriceTag className="text-red-500" price={product.price}/>
            </div>
        </Link>
    )
}