import { directusGet } from "@/lib/directus"
export const dynamic = 'force-dynamic';
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, SearchX } from "lucide-react"
import PrintButton from "@/components/PrintButton"

export default async function InvoicePage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params

  const res = await directusGet<{ data: any[] }>(
    `/items/orders?filter[order_number][_eq]=${encodeURIComponent(orderNumber)}&fields=*&limit=1`
  )

  if (!res.data?.length) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center font-['Inter'] px-4">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-red-100 max-w-lg w-full text-center relative overflow-hidden">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
             <SearchX className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-[#111111] mb-2 tracking-tight">Invoice Not Found</h1>
          <p className="text-[#575B5F] mb-8 text-sm">
            We couldn&apos;t find an invoice for Order Number: <strong className="text-[#00355D]">{orderNumber}</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/products" className="flex-1 bg-[#12B5CB] hover:bg-[#009EE2] text-white font-bold py-3.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2">
               Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const raw = res.data[0] as any

  // items stored as JSON array; support both old and new key formats
  const rawItems: any[] = Array.isArray(raw.items) ? raw.items : []
  const orderItems = rawItems.map((item: any, idx: number) => ({
    id: item.product ?? item.product_id ?? idx,
    product: item.productName ?? item.product_name ?? String(item.product ?? item.product_id ?? 'Product'),
    size: item.size ?? null,
    quantity: item.quantity ?? 1,
    priceAtPurchase: item.priceAtPurchase ?? item.price_at_purchase ?? 0,
  }))

  const deliveryCharge: number = raw.delivery_charge ?? 0
  const deliveryType: string = raw.delivery_type ?? ''
  const deliveryLabel =
    deliveryType === 'outside_dhaka' ? 'Outside Dhaka' :
    deliveryType === 'inside_dhaka'  ? 'Inside Dhaka'  : ''

  const itemsSubtotal = orderItems.reduce((sum: number, i: any) => sum + i.priceAtPurchase * i.quantity, 0)
  const grandTotal: number = raw.total_amount ?? itemsSubtotal + deliveryCharge

  const order = {
    orderNumber: raw.order_number,
    createdAt: raw.date_created,
    paymentStatus: raw.payment_status,
    paymentMethod: raw.payment_method,
    status: raw.status,
    grandTotal,
    deliveryCharge,
    deliveryLabel,
    customer: {
      firstName: raw.customer_first_name ?? '',
      lastName: raw.customer_last_name ?? '',
      address: raw.customer_address ?? '',
      city: raw.customer_city ?? '',
      email: raw.customer_email ?? '',
      phone: raw.customer_phone ?? '',
    },
    items: orderItems,
  }

  const STATUS_COLORS: Record<string, string> = {
    paid: 'bg-green-100 text-green-700',
    unpaid: 'bg-amber-100 text-amber-700',
    pending: 'bg-blue-100 text-blue-700',
    processing: 'bg-purple-100 text-purple-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 pb-24 font-['Inter'] selection:bg-[#12B5CB] selection:text-white print:min-h-0 print:pt-0 print:pb-0 print:bg-white">
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
        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden print:shadow-none print:border-none print:p-0 print:rounded-none print:overflow-visible">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-8 mb-8 print:pb-4 print:mb-4">
            <div className="mb-6 md:mb-0">
              <Image src="/logo-dark.svg" alt="Healing Technology" width={220} height={48} className="object-contain" />
              <p className="text-xs text-gray-500 mt-2 tracking-widest uppercase font-bold">Official Commercial Invoice</p>
            </div>
            <div className="text-left md:text-right">
              <h2 className="text-3xl font-bold text-[#00355D] mb-1">INVOICE</h2>
              <p className="text-sm font-bold text-[#12B5CB]">{order.orderNumber}</p>
              <div className="mt-4 flex flex-col md:items-end gap-1.5 text-sm text-gray-500">
                <p><span className="font-semibold text-gray-700">Date:</span> {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}</p>
                <div className="flex md:justify-end items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-700">Payment:</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${STATUS_COLORS[order.paymentStatus] ?? 'bg-gray-100 text-gray-700'}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="flex md:justify-end items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-700">Status:</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-700'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Company Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 print:mb-4">
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

          {/* Items Table */}
          <div className="w-full mb-8 print:mb-3">
            <div className="flex text-xs font-bold uppercase tracking-widest text-gray-400 border-b-2 border-gray-100 pb-3 mb-4">
              <div className="flex-1">Description</div>
              <div className="w-20 text-center">Qty</div>
              <div className="w-28 text-right">Unit Price</div>
              <div className="w-28 text-right">Amount</div>
            </div>

            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex text-sm text-[#111111] font-medium items-center pb-4 border-b border-gray-50">
                  <div className="flex-1">
                    <p className="font-bold text-[#00355D]">{item.product}</p>
                    {item.size && (
                      <p className="text-xs text-gray-400 mt-0.5">{item.size}</p>
                    )}
                  </div>
                  <div className="w-20 text-center">{item.quantity}</div>
                  <div className="w-28 text-right">৳{(item.priceAtPurchase ?? 0).toLocaleString()}</div>
                  <div className="w-28 text-right font-bold text-[#111111]">৳{((item.priceAtPurchase ?? 0) * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end pt-4 mb-16 print:mb-2">
             <div className="w-full md:w-1/2 lg:w-2/5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-500 font-medium text-sm">Subtotal</span>
                  <span className="font-bold text-[#111111]">৳{itemsSubtotal.toLocaleString()}</span>
                </div>
                {deliveryCharge > 0 && (
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-500 font-medium text-sm">
                      Delivery{deliveryLabel ? ` (${deliveryLabel})` : ''}
                    </span>
                    <span className="font-bold text-[#111111]">৳{deliveryCharge.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-3">
                  <span className="text-gray-500 font-medium text-sm">Tax</span>
                  <span className="font-bold text-[#111111]">৳0</span>
                </div>
                <div className="flex justify-between items-center mt-2 bg-[#F8F9FA] p-4 rounded-xl border border-gray-100">
                  <span className="text-lg font-bold text-[#111111]">Total</span>
                  <span className="text-2xl font-extrabold text-[#12B5CB]">৳{order.grandTotal.toLocaleString()}</span>
                </div>
             </div>
          </div>

          <div className="text-center pt-8 border-t border-gray-100 text-xs text-gray-400 font-medium print:pt-3">
             Thanks for choosing Healing Technology. All products come with official warranties as stated in the documentation.
          </div>
        </div>
      </div>
    </div>
  )
}
