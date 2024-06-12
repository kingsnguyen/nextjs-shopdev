import ProductCard from "@/src/components/ProductCard"
import prisma from "@/src/lib/db/prisma"
import { Metadata } from "next"

interface SearchPageProps {
    searchParams: {query : string}
}

export function generateMetadata({
    searchParams: {query}
}: SearchPageProps) : Metadata {
    return  {
        title: `Search : ${query}`,
    }
}

export default async function SearchPage({searchParams: {query}}: SearchPageProps) {
    const products = await prisma.product.findMany({
        where: {
            OR: [ 
                {name: {contains: query, mode: 'insensitive'}},
                {description: {contains: query, mode: 'insensitive'}},
            ]
        },
        orderBy: {id: "desc"}
    })

    if(products.length === 0) {
        return <div className="text-center">No Products found</div>
    }

    return (
        <div className="py-4 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map(product => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    )
}