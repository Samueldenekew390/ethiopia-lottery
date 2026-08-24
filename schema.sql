-- =========================================================================
-- የኢትዮጲያ ሎተሪ እጣ (Ethiopian Online Lottery) - Full Database Schema
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard)
-- =========================================================================

-- 1. Create lottery_images Table (For Header & Hero Banners)
CREATE TABLE IF NOT EXISTS public.lottery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    placement_key TEXT UNIQUE NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create lottery_categories Table (7 Main Lottery Categories)
CREATE TABLE IF NOT EXISTS public.lottery_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    preview_image_1 TEXT,
    preview_image_2 TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create lottery_sections Table (2 Prize Sections per Category)
CREATE TABLE IF NOT EXISTS public.lottery_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_fk UUID REFERENCES public.lottery_categories(id) ON DELETE CASCADE,
    category_id TEXT NOT NULL,
    section_number INT NOT NULL,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    tickets_total INT DEFAULT 5000,
    tickets_remaining INT DEFAULT 3000,
    description TEXT,
    image_1 TEXT,
    image_2 TEXT,
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(category_id, section_number)
);

-- 4. Create ticket_purchases Table (Customer Orders & Receipts)
CREATE TABLE IF NOT EXISTS public.ticket_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id TEXT UNIQUE NOT NULL,
    phone_number TEXT NOT NULL,
    category_id TEXT NOT NULL,
    category_name TEXT NOT NULL,
    section_number INT,
    section_title TEXT,
    ticket_price TEXT,
    payment_method TEXT,
    screenshot_url TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Create payment_methods Table (CBE, Telebirr, BOA, etc.)
CREATE TABLE IF NOT EXISTS public.payment_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    method_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    english_name TEXT,
    account_number TEXT NOT NULL,
    account_holder TEXT,
    icon TEXT,
    display_order INT DEFAULT 1,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.lottery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lottery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lottery_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

-- 7. Public Read & Insert Security Policies
CREATE POLICY "Public Read Lottery Images" ON public.lottery_images FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON public.lottery_categories FOR SELECT USING (true);
CREATE POLICY "Public Read Sections" ON public.lottery_sections FOR SELECT USING (true);
CREATE POLICY "Public Read Payment Methods" ON public.payment_methods FOR SELECT USING (true);
CREATE POLICY "Public Insert Ticket Purchase" ON public.ticket_purchases FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Full Access Purchases" ON public.ticket_purchases FOR ALL USING (true);
CREATE POLICY "Admin Full Access Images" ON public.lottery_images FOR ALL USING (true);
CREATE POLICY "Admin Full Access Categories" ON public.lottery_categories FOR ALL USING (true);
CREATE POLICY "Admin Full Access Sections" ON public.lottery_sections FOR ALL USING (true);
CREATE POLICY "Admin Full Access Payment Methods" ON public.payment_methods FOR ALL USING (true);
