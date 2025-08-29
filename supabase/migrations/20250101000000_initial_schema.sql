/*
          # Initial Schema for Kotobcom Bookstore
          This script sets up the initial database structure for the Kotobcom application, including tables for books, user profiles, and the necessary security policies.

          ## Query Description: 
          This is a structural migration and is safe to run on a new project. It creates the core tables required for the application to function. It does not modify or delete any existing user data if run on an empty database. It enables Row Level Security on user-related tables to ensure data privacy.

          ## Metadata:
          - Schema-Category: "Structural"
          - Impact-Level: "Low"
          - Requires-Backup: false
          - Reversible: true
          
          ## Structure Details:
          - Creates table: `public.profiles` to store user data linked to `auth.users`.
          - Creates table: `public.books` to store the book catalog.
          - Creates a trigger `on_auth_user_created` to automatically create a user profile upon sign-up.
          - Enables Row Level Security on `profiles` and `books`.
          - Adds RLS policies for accessing `profiles` and `books`.
          
          ## Security Implications:
          - RLS Status: Enabled
          - Policy Changes: Yes
          - Auth Requirements: Policies are linked to authenticated user roles.
          
          ## Performance Impact:
          - Indexes: Primary keys are indexed by default. No other custom indexes are added in this initial migration.
          - Triggers: Adds one trigger on `auth.users`.
          - Estimated Impact: Low performance impact.
          */

-- 1. PROFILES TABLE
-- This table stores public user data.
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user'
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Profiles
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );

-- 2. BOOKS TABLE
-- This table stores the book catalog.
CREATE TABLE public.books (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  title_ar TEXT,
  title_fr TEXT,
  author TEXT NOT NULL,
  author_ar TEXT,
  author_fr TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image TEXT,
  category TEXT NOT NULL,
  language TEXT NOT NULL,
  description TEXT,
  description_ar TEXT,
  description_fr TEXT,
  isbn TEXT,
  pages INTEGER,
  publisher TEXT,
  publish_year INTEGER,
  rating NUMERIC(2, 1),
  in_stock BOOLEAN DEFAULT true,
  quantity INTEGER DEFAULT 0
);

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Books
CREATE POLICY "Books are viewable by everyone."
  ON public.books FOR SELECT
  USING ( true );

CREATE POLICY "Admins can manage books."
  ON public.books FOR ALL
  USING ( (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin' )
  WITH CHECK ( (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin' );

-- 3. TRIGGER FOR NEW USER PROFILES
-- This function automatically creates a profile entry when a new user signs up.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
