import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    console.log('--- Starting Data Seed via API ---')

    const brandsData = [
      { name: 'Luminex-Lumen', slug: 'luminex-lumen' },
      { name: 'Heyer', slug: 'heyer', countryOfOrigin: 'Germany' },
      { name: 'Aeomed', slug: 'aeomed' },
      { name: 'Perlong', slug: 'perlong' },
      { name: 'Bng', slug: 'bng' },
      { name: 'Zerone', slug: 'zerone', countryOfOrigin: 'Korea' },
      { name: 'Suxin Medical', slug: 'suxin-medical' },
      { name: 'Hungustads', slug: 'hungustads' },
      { name: 'Healing Technology', slug: 'healing-technology', countryOfOrigin: 'Bangladesh' },
    ]
    const brandIds: Record<string, string | number> = {}
    for (const b of brandsData) {
      const existing = await payload.find({ collection: 'brands', where: { slug: { equals: b.slug } } })
      if (existing.docs.length > 0) {
        brandIds[b.name] = existing.docs[0].id
      } else {
        const created = await payload.create({ collection: 'brands', data: b })
        brandIds[b.name] = created.id
      }
    }

    const categoriesData = [
      { title: 'OT Solutions', slug: 'ot-solutions' },
      { title: 'ICU Equipment', slug: 'icu-equipment' },
      { title: 'Neonatal Care', slug: 'neonatal-care' },
      { title: 'Hospital Furniture', slug: 'hospital-furniture' },
      { title: 'Patient Transfer', slug: 'patient-transfer' },
      { title: 'Clinical Accessories', slug: 'clinical-accessories' },
      { title: 'Diagnostics/Lab', slug: 'diagnostics-lab' },
    ]
    const categoryIds: Record<string, string | number> = {}
    for (const c of categoriesData) {
      const existing = await payload.find({ collection: 'categories', where: { slug: { equals: c.slug } } })
      if (existing.docs.length > 0) {
        categoryIds[c.title] = existing.docs[0].id
      } else {
        const created = await payload.create({ collection: 'categories', data: c })
        categoryIds[c.title] = created.id
      }
    }

    const getDummyPrice = () => Math.floor(Math.random() * 50000) + 1000

    const productsData = [
      {
        name: 'Luminex-Lumen H700 (Single Head)',
        slug: 'luminex-lumen-h700-single',
        category: categoryIds['OT Solutions'],
        brand: brandIds['Luminex-Lumen'],
        originCountry: 'China',
        listingSummary: 'Single head LED shadowless operating lamp with 84 Osram LED bulbs.',
        shortSummary: 'High-quality shadowless operating light designed for bright, dependable illumination during critical procedures.',
        price: getDummyPrice(),
        status: 'published' as const,
        specGroups: [{
          groupTitle: 'Technical Specs',
          rows: [
            { label: 'Illuminance', value: '50,000-160,000 Lux' },
            { label: 'LED Bulbs', value: '84 pcs' },
            { label: 'Service Life', value: '≥60,000 Hours' },
          ]
        }]
      },
      {
        name: 'Luminex-Lumen L700/L500',
        slug: 'luminex-lumen-l700-l500',
        category: categoryIds['OT Solutions'],
        brand: brandIds['Luminex-Lumen'],
        listingSummary: 'Double head LED shadowless operating lamp with adjustable spot diameter.',
        shortSummary: 'Advanced double head surgical lighting system providing broad coverage and exceptional visibility.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'HFMED-HF-L84',
        slug: 'hfmed-hf-l84-led',
        category: categoryIds['OT Solutions'],
        brand: brandIds['Luminex-Lumen'],
        listingSummary: 'Double head LED shadowless lamp with secondary light-emitting tubes.',
        shortSummary: 'Premium LED operating lamp featuring secondary optic tubes to deliver uniform lighting without shadows.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Heyer Purelit OL9570 / OL9550',
        slug: 'heyer-purelit-ol9570-ol9550',
        category: categoryIds['OT Solutions'],
        brand: brandIds['Heyer'],
        listingSummary: 'German-engineered surgical lights with antimicrobial coating.',
        shortSummary: 'World-class surgical illumination with a unique antimicrobial surface for infection prevention.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Suxin Hydraulic Operation Table',
        slug: 'suxin-hydraulic-table',
        category: categoryIds['OT Solutions'],
        brand: brandIds['Suxin Medical'],
        listingSummary: 'Supply for thoracic, abdominal, and orthopaedic surgery.',
        shortSummary: 'Versatile hydraulic operating table tailored for a wide range of complex surgical operations.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Hungustads Hydraulic Operation Table',
        slug: 'hungustads-hydraulic-table',
        category: categoryIds['OT Solutions'],
        brand: brandIds['Hungustads'],
        listingSummary: 'Advanced hydraulic table with 120mm waist board lifting.',
        shortSummary: 'Ergonomic table featuring substantial lifting capabilities to accommodate demanding medical tasks.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Zerone ZEUS-400',
        slug: 'zerone-zeus-400',
        category: categoryIds['OT Solutions'],
        brand: brandIds['Zerone'],
        listingSummary: 'Stable and powerful electrosurgical unit for general and plastic surgery.',
        shortSummary: 'Reliable electrosurgical generator offering precisely controlled power outputs for secure clinical use.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'HT-150S Anesthesia Machine (SS)',
        slug: 'ht-150s-anesthesia-ss',
        category: categoryIds['OT Solutions'],
        brand: brandIds['Healing Technology'],
        originCountry: 'Bangladesh',
        listingSummary: 'High-quality Stainless Steel anesthesia apparatus with Malaysian regulator.',
        shortSummary: 'Robust locally assembled anesthesia workstation utilizing resilient stainless steel components.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Jinling-820 Anesthesia Machine',
        slug: 'jinling-820-anesthesia',
        category: categoryIds['OT Solutions'],
        brand: brandIds['Perlong'],
        listingSummary: 'Pneumatically driven & electronically controlled with 5.7 inch TFT display.',
        shortSummary: 'State-of-the-art anesthesia delivery system integrating digital control and real-time vital monitoring.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Luvar E Series Auto-CPAP (CPAP-20A Pro)',
        slug: 'luvar-e-auto-cpap',
        category: categoryIds['ICU Equipment'],
        brand: brandIds['Heyer'],
        listingSummary: 'Medical-grade calibration standard with AS-Dry technology.',
        shortSummary: 'Innovative continuous positive airway pressure machine equipped with automatic humidifier drying.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'AS100 Series CPAP / Auto CPAP',
        slug: 'aeomed-as100-series',
        category: categoryIds['ICU Equipment'],
        brand: brandIds['Aeomed'],
        listingSummary: 'Compact sleep apnea solution with 5-year data storage.',
        shortSummary: 'Portable and reliable auto CPAP device capable of long-term patient data preservation.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Heyer HK-100II Infusion Pump',
        slug: 'heyer-hk-100ii-infusion',
        category: categoryIds['ICU Equipment'],
        brand: brandIds['Heyer'],
        listingSummary: 'Accurate and safe infusion with anti-bolus protection.',
        shortSummary: 'Smart infusion pump to safely deliver fluids with intelligent pressure and blockage detection.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Heyer HK-400III Syringe Pump',
        slug: 'heyer-hk-400iii-syringe',
        category: categoryIds['ICU Equipment'],
        brand: brandIds['Heyer'],
        listingSummary: 'Lightweight syringe pump identifying sizes from 2ml to 60ml.',
        shortSummary: 'High-precision automated syringe pump automatically adapting to multiple standard syringe volumes.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'BN300 LED Phototherapy Unit',
        slug: 'bng-bn300-phototherapy',
        category: categoryIds['Neonatal Care'],
        brand: brandIds['Bng'],
        listingSummary: '16 Blue Super LED source for infant jaundice treatment.',
        shortSummary: 'Specialized neonatal intensive care phototherapy light with high-intensity blue LEDs for effective treatment.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Bio-Chemistry Analyzer',
        slug: 'ht-biochemistry-analyzer',
        category: categoryIds['Diagnostics/Lab'],
        brand: brandIds['Healing Technology'],
        listingSummary: 'Advanced robust bio-chemistry laboratory analyzer.',
        shortSummary: 'High-throughput and automated biochemical diagnosis equipment for comprehensive patient tests.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Hematology Analyzer',
        slug: 'ht-hematology-analyzer',
        category: categoryIds['Diagnostics/Lab'],
        brand: brandIds['Healing Technology'],
        listingSummary: 'Precise automated blood analyzer.',
        shortSummary: 'Automated 3-part or 5-part hematology machine delivering rapid and accurate complete blood counts.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Ultrasonogram (Portable/Trolley)',
        slug: 'ht-ultrasonogram',
        category: categoryIds['Diagnostics/Lab'],
        brand: brandIds['Healing Technology'],
        listingSummary: 'High-resolution ultrasonic imaging system.',
        shortSummary: 'Crystal-clear ultrasonic scanning available in both portable forms and full-sized trolley mounts.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Microscope (Binocular)',
        slug: 'ht-microscope',
        category: categoryIds['Diagnostics/Lab'],
        brand: brandIds['Healing Technology'],
        listingSummary: 'Laboratory grade binocular magnification tool.',
        shortSummary: 'Optical grade microscopy providing bright-field observation to detailed laboratory samples.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'ICU Bed (Electric)',
        slug: 'icu-bed-electric',
        category: categoryIds['Hospital Furniture'],
        brand: brandIds['Healing Technology'],
        listingSummary: 'Fully adjustable electric motorized patient bed.',
        shortSummary: 'Comfortable remote-controlled ICU bed ensuring minimal strain to patients and caregivers.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Ambulance Stretcher',
        slug: 'ambulance-stretcher-auto',
        category: categoryIds['Patient Transfer'],
        brand: brandIds['Healing Technology'],
        listingSummary: 'Collapsible automatic loading emergency stretcher.',
        shortSummary: 'Durable ambulance-ready stretcher prioritizing quick loading mechanisms and patient transport security.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Stretcher Trolley',
        slug: 'stretcher-trolley-hydraulic',
        category: categoryIds['Patient Transfer'],
        brand: brandIds['Healing Technology'],
        listingSummary: 'Hydraulic hospital transit trolley.',
        shortSummary: 'Smooth-rolling hospital transfer cart fitted with hydraulic height adjustments for simplified operations.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Gynaecological Bed',
        slug: 'gynaecological-bed-manual',
        category: categoryIds['Hospital Furniture'],
        brand: brandIds['Healing Technology'],
        listingSummary: 'Manual adjustment dedicated women’s health bed.',
        shortSummary: 'Customized obstetrics and gynecology examination bed prioritizing patient restfulness and clinical access.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Wheelchair (Manual/Chrome)',
        slug: 'manual-wheelchair',
        category: categoryIds['Patient Transfer'],
        brand: brandIds['Healing Technology'],
        listingSummary: 'Folding lightweight mobility chair.',
        shortSummary: 'Dependable chrome-plated manual wheelchair ensuring steady movement and easy foldability.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
      {
        name: 'Autoclave (Vertical/Horizontal)',
        slug: 'surgical-autoclave',
        category: categoryIds['Clinical Accessories'],
        brand: brandIds['Healing Technology'],
        listingSummary: 'High temperature steam instrument sterilizer.',
        shortSummary: 'Essential clinic-grade autoclave providing rigorous sterilization to standard surgical toolsets.',
        price: getDummyPrice(),
        status: 'published' as const,
      },
    ]

    const results = []
    for (const p of productsData) {
      if (!p.brand || !p.category) {
        continue
      }
      const existing = await payload.find({ collection: 'products', where: { slug: { equals: p.slug } } })
      if (existing.docs.length === 0) {
        await payload.create({ collection: 'products', data: p })
        results.push(`✅ Created product: ${p.name}`)
      } else {
        await payload.update({
          collection: 'products',
          id: existing.docs[0].id,
          data: p 
        })
        results.push(`🔄 Updated product with details & pricing: ${p.name}`)
      }
    }

    return NextResponse.json({ success: true, message: 'Seeding Complete!', results })
  } catch (error: any) {
    console.error('Seed Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
