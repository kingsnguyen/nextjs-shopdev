import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import  prisma  from '../lib/db/prisma'
import Image from "next/image";
import PaginationBar from '../components/Paginationbar';

interface HomePageProps {
  searchParams: {page: string}
}

export default async function Page({searchParams: {page ="1"}}: HomePageProps) {
  const currentPage = parseInt(page)

  const pageSize = 2
  const heroItemCount = 1

  const totalItemCount = await prisma.product.count()

  const totalPages = Math.ceil((totalItemCount -heroItemCount)/ pageSize)

  const products = await prisma.product.findMany({
    orderBy: {id: "desc"},
    skip: (currentPage -1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0)
  })
  return (
    <div>
      <div className='hero rounded-xl bg-base-200'>
        <div className="hero-content flex-col lg:flex-row">
        <Image
          src={products[0].imageUrl}
          alt={products[0].name}
          width={400}
          height={800}
          className='w-full max-w-sm rounded-lg shadow-2xl'
          priority
        />
        <div>
          <h1 className='text-5xl font-bold'>{products[0].name}</h1>
          <p className="py-6">{products[0].description}</p>
          <Link href={"/products/" + products[0].id} className='btn btn-primary'>Check it out</Link>
        </div>
        </div>
      </div>
      <div className="py-4 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {(currentPage === 1 ? products.slice(1) : products).map(product => (
          <ProductCard product={product} key={product.id}></ProductCard>
        ))}
      </div>
      
        {totalPages > 1 && (<PaginationBar currentPage={currentPage} totalPages={totalPages} />)}
      
    </div>
  );
}
