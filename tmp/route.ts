import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  const payload = await getPayload({ config: configPromise })

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
    try {
      const existing = await payload.find({ collection: 'brands', where: { slug: { equals: b.slug } } })
      if (existing.docs.length > 0) {
        brandIds[b.name] = existing.docs[0].id
      } else {
        const created = await payload.create({ collection: 'brands', data: b })
        brandIds[b.name] = created.id
      }
    } catch (e) {}
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
    try {
      const existing = await payload.find({ collection: 'categories', where: { slug: { equals: c.slug } } })
      if (existing.docs.length > 0) {
        categoryIds[c.title] = existing.docs[0].id
      } else {
        const created = await payload.create({ collection: 'categories', data: c })
        categoryIds[c.title] = created.id
      }
    } catch (e) {}
  }

  const productsData = [
    { name: 'Luminex-Lumen H700 (Single Head)', slug: 'luminex-lumen-h700-single', category: categoryIds['OT Solutions'], brand: brandIds['Luminex-Lumen'], originCountry: 'China', listingSummary: 'Single head LED shadowless operating lamp with 84 Osram LED bulbs.', status: 'published' as const, specGroups: [{ groupTitle: 'Technical Specs', rows: [ { label: 'Illuminance', value: '50,000-160,000 Lux' }, { label: 'LED Bulbs', value: '84 pcs' }, { label: 'Service Life', value: '≥60,000 Hours' } ] }] },
    { name: 'Luminex-Lumen L700/L500', slug: 'luminex-lumen-l700-l500', category: categoryIds['OT Solutions'], brand: brandIds['Luminex-Lumen'], listingSummary: 'Double head LED shadowless operating lamp with adjustable spot diameter.', status: 'published' as const },
    { name: 'HFMED-HF-L84', slug: 'hfmed-hf-l84-led', category: categoryIds['OT Solutions'], brand: brandIds['Luminex-Lumen'], listingSummary: 'Double head LED shadowless lamp with secondary light-emitting tubes.', status: 'published' as const },
    { name: 'Heyer Purelit OL9570 / OL9550', slug: 'heyer-purelit-ol9570-ol9550', category: categoryIds['OT Solutions'], brand: brandIds['Heyer'], listingSummary: 'German-engineered surgical lights with antimicrobial coating.', status: 'published' as const },
    { name: 'Suxin Hydraulic Operation Table', slug: 'suxin-hydraulic-table', category: categoryIds['OT Solutions'], brand: brandIds['Suxin Medical'], listingSummary: 'Supply for thoracic, abdominal, and orthopaedic surgery.', status: 'published' as const },
    { name: 'Hungustads Hydraulic Operation Table', slug: 'hungustads-hydraulic-table', category: categoryIds['OT Solutions'], brand: brandIds['Hungustads'], listingSummary: 'Advanced hydraulic table with 120mm waist board lifting.', status: 'published' as const },
    { name: 'Zerone ZEUS-400', slug: 'zerone-zeus-400', category: categoryIds['OT Solutions'], brand: brandIds['Zerone'], listingSummary: 'Stable and powerful electrosurgical unit for general and plastic surgery.', status: 'published' as const },
    { name: 'HT-150S Anesthesia Machine (SS)', slug: 'ht-150s-anesthesia-ss', category: categoryIds['OT Solutions'], brand: brandIds['Healing Technology'], originCountry: 'Bangladesh', listingSummary: 'High-quality Stainless Steel anesthesia apparatus with Malaysian regulator.', status: 'published' as const },
    { name: 'Jinling-820 Anesthesia Machine', slug: 'jinling-820-anesthesia', category: categoryIds['OT Solutions'], brand: brandIds['Perlong'], listingSummary: 'Pneumatically driven & electronically controlled with 5.7 inch TFT display.', status: 'published' as const },
    { name: 'Luvar E Series Auto-CPAP (CPAP-20A Pro)', slug: 'luvar-e-auto-cpap', category: categoryIds['ICU Equipment'], brand: brandIds['Heyer'], listingSummary: 'Medical-grade calibration standard with AS-Dry technology.', status: 'published' as const },
    { name: 'AS100 Series CPAP / Auto CPAP', slug: 'aeomed-as100-series', category: categoryIds['ICU Equipment'], brand: brandIds['Aeomed'], listingSummary: 'Compact sleep apnea solution with 5-year data storage.', status: 'published' as const },
    { name: 'Heyer HK-100II Infusion Pump', slug: 'heyer-hk-100ii-infusion', category: categoryIds['ICU Equipment'], brand: brandIds['Heyer'], listingSummary: 'Accurate and safe infusion with anti-bolus protection.', status: 'published' as const },
    { name: 'Heyer HK-400III Syringe Pump', slug: 'heyer-hk-400iii-syringe', category: categoryIds['ICU Equipment'], brand: brandIds['Heyer'], listingSummary: 'Lightweight syringe pump identifying sizes from 2ml to 60ml.', status: 'published' as const },
    { name: 'BN300 LED Phototherapy Unit', slug: 'bng-bn300-phototherapy', category: categoryIds['Neonatal Care'], brand: brandIds['Bng'], listingSummary: '16 Blue Super LED source for infant jaundice treatment.', status: 'published' as const },
    { name: 'Bio-Chemistry Analyzer', slug: 'ht-biochemistry-analyzer', category: categoryIds['Diagnostics/Lab'], brand: brandIds['Healing Technology'], status: 'published' as const },
    { name: 'Hematology Analyzer', slug: 'ht-hematology-analyzer', category: categoryIds['Diagnostics/Lab'], brand: brandIds['Healing Technology'], status: 'published' as const },
    { name: 'Ultrasonogram (Portable/Trolley)', slug: 'ht-ultrasonogram', category: categoryIds['Diagnostics/Lab'], brand: brandIds['Healing Technology'], status: 'published' as const },
    { name: 'Microscope (Binocular)', slug: 'ht-microscope', category: categoryIds['Diagnostics/Lab'], brand: brandIds['Healing Technology'], status: 'published' as const },
    { name: 'ICU Bed (Electric)', slug: 'icu-bed-electric', category: categoryIds['Hospital Furniture'], brand: brandIds['Healing Technology'], status: 'published' as const },
    { name: 'Ambulance Stretcher', slug: 'ambulance-stretcher-auto', category: categoryIds['Patient Transfer'], brand: brandIds['Healing Technology'], status: 'published' as const },
    { name: 'Stretcher Trolley', slug: 'stretcher-trolley-hydraulic', category: categoryIds['Patient Transfer'], brand: brandIds['Healing Technology'], status: 'published' as const },
    { name: 'Gynaecological Bed', slug: 'gynaecological-bed-manual', category: categoryIds['Hospital Furniture'], brand: brandIds['Healing Technology'], status: 'published' as const },
    { name: 'Wheelchair (Manual/Chrome)', slug: 'manual-wheelchair', category: categoryIds['Patient Transfer'], brand: brandIds['Healing Technology'], status: 'published' as const },
    { name: 'Autoclave (Vertical/Horizontal)', slug: 'surgical-autoclave', category: categoryIds['Clinical Accessories'], brand: brandIds['Healing Technology'], status: 'published' as const },
  ]

  let createdCounts = 0
  for (const p of productsData) {
    if (!p.brand || !p.category) continue
    try {
      const existing = await payload.find({ collection: 'products', where: { slug: { equals: p.slug } } })
      if (existing.docs.length === 0) {
        await payload.create({ collection: 'products', data: p as any })
        createdCounts++
      }
    } catch (e: any) {}
  }

  return NextResponse.json({ success: true, seeded: createdCounts })
}
