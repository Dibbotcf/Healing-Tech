import { getPayload } from "payload"
import configPromise from "@/payload.config"
export const dynamic = 'force-dynamic';
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, SearchX, Download } from "lucide-react"
import PrintButton from "@/components/PrintButton"

export default async function InvoicePage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params
  const payload = await getPayload({ config: configPromise })
  
  const { docs } = await payload.find({
    collection: "orders",
    where: {
      orderNumber: {
        equals: orderNumber
      }
    },
    overrideAccess: true,
    depth: 2,
    limit: 1
  })
  
  if (docs.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center font-['Inter'] px-4">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-red-100 max-w-lg w-full text-center relative overflow-hidden">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
             <SearchX className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-[#111111] mb-2 tracking-tight">Invoice Not Found</h1>
          <p className="text-[#575B5F] mb-8 text-sm">
            We couldn't find an invoice for the Order Number: <strong className="text-[#00355D]">{orderNumber}</strong>. Please check the spelling and try again.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/track-order" className="flex-1 bg-white border-2 border-gray-200 text-gray-600 hover:border-[#12B5CB] hover:text-[#12B5CB] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center">
               Try Again
            </Link>
            <Link href="/products" className="flex-1 bg-[#12B5CB] hover:bg-[#009EE2] text-white font-bold py-3.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2">
               Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const order = docs[0] as any

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 pb-24 font-['Inter'] selection:bg-[#12B5CB] selection:text-white">
      <div className="container mx-auto px-4 max-w-[800px]">
        {/* Actions Row */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <Link href="/products" className="flex items-center gap-2 text-[#00355D] font-bold hover:text-[#12B5CB] transition-colors text-sm bg-white border border-[#00355D]/10 px-5 py-2.5 rounded-lg shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <div className="flex gap-3">
             <PrintButton />
          </div>
        </div>

        {/* Invoice Paper */}
        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden print:shadow-none print:border-none print:p-0">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-8 mb-8">
            <div className="mb-6 md:mb-0">
              <Image src="/logo-dark.svg" alt="Healing Technology" width={220} height={48} className="object-contain" />
              <p className="text-xs text-gray-500 mt-2 tracking-widest uppercase font-bold">Official Commercial Invoice</p>
            </div>
            <div className="text-left md:text-right">
              <h2 className="text-3xl font-bold text-[#00355D] mb-1">INVOICE</h2>
              <p className="text-sm font-bold text-[#12B5CB]">{order.orderNumber}</p>
              <div className="mt-4 flex flex-col md:items-end gap-1 text-sm text-gray-500">
                <p><span className="font-semibold text-gray-700">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>
                  <span className="font-semibold text-gray-700">Payment:</span> 
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                    order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                    order.paymentStatus === 'unpaid' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Customer & Company Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
             <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Billed To</h3>
               <p className="font-bold text-[#111111] text-lg">{order.customer.firstName} {order.customer.lastName}</p>
               <p className="text-sm text-gray-500 mt-1">{order.customer.address}</p>
               <p className="text-sm text-gray-500">{order.customer.city}</p>
               <p className="text-sm text-gray-500 mt-3">{order.customer.email}</p>
               <p className="text-sm text-[#00355D] font-medium">{order.customer.phone}</p>
             </div>
             <div className="md:text-right">
               <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">From</h3>
               <p className="font-bold text-[#111111] text-lg">Healing Technology Ltd.</p>
               <p className="text-sm text-gray-500 mt-1">Ansari Bhaban (Ground Floor), 14/2</p>
               <p className="text-sm text-gray-500">Topkhana Road, Paltan, Dhaka-1000</p>
               <p className="text-sm text-[#00355D] font-medium mt-3">info@healingtech.com.bd</p>
             </div>
          </div>

          {/* Table */}
          <div className="w-full mb-8">
            <div className="flex text-xs font-bold uppercase tracking-widest text-gray-400 border-b-2 border-gray-100 pb-3 mb-4">
              <div className="flex-1">Description</div>
              <div className="w-24 text-center">Qty</div>
              <div className="w-32 text-right">Unit Price</div>
              <div className="w-32 text-right">Amount</div>
            </div>
            
            <div className="space-y-4">
              {order.items.map((item: any) => {
                const isProductString = typeof item.product === 'string';
                const productName = isProductString ? item.product : item.product?.name || "Unknown Product";
                
                return (
                  <div key={item.id} className="flex text-sm text-[#111111] font-medium items-center pb-4 border-b border-gray-50">
                    <div className="flex-1">
                      <p className="font-bold text-[#00355D]">{productName}</p>
                    </div>
                    <div className="w-24 text-center">{item.quantity}</div>
                    <div className="w-32 text-right">৳{item.priceAtPurchase?.toLocaleString()}</div>
                    <div className="w-32 text-right font-bold text-[#111111]">৳{(item.priceAtPurchase * item.quantity).toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end pt-4 mb-16">
             <div className="w-full md:w-1/2 lg:w-1/3">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-500 font-medium text-sm">Subtotal</span>
                  <span className="font-bold text-[#111111]">৳{order.totalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-3">
                  <span className="text-gray-500 font-medium text-sm">Tax</span>
                  <span className="font-bold text-[#111111]">৳0</span>
                </div>
                <div className="flex justify-between items-center mt-2 bg-[#F8F9FA] p-4 rounded-xl border border-gray-100">
                  <span className="text-lg font-bold text-[#111111]">Total</span>
                  <span className="text-2xl font-extrabold text-[#12B5CB]">৳{order.totalAmount?.toLocaleString()}</span>
                </div>
             </div>
          </div>

          <div className="text-center pt-8 border-t border-gray-100 text-xs text-gray-400 font-medium">
             Thanks for choosing Healing Technology. All products come with official warranties as stated in the documentation.
          </div>
        </div>
      </div>
    </div>
  )
}
