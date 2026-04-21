--
-- PostgreSQL database dump
--

\restrict hVShcnb7fgjIV9ta4gu9hDzi3PcsCj8cB4Peqvgpsd1uAO7HTqMHfIk2gVqmHHR

-- Dumped from database version 14.22 (Ubuntu 14.22-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.22 (Ubuntu 14.22-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: healingtech
--

INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (1, 'Luminex-Lumen H700 (Single Head)', 'luminex-lumen-h700-single', false, NULL, 1, 1, NULL, NULL, 'Single head LED shadowless operating lamp with 84 Osram LED bulbs.', NULL, NULL, NULL, 'China', NULL, 'published', NULL, NULL, NULL, '2026-04-09 04:28:08.771+00', '2026-04-09 04:28:08.77+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (2, 'Luminex-Lumen L700/L500', 'luminex-lumen-l700-l500', false, NULL, 1, 1, NULL, NULL, 'Double head LED shadowless operating lamp with adjustable spot diameter.', NULL, NULL, NULL, NULL, NULL, 'published', NULL, NULL, NULL, '2026-04-09 04:28:08.832+00', '2026-04-09 04:28:08.832+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (3, 'HFMED-HF-L84', 'hfmed-hf-l84-led', false, NULL, 1, 1, NULL, NULL, 'Double head LED shadowless lamp with secondary light-emitting tubes.', NULL, NULL, NULL, NULL, NULL, 'published', NULL, NULL, NULL, '2026-04-09 04:28:08.873+00', '2026-04-09 04:28:08.872+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (4, 'Heyer Purelit OL9570 / OL9550', 'heyer-purelit-ol9570-ol9550', false, NULL, 1, 2, NULL, NULL, 'German-engineered surgical lights with antimicrobial coating.', NULL, NULL, NULL, NULL, NULL, 'published', NULL, NULL, NULL, '2026-04-09 04:28:08.925+00', '2026-04-09 04:28:08.925+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (5, 'Suxin Hydraulic Operation Table', 'suxin-hydraulic-table', false, NULL, 1, 7, NULL, NULL, 'Supply for thoracic, abdominal, and orthopaedic surgery.', NULL, NULL, NULL, NULL, NULL, 'published', NULL, NULL, NULL, '2026-04-09 04:28:08.963+00', '2026-04-09 04:28:08.963+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (6, 'Hungustads Hydraulic Operation Table', 'hungustads-hydraulic-table', false, NULL, 1, 8, NULL, NULL, 'Advanced hydraulic table with 120mm waist board lifting.', NULL, NULL, NULL, NULL, NULL, 'published', NULL, NULL, NULL, '2026-04-09 04:28:09.012+00', '2026-04-09 04:28:09.012+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (7, 'Zerone ZEUS-400', 'zerone-zeus-400', false, NULL, 1, 6, NULL, NULL, 'Stable and powerful electrosurgical unit for general and plastic surgery.', NULL, NULL, NULL, NULL, NULL, 'published', NULL, NULL, NULL, '2026-04-09 04:28:09.04+00', '2026-04-09 04:28:09.04+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (8, 'HT-150S Anesthesia Machine (SS)', 'ht-150s-anesthesia-ss', false, NULL, 1, 9, NULL, NULL, 'High-quality Stainless Steel anesthesia apparatus with Malaysian regulator.', NULL, NULL, NULL, 'Bangladesh', NULL, 'published', NULL, NULL, NULL, '2026-04-09 04:28:09.08+00', '2026-04-09 04:28:09.079+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (9, 'Jinling-820 Anesthesia Machine', 'jinling-820-anesthesia', false, NULL, 1, 4, NULL, NULL, 'Pneumatically driven & electronically controlled with 5.7 inch TFT display.', NULL, NULL, NULL, NULL, NULL, 'published', NULL, NULL, NULL, '2026-04-09 04:28:09.113+00', '2026-04-09 04:28:09.113+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (10, 'Luvar E Series Auto-CPAP (CPAP-20A Pro)', 'luvar-e-auto-cpap', false, NULL, 2, 2, NULL, NULL, 'Medical-grade calibration standard with AS-Dry technology.', NULL, NULL, NULL, NULL, NULL, 'published', NULL, NULL, NULL, '2026-04-09 04:28:09.165+00', '2026-04-09 04:28:09.165+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (11, 'AS100 Series CPAP / Auto CPAP', 'aeomed-as100-series', false, NULL, 2, 3, NULL, NULL, 'Compact sleep apnea solution with 5-year data storage.', NULL, NULL, NULL, NULL, NULL, 'published', NULL, NULL, NULL, '2026-04-09 04:28:09.206+00', '2026-04-09 04:28:09.206+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (12, 'Heyer HK-100II Infusion Pump', 'heyer-hk-100ii-infusion', false, NULL, 2, 2, NULL, NULL, 'Accurate and safe infusion with anti-bolus protection.', NULL, NULL, NULL, NULL, NULL, 'published', NULL, NULL, NULL, '2026-04-09 04:28:09.238+00', '2026-04-09 04:28:09.238+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (13, 'Heyer HK-400III Syringe Pump', 'heyer-hk-400iii-syringe', false, NULL, 2, 2, NULL, NULL, 'Lightweight syringe pump identifying sizes from 2ml to 60ml.', NULL, NULL, NULL, NULL, NULL, 'published', NULL, NULL, NULL, '2026-04-09 04:28:09.274+00', '2026-04-09 04:28:09.274+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (14, 'BN300 LED Phototherapy Unit', 'bng-bn300-phototherapy', false, NULL, 3, 5, NULL, NULL, '16 Blue Super LED source for infant jaundice treatment.', NULL, NULL, NULL, NULL, NULL, 'published', NULL, NULL, NULL, '2026-04-09 04:28:09.308+00', '2026-04-09 04:28:09.307+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (15, 'Bio-Chemistry Analyzer', 'ht-biochemistry-analyzer', false, NULL, 7, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'published', NULL, NULL, NULL, '2026-04-09 04:28:09.341+00', '2026-04-09 04:28:09.341+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (19, 'Aeonmed Aeon7200 Anesthesia Machine With Ventilator', 'Aeonmed-Aeon7200', false, 'Aeonmed-Aeon7200', 7, 3, NULL, 'Aeonmed Aeon7200 Anesthesia Machine With Ventilator', 'Aeonmed Aeon7200 Anesthesia Machine With Ventilator
The Aeonmed Aeon7200 is an advanced, high-performance anesthesia delivery system designed to provide safe, reliable, and efficient care during surgical procedures. Engineered for both adult and pediatric patients, it combines precise gas delivery, dynamic ventilation modes, and a robust suite of real-time monitoring features.

With CE certification ensuring it meets stringent international safety standards, the Aeon7200 is an ideal solution for modern hospital operation theaters, surgical centers, and emergency units.

Key Features & Innovations
Intuitive Interface: Features an 8.4-inch color touchscreen display equipped with a navigation knob for quick, easy setup and parameter adjustments.

Versatile Ventilation: Supports Volume, Pressure, and SIMV ventilation modes to accommodate a wide variety of anesthesia applications.

Advanced Moisture Control: Incorporates a built-in, maintenance-free patented sensor that prevents moisture condensation, ensuring accurate monitoring and protecting the internal circuitry.

Precision Low-Flow Delivery: Equipped with double tubes in series for each gas, making it highly responsive and easy to operate during low and mini-flow anesthesia.

Environmental & Patient Safety: Features optional Anesthetic Gas Monitoring (AGM) to conveniently control gas concentration, and an optional Anesthetic Gas Scavenging System (AGSS) to reduce air pollution within the operating room.', 'The Aeonmed Aeon7200 is a highly versatile, CE-certified anesthesia delivery system featuring an integrated ventilator. Designed to seamlessly manage both adult and pediatric patients, it balances advanced technological precision with rigorous patient safety features for the modern operating room.

Core Highlights:

Intuitive Operation: Features an 8.4-inch color touchscreen with a navigation knob for quick, streamlined parameter adjustments.

Advanced Ventilation: Supports multiple ventilation modes (IPPV, PLV, SIMV, Spont) with a broad tidal volume range of 20 to 1500 ml.

Precision Low-Flow Delivery: Utilizes double-tube flowmeters specifically engineered for accurate, easy control during low and mini-flow anesthesia.

Enhanced Safety & Reliability: Built with a patented maintenance-free moisture condensation sensor, comprehensive safety alarms, and a reliable 120-minute battery backup.', NULL, 82, 'China', 'The Aeonmed Aeon7200 Anesthesia Machine is manufactured to the highest global medical device standards, ensuring absolute safety, reliability, and precision in critical care environments:

CE Certified: Fully compliant with European health, safety, and environmental protection directives. This certification guarantees that the machine meets stringent international clinical safety requirements for medical devices.

ISO 13485 Compliant: Manufactured by Aeonmed under a globally recognized Quality Management System specifically dedicated to the design and production of safe, high-quality medical equipment.

Built-In Safety Standards: Engineered with hypoxic guard systems, automatic O2 deficiency alarms, and a patented NO WATER VAPOR COAGULATION sensor, fulfilling strict regulatory requirements for patient safety during anesthesia delivery.', 'published', 'Healing Technology — Aeonmed Aeon7200 Anesthesia Machine With Ventilator', 'The Aeonmed Aeon7200 is a highly versatile, CE-certified anesthesia delivery system featuring an integrated ventilator. Designed to seamlessly manage both adult and pediatric patients, it balances advanced technological precision with rigorous patient safety features for the modern operating room.

Core Highlights:

Intuitive Operation: Features an 8.4-inch color touchscreen with a navigation knob for quick, streamlined parameter adjustments.

Advanced Ventilation: Supports multiple ventilation modes (IPPV, PLV, SIMV, Spont) with a broad tidal volume range of 20 to 1500 ml.

Precision Low-Flow Delivery: Utilizes double-tube flowmeters specifically engineered for accurate, easy control during low and mini-flow anesthesia.

Enhanced Safety & Reliability: Built with a patented maintenance-free moisture condensation sensor, comprehensive safety alarms, and a reliable 120-minute battery backup.', 72, '2026-04-20 10:56:27.252+00', '2026-04-09 04:28:09.465+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (16, 'SOFT TOUCH ESU 400 Electrosurgical Unit', 'SOFTTOUCH-ESU400', false, 'SOFTTOUCH-ESU400', 7, 30, NULL, 'SOFT TOUCH ESU 400 Electrosurgical Unit', 'SOFT TOUCH Advanced Electrosurgical Unit (High-Frequency Electrotome)
Product Overview
The SOFT TOUCH Electrosurgical Unit is a high-performance, multi-function high-frequency electrotome designed to meet the rigorous demands of general departments and diverse surgical needs. Featuring dual-way power output, exceptionally stable performance, and advanced safety mechanisms, the SOFT TOUCH unit delivers the precision and reliability surgeons require. With instantaneous switching between cutting and coagulation, and seamless compatibility with laparoscopic accessories, it is an essential and versatile tool for any modern surgical suite.

Key Features & Benefits
Versatile Operating Modes: Equipped with 7 distinct working modes to handle a wide variety of surgical procedures:
Pure Cutting, Mixed Cutting 1, Mixed Cutting 2, Standard Coagulation, Spraying Coagulation, Bipolar 1, Bipolar 2

Broad Power Range: Offers unipolar power from 0–400W and bipolar power from 0–100W, ensuring the precise energy delivery needed for both delicate tissues and heavy-duty surgical tasks.

Advanced Safety Systems:

Neutral Plate Monitoring: Automatically measures the contact quality between the patient''s skin and the neutral plate. The system instantly triggers an alarm and halts output if contact resistance drops below 140 Ω.

Short Circuit Protection: Features a fully suspended CF type design. The host computer actively protects itself to maintain normal, safe output in the rare event of an overload or short circuit during unipolar or bipolar use.

Intelligent Double CPU Design: Built with dual CPUs for highly reliable core storage. The robust database seamlessly manages various impedance changes during use, guaranteeing a highly stable and consistent energy output.

Efficient Workflow: Allows for instantaneous switching between cutting and coagulation output during manual operation, streamlining the surgical process and reducing operative time.', 'The SOFT TOUCH Advanced Electrosurgical Unit is a versatile, high-frequency surgical electrotome designed for precision and safety across diverse medical departments. Featuring advanced dual-CPU technology, it offers 7 distinct working modes—delivering up to 400W of unipolar power and 100W of bipolar power—for seamless cutting and rapid coagulation. Equipped with intelligent safety systems like real-time neutral plate monitoring and short-circuit protection, this unit provides surgeons with exceptionally stable and reliable performance for everything from delicate plastic surgery to heavy-duty general and laparoscopic procedures.', NULL, 94, 'China', 'The SOFT TOUCH Electrosurgical Unit is manufactured to meet stringent international medical and electrical safety standards:

GB 9706.1-2007 / IEC 60601-1:1988: General requirements for safety of medical electrical equipment.

GB 9706.4-2009 / IEC 60601-2-2:2006: Special requirements for the safety of high-frequency surgical equipment.

YY 0505-2012 / IEC 60601-1-2:2004: Electromagnetic compatibility requirements and experiments.

YY1057-2016: General specification for medical foot switches.', 'published', 'Healing Technology — SOFT TOUCH ESU 400 Electrosurgical Unit', 'The SOFT TOUCH Advanced Electrosurgical Unit is a versatile, high-frequency surgical electrotome designed for precision and safety across diverse medical departments. Featuring advanced dual-CPU technology, it offers 7 distinct working modes—delivering up to 400W of unipolar power and 100W of bipolar power—for seamless cutting and rapid coagulation. Equipped with intelligent safety systems like real-time neutral plate monitoring and short-circuit protection, this unit provides surgeons with exceptionally stable and reliable performance for everything from delicate plastic surgery to heavy-duty general and laparoscopic procedures.', NULL, '2026-04-20 11:57:01.166+00', '2026-04-09 04:28:09.375+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (22, 'Heyer OP830 Electric Operating Table', 'Heyer-OP830', false, 'Heyer-OP830', 7, 2, NULL, 'Heyer OP830 Electric Operating Table', 'Heyer OP830 Electric Operating Table
The OP830 electric operating table by Heyer is constructed from high-quality alloy steel, perfectly balancing a lightweight design with robust strength. It is engineered for stable, dynamic intraoperative positioning and maintains a dynamic load capacity of over 135 kg.

Key Features
Radiolucent Tabletop: Allows for clear intraoperative X-ray and C-arm imaging while maintaining a high load-bearing capacity.

Optimal Patient Comfort: Features an easy-to-clean, 60mm detachable multi-layer memory foam mattress that conforms to the patient''s body to evenly distribute pressure.

Adjustable Headplate: The detachable headplate is firmly fixed to prevent movement during surgery and can be easily adjusted up or down with just one hand.

Built-in Kidney Bridge: Provides a 136 mm lift utilizing a simple wrench for stable support, providing maximum convenience for abdominal or urinary system surgeries.

Electric Hydraulic Braking: Equipped with four 5 cm diameter brake rods that provide strong, reliable locking on any surface with the push of a button.

Intuitive Controls: Designed for single-handed operation with easy-to-understand icons and a battery indicator. An automatic standby mode activates after 60 seconds of inactivity to avoid accidental touches.

Durable Side Rails: Built with equal-length 304 stainless steel side rails featuring a treated surface for safe handling and accessory mounting.', 'The Heyer OP830 
Electric Operating Table is crafted from high-quality alloy steel, perfectly balancing a lightweight design with robust strength to support a dynamic load of over 135 kg. Designed for surgical precision and patient comfort, it is an essential asset for modern operating rooms.

Core Highlights:

Imaging Ready: Features a radiolucent tabletop that allows for clear intraoperative X-ray and C-arm imaging without sacrificing load-bearing capacity.

Enhanced Comfort: Equipped with an easy-to-clean, 60mm multi-layer memory foam mattress that evenly distributes pressure.

Surgical Versatility: Includes a 136mm kidney bridge lift for abdominal/urinary procedures, a fully adjustable and securely fixed headplate, and 304 stainless steel side rails for accessories.

Precision & Safety: Boasts an electric hydraulic braking system for rock-solid stability, plus an intuitive, single-handed remote control with a 60-second auto-standby to prevent accidental adjustments.', NULL, 51, 'German', 'The Heyer OP830 Electric Operating Tables are manufactured to the highest international medical standards, ensuring absolute safety and reliability in the operating room.

CE Mark Certified: Fully compliant with European health, safety, and environmental protection directives for medical devices.

ISO 13485 & ISO 9001: Manufactured under globally recognized, strict Quality Management Systems specifically designed for medical equipment.

Global OR Standards: Backed by Heyer Medical’s 130+ year legacy of German engineering and rigorous quality control testing for structural integrity and dynamic load safety.', 'published', 'Healing Technology — Heyer OP830 Electric Operating Table', 'The Heyer OP830 
Electric Operating Table is crafted from high-quality alloy steel, perfectly balancing a lightweight design with robust strength to support a dynamic load of over 135 kg. Designed for surgical precision and patient comfort, it is an essential asset for modern operating rooms.

Core Highlights:

Imaging Ready: Features a radiolucent tabletop that allows for clear intraoperative X-ray and C-arm imaging without sacrificing load-bearing capacity.

Enhanced Comfort: Equipped with an easy-to-clean, 60mm multi-layer memory foam mattress that evenly distributes pressure.

Surgical Versatility: Includes a 136mm kidney bridge lift for abdominal/urinary procedures, a fully adjustable and securely fixed headplate, and 304 stainless steel side rails for accessories.

Precision & Safety: Boasts an electric hydraulic braking system for rock-solid stability, plus an intuitive, single-handed remote control with a 60-second auto-standby to prevent accidental adjustments.', 55, '2026-04-19 09:46:30.737+00', '2026-04-09 04:28:09.549+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (18, 'JINLING-820 Anesthesia Machine With Ventilator', 'JINLING-820', false, 'JINLING-820', 7, 10, NULL, 'JINLING-820 Anesthesia Machine With Ventilator', 'JINLING-820 Anesthesia Machine
Product Overview
The JINLING-820 is a highly advanced, pneumatically driven, and electronically controlled anesthesia workstation. Designed to meet the rigorous demands of modern operating rooms and intensive care units, it combines an elegant, ergonomic frame with precise clinical engineering. From low-flow anesthesia to complex ventilation requirements, the JINLING-820 delivers reliable performance, comprehensive safety features, and intuitive controls to support superior patient care.

Key Features & Benefits
Versatile Operating Modes: Fully supports closed, semi-closed, and semi-open operating modes, adapting seamlessly to diverse clinical requirements and patient profiles.

Clear, Real-Time Monitoring: Equipped with a high-visibility 5.7-inch TFT display (with optional upgrades available), allowing clinicians to simultaneously monitor Pressure-Time and Frequency-Time waveforms for rapid patient assessment.

Integrated Respiratory Circuit: Features a standard metallic modular respiratory circuit. This advanced, highly durable design resolves common gas-sealing issues during high-temperature disinfection, ensuring sterilization is both easy and highly effective.

Comprehensive Ventilation: Offers a wide spectrum of ventilation modes, including A/C, IPPV, SIPPV, VCV, IMV, SIMV, PEEP, and Manual, providing maximum flexibility during complex surgical procedures.

Precision Gas Delivery: Built with a high-precision four-tube flowmeter (O2 and N2O) featuring an interlocking system to prevent hypoxic mixtures. Coupled with a highly stable Adjustable Pressure Limiting (APL) valve, the unit is optimized for low and ultra-low flow anesthesia.

Intelligent Safety Systems: Includes an automated self-checking function upon startup, automatic self-calibrating sensors, and a robust power failure support system that automatically switches to an internal battery during AC power outages.', 'The JINLING-820 Anesthesia Machine is an advanced, highly versatile workstation built for modern operating rooms. It features a 5.7-inch real-time display, an easy-to-sterilize metallic modular respiratory circuit, and comprehensive ventilation modes suitable for diverse clinical needs. Designed for precision and safety, it includes a high-accuracy four-tube flowmeter optimized for low-flow anesthesia, automated self-checks, robust alarm systems, and reliable battery backup. The unit is fully CE, ISO 13485, and RoHS certified, ensuring top-tier clinical performance and patient safety.', NULL, 81, 'China', 'Manufactured under strict quality control standards, the JINLING-820 is internationally recognized for safety and reliability:

CE Mark: Compliant with European health and safety standards for medical devices.

ISO 13485: Certified under the quality management system standard for the medical device industry.

RoHS: Compliant with environmental safety standards regarding electronic components.', 'published', 'Healing Technology — JINLING-820 Anesthesia Machine With Ventilator', 'The JINLING-820 Anesthesia Machine is an advanced, highly versatile workstation built for modern operating rooms. It features a 5.7-inch real-time display, an easy-to-sterilize metallic modular respiratory circuit, and comprehensive ventilation modes suitable for diverse clinical needs. Designed for precision and safety, it includes a high-accuracy four-tube flowmeter optimized for low-flow anesthesia, automated self-checks, robust alarm systems, and reliable battery backup. The unit is fully CE, ISO 13485, and RoHS certified, ensuring top-tier clinical performance and patient safety.', 73, '2026-04-20 11:22:13.031+00', '2026-04-09 04:28:09.443+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (25, 'Suxin Medical SX-700/700 LED Shadowless Operating Lamp', 'SuxinMedicalSX700700', true, 'SX-700/700', 7, 7, 'OT Light Double Dome 700/700', 'OT Light Double Dome 700/700', 'Suxin Medical SX-700/700 Color Dual Dome LED Shadowless Operating Lamp
Product Overview
The Suxin Medical SX-700/700 is a premium, ceiling-mounted dual-dome surgical light designed to meet the rigorous demands of modern operating theaters. Featuring a unique "lamp-flower" design, this high-performance lighting system provides exceptional shadow-free illumination, advanced color rendering, and unparalleled reliability for complex surgical procedures.

Equipped with authentic, imported German Osram LEDs, the SX-700/700 ensures a stable, long-lasting light source that medical professionals can depend on.
Key Features

Advanced Color LED Layout: Specifically engineered with red and green lights to relieve visual fatigue during lengthy procedures and provide superior clarity for precise vascular identification.

Premium German Osram LEDs: Utilizes genuine, imported Osram LED beads to guarantee a highly stable light output and an extraordinary lifespan of up to 80,000 hours, significantly reducing maintenance costs.

Redundant Double Control System: Features a high-tech, user-friendly central and side dual-control system. This built-in redundancy provides a 100% operational guarantee, ensuring uninterrupted lighting when it matters most.

Optimal Comfort: Generates cold light with a minimal temperature rise of just 1°C at the surgeon''s head area, maintaining a comfortable and safe environment for both the surgical team and the patient.', 'The Suxin Medical SX-700/700 is a dual-dome, ceiling-mounted LED shadowless surgical lamp powered by genuine German Osram LEDs. Delivering up to 180,000 Lux of adjustable illumination and an impressive 80,000-hour lifespan, it features a specialized color LED layout (red and green) to reduce visual fatigue and enhance vascular clarity. Complete with a fail-safe double control system, it provides highly reliable, premium lighting for complex operating environments.', NULL, 4, 'China', 'CE Mark (CE-MDR): Certified compliant with European Medical Device Regulations, ensuring the products meet rigorous health, safety, and environmental protection standards for the European Economic Area.
ISO 13485 (EN ISO 13485:2016): Certified under the international standard for quality management systems specifically for the design and manufacture of medical devices.
ISO 9001: Certified for overall quality management systems, demonstrating consistent manufacturing and strict quality control processes.
IEC 60601-1 / EN 60601-1:2016: Fully compliant with the internationally recognized general standards for the basic safety and essential performance of medical electrical equipment.
IEC 60601-2-41: Compliant with the specific international safety and performance standards tailored for surgical luminaires (operating lights) and luminaires for diagnosis.
Free Sales Certificate (FSC): Approved for international export and commercial distribution.
Jiangsu Provincial FDA Approval: Fully licensed and approved by the regional Food and Drug Administration in their manufacturing jurisdiction (Jiangsu Province, China).', 'published', 'Healing Technology — Suxin Medical SX-700/700 LED Shadowless Operating Lamp', 'The Suxin Medical SX-700/700 is a dual-dome, ceiling-mounted LED shadowless surgical lamp powered by genuine German Osram LEDs. Delivering up to 180,000 Lux of adjustable illumination and an impressive 80,000-hour lifespan, it features a specialized color LED layout (red and green) to reduce visual fatigue and enhance vascular clarity. Complete with a fail-safe double control system, it provides highly reliable, premium lighting for complex operating environments.', 68, '2026-04-19 08:38:21.364+00', '2026-04-15 06:17:33.443+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (21, 'TRIUP 3008A Hydraulic Operation Table', 'TRIUP-3008A', false, 'TRIUP-3008A', 7, 16, NULL, 'TRIUP 3008A Hydraulic Operation Table', 'TRIUP 3008A Hydraulic Operation Table
The 3008 and 3008A models by TRIUP International Corp. are head-operating universal hydraulic tables designed to support a wide variety of surgical disciplines. These highly adaptable tables are ideal for thoracic surgery, abdominal surgery, ophthalmology, otorhinolaryngology, obstetrics and gynecology, urinary surgery, and orthopedics.

Key Features & Design:
Reliable Hydraulic Operation: The table''s height (rise and drop) is effortlessly controlled using a pedal-operated oil pump, while all other multi-directional movements are precisely handled by a mechanical transmission head.

Model Options: The 3008 is the standard configuration, while the upgraded 3008A features a premium stainless steel base shell, stand column, and bed surface for enhanced durability and hygiene.

Enhanced Comfort: To ensure patient comfort and safety during procedures, the included shoulder supports, body supports, and armrests are finished with a leather wrap', 'The 3008A Hydraulic Operation Table by TRIUP International is a highly versatile, multi-discipline surgical table designed to accommodate everything from orthopedics and obstetrics to thoracic and ophthalmic procedures.

Core Highlights:

Reliable Mechanics: Features a smooth, pedal-operated hydraulic oil pump for height adjustments, paired with a mechanical transmission head for precise, multi-directional tilt and section controls.

Durable Construction: While the 3008 is a reliable standard model, the 3008A upgrade features a premium stainless steel base, column, and bed surface for superior hygiene and longevity.

Comprehensive Comfort: Comes fully equipped with standard positioning accessories—including shoulder, body, and arm supports—all finished with comfortable leather wraps to ensure optimal patient safety and stability.', NULL, 57, 'China', 'Manufactured by TRIUP International Corp., the 3008 and 3008A Hydraulic Operation Tables are backed by over 20 years of medical manufacturing expertise and adhere to strict international quality control standards:

ISO 13485 & ISO 9000 Certified: Manufactured under globally recognized, strict Quality Management Systems specifically dedicated to medical device production.

CE Marked / TUV Certified: Meets the rigorous health, safety, and environmental protection directives required for international and European medical markets.

Global Export Standards: Designed and tested to meet reliable operational and safety criteria for hospitals and surgical centers worldwide.', 'published', 'Healing Technology — TRIUP 3008A Hydraulic Operation Table', 'The 3008A Hydraulic Operation Table by TRIUP International is a highly versatile, multi-discipline surgical table designed to accommodate everything from orthopedics and obstetrics to thoracic and ophthalmic procedures.

Core Highlights:

Reliable Mechanics: Features a smooth, pedal-operated hydraulic oil pump for height adjustments, paired with a mechanical transmission head for precise, multi-directional tilt and section controls.

Durable Construction: While the 3008 is a reliable standard model, the 3008A upgrade features a premium stainless steel base, column, and bed surface for superior hygiene and longevity.

Comprehensive Comfort: Comes fully equipped with standard positioning accessories—including shoulder, body, and arm supports—all finished with comfortable leather wraps to ensure optimal patient safety and stability.', 59, '2026-04-19 09:33:45.249+00', '2026-04-09 04:28:09.519+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (30, 'Suxin Medical SX-II 700/700 LED Shadowless Operating Lamp', 'SuxinMedicalSX-II700700', false, 'SX-II 700/700', 7, 7, NULL, 'OT Light Double Dome 700/700', NULL, NULL, NULL, 31, 'China', NULL, 'published', 'Healing Technology — SX-II 700/700 LED Shadowless Operating Lamp', NULL, NULL, '2026-04-15 10:35:04.696+00', '2026-04-15 10:31:47.117+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (20, 'Suxin SXS3008 Head-Operated Comprehensive Operating Table', 'Suxin-SXS3008', false, 'Suxin-SXS3008', 7, 7, NULL, 'Suxin SXS3008 Head-Operated Comprehensive Operating Table', 'Suxin SXS3008 Head-Operated Comprehensive Operating Table
The Suxin SXS3008 Series (including the SXS3008-II and SXS3008-III models) by Jiangsu Suxin Medical Equipment is a highly versatile, head-controlled hydraulic operating table. Engineered for precision and stability, it is an ideal, multi-functional solution for a wide range of surgical disciplines, including general surgery (thorax, abdomen, perineum), neurosurgery, ophthalmology, ENT, gynecology, and orthopedics.

Key Features
Head-Controlled Hydraulics: Features a reliable, smooth oil-pump hydraulic lifting mechanism. All multi-directional positional adjustments (tilt, back, and leg plates) are safely and efficiently controlled from the head side of the table by the anesthesiologist or surgical staff.

Exceptional Stability: The central hydraulic column is purposefully designed to prevent overturning, safely supporting a maximum dynamic load capacity of over 250 kg. Select models feature a T-base design for enhanced floor stability during rigorous procedures.

Premium Construction: Built for the demanding operating room environment, the base seat and column are available in high-quality stainless steel (providing superior rust resistance and hygiene) or durable carbon steel with powder coating.

Flexible Patient Positioning: Equipped with a split-type leg plate to accommodate complex lower limb positioning and an integrated kidney bridge elevator for optimized access during abdominal and kidney surgeries.

C-Arm & X-Ray Ready: The advanced SXS3008-III model features a double tabletop design with a radiolucent upper surface, ensuring clear, unobstructed intraoperative X-ray and imaging capabilities.', 'The Suxin SXS3008 Series is a highly versatile, head-controlled hydraulic operating table designed to support a wide variety of surgical disciplines. Built for rigorous operating room environments, it provides exceptional stability with a safe load capacity of over 250 kg.

Core Highlights:

Head-Controlled Precision: Features smooth hydraulic lifting, with all multi-directional positioning (tilt, back, and leg adjustments) safely operated from the head of the table.

Surgical Versatility: Equipped with a split-type leg plate for complex lower limb positioning and a built-in kidney bridge providing up to 120mm of elevation.

Imaging Ready: The premium SXS3008-III model features a dual-layer radiolucent tabletop, perfectly accommodating intraoperative X-ray and C-arm imaging.

Durable Construction: Built with an anti-overturn central column and available in premium stainless steel for maximum hygiene and rust resistance.', NULL, 61, 'China', 'Manufactured by Jiangsu Suxin Medical Equipment Co., Ltd., the SXS3008 Series is built to strict international safety and quality standards, ensuring absolute reliability in demanding surgical environments:

CE Marked: Fully certified to meet European health, safety, and environmental protection standards for medical devices.

ISO 13485 & ISO 9001 Certified: Produced under globally recognized Quality Management Systems specifically mandated for medical equipment manufacturing and operational excellence.

Provincial Regulatory Approval: Officially authorized and recognized by the Jiangsu Provincial Food and Drug Administration as a high-quality medical device.', 'published', 'Healing Technology — Suxin SXS3008 Head-Operated Comprehensive Operating Table', 'The Suxin SXS3008 Series is a highly versatile, head-controlled hydraulic operating table designed to support a wide variety of surgical disciplines. Built for rigorous operating room environments, it provides exceptional stability with a safe load capacity of over 250 kg.

Core Highlights:

Head-Controlled Precision: Features smooth hydraulic lifting, with all multi-directional positioning (tilt, back, and leg adjustments) safely operated from the head of the table.

Surgical Versatility: Equipped with a split-type leg plate for complex lower limb positioning and a built-in kidney bridge providing up to 120mm of elevation.

Imaging Ready: The premium SXS3008-III model features a dual-layer radiolucent tabletop, perfectly accommodating intraoperative X-ray and C-arm imaging.

Durable Construction: Built with an anti-overturn central column and available in premium stainless steel for maximum hygiene and rust resistance.', 62, '2026-04-19 09:29:54.648+00', '2026-04-09 04:28:09.494+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (24, 'Suxin Medical SX-700 Shadowless Operating Light', 'SuxinmedicalSX-700', true, 'SX-700', 7, 7, NULL, 'Suxin Medical SX-700 Shadowless Operating Light', 'Product Overview
Product Name: Color Led Two Controls System Ceiling Shadowless Lamp Operating Light

Model: SX-700

Brand: Suxin Medical

Manufacturer: Jiangsu Suxin Medical Equipment Co., Ltd.

Key Features
Sanitary Design: Features a fully enclosed, streamlined structure designed to meet the laminar flow purification and hygiene requirements of modern operating rooms.

Flexible Positioning: Utilizes a professionally designed six-joint suspension system with a 340° rotating arm. This ensures flexible, portable, and natural positioning without any drifting.

Advanced Cold Lighting: Employs novel German cold lighting technology. It produces no infrared or ultraviolet radiation and prevents temperature rise on the surgical team''s heads.

Long Lifespan: The LED cold lighting source has a remarkably long service life of up to 80,000 hours, eliminating the need for bulb replacements and providing an eco-friendly and economical solution.

Adjustable Lighting: The color temperature is adjustable from 3700K to 5000K, which helps in making more accurate diagnoses and reduces visual fatigue for doctors. It also features a specific endoscope control mode for different surgical lighting needs.

Optical Precision: Each LED is equipped with a lens refracting and luminous system. The overall design creates a uniform light column with high brightness, ensuring a soft, deep-gathering effect for both high-brightness and high-depth surgical needs.

Controls: Features an easy-to-use button-type control panel.', 'The SX-700 is an advanced, ceiling-mounted surgical light designed to meet the strict hygiene and illumination standards of modern operating rooms. Powered by German cold LED technology, it delivers high-depth, uniform lighting with zero heat, infrared, or UV radiation.

Key Highlights:

Ultra-Long Lifespan: Up to 80,000 hours of continuous use with zero bulb replacements.

Precision Lighting: Adjustable color temperature (3700K–5000K) to reduce eye strain, plus a dedicated endoscope mode.

Seamless Mobility: A 6-joint suspension system with a 340° rotating arm ensures smooth, drift-free positioning.

Sanitary Design: Fully enclosed and streamlined to support laminar flow purification in surgical environments.', NULL, 35, 'China', 'CE Mark (CE-MDR): Certified compliant with European Medical Device Regulations, ensuring the products meet rigorous health, safety, and environmental protection standards for the European Economic Area.
ISO 13485 (EN ISO 13485:2016): Certified under the international standard for quality management systems specifically for the design and manufacture of medical devices.
ISO 9001: Certified for overall quality management systems, demonstrating consistent manufacturing and strict quality control processes.
IEC 60601-1 / EN 60601-1:2016: Fully compliant with the internationally recognized general standards for the basic safety and essential performance of medical electrical equipment.
IEC 60601-2-41: Compliant with the specific international safety and performance standards tailored for surgical luminaires (operating lights) and luminaires for diagnosis.
Free Sales Certificate (FSC): Approved for international export and commercial distribution.
Jiangsu Provincial FDA Approval: Fully licensed and approved by the regional Food and Drug Administration in their manufacturing jurisdiction (Jiangsu Province, China).', 'published', 'Healing Technology — Suxin Medical SX-700 Shadowless Operating Light', 'The SX-700 is an advanced, ceiling-mounted surgical light designed to meet the strict hygiene and illumination standards of modern operating rooms. Powered by German cold LED technology, it delivers high-depth, uniform lighting with zero heat, infrared, or UV radiation.

Key Highlights:

Ultra-Long Lifespan: Up to 80,000 hours of continuous use with zero bulb replacements.

Precision Lighting: Adjustable color temperature (3700K–5000K) to reduce eye strain, plus a dedicated endoscope mode.

Seamless Mobility: A 6-joint suspension system with a 340° rotating arm ensures smooth, drift-free positioning.

Sanitary Design: Fully enclosed and streamlined to support laminar flow purification in surgical environments.', 40, '2026-04-16 12:17:29.725+00', '2026-04-09 04:28:09.626+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (31, 'HF MED HF-L60 L84C LED shadowless operating lamp', 'HF-L60-L84C', false, 'HF-L60 L84C', 7, 27, NULL, 'HF MED HF-L60 L84C LED shadowless operating lamp', 'Product Overview
The HF-L60 L84C LED is a shadowless operating lamp manufactured by SHANGHAI HUIFENG MEDICAL INSTRUMENT CO.,LTD (HFMED). It is designed as an ideal surgical light solution to meet the diverse requirements of general surgery.
Key Features
Advanced Lighting Control: The lamp features precise dimming control to accommodate various lighting requests. It utilizes high-density light mixing technology to provide both high brightness and high-quality light.

Adjustable Settings: Users can utilize 8 levels of brightness adjustment and 3 levels of color temperature adjustment (3800K to 5000K ±300K). It also features manual mechanical spot size adjustment ranging from 160mm to 200mm.

ENDO Mode: The lamp is equipped with a one-button dim light setting, specifically designed as an Endoscope Mode. This allows surgeons to quickly switch from general mode without interfering with their field of vision during tissue observation.

Superior Thermal Management: An original thermal management system is built in to effectively reduce the temperature of the chip core. It uses a cast high-heat-conducting aluminum alloy radiator to instantly derive heat, which effectively reduces the lamp''s temperature and improves its service life.

Hygienic Design: The streamlined lamp body features a superior laminar flow design. This careful assembly increases airflow efficiency, helping to remove dust and bacteria from around the lamp.

Sterilizable Handle: The lamp includes a removable handle that can withstand high-temperature sterilization. This ensures doctors and nurses can safely and conveniently control the light''s direction and depth.', 'The HF-L60 L84C LED is a shadowless operating lamp manufactured by HFMED, designed to meet the diverse needs of general surgery.

Key Highlights:
High-Quality Lighting: Delivers an illuminance of up to roughly 160,000 Lux and features an excellent color rendering index (Ra) of 96 to 100.

Customizable Control: Offers 8 brightness levels, 3 color temperature settings ranging from 3800K to 5000K, and an adjustable spot diameter of 160-200mm.

Specialized Modes: Features a one-button "ENDO Mode" that dims the light for endoscopic procedures, allowing surgeons to observe tissue without visual interference.

Durability & Hygiene: Built with a high-heat-conducting aluminum alloy radiator for efficient cooling, a streamlined laminar flow design to help remove bacteria and dust, and a removable handle that can be sterilized at high temperatures.', NULL, 32, 'China', 'CE Mark: Specifically indicated on the HF-L60 L84C LED product document.

ISO 9001 & ISO 13485: Certified for general and medical device quality management systems.

FDA: Certified to meet United States Food and Drug Administration standards.

SGS: Verified and inspected for product quality and safety compliance.

MDR / MDA: Compliant with international Medical Device Regulations.

Credit Rating: Recognized locally in Shanghai as a Quality Credit A-level enterprise for medical device manufacturing.', 'published', 'Healing Technology — HF MED HF-L60 L84C LED shadowless operating lamp', NULL, NULL, '2026-04-19 08:23:49.139+00', '2026-04-15 10:54:14.981+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (23, 'Heyer Purelit OL9500', 'Purelit-OL9500', false, 'Purelit-OL9500', 7, 2, NULL, 'Heyer Purelit OL9500', 'The Purelit OL9500 series by Heyer is an advanced surgical lighting system designed to meet the needs of high-end medical users. The product holds 15 patents and has been recognized with the 2010 Red Star Design Award and the 2013 High-tech Produce Star by the Beijing Government.

Key Features:
Design & Hygiene:
The light head features an ultra-thin, streamlined aluminum alloy shell that provides low wind resistance, allowing stable laminar airflow to reach the surgical wound and prevent cross-infection.
The aluminum shell also offers outstanding heat dissipation to extend the life of the LEDs.
It includes a detachable and sterilizable PSU Polysulfone handle that can withstand heating up to 135°C.

Lighting Quality & Precision:
The system delivers an all-dimensional, shadowless lighting experience with a white LED light that eliminates colored cast shadows.
A multi-lens structure with patented focus technology can deliver a light spot diameter of up to 250mm and an illumination depth of up to 1,400mm.
It includes two independent LED bulbs specifically to provide basic illumination for endoscopic surgeries.
The synthetic resin light screen features anti-infrared coating (to prevent tissue desiccation), 2H hardness scratch-proofing, and an anti-static coating (to prevent floating particle absorption).

Control & Safety:
A microprocessor control panel allows surgeons to easily adjust lighting intensity in 10 levels, from 30% to 100%.
The multi-lens matrix structure is designed to prevent a total blackout if a single light module fails, ensuring patient safety during operations.
It uses a German-imported spring arm that maintains its position without drifting.

Efficiency & Adaptability:
The LED bulbs have a long life expectancy of up to 70,000 hours, making them reliable and cost-effective with low power consumption.
The system is HD camera compatible and supports low-height ceiling mounting.

Technical Specifications
The series includes two main models: the larger OLSS70 (featuring 20 matrix lens modules and 160 LEDs) and the smaller OL9550 (featuring 10 matrix lens modules and 80 LEDs).
Here is a comparison of their technical specifications:
Specification	  OLSS70	    OL9550
Diameter of lights	700 mm	500 mm
Illumination	160,000 Lux	160,000 Lux
Color temperature	4,300 K	4,300 K
Color rendering Index (Ra)	95%	95%
Diameter of light spot	250 mm	200 mm
LED power	160 W	80 W
Illumination depth (60%)	2600 mm	2400 mm
LED service life	70,000 hours	70,000 hours
Background light illumination	230 Lux	230 Lux
Quantity of LED bulbs	160	80
Minimum installation height	2,800 mm	2,800 mm
Illumination adjustment	30% to 100%	30% to 100%
Temp rise (surgical area surface)	15±0.5 °C	15±0.5 °C
Temp rise (surgeon''s head)	1±0.5 °C	1±0.5 °C', 'The Purelit OL9500 Series by Heyer is a premium LED surgical lighting system that delivers up to 160,000 Lux of shadowless, true-color illumination. Designed for the rigorous demands of modern operating rooms, it combines exceptional optical clarity with advanced safety and hygiene features.

Core Highlights:

Precision Optics: Delivers a 95% Color Rendering Index (CRI) for accurate tissue visualization, with a fail-safe multi-lens matrix that prevents complete blackouts if a single LED fails.

Enhanced Hygiene & Safety: Features an ultra-thin, aerodynamic profile that supports sterile laminar airflow. Its specialized light screen repels dust, resists scratches, and blocks infrared heat to prevent patient tissue desiccation.

Ergonomic & Durable: Equipped with a drift-free German spring arm, a sterilizable handle, and energy-efficient LEDs that boast a 70,000-hour lifespan.', NULL, 44, 'German', 'Certifications & Awards
Backed by world-class manufacturing standards and recognized for innovation, the Purelit OL9500 Series meets the strictest regulatory requirements for modern surgical environments:

Global Compliance: CE Marked and manufactured under ISO 13485 & ISO 9001 certified quality management systems.

OR Safety Standard: Class I medical electrical safety rating with IPX2 protection against fluid ingress.

Patented Innovation: Protected by 15 advanced technology patents.

Award-Winning Design: Winner of the Red Star Design Award and recognized as a "High-Tech Produce Star" for its advanced aerodynamic and optical engineering.', 'published', 'Healing Technology — Heyer Purelit OL9500', 'The Purelit OL9500 Series by Heyer is a premium LED surgical lighting system that delivers up to 160,000 Lux of shadowless, true-color illumination. Designed for the rigorous demands of modern operating rooms, it combines exceptional optical clarity with advanced safety and hygiene features.

Core Highlights:

Precision Optics: Delivers a 95% Color Rendering Index (CRI) for accurate tissue visualization, with a fail-safe multi-lens matrix that prevents complete blackouts if a single LED fails.

Enhanced Hygiene & Safety: Features an ultra-thin, aerodynamic profile that supports sterile laminar airflow. Its specialized light screen repels dust, resists scratches, and blocks infrared heat to prevent patient tissue desiccation.

Ergonomic & Durable: Equipped with a drift-free German spring arm, a sterilizable handle, and energy-efficient LEDs that boast a 70,000-hour lifespan.', NULL, '2026-04-19 06:54:46.571+00', '2026-04-09 04:28:09.583+00', NULL, NULL);
INSERT INTO public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) VALUES (17, 'JINLING-850 Advance ICU Anesthesia Machine With Ventilator', 'JINLING-850Advance', false, 'JINLING-850Advance', 7, 10, NULL, 'JINLING-850 Advance ICU Anesthesia Machine With Ventilator', 'JINLING-850 Anesthesia Machine
Product Overview
The JINLING-850 Anesthesia Machine is a state-of-the-art, pneumatically driven, and electronically controlled workstation engineered for precision and reliability in modern operating rooms and intensive care units. Designed to support closed, semi-closed, and semi-open operating modes, this highly versatile machine delivers comprehensive respiratory control. With its elegant, environmentally friendly frame and advanced interface, the JINLING-850 provides anesthesiologists with the confidence and flexibility needed for both routine surgeries and complex, low-flow anesthesia procedures.

Key Features & Benefits
Advanced Real-Time Display: Available with an 8.4-inch (Standard Model) or 10.4-inch (Advanced Model) high-definition color TFT screen. It allows clinicians to easily monitor Pressure-Time, Flow-Time, Pressure-Volume, and Flow-Volume waveforms, enabling instant cycle switching at the touch of a button.

High-Precision Gas Delivery: Features a sophisticated five-tube flowmeter (O2, N2O, and Air) fitted with an interlocking oxygen-nitrous oxide supply system, guaranteeing oxygen output never drops below a safe 21%.

Superior Modular Circuit: Built with a standard integrated metallic modular respiratory circuit. This premium design eliminates gas sealing issues during high-temperature disinfection, ensuring highly effective cleaning and sterilization.

Innovative Na-Lime Tank: Equipped with an international rotating Sodium-lime canister made from imported PPSU material. It is resistant to temperatures up to 134°C and features an easy, one-handed operation system.

Low-Flow Anesthesia Ready: Integrates an advanced, highly stable Adjustable Pressure Limiting (APL) valve, optimized for minimizing anesthetic gas use during low and ultra-low flow procedures.

Intelligent Safety & Backup:

Features an automated self-checking function during startup and self-calibrating sensors.

Automatically switches to a built-in backup battery (minimum 4-hour capacity) during AC power outages.

Includes comprehensive audible and visual alarms for tidal volume, airway pressure, oxygen concentration, asphyxia, and gas/power failures.', 'The JINLING-850 Anesthesia Machine is an advanced, highly versatile workstation designed for precision in both operating rooms and ICUs. Capable of supporting pediatric to adult patients, it features a vibrant color TFT display, comprehensive ventilation modes, and a precise five-tube flowmeter with interlocking safety mechanisms to prevent hypoxia.

Designed for ease of maintenance and infection control, it includes an easily sterilizable metallic modular respiratory circuit and a high-temperature-resistant sodium-lime canister. Fully optimized for low-flow anesthesia, the unit ensures maximum clinical safety with automated self-checks, robust alarm systems, and an automatic 4-hour battery backup.', NULL, 83, 'China', 'JINLING-850 Anesthesia Machine holds the following primary international certifications:

CE Mark: Certified to meet European health, safety, and environmental protection standards for medical devices.

ISO 13485: Certified under the internationally recognized quality management system standard specific to the design and manufacture of medical devices.

ISO 9001: Compliant with general international quality management system standards.

RoHS: Compliant with the Restriction of Hazardous Substances directive, ensuring the electronic components and manufacturing materials are environmentally safe.', 'published', 'Healing Technology — JINLING-850 Advance Anesthesia Machine With Ventilator', 'The JINLING-850 Anesthesia Machine is an advanced, highly versatile workstation designed for precision in both operating rooms and ICUs. Capable of supporting pediatric to adult patients, it features a vibrant color TFT display, comprehensive ventilation modes, and a precise five-tube flowmeter with interlocking safety mechanisms to prevent hypoxia.

Designed for ease of maintenance and infection control, it includes an easily sterilizable metallic modular respiratory circuit and a high-temperature-resistant sodium-lime canister. Fully optimized for low-flow anesthesia, the unit ensures maximum clinical safety with automated self-checks, robust alarm systems, and an automatic 4-hour battery backup.', 84, '2026-04-20 11:20:54.668+00', '2026-04-09 04:28:09.41+00', NULL, NULL);


--
-- Data for Name: products_applications; Type: TABLE DATA; Schema: public; Owner: healingtech
--

INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (1, 25, '69df2e65b960ec5fbf6307a1', 'Major Operating Theaters (OTs)');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (2, 25, '69df2ebab960ec5fbf6307a3', 'Cardiothoracic & Neurosurgery');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (3, 25, '69df2ebfb960ec5fbf6307a4', 'Orthopedic Surgery');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (4, 25, '69df2ec8b960ec5fbf6307a5', 'Plastic & Reconstructive Surgery');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (5, 25, '69df2ed1b960ec5fbf6307a6', 'Emergency & Trauma Centers');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (6, 25, '69df2edbb960ec5fbf6307a7', 'Ambulatory Surgical Centers (ASCs)');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (7, 25, '69df2ee5b960ec5fbf6307a8', 'Advanced Veterinary Hospitals');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (1, 20, '69e49f859227f07265a2b770', 'General Surgery');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (2, 20, '69e49fa69227f07265a2b771', 'Orthopedics');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (3, 20, '69e49fa99227f07265a2b772', 'Gynecology & Urology');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (4, 20, '69e49fb99227f07265a2b773', 'Head & Neck (ENT / Ophthalmology / Neurosurgery)');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (5, 20, '69e49fc39227f07265a2b774', 'Trauma & Emergency');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (1, 17, '69e60b601d522a8c2a7de9f9', 'Operating Rooms (OR): Ideal for delivering and maintaining general inhalation anesthesia during both routine and complex, prolonged surgical procedures.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (2, 17, '69e60bae1d522a8c2a7de9fa', 'Intensive Care Units (ICU): Capable of providing advanced, reliable respiratory support and mechanical ventilation for critically ill patients.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (3, 17, '69e60bb81d522a8c2a7de9fb', 'Pediatric and Adult Care: With an expansive and precise tidal volume range (adjustable from 20 to 1500 ml) and versatile ventilation modes, it safely accommodates a broad spectrum of patient demographics, from small children to adults.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (4, 17, '69e60bc01d522a8c2a7de9fc', 'Low-Flow Anesthesia: Highly optimized for low and ultra-low flow anesthesia techniques. This allows clinics to reduce the consumption of costly anesthetic agents while minimizing environmental exposure in the operating theater.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (5, 17, '69e60bc81d522a8c2a7de9fd', 'Ambulatory Surgery Centers: Perfectly suited for outpatient surgical settings that demand hospital-grade precision, rapid response times, and comprehensive patient monitoring without compromising on space or efficiency.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (1, 18, '69e60c2f1d522a8c2a7de9fe', 'Operating Rooms (OR) / Operation Theaters: The primary setting for administering and maintaining general inhalation anesthesia during routine, complex, or prolonged surgical procedures.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (2, 18, '69e60c3e1d522a8c2a7de9ff', 'Intensive Care Units (ICU): Can be utilized for advanced respiratory support and mechanical ventilation when necessary.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (3, 18, '69e60c461d522a8c2a7dea00', 'Ambulatory Surgery Centers: Suitable for outpatient surgical clinics that require reliable, high-precision anesthesia delivery and patient monitoring.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (4, 18, '69e60c4e1d522a8c2a7dea01', 'Diverse Patient Demographics: With a highly adjustable tidal volume (50 to 1500 ml) and versatile ventilation modes, the machine is fully capable of accommodating both adult and pediatric patients.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (5, 18, '69e60c561d522a8c2a7dea02', 'Low-Flow Anesthesia: Specifically optimized for low and ultra-low flow anesthesia techniques, which helps reduce anesthetic gas consumption and lowers the risk of environmental contamination in the surgical suite.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (1, 16, '69e611c91d522a8c2a7dea0e', 'General Surgery: Ideal for routine and complex open surgeries, providing precise tissue dissection (pure and mixed cutting) and rapid hemostasis (standard and spraying coagulation) for a variety of tissue types.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (2, 16, '69e611de1d522a8c2a7dea0f', 'Laparoscopic & Endoscopic Surgery: Fully compatible with suitable endoscopic accessories, allowing surgeons to perform minimally invasive procedures with instantaneous switching between cutting and coagulation.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (3, 16, '69e611e61d522a8c2a7dea10', 'Gynecology & Obstetrics: Used for procedures requiring careful thermal control and precision, such as hysterectomies, loop electrosurgical excision procedures (LEEP), and other pelvic surgeries.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (4, 16, '69e611ee1d522a8c2a7dea11', 'Urology: Highly effective for transurethral resections (when using appropriate bipolar/monopolar settings) and other urological interventions involving fluid-filled environments.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (5, 16, '69e611f61d522a8c2a7dea12', 'Orthopedics: Provides the heavy-duty power required for cutting through dense, highly resistive tissues and managing bleeding during joint and bone surgeries.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (6, 16, '69e611fd1d522a8c2a7dea13', 'Plastic & Reconstructive Surgery: The precise bipolar modes (up to 100W) allow for delicate tissue coagulation with minimal lateral thermal damage, ensuring better cosmetic outcomes.');
INSERT INTO public.products_applications (_order, _parent_id, id, department) VALUES (7, 16, '69e612091d522a8c2a7dea14', 'ENT (Ear, Nose, and Throat): Suitable for delicate dissections and controlling bleeding in confined spaces where precise energy delivery is critical.');


--
-- Data for Name: products_download_items; Type: TABLE DATA; Schema: public; Owner: healingtech
--



--
-- Data for Name: products_faq_items; Type: TABLE DATA; Schema: public; Owner: healingtech
--



--
-- Data for Name: products_gallery; Type: TABLE DATA; Schema: public; Owner: healingtech
--

INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (1, 31, '69e48ebc9227f07265a2b755', 65, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (2, 31, '69e48ed19227f07265a2b756', 66, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (3, 31, '69e48f289227f07265a2b757', 67, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (1, 17, '69e608031d522a8c2a7de9e6', 90, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (2, 17, '69e608281d522a8c2a7de9e7', 86, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (3, 17, '69e608471d522a8c2a7de9e8', 88, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (1, 25, '69df33c9b960ec5fbf6307ab', 7, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (2, 25, '69df33bfb960ec5fbf6307aa', 6, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (3, 25, '69e4943e9227f07265a2b76e', 69, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (4, 25, '69e4945c9227f07265a2b76f', 70, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (4, 17, '69e608821d522a8c2a7de9e9', 89, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (1, 18, '69e605df1d522a8c2a7de9e5', 80, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (2, 18, '69e6055f1d522a8c2a7de9e1', 76, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (3, 18, '69e6054f1d522a8c2a7de9e0', 75, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (1, 20, '69e48c659227f07265a2b753', 63, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (2, 20, '69e48d469227f07265a2b754', 64, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (1, 21, '69e486a49227f07265a2b752', 58, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (1, 24, '69e0c6ed57af051018456dbe', 36, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (2, 24, '69e0c7ad57af051018456dc2', 39, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (3, 24, '69e0c6f757af051018456dbf', 42, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (4, 24, '69e0c81a57af051018456dc4', 43, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (4, 18, '69e605671d522a8c2a7de9e2', 77, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (5, 18, '69e605751d522a8c2a7de9e3', 78, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (6, 18, '69e6057d1d522a8c2a7de9e4', 79, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (1, 22, '69e482339227f07265a2b74f', 52, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (2, 22, '69e4823f9227f07265a2b750', 53, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (3, 22, '69e482519227f07265a2b751', 56, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (7, 18, '69e605301d522a8c2a7de9df', 74, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (1, 23, '69e477359227f07265a2b748', 45, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (2, 23, '69e479839227f07265a2b74a', 46, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (3, 23, '69e47b319227f07265a2b74b', 47, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (4, 23, '69e47b5c9227f07265a2b74c', 48, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (5, 23, '69e47b6a9227f07265a2b74d', 49, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (6, 23, '69e47be19227f07265a2b74e', 50, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (1, 16, '69e60fea1d522a8c2a7dea04', 91, NULL);
INSERT INTO public.products_gallery (_order, _parent_id, id, image_id, alt) VALUES (2, 16, '69e610031d522a8c2a7dea05', 92, NULL);


--
-- Data for Name: products_key_highlights; Type: TABLE DATA; Schema: public; Owner: healingtech
--



--
-- Data for Name: products_rels; Type: TABLE DATA; Schema: public; Owner: healingtech
--

INSERT INTO public.products_rels (id, "order", parent_id, path, products_id) VALUES (28, 1, 24, 'relatedProducts', 25);


--
-- Data for Name: products_spec_groups; Type: TABLE DATA; Schema: public; Owner: healingtech
--

INSERT INTO public.products_spec_groups (_order, _parent_id, id, group_title) VALUES (1, 1, '69d72ad886da9424464137fb', 'Technical Specs');
INSERT INTO public.products_spec_groups (_order, _parent_id, id, group_title) VALUES (1, 31, '69e479dd34931c3b26d3a31f', 'Main Parameters');
INSERT INTO public.products_spec_groups (_order, _parent_id, id, group_title) VALUES (1, 25, '69e491749227f07265a2b764', 'Technical perameters');
INSERT INTO public.products_spec_groups (_order, _parent_id, id, group_title) VALUES (1, 20, '69e49fd49227f07265a2b775', 'Technical Specifications');
INSERT INTO public.products_spec_groups (_order, _parent_id, id, group_title) VALUES (1, 21, '69e4a0f49227f07265a2b780', 'Technical Specifications');
INSERT INTO public.products_spec_groups (_order, _parent_id, id, group_title) VALUES (1, 22, '69e4a1aa9227f07265a2b789', 'Technical Specifcations');
INSERT INTO public.products_spec_groups (_order, _parent_id, id, group_title) VALUES (1, 19, '69e4c0096a8ee835e89d81de', 'Ventilator Specifications');
INSERT INTO public.products_spec_groups (_order, _parent_id, id, group_title) VALUES (2, 19, '69e4c19a6a8ee835e89d81e6', 'Pneumatic & Vaporizer Specifications');
INSERT INTO public.products_spec_groups (_order, _parent_id, id, group_title) VALUES (3, 19, '69e4c4e06a8ee835e89d81ec', 'Electrical & Monitoring');
INSERT INTO public.products_spec_groups (_order, _parent_id, id, group_title) VALUES (1, 17, '69e609a11d522a8c2a7de9ea', 'Ventilation Capabilities');
INSERT INTO public.products_spec_groups (_order, _parent_id, id, group_title) VALUES (2, 17, '69e60a4b1d522a8c2a7de9f4', 'Flowmeter & Vaporizer Specs:');
INSERT INTO public.products_spec_groups (_order, _parent_id, id, group_title) VALUES (1, 18, '69e6041a1d522a8c2a7de9cf', 'Technical Specifications');
INSERT INTO public.products_spec_groups (_order, _parent_id, id, group_title) VALUES (2, 18, '69e604b71d522a8c2a7de9da', 'Hardware & Alarms:');
INSERT INTO public.products_spec_groups (_order, _parent_id, id, group_title) VALUES (1, 16, '69e6104e1d522a8c2a7dea06', 'Technical Specifications');


--
-- Data for Name: products_spec_groups_rows; Type: TABLE DATA; Schema: public; Owner: healingtech
--

INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (1, '69d72ad886da9424464137fb', '69d72ad886da9424464137f8', 'Illuminance', '50,000-160,000 Lux');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (2, '69d72ad886da9424464137fb', '69d72ad886da9424464137f9', 'LED Bulbs', '84 pcs');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (3, '69d72ad886da9424464137fb', '69d72ad886da9424464137fa', 'Service Life', '≥60,000 Hours');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (1, '69e4c0096a8ee835e89d81de', '69e4c00d6a8ee835e89d81df', 'Patient Type', 'Adult, Pediatric');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (2, '69e4c0096a8ee835e89d81de', '69e4c0776a8ee835e89d81e0', 'Ventilation Modes', 'IPPV, PLV, SIMV, Manual, Standby, Spont (with apnea backup)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (3, '69e4c0096a8ee835e89d81de', '69e4c1276a8ee835e89d81e1', 'Tidal Volume (TV)', '20 ~ 1500 ml');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (4, '69e4c0096a8ee835e89d81de', '69e4c1376a8ee835e89d81e2', 'Frequency', '4 ~ 100 bpm');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (5, '69e4c0096a8ee835e89d81de', '69e4c1466a8ee835e89d81e3', 'I:E Ratio', '4:1 ~ 1:8');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (6, '69e4c0096a8ee835e89d81de', '69e4c1546a8ee835e89d81e4', 'PEEP', '0 ~ 30 cmH₂O (Optional)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (7, '69e4c0096a8ee835e89d81de', '69e4c1616a8ee835e89d81e5', 'Inspiration Pause', 'OFF, 5% ~ 60%');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (1, '69e4c19a6a8ee835e89d81e6', '69e4c1a46a8ee835e89d81e7', 'Gas Supply', '280 ~ 600 kPa');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (2, '69e4c19a6a8ee835e89d81e6', '69e4c1b36a8ee835e89d81e8', 'Flowmeters', 'Double tube in series (O2: 0~1L/min, 1~10L/min; N2O: 0~1L/min, 1~10L/min)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (1, '69e6104e1d522a8c2a7dea06', '69e610511d522a8c2a7dea07', 'Pure Cutting - Sine wave', '500KHz - 400W');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (2, '69e6104e1d522a8c2a7dea06', '69e610fa1d522a8c2a7dea08', 'Mixed Cutting 1 - Modulated sine wave', '500KHz - 250W');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (3, '69e6104e1d522a8c2a7dea06', '69e611361d522a8c2a7dea09', 'Mixed Cutting 2 - Modulated sine wave', '500KHz - 200W');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (4, '69e6104e1d522a8c2a7dea06', '69e611511d522a8c2a7dea0a', 'Standard Coagulation - Modulated sine wave', '500KHz - 100W');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (5, '69e6104e1d522a8c2a7dea06', '69e6116d1d522a8c2a7dea0b', 'Spraying Coagulation - Modulated sine wave', '500KHz - 70W');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (6, '69e6104e1d522a8c2a7dea06', '69e611821d522a8c2a7dea0c', 'Bipolar 1 - Sine wave', '500KHz - 100W');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (7, '69e6104e1d522a8c2a7dea06', '69e611961d522a8c2a7dea0d', 'Bipolar 2	Modulated - sine wave', '500KHz - 70W');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (1, '69e479dd34931c3b26d3a31f', '69e479e934931c3b26d3a320', 'Illuminance', '≥145.000 Lux <160.000 Lux');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (2, '69e479dd34931c3b26d3a31f', '69e48ff19227f07265a2b758', 'Colour temperature', '3800K+300K;4400K+300K;5000K+300OK');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (3, '69e479dd34931c3b26d3a31f', '69e4901f9227f07265a2b759', 'Spot diameter', '160-200mm');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (4, '69e479dd34931c3b26d3a31f', '69e4902a9227f07265a2b75a', 'Input Power', '90VA');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (5, '69e479dd34931c3b26d3a31f', '69e490389227f07265a2b75b', 'LED secondarylight-emitting tube power', '3.2V/3W');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (6, '69e479dd34931c3b26d3a31f', '69e4904b9227f07265a2b75c', 'Number of LED secondarylight-emitting tubes', '60pcs + 84pcs');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (7, '69e479dd34931c3b26d3a31f', '69e4905b9227f07265a2b75d', 'ENDO', '≥10000 Lux');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (8, '69e479dd34931c3b26d3a31f', '69e490699227f07265a2b75e', 'GL', '≥12000 Lux');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (9, '69e479dd34931c3b26d3a31f', '69e4907f9227f07265a2b75f', 'Color rendering index(Ra)', '96≤Ra≤100');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (10, '69e479dd34931c3b26d3a31f', '69e4908c9227f07265a2b760', 'Color rendering index(Ra)', '96≤Ra≤100');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (11, '69e479dd34931c3b26d3a31f', '69e4909d9227f07265a2b761', 'Total irradiance', '≤500W/m²');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (12, '69e479dd34931c3b26d3a31f', '69e490ab9227f07265a2b762', 'Illumination depth', '20%:Notless than 1070mm. 60%:Not less than 560mm');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (1, '69e491749227f07265a2b764', '69e491c79227f07265a2b765', 'Dome diameter(mm)', '700 / 700');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (2, '69e491749227f07265a2b764', '69e4923f9227f07265a2b766', 'Illuminance (lux)', '40000-180000');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (3, '69e491749227f07265a2b764', '69e492619227f07265a2b767', 'Color temperature(K)', '4000-5700');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (4, '69e491749227f07265a2b764', '69e492729227f07265a2b768', 'Spot diameter(mm)', '150-350');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (5, '69e491749227f07265a2b764', '69e4929a9227f07265a2b769', 'Depth of irradiation(mm)', '1200');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (6, '69e491749227f07265a2b764', '69e493309227f07265a2b76a', 'Color rendering index(%)', '96');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (7, '69e491749227f07265a2b764', '69e4933b9227f07265a2b76b', 'Brightness adjustment digital display', '1-100%');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (8, '69e491749227f07265a2b764', '69e4934f9227f07265a2b76c', 'Temperature rise of surgeon''s head', '1°C');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (9, '69e491749227f07265a2b764', '69e493a79227f07265a2b76d', 'Led lifespan(h)', '80000');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (1, '69e49fd49227f07265a2b775', '69e49fe19227f07265a2b776', 'Overall Dimensions   (L x W)', '2100 mm x 500 mm (±20 mm)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (2, '69e49fd49227f07265a2b775', '69e49ff89227f07265a2b777', 'Working Table Height', '750 mm (±50 mm)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (3, '69e49fd49227f07265a2b775', '69e4a00f9227f07265a2b778', 'Height Adjustment Range', 'Up to 250 mm');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (4, '69e49fd49227f07265a2b775', '69e4a0219227f07265a2b779', 'Lateral Tilt (Left / Right)', '   ≥ 20°');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (5, '69e49fd49227f07265a2b775', '69e4a04c9227f07265a2b77a', ' Trendelenburg / Reverse   ', '≥ 20° to 25° ');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (6, '69e49fd49227f07265a2b775', '69e4a05c9227f07265a2b77b', 'Back Plate Adjustment   ', '+70° to -15° (Up to +80° upward)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (7, '69e49fd49227f07265a2b775', '69e4a0699227f07265a2b77c', ' Head Plate Adjustment   ', '±30° to 90° ');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (8, '69e49fd49227f07265a2b775', '69e4a0759227f07265a2b77d', 'Leg Plate (Downwards)   ', '≥ 90° ');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (9, '69e49fd49227f07265a2b775', '69e4a0809227f07265a2b77e', 'Kidney Bridge Lift   ', '≥ 100 mm to 120 mm ');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (10, '69e49fd49227f07265a2b775', '69e4a08a9227f07265a2b77f', 'Maximum Load Capacity  ', ' > 250 kg');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (1, '69e4a0f49227f07265a2b780', '69e4a0f89227f07265a2b781', 'Height Range  ', '760mm to 1010mm');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (2, '69e4a0f49227f07265a2b780', '69e4a1089227f07265a2b782', 'Dimensions (Length x Width)  ', ' 2010mm x 480mm');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (3, '69e4a0f49227f07265a2b780', '69e4a11c9227f07265a2b783', 'Lateral Tilt (Left / Right)  ', ' ≥20° / ≥20°');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (4, '69e4a0f49227f07265a2b780', '69e4a12e9227f07265a2b784', 'Trendelenburg / Reverse  ', ' ≥25° / ≥25° ');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (5, '69e4a0f49227f07265a2b780', '69e4a1449227f07265a2b785', 'Back Section (Up / Down)   ', '≥80° / ≥10° ');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (6, '69e4a0f49227f07265a2b780', '69e4a14d9227f07265a2b786', 'Head Section (Up / Down)  ', ' ≥60° / ≥90° ');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (7, '69e4a0f49227f07265a2b780', '69e4a1579227f07265a2b787', 'Leg Section (Down)   ', '≥90° ');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (8, '69e4a0f49227f07265a2b780', '69e4a1609227f07265a2b788', 'Waist Board Lifting  ', ' 120 mm');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (3, '69e4c19a6a8ee835e89d81e6', '69e4c1c26a8ee835e89d81e9', 'Breathing Circuit', 'Closed, Semi-closed, Semi-open');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (4, '69e4c19a6a8ee835e89d81e6', '69e4c1d06a8ee835e89d81ea', 'Vaporizer Support', 'Supports 2 vaporizers simultaneously.');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (5, '69e4c19a6a8ee835e89d81e6', '69e4c1e16a8ee835e89d81eb', 'Supported Agents', 'Halothane, Enflurane, Isoflurane, Sevoflurane (Pour-fill, Key-fill, Quik-fil® compatible).');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (1, '69e4a1aa9227f07265a2b789', '69e4a1d89227f07265a2b78a', 'Table length (mm)', '2040');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (2, '69e4a1aa9227f07265a2b789', '69e4a1f89227f07265a2b78b', 'Table width (w/o side rails, mm)', '520');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (3, '69e4a1aa9227f07265a2b789', '69e4a20a9227f07265a2b78c', 'Table top height adjustment (mm)', '680 to 950');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (4, '69e4a1aa9227f07265a2b789', '69e4a2179227f07265a2b78d', 'Trendelenburg/reverse-Trendelenburg', '30°');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (5, '69e4a1aa9227f07265a2b789', '69e4a2269227f07265a2b78e', 'Lateral tilting left/right', '20°');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (6, '69e4a1aa9227f07265a2b789', '69e4a2359227f07265a2b78f', 'Head plate up/down (detachable)', '30°/45°');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (7, '69e4a1aa9227f07265a2b789', '69e4a2439227f07265a2b790', 'Back plate up/down', '75°/30°');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (8, '69e4a1aa9227f07265a2b789', '69e4a2519227f07265a2b791', 'Leg plates up/down (detachable)', '5°/90°');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (9, '69e4a1aa9227f07265a2b789', '69e4a2629227f07265a2b792', 'Leg plates separation angle', '5°/90°');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (10, '69e4a1aa9227f07265a2b789', '69e4a2729227f07265a2b793', 'Leg plates separation angle', '180°');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (11, '69e4a1aa9227f07265a2b789', '69e4a2819227f07265a2b794', 'Flex/reflex', '210°/105°');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (12, '69e4a1aa9227f07265a2b789', '69e4a28f9227f07265a2b795', 'Kidney bridge elevation (mm)', '136');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (13, '69e4a1aa9227f07265a2b789', '69e4a2a59227f07265a2b796', 'Longitudinal displacement (mm)', '300 ');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (14, '69e4a1aa9227f07265a2b789', '69e4a2b29227f07265a2b797', 'Safe load capacity (kg)', '135');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (15, '69e4a1aa9227f07265a2b789', '69e4a2c09227f07265a2b798', 'Maximum static load (kg)', '297');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (16, '69e4a1aa9227f07265a2b789', '69e4a2cf9227f07265a2b799', 'Table padding', '60mm detachable multi-layer memory foam');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (17, '69e4a1aa9227f07265a2b789', '69e4a3db9227f07265a2b79c', 'Brake', '4 sets of electric hydraulic systems');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (18, '69e4a1aa9227f07265a2b789', '69e4a3ef9227f07265a2b79d', 'Head-leg plate interchangeable', 'Optional');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (19, '69e4a1aa9227f07265a2b789', '69e4a4059227f07265a2b79e', 'Column control panel', 'Optional');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (20, '69e4a1aa9227f07265a2b789', '69e4a46b9227f07265a2b79f', '1-key level', 'Optional');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (1, '69e4c4e06a8ee835e89d81ec', '69e4c4e46a8ee835e89d81ed', 'Battery Backup', 'DC 24V, providing $\ge$ 120 minutes of continuous power during outages.');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (2, '69e4c4e06a8ee835e89d81ec', '69e4c4f36a8ee835e89d81ee', 'Display Metrics', 'Pressure (Ppeak, Pplat, Pmean, PEEP), Volumes (MV, Vt), and optional Gas (O2, CO2, Agent). Displays P-t and F-t waveforms.');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (3, '69e4c4e06a8ee835e89d81ec', '69e4c5016a8ee835e89d81ef', 'Comprehensive Alarms', 'Visual and audio alarms (triggered within $\le$ 120 seconds) for High/Low Airway Pressure, Minute Volume, FiO2, Apnea, Power Failure, and O2 Supply Failure.');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (1, '69e609a11d522a8c2a7de9ea', '69e609b71d522a8c2a7de9eb', 'Ventilation Modes:', 'IPPV, SIPPV, VCV, IMV, SIMV, MANUAL, Standby (Advanced Model includes PCV)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (2, '69e609a11d522a8c2a7de9ea', '69e609c91d522a8c2a7de9ec', 'Tidal Volume:', 'Adjustable from 20 to 1500 ml (Display range: 0 ~ 2000 ml)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (3, '69e609a11d522a8c2a7de9ea', '69e609d71d522a8c2a7de9ed', 'Respiratory Rate:', '1 ~ 100 bpm');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (4, '69e609a11d522a8c2a7de9ea', '69e609e71d522a8c2a7de9ee', 'Inspiratory/Expiratory (I:E) Ratio:', '8:1 ~ 1:10 (Capable of inverse ratio ventilation)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (5, '69e609a11d522a8c2a7de9ea', '69e609f81d522a8c2a7de9ef', 'PEEP Range:', '0 ~ 20 cmH2O (Electronically controlled)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (6, '69e609a11d522a8c2a7de9ea', '69e60a061d522a8c2a7de9f0', 'Inspiratory Pressure Trigger:', '-10 ~ 10 cmH2O (Electronically controlled)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (7, '69e609a11d522a8c2a7de9ea', '69e60a131d522a8c2a7de9f1', 'Sigh Function:', '1 sigh breath in every 80 ~ 120 breaths');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (8, '69e609a11d522a8c2a7de9ea', '69e60a2d1d522a8c2a7de9f2', 'SIMV Rate:', '1 ~ 20 bpm');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (9, '69e609a11d522a8c2a7de9ea', '69e60a391d522a8c2a7de9f3', 'Inspiratory Plateau:', '0 ~ 1 second');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (1, '69e60a4b1d522a8c2a7de9f4', '69e60a541d522a8c2a7de9f5', 'Flowmeter Range:', 'O2 (0.1 ~ 10 L/min), N2O (0.1 ~ 10 L/min), Air (0.1 ~ 10 L/min)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (2, '69e60a4b1d522a8c2a7de9f4', '69e60a621d522a8c2a7de9f6', 'Vaporizer Slots:', 'Double PA-I type slots (Accommodates Enflurane, Isoflurane, or Sevoflurane)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (3, '69e60a4b1d522a8c2a7de9f4', '69e60a6f1d522a8c2a7de9f7', 'Vaporizer Concentration Range:', '0 ~ 5% (Includes built-in self-compensating functionality)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (4, '69e60a4b1d522a8c2a7de9f4', '69e60a7c1d522a8c2a7de9f8', 'Inhaled Oxygen Concentration Monitor:', '21 ~ 100%');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (1, '69e6041a1d522a8c2a7de9cf', '69e604261d522a8c2a7de9d0', 'Tidal Volume:', 'Adjustable from 50 to 1500 ml (Display range: 0 ~ 2000 ml)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (2, '69e6041a1d522a8c2a7de9cf', '69e604341d522a8c2a7de9d1', 'Ventilation Frequency:', '1 ~ 100 bpm');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (3, '69e6041a1d522a8c2a7de9cf', '69e604421d522a8c2a7de9d2', 'I:E Ratio:', '8:1 ~ 1:10 (Capable of inverse ratio ventilation)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (4, '69e6041a1d522a8c2a7de9cf', '69e604531d522a8c2a7de9d3', 'PEEP:', 'Electronically controlled, 0 ~ 20 cmH2O');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (5, '69e6041a1d522a8c2a7de9cf', '69e604611d522a8c2a7de9d4', 'Inspiratory Trigger Pressure:', 'Electronically controlled, -10 ~ 20 cmH2O');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (6, '69e6041a1d522a8c2a7de9cf', '69e604711d522a8c2a7de9d5', 'Sigh Function:', 'Adjustable, 80 ~ 150 times');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (7, '69e6041a1d522a8c2a7de9cf', '69e604811d522a8c2a7de9d6', 'SIMV Frequency:', '1 ~ 20 bpm');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (8, '69e6041a1d522a8c2a7de9cf', '69e604901d522a8c2a7de9d7', 'Flowmeter Range:', 'O2: 0.1 ~ 10 L/min | N2O: 0.1 ~ 10 L/min');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (9, '69e6041a1d522a8c2a7de9cf', '69e604a01d522a8c2a7de9d8', 'Vaporizer Concentration Range:', '0 ~ 5% (Compatible with Enflurane, Isoflurane, Sevoflurane, and optional Halothane)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (1, '69e604b71d522a8c2a7de9da', '69e604c01d522a8c2a7de9db', 'Gas Requirement:', 'O2 and N2O (0.32–0.6 MPa)');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (2, '69e604b71d522a8c2a7de9da', '69e604d01d522a8c2a7de9dc', 'Physical Dimensions:', '930 mm x 1354 mm x 620 mm');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (3, '69e604b71d522a8c2a7de9da', '69e604de1d522a8c2a7de9dd', 'Weight:', 'Approximately 86 kg');
INSERT INTO public.products_spec_groups_rows (_order, _parent_id, id, label, value) VALUES (4, '69e604b71d522a8c2a7de9da', '69e604ed1d522a8c2a7de9de', 'Alarm Indicators:', 'Comprehensive audible and visual alarms for tidal volume deviations, airway pressure, asphyxia, power failure, and oxygen supply failure, complete with a built-in alarm query function.');


--
-- Data for Name: products_support_blocks; Type: TABLE DATA; Schema: public; Owner: healingtech
--



--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.products_id_seq', 31, true);


--
-- Name: products_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.products_rels_id_seq', 50, true);


--
-- PostgreSQL database dump complete
--

\unrestrict hVShcnb7fgjIV9ta4gu9hDzi3PcsCj8cB4Peqvgpsd1uAO7HTqMHfIk2gVqmHHR

