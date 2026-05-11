import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

const TESTIMONIALS = [
  {
    clientName: 'Dr. Rafiqul Islam',
    designation: 'Head of Intensive Care Unit',
    hospital: 'Dhaka Medical College Hospital',
    quote: 'Healing Technology supplied our ICU with top-tier ventilators and patient monitors. The installation was seamless, the staff training was thorough, and their after-sales support is genuinely world-class. I have never experienced such commitment from a medical equipment supplier in Bangladesh.',
    rating: 5,
    sortOrder: 1,
    isActive: true,
  },
  {
    clientName: 'Prof. Nasreen Sultana',
    designation: 'Chief of Surgery',
    hospital: 'Square Hospital Limited',
    quote: 'We upgraded our entire operation theatre with equipment from Healing Technology — OT tables, surgical lights, and anaesthesia machines. Every piece arrived on time, was installed professionally, and continues to perform flawlessly eighteen months later. Their team truly understands what a busy surgical department needs.',
    rating: 5,
    sortOrder: 2,
    isActive: true,
  },
  {
    clientName: 'Dr. Mahmudur Rahman',
    designation: 'Director of Biomedical Engineering',
    hospital: 'United Hospital Dhaka',
    quote: 'What separates Healing Technology from other suppliers is their responsive engineering team. When we had a minor calibration issue with our infusion pumps at midnight, their biomedical engineers arrived within two hours. That level of service is unheard of in this industry.',
    rating: 5,
    sortOrder: 3,
    isActive: true,
  },
  {
    clientName: 'Dr. Tahmina Begum',
    designation: 'Neonatology Consultant',
    hospital: 'Popular Medical Centre',
    quote: 'Our neonatal ward runs on infant warmers and CPAP machines sourced from Healing Technology. The equipment carries genuine CE certification, and the company provided comprehensive training for our nursing staff. Our patient outcomes have improved noticeably since the upgrade.',
    rating: 5,
    sortOrder: 4,
    isActive: true,
  },
  {
    clientName: 'Major (Retd.) Kamal Hossain',
    designation: 'Hospital Administrator',
    hospital: 'CMH Dhaka',
    quote: 'Procurement for a military hospital demands absolute reliability and full regulatory compliance. Healing Technology met every requirement — CE and ISO documentation, full DGDA clearance, and a structured preventive maintenance contract. I recommend them to any institution that refuses to compromise on quality.',
    rating: 5,
    sortOrder: 5,
    isActive: true,
  },
  {
    clientName: 'Dr. Arifa Khanam',
    designation: 'Respiratory Medicine Specialist',
    hospital: 'National Institute of Diseases of the Chest & Hospital',
    quote: 'The BiPAP and high-flow oxygen therapy units supplied by Healing Technology have transformed how we manage acute respiratory patients. They guided us through the technical specs, helped us choose the right configuration for our ward, and the follow-up support has been excellent.',
    rating: 5,
    sortOrder: 6,
    isActive: true,
  },
];

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });

    let created = 0;
    const errors: string[] = [];

    for (const t of TESTIMONIALS) {
      try {
        await payload.create({ collection: 'testimonials', data: t as any });
        created++;
      } catch (e: any) {
        errors.push(`${t.clientName}: ${e.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      created,
      total: TESTIMONIALS.length,
      errors,
      message: `Successfully seeded ${created} testimonials.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
