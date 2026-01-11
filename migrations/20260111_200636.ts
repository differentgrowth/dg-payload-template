import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_shown_in" AS ENUM('header', 'footer');
  CREATE TYPE "public"."enum_pages_blocks_column_section_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_style" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_marquee_style" AS ENUM('vertical', 'horizontal', '3d');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_animated" AS ENUM('none', 'vertical', 'horizontal');
  CREATE TYPE "public"."enum_pages_hero_impact" AS ENUM('high', 'low');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_shown_in" AS ENUM('header', 'footer');
  CREATE TYPE "public"."enum__pages_v_blocks_column_section_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_style" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_style" AS ENUM('vertical', 'horizontal', '3d');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_animated" AS ENUM('none', 'vertical', 'horizontal');
  CREATE TYPE "public"."enum__pages_v_version_hero_impact" AS ENUM('high', 'low');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'user');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('pages');
  CREATE TYPE "public"."enum_blog_page_hero_impact" AS ENUM('high', 'low');
  CREATE TYPE "public"."enum_contact_page_blocks_column_section_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_contact_page_blocks_logo_cloud_style" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum_contact_page_blocks_marquee_style" AS ENUM('vertical', 'horizontal', '3d');
  CREATE TYPE "public"."enum_contact_page_blocks_testimonials_animated" AS ENUM('none', 'vertical', 'horizontal');
  CREATE TYPE "public"."enum_contact_page_hero_impact" AS ENUM('high', 'low');
  CREATE TYPE "public"."enum_home_page_shown_in" AS ENUM('header', 'footer');
  CREATE TYPE "public"."enum_home_page_blocks_column_section_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_home_page_blocks_logo_cloud_style" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum_home_page_blocks_marquee_style" AS ENUM('vertical', 'horizontal', '3d');
  CREATE TYPE "public"."enum_home_page_blocks_testimonials_animated" AS ENUM('none', 'vertical', 'horizontal');
  CREATE TYPE "public"."enum_home_page_hero_impact" AS ENUM('high', 'low');
  CREATE TYPE "public"."enum_social_media_items_platform" AS ENUM('discord', 'facebook', 'github', 'instagram', 'linkedin', 'telegram', 'threads', 'tiktok', 'whatsapp', 'x', 'youtube');
  CREATE TABLE "pages_shown_in" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_pages_shown_in",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"has_background" boolean DEFAULT false,
  	"button_label" varchar DEFAULT 'Quiero pedir cita',
  	"button_path" varchar DEFAULT '/contacto',
  	"enable_secondary_button" boolean DEFAULT false,
  	"secondary_button_label" varchar,
  	"secondary_button_path" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"label" varchar,
  	"url" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_card_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_column_section_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_column_section_columns_size" DEFAULT 'half',
  	"content" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_column_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"has_background" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"before_image_id" integer,
  	"after_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_description_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_description_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_embed_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"has_background" boolean DEFAULT false,
  	"google_maps_embed_code" varchar,
  	"google_maps_url" varchar,
  	"apple_maps_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faqs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_latest_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"style" "enum_pages_blocks_logo_cloud_style" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_marquee_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_marquee_style" DEFAULT 'horizontal',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_table_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"included" boolean DEFAULT true
  );
  
  CREATE TABLE "pages_blocks_pricing_table_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false,
  	"button_label" varchar DEFAULT 'Get Started',
  	"button_path" varchar DEFAULT '/signup'
  );
  
  CREATE TABLE "pages_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_section_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_team_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"has_background" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"content" varchar,
  	"url" varchar,
  	"role" varchar,
  	"avatar_id" integer
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"animated" "enum_pages_blocks_testimonials_animated" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"slug" varchar,
  	"hero_title" varchar,
  	"hero_image_id" integer,
  	"hero_description" jsonb,
  	"hero_impact" "enum_pages_hero_impact" DEFAULT 'high',
  	"hero_enable_primary_link" boolean DEFAULT false,
  	"hero_primary_link_label" varchar,
  	"hero_primary_link_path" varchar,
  	"hero_enable_secondary_link" boolean DEFAULT false,
  	"hero_secondary_link_label" varchar,
  	"hero_secondary_link_path" varchar,
  	"schema_markup" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_version_shown_in" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_version_shown_in",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"has_background" boolean DEFAULT false,
  	"button_label" varchar DEFAULT 'Quiero pedir cita',
  	"button_path" varchar DEFAULT '/contacto',
  	"enable_secondary_button" boolean DEFAULT false,
  	"secondary_button_label" varchar,
  	"secondary_button_path" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"label" varchar,
  	"url" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_column_section_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_column_section_columns_size" DEFAULT 'half',
  	"content" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_column_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"has_background" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"before_image_id" integer,
  	"after_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_description_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_description_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_embed_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"has_background" boolean DEFAULT false,
  	"google_maps_embed_code" varchar,
  	"google_maps_url" varchar,
  	"apple_maps_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faqs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_latest_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"style" "enum__pages_v_blocks_logo_cloud_style" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_marquee_style" DEFAULT 'horizontal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_table_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"included" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_table_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false,
  	"button_label" varchar DEFAULT 'Get Started',
  	"button_path" varchar DEFAULT '/signup',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_section_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"has_background" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"content" varchar,
  	"url" varchar,
  	"role" varchar,
  	"avatar_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"animated" "enum__pages_v_blocks_testimonials_animated" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_label" varchar,
  	"version_slug" varchar,
  	"version_hero_title" varchar,
  	"version_hero_image_id" integer,
  	"version_hero_description" jsonb,
  	"version_hero_impact" "enum__pages_v_version_hero_impact" DEFAULT 'high',
  	"version_hero_enable_primary_link" boolean DEFAULT false,
  	"version_hero_primary_link_label" varchar,
  	"version_hero_primary_link_path" varchar,
  	"version_hero_enable_secondary_link" boolean DEFAULT false,
  	"version_hero_secondary_link_label" varchar,
  	"version_hero_secondary_link_path" varchar,
  	"version_schema_markup" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_folder_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"slug" varchar,
  	"content" jsonb,
  	"schema_markup" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"categories_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_description" jsonb,
  	"version_image_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_featured" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_content" jsonb,
  	"version_schema_markup" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"categories_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"message" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "media_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'user' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer,
  	"leads_id" integer,
  	"media_id" integer,
  	"users_id" integer,
  	"redirects_id" integer,
  	"payload_folders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"show_on_header" boolean DEFAULT true,
  	"show_on_footer" boolean DEFAULT false,
  	"hero_title" varchar,
  	"hero_image_id" integer,
  	"hero_description" jsonb,
  	"hero_impact" "enum_blog_page_hero_impact" DEFAULT 'high',
  	"hero_enable_primary_link" boolean DEFAULT false,
  	"hero_primary_link_label" varchar,
  	"hero_primary_link_path" varchar,
  	"hero_enable_secondary_link" boolean DEFAULT false,
  	"hero_secondary_link_label" varchar,
  	"hero_secondary_link_path" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_methods" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"whatsapp_label" varchar NOT NULL,
  	"whatsapp_link" varchar NOT NULL,
  	"whatsapp_message" varchar,
  	"email" varchar,
  	"address_text" varchar,
  	"address_url" varchar,
  	"email_for_notifications" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"has_background" boolean DEFAULT false,
  	"button_label" varchar DEFAULT 'Quiero pedir cita',
  	"button_path" varchar DEFAULT '/contacto',
  	"enable_secondary_button" boolean DEFAULT false,
  	"secondary_button_label" varchar,
  	"secondary_button_path" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_card_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "contact_page_blocks_card_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_card_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "contact_page_blocks_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_column_section_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_contact_page_blocks_column_section_columns_size" DEFAULT 'half',
  	"content" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "contact_page_blocks_column_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"has_background" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"before_image_id" integer NOT NULL,
  	"after_image_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_description_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL
  );
  
  CREATE TABLE "contact_page_blocks_description_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_embed_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"has_background" boolean DEFAULT false,
  	"google_maps_embed_code" varchar,
  	"google_maps_url" varchar,
  	"apple_maps_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_faqs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL
  );
  
  CREATE TABLE "contact_page_blocks_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_featured_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_page_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_latest_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "contact_page_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"style" "enum_contact_page_blocks_logo_cloud_style" DEFAULT 'grid' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_marquee_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_page_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_contact_page_blocks_marquee_style" DEFAULT 'horizontal' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_pricing_table_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"included" boolean DEFAULT true
  );
  
  CREATE TABLE "contact_page_blocks_pricing_table_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false,
  	"button_label" varchar DEFAULT 'Get Started' NOT NULL,
  	"button_path" varchar DEFAULT '/signup' NOT NULL
  );
  
  CREATE TABLE "contact_page_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "contact_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_team_section_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"bio" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "contact_page_blocks_team_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"has_background" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"content" varchar NOT NULL,
  	"url" varchar,
  	"role" varchar,
  	"avatar_id" integer
  );
  
  CREATE TABLE "contact_page_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"animated" "enum_contact_page_blocks_testimonials_animated" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_image_id" integer,
  	"hero_description" jsonb,
  	"hero_impact" "enum_contact_page_hero_impact" DEFAULT 'high',
  	"hero_enable_primary_link" boolean DEFAULT false,
  	"hero_primary_link_label" varchar,
  	"hero_primary_link_path" varchar,
  	"hero_enable_secondary_link" boolean DEFAULT false,
  	"hero_secondary_link_label" varchar,
  	"hero_secondary_link_path" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_shown_in" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_home_page_shown_in",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"has_background" boolean DEFAULT false,
  	"button_label" varchar DEFAULT 'Quiero pedir cita',
  	"button_path" varchar DEFAULT '/contacto',
  	"enable_secondary_button" boolean DEFAULT false,
  	"secondary_button_label" varchar,
  	"secondary_button_path" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_card_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "home_page_blocks_card_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_card_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "home_page_blocks_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_column_section_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_home_page_blocks_column_section_columns_size" DEFAULT 'half',
  	"content" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "home_page_blocks_column_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"has_background" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"before_image_id" integer NOT NULL,
  	"after_image_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_description_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_description_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_embed_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"has_background" boolean DEFAULT false,
  	"google_maps_embed_code" varchar,
  	"google_maps_url" varchar,
  	"apple_maps_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_faqs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_featured_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_latest_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "home_page_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"style" "enum_home_page_blocks_logo_cloud_style" DEFAULT 'grid' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_marquee_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_home_page_blocks_marquee_style" DEFAULT 'horizontal' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_pricing_table_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"included" boolean DEFAULT true
  );
  
  CREATE TABLE "home_page_blocks_pricing_table_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false,
  	"button_label" varchar DEFAULT 'Get Started' NOT NULL,
  	"button_path" varchar DEFAULT '/signup' NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "home_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_team_section_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"bio" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "home_page_blocks_team_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"has_background" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"content" varchar NOT NULL,
  	"url" varchar,
  	"role" varchar,
  	"avatar_id" integer
  );
  
  CREATE TABLE "home_page_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"animated" "enum_home_page_blocks_testimonials_animated" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"hero_title" varchar,
  	"hero_image_id" integer,
  	"hero_description" jsonb,
  	"hero_impact" "enum_home_page_hero_impact" DEFAULT 'high',
  	"hero_enable_primary_link" boolean DEFAULT false,
  	"hero_primary_link_label" varchar,
  	"hero_primary_link_path" varchar,
  	"hero_enable_secondary_link" boolean DEFAULT false,
  	"hero_secondary_link_label" varchar,
  	"hero_secondary_link_path" varchar,
  	"schema_markup" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "links_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "social_media_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"platform" "enum_social_media_items_platform" NOT NULL
  );
  
  CREATE TABLE "social_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_shown_in" ADD CONSTRAINT "pages_shown_in_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_call_to_action" ADD CONSTRAINT "pages_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_links_links" ADD CONSTRAINT "pages_blocks_card_links_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_links_links" ADD CONSTRAINT "pages_blocks_card_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_links" ADD CONSTRAINT "pages_blocks_card_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_list_items" ADD CONSTRAINT "pages_blocks_card_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_list_items" ADD CONSTRAINT "pages_blocks_card_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_list" ADD CONSTRAINT "pages_blocks_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column_section_columns" ADD CONSTRAINT "pages_blocks_column_section_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_column_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column_section" ADD CONSTRAINT "pages_blocks_column_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison" ADD CONSTRAINT "pages_blocks_comparison_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison" ADD CONSTRAINT "pages_blocks_comparison_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison" ADD CONSTRAINT "pages_blocks_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_description_list_items" ADD CONSTRAINT "pages_blocks_description_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_description_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_description_list" ADD CONSTRAINT "pages_blocks_description_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_embed_map" ADD CONSTRAINT "pages_blocks_embed_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faqs_items" ADD CONSTRAINT "pages_blocks_faqs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faqs" ADD CONSTRAINT "pages_blocks_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_posts" ADD CONSTRAINT "pages_blocks_featured_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_latest_posts" ADD CONSTRAINT "pages_blocks_latest_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud" ADD CONSTRAINT "pages_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_images" ADD CONSTRAINT "pages_blocks_marquee_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_images" ADD CONSTRAINT "pages_blocks_marquee_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee" ADD CONSTRAINT "pages_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media" ADD CONSTRAINT "pages_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media" ADD CONSTRAINT "pages_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table_plans_features" ADD CONSTRAINT "pages_blocks_pricing_table_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_table_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table_plans" ADD CONSTRAINT "pages_blocks_pricing_table_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table" ADD CONSTRAINT "pages_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_section_members" ADD CONSTRAINT "pages_blocks_team_section_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_section_members" ADD CONSTRAINT "pages_blocks_team_section_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_section" ADD CONSTRAINT "pages_blocks_team_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_shown_in" ADD CONSTRAINT "_pages_v_version_shown_in_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD CONSTRAINT "_pages_v_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_links_links" ADD CONSTRAINT "_pages_v_blocks_card_links_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_links_links" ADD CONSTRAINT "_pages_v_blocks_card_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_links" ADD CONSTRAINT "_pages_v_blocks_card_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_list_items" ADD CONSTRAINT "_pages_v_blocks_card_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_list_items" ADD CONSTRAINT "_pages_v_blocks_card_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_list" ADD CONSTRAINT "_pages_v_blocks_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column_section_columns" ADD CONSTRAINT "_pages_v_blocks_column_section_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_column_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column_section" ADD CONSTRAINT "_pages_v_blocks_column_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison" ADD CONSTRAINT "_pages_v_blocks_comparison_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison" ADD CONSTRAINT "_pages_v_blocks_comparison_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison" ADD CONSTRAINT "_pages_v_blocks_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_description_list_items" ADD CONSTRAINT "_pages_v_blocks_description_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_description_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_description_list" ADD CONSTRAINT "_pages_v_blocks_description_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_embed_map" ADD CONSTRAINT "_pages_v_blocks_embed_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faqs_items" ADD CONSTRAINT "_pages_v_blocks_faqs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faqs" ADD CONSTRAINT "_pages_v_blocks_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_posts" ADD CONSTRAINT "_pages_v_blocks_featured_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD CONSTRAINT "_pages_v_blocks_latest_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee_images" ADD CONSTRAINT "_pages_v_blocks_marquee_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee_images" ADD CONSTRAINT "_pages_v_blocks_marquee_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee" ADD CONSTRAINT "_pages_v_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media" ADD CONSTRAINT "_pages_v_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media" ADD CONSTRAINT "_pages_v_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_table_plans_features" ADD CONSTRAINT "_pages_v_blocks_pricing_table_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_table_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_table_plans" ADD CONSTRAINT "_pages_v_blocks_pricing_table_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_table" ADD CONSTRAINT "_pages_v_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_section_members" ADD CONSTRAINT "_pages_v_blocks_team_section_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_section_members" ADD CONSTRAINT "_pages_v_blocks_team_section_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_section" ADD CONSTRAINT "_pages_v_blocks_team_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_folder_id_payload_folders_id_fk" FOREIGN KEY ("version_folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page" ADD CONSTRAINT "blog_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page" ADD CONSTRAINT "blog_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_call_to_action" ADD CONSTRAINT "contact_page_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_card_links_links" ADD CONSTRAINT "contact_page_blocks_card_links_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_card_links_links" ADD CONSTRAINT "contact_page_blocks_card_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_card_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_card_links" ADD CONSTRAINT "contact_page_blocks_card_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_card_list_items" ADD CONSTRAINT "contact_page_blocks_card_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_card_list_items" ADD CONSTRAINT "contact_page_blocks_card_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_card_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_card_list" ADD CONSTRAINT "contact_page_blocks_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_column_section_columns" ADD CONSTRAINT "contact_page_blocks_column_section_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_column_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_column_section" ADD CONSTRAINT "contact_page_blocks_column_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_comparison" ADD CONSTRAINT "contact_page_blocks_comparison_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_comparison" ADD CONSTRAINT "contact_page_blocks_comparison_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_comparison" ADD CONSTRAINT "contact_page_blocks_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_contact_form" ADD CONSTRAINT "contact_page_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_description_list_items" ADD CONSTRAINT "contact_page_blocks_description_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_description_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_description_list" ADD CONSTRAINT "contact_page_blocks_description_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_embed_map" ADD CONSTRAINT "contact_page_blocks_embed_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_faqs_items" ADD CONSTRAINT "contact_page_blocks_faqs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_faqs" ADD CONSTRAINT "contact_page_blocks_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_featured_posts" ADD CONSTRAINT "contact_page_blocks_featured_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_gallery_images" ADD CONSTRAINT "contact_page_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_gallery_images" ADD CONSTRAINT "contact_page_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_gallery" ADD CONSTRAINT "contact_page_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_latest_posts" ADD CONSTRAINT "contact_page_blocks_latest_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_logo_cloud_logos" ADD CONSTRAINT "contact_page_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_logo_cloud_logos" ADD CONSTRAINT "contact_page_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_logo_cloud" ADD CONSTRAINT "contact_page_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_marquee_images" ADD CONSTRAINT "contact_page_blocks_marquee_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_marquee_images" ADD CONSTRAINT "contact_page_blocks_marquee_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_marquee" ADD CONSTRAINT "contact_page_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_media" ADD CONSTRAINT "contact_page_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_media" ADD CONSTRAINT "contact_page_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_pricing_table_plans_features" ADD CONSTRAINT "contact_page_blocks_pricing_table_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_pricing_table_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_pricing_table_plans" ADD CONSTRAINT "contact_page_blocks_pricing_table_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_pricing_table" ADD CONSTRAINT "contact_page_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_stats_items" ADD CONSTRAINT "contact_page_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_stats" ADD CONSTRAINT "contact_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_team_section_members" ADD CONSTRAINT "contact_page_blocks_team_section_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_team_section_members" ADD CONSTRAINT "contact_page_blocks_team_section_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_team_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_team_section" ADD CONSTRAINT "contact_page_blocks_team_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_testimonials_items" ADD CONSTRAINT "contact_page_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_testimonials_items" ADD CONSTRAINT "contact_page_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_blocks_testimonials" ADD CONSTRAINT "contact_page_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_shown_in" ADD CONSTRAINT "home_page_shown_in_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_call_to_action" ADD CONSTRAINT "home_page_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_card_links_links" ADD CONSTRAINT "home_page_blocks_card_links_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_card_links_links" ADD CONSTRAINT "home_page_blocks_card_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_card_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_card_links" ADD CONSTRAINT "home_page_blocks_card_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_card_list_items" ADD CONSTRAINT "home_page_blocks_card_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_card_list_items" ADD CONSTRAINT "home_page_blocks_card_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_card_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_card_list" ADD CONSTRAINT "home_page_blocks_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_column_section_columns" ADD CONSTRAINT "home_page_blocks_column_section_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_column_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_column_section" ADD CONSTRAINT "home_page_blocks_column_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_comparison" ADD CONSTRAINT "home_page_blocks_comparison_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_comparison" ADD CONSTRAINT "home_page_blocks_comparison_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_comparison" ADD CONSTRAINT "home_page_blocks_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_contact_form" ADD CONSTRAINT "home_page_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_description_list_items" ADD CONSTRAINT "home_page_blocks_description_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_description_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_description_list" ADD CONSTRAINT "home_page_blocks_description_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_embed_map" ADD CONSTRAINT "home_page_blocks_embed_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_faqs_items" ADD CONSTRAINT "home_page_blocks_faqs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_faqs" ADD CONSTRAINT "home_page_blocks_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_featured_posts" ADD CONSTRAINT "home_page_blocks_featured_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_gallery_images" ADD CONSTRAINT "home_page_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_gallery_images" ADD CONSTRAINT "home_page_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_gallery" ADD CONSTRAINT "home_page_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_latest_posts" ADD CONSTRAINT "home_page_blocks_latest_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_logo_cloud_logos" ADD CONSTRAINT "home_page_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_logo_cloud_logos" ADD CONSTRAINT "home_page_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_logo_cloud" ADD CONSTRAINT "home_page_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_marquee_images" ADD CONSTRAINT "home_page_blocks_marquee_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_marquee_images" ADD CONSTRAINT "home_page_blocks_marquee_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_marquee" ADD CONSTRAINT "home_page_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_media" ADD CONSTRAINT "home_page_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_media" ADD CONSTRAINT "home_page_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_pricing_table_plans_features" ADD CONSTRAINT "home_page_blocks_pricing_table_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_pricing_table_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_pricing_table_plans" ADD CONSTRAINT "home_page_blocks_pricing_table_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_pricing_table" ADD CONSTRAINT "home_page_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_stats_items" ADD CONSTRAINT "home_page_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_stats" ADD CONSTRAINT "home_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_team_section_members" ADD CONSTRAINT "home_page_blocks_team_section_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_team_section_members" ADD CONSTRAINT "home_page_blocks_team_section_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_team_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_team_section" ADD CONSTRAINT "home_page_blocks_team_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_testimonials_items" ADD CONSTRAINT "home_page_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_testimonials_items" ADD CONSTRAINT "home_page_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_testimonials" ADD CONSTRAINT "home_page_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "links_items" ADD CONSTRAINT "links_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "social_media_items" ADD CONSTRAINT "social_media_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."social_media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_shown_in_order_idx" ON "pages_shown_in" USING btree ("order");
  CREATE INDEX "pages_shown_in_parent_idx" ON "pages_shown_in" USING btree ("parent_id");
  CREATE INDEX "pages_shown_in_value_idx" ON "pages_shown_in" USING btree ("value");
  CREATE INDEX "pages_blocks_call_to_action_order_idx" ON "pages_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "pages_blocks_call_to_action_parent_id_idx" ON "pages_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_call_to_action_path_idx" ON "pages_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "pages_blocks_card_links_links_order_idx" ON "pages_blocks_card_links_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_links_links_parent_id_idx" ON "pages_blocks_card_links_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_links_links_image_idx" ON "pages_blocks_card_links_links" USING btree ("image_id");
  CREATE INDEX "pages_blocks_card_links_order_idx" ON "pages_blocks_card_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_links_parent_id_idx" ON "pages_blocks_card_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_links_path_idx" ON "pages_blocks_card_links" USING btree ("_path");
  CREATE INDEX "pages_blocks_card_list_items_order_idx" ON "pages_blocks_card_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_list_items_parent_id_idx" ON "pages_blocks_card_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_list_items_image_idx" ON "pages_blocks_card_list_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_card_list_order_idx" ON "pages_blocks_card_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_list_parent_id_idx" ON "pages_blocks_card_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_list_path_idx" ON "pages_blocks_card_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_column_section_columns_order_idx" ON "pages_blocks_column_section_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_section_columns_parent_id_idx" ON "pages_blocks_column_section_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_section_order_idx" ON "pages_blocks_column_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_section_parent_id_idx" ON "pages_blocks_column_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_section_path_idx" ON "pages_blocks_column_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_comparison_order_idx" ON "pages_blocks_comparison" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_parent_id_idx" ON "pages_blocks_comparison" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_path_idx" ON "pages_blocks_comparison" USING btree ("_path");
  CREATE INDEX "pages_blocks_comparison_before_image_idx" ON "pages_blocks_comparison" USING btree ("before_image_id");
  CREATE INDEX "pages_blocks_comparison_after_image_idx" ON "pages_blocks_comparison" USING btree ("after_image_id");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_description_list_items_order_idx" ON "pages_blocks_description_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_description_list_items_parent_id_idx" ON "pages_blocks_description_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_description_list_order_idx" ON "pages_blocks_description_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_description_list_parent_id_idx" ON "pages_blocks_description_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_description_list_path_idx" ON "pages_blocks_description_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_embed_map_order_idx" ON "pages_blocks_embed_map" USING btree ("_order");
  CREATE INDEX "pages_blocks_embed_map_parent_id_idx" ON "pages_blocks_embed_map" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_embed_map_path_idx" ON "pages_blocks_embed_map" USING btree ("_path");
  CREATE INDEX "pages_blocks_faqs_items_order_idx" ON "pages_blocks_faqs_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faqs_items_parent_id_idx" ON "pages_blocks_faqs_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faqs_order_idx" ON "pages_blocks_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_faqs_parent_id_idx" ON "pages_blocks_faqs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faqs_path_idx" ON "pages_blocks_faqs" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_posts_order_idx" ON "pages_blocks_featured_posts" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_posts_parent_id_idx" ON "pages_blocks_featured_posts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_posts_path_idx" ON "pages_blocks_featured_posts" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_images_order_idx" ON "pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_images_parent_id_idx" ON "pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_image_idx" ON "pages_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_latest_posts_order_idx" ON "pages_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX "pages_blocks_latest_posts_parent_id_idx" ON "pages_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_latest_posts_path_idx" ON "pages_blocks_latest_posts" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_cloud_logos_order_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_logos_parent_id_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_logos_logo_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_logo_cloud_order_idx" ON "pages_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_parent_id_idx" ON "pages_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_path_idx" ON "pages_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "pages_blocks_marquee_images_order_idx" ON "pages_blocks_marquee_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_images_parent_id_idx" ON "pages_blocks_marquee_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_images_image_idx" ON "pages_blocks_marquee_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_marquee_order_idx" ON "pages_blocks_marquee" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_parent_id_idx" ON "pages_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_path_idx" ON "pages_blocks_marquee" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_order_idx" ON "pages_blocks_media" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_parent_id_idx" ON "pages_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_path_idx" ON "pages_blocks_media" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_media_idx" ON "pages_blocks_media" USING btree ("media_id");
  CREATE INDEX "pages_blocks_pricing_table_plans_features_order_idx" ON "pages_blocks_pricing_table_plans_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_table_plans_features_parent_id_idx" ON "pages_blocks_pricing_table_plans_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_plans_order_idx" ON "pages_blocks_pricing_table_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_table_plans_parent_id_idx" ON "pages_blocks_pricing_table_plans" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_order_idx" ON "pages_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_table_parent_id_idx" ON "pages_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_path_idx" ON "pages_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_section_members_order_idx" ON "pages_blocks_team_section_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_section_members_parent_id_idx" ON "pages_blocks_team_section_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_section_members_image_idx" ON "pages_blocks_team_section_members" USING btree ("image_id");
  CREATE INDEX "pages_blocks_team_section_order_idx" ON "pages_blocks_team_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_section_parent_id_idx" ON "pages_blocks_team_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_section_path_idx" ON "pages_blocks_team_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_items_order_idx" ON "pages_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_items_parent_id_idx" ON "pages_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_items_avatar_idx" ON "pages_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_hero_hero_image_idx" ON "pages" USING btree ("hero_image_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_folder_idx" ON "pages" USING btree ("folder_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_version_shown_in_order_idx" ON "_pages_v_version_shown_in" USING btree ("order");
  CREATE INDEX "_pages_v_version_shown_in_parent_idx" ON "_pages_v_version_shown_in" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_shown_in_value_idx" ON "_pages_v_version_shown_in" USING btree ("value");
  CREATE INDEX "_pages_v_blocks_call_to_action_order_idx" ON "_pages_v_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_call_to_action_parent_id_idx" ON "_pages_v_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_path_idx" ON "_pages_v_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_card_links_links_order_idx" ON "_pages_v_blocks_card_links_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_links_links_parent_id_idx" ON "_pages_v_blocks_card_links_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_links_links_image_idx" ON "_pages_v_blocks_card_links_links" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_card_links_order_idx" ON "_pages_v_blocks_card_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_links_parent_id_idx" ON "_pages_v_blocks_card_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_links_path_idx" ON "_pages_v_blocks_card_links" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_card_list_items_order_idx" ON "_pages_v_blocks_card_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_list_items_parent_id_idx" ON "_pages_v_blocks_card_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_list_items_image_idx" ON "_pages_v_blocks_card_list_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_card_list_order_idx" ON "_pages_v_blocks_card_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_list_parent_id_idx" ON "_pages_v_blocks_card_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_list_path_idx" ON "_pages_v_blocks_card_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_column_section_columns_order_idx" ON "_pages_v_blocks_column_section_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_section_columns_parent_id_idx" ON "_pages_v_blocks_column_section_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_section_order_idx" ON "_pages_v_blocks_column_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_section_parent_id_idx" ON "_pages_v_blocks_column_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_section_path_idx" ON "_pages_v_blocks_column_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_comparison_order_idx" ON "_pages_v_blocks_comparison" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_parent_id_idx" ON "_pages_v_blocks_comparison" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_path_idx" ON "_pages_v_blocks_comparison" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_comparison_before_image_idx" ON "_pages_v_blocks_comparison" USING btree ("before_image_id");
  CREATE INDEX "_pages_v_blocks_comparison_after_image_idx" ON "_pages_v_blocks_comparison" USING btree ("after_image_id");
  CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_description_list_items_order_idx" ON "_pages_v_blocks_description_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_description_list_items_parent_id_idx" ON "_pages_v_blocks_description_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_description_list_order_idx" ON "_pages_v_blocks_description_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_description_list_parent_id_idx" ON "_pages_v_blocks_description_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_description_list_path_idx" ON "_pages_v_blocks_description_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_embed_map_order_idx" ON "_pages_v_blocks_embed_map" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_embed_map_parent_id_idx" ON "_pages_v_blocks_embed_map" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_embed_map_path_idx" ON "_pages_v_blocks_embed_map" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faqs_items_order_idx" ON "_pages_v_blocks_faqs_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faqs_items_parent_id_idx" ON "_pages_v_blocks_faqs_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faqs_order_idx" ON "_pages_v_blocks_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faqs_parent_id_idx" ON "_pages_v_blocks_faqs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faqs_path_idx" ON "_pages_v_blocks_faqs" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_posts_order_idx" ON "_pages_v_blocks_featured_posts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_posts_parent_id_idx" ON "_pages_v_blocks_featured_posts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_posts_path_idx" ON "_pages_v_blocks_featured_posts" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_images_order_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_images_parent_id_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_image_idx" ON "_pages_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_latest_posts_order_idx" ON "_pages_v_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_latest_posts_parent_id_idx" ON "_pages_v_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_latest_posts_path_idx" ON "_pages_v_blocks_latest_posts" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_order_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_parent_id_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_logo_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_order_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_parent_id_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_path_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_marquee_images_order_idx" ON "_pages_v_blocks_marquee_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_images_parent_id_idx" ON "_pages_v_blocks_marquee_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_images_image_idx" ON "_pages_v_blocks_marquee_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_marquee_order_idx" ON "_pages_v_blocks_marquee" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_parent_id_idx" ON "_pages_v_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_path_idx" ON "_pages_v_blocks_marquee" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_order_idx" ON "_pages_v_blocks_media" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_parent_id_idx" ON "_pages_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_path_idx" ON "_pages_v_blocks_media" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_media_idx" ON "_pages_v_blocks_media" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_pricing_table_plans_features_order_idx" ON "_pages_v_blocks_pricing_table_plans_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_table_plans_features_parent_id_idx" ON "_pages_v_blocks_pricing_table_plans_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_table_plans_order_idx" ON "_pages_v_blocks_pricing_table_plans" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_table_plans_parent_id_idx" ON "_pages_v_blocks_pricing_table_plans" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_table_order_idx" ON "_pages_v_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_table_parent_id_idx" ON "_pages_v_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_table_path_idx" ON "_pages_v_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_section_members_order_idx" ON "_pages_v_blocks_team_section_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_section_members_parent_id_idx" ON "_pages_v_blocks_team_section_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_section_members_image_idx" ON "_pages_v_blocks_team_section_members" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_team_section_order_idx" ON "_pages_v_blocks_team_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_section_parent_id_idx" ON "_pages_v_blocks_team_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_section_path_idx" ON "_pages_v_blocks_team_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_items_order_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_items_parent_id_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_avatar_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_hero_version_hero_image_idx" ON "_pages_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_folder_idx" ON "_pages_v" USING btree ("version_folder_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "posts_image_idx" ON "posts" USING btree ("image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts_deleted_at_idx" ON "posts" USING btree ("deleted_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_image_idx" ON "_posts_v" USING btree ("version_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version_deleted_at_idx" ON "_posts_v" USING btree ("version_deleted_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "media_rels_order_idx" ON "media_rels" USING btree ("order");
  CREATE INDEX "media_rels_parent_idx" ON "media_rels" USING btree ("parent_id");
  CREATE INDEX "media_rels_path_idx" ON "media_rels" USING btree ("path");
  CREATE INDEX "media_rels_media_id_idx" ON "media_rels" USING btree ("media_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "blog_page_hero_hero_image_idx" ON "blog_page" USING btree ("hero_image_id");
  CREATE INDEX "blog_page_meta_meta_image_idx" ON "blog_page" USING btree ("meta_image_id");
  CREATE INDEX "contact_page_blocks_call_to_action_order_idx" ON "contact_page_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_call_to_action_parent_id_idx" ON "contact_page_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_call_to_action_path_idx" ON "contact_page_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_card_links_links_order_idx" ON "contact_page_blocks_card_links_links" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_card_links_links_parent_id_idx" ON "contact_page_blocks_card_links_links" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_card_links_links_image_idx" ON "contact_page_blocks_card_links_links" USING btree ("image_id");
  CREATE INDEX "contact_page_blocks_card_links_order_idx" ON "contact_page_blocks_card_links" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_card_links_parent_id_idx" ON "contact_page_blocks_card_links" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_card_links_path_idx" ON "contact_page_blocks_card_links" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_card_list_items_order_idx" ON "contact_page_blocks_card_list_items" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_card_list_items_parent_id_idx" ON "contact_page_blocks_card_list_items" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_card_list_items_image_idx" ON "contact_page_blocks_card_list_items" USING btree ("image_id");
  CREATE INDEX "contact_page_blocks_card_list_order_idx" ON "contact_page_blocks_card_list" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_card_list_parent_id_idx" ON "contact_page_blocks_card_list" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_card_list_path_idx" ON "contact_page_blocks_card_list" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_column_section_columns_order_idx" ON "contact_page_blocks_column_section_columns" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_column_section_columns_parent_id_idx" ON "contact_page_blocks_column_section_columns" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_column_section_order_idx" ON "contact_page_blocks_column_section" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_column_section_parent_id_idx" ON "contact_page_blocks_column_section" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_column_section_path_idx" ON "contact_page_blocks_column_section" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_comparison_order_idx" ON "contact_page_blocks_comparison" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_comparison_parent_id_idx" ON "contact_page_blocks_comparison" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_comparison_path_idx" ON "contact_page_blocks_comparison" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_comparison_before_image_idx" ON "contact_page_blocks_comparison" USING btree ("before_image_id");
  CREATE INDEX "contact_page_blocks_comparison_after_image_idx" ON "contact_page_blocks_comparison" USING btree ("after_image_id");
  CREATE INDEX "contact_page_blocks_contact_form_order_idx" ON "contact_page_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_contact_form_parent_id_idx" ON "contact_page_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_contact_form_path_idx" ON "contact_page_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_description_list_items_order_idx" ON "contact_page_blocks_description_list_items" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_description_list_items_parent_id_idx" ON "contact_page_blocks_description_list_items" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_description_list_order_idx" ON "contact_page_blocks_description_list" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_description_list_parent_id_idx" ON "contact_page_blocks_description_list" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_description_list_path_idx" ON "contact_page_blocks_description_list" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_embed_map_order_idx" ON "contact_page_blocks_embed_map" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_embed_map_parent_id_idx" ON "contact_page_blocks_embed_map" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_embed_map_path_idx" ON "contact_page_blocks_embed_map" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_faqs_items_order_idx" ON "contact_page_blocks_faqs_items" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_faqs_items_parent_id_idx" ON "contact_page_blocks_faqs_items" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_faqs_order_idx" ON "contact_page_blocks_faqs" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_faqs_parent_id_idx" ON "contact_page_blocks_faqs" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_faqs_path_idx" ON "contact_page_blocks_faqs" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_featured_posts_order_idx" ON "contact_page_blocks_featured_posts" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_featured_posts_parent_id_idx" ON "contact_page_blocks_featured_posts" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_featured_posts_path_idx" ON "contact_page_blocks_featured_posts" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_gallery_images_order_idx" ON "contact_page_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_gallery_images_parent_id_idx" ON "contact_page_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_gallery_images_image_idx" ON "contact_page_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "contact_page_blocks_gallery_order_idx" ON "contact_page_blocks_gallery" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_gallery_parent_id_idx" ON "contact_page_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_gallery_path_idx" ON "contact_page_blocks_gallery" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_latest_posts_order_idx" ON "contact_page_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_latest_posts_parent_id_idx" ON "contact_page_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_latest_posts_path_idx" ON "contact_page_blocks_latest_posts" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_logo_cloud_logos_order_idx" ON "contact_page_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_logo_cloud_logos_parent_id_idx" ON "contact_page_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_logo_cloud_logos_logo_idx" ON "contact_page_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "contact_page_blocks_logo_cloud_order_idx" ON "contact_page_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_logo_cloud_parent_id_idx" ON "contact_page_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_logo_cloud_path_idx" ON "contact_page_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_marquee_images_order_idx" ON "contact_page_blocks_marquee_images" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_marquee_images_parent_id_idx" ON "contact_page_blocks_marquee_images" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_marquee_images_image_idx" ON "contact_page_blocks_marquee_images" USING btree ("image_id");
  CREATE INDEX "contact_page_blocks_marquee_order_idx" ON "contact_page_blocks_marquee" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_marquee_parent_id_idx" ON "contact_page_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_marquee_path_idx" ON "contact_page_blocks_marquee" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_media_order_idx" ON "contact_page_blocks_media" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_media_parent_id_idx" ON "contact_page_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_media_path_idx" ON "contact_page_blocks_media" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_media_media_idx" ON "contact_page_blocks_media" USING btree ("media_id");
  CREATE INDEX "contact_page_blocks_pricing_table_plans_features_order_idx" ON "contact_page_blocks_pricing_table_plans_features" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_pricing_table_plans_features_parent_id_idx" ON "contact_page_blocks_pricing_table_plans_features" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_pricing_table_plans_order_idx" ON "contact_page_blocks_pricing_table_plans" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_pricing_table_plans_parent_id_idx" ON "contact_page_blocks_pricing_table_plans" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_pricing_table_order_idx" ON "contact_page_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_pricing_table_parent_id_idx" ON "contact_page_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_pricing_table_path_idx" ON "contact_page_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_stats_items_order_idx" ON "contact_page_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_stats_items_parent_id_idx" ON "contact_page_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_stats_order_idx" ON "contact_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_stats_parent_id_idx" ON "contact_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_stats_path_idx" ON "contact_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_team_section_members_order_idx" ON "contact_page_blocks_team_section_members" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_team_section_members_parent_id_idx" ON "contact_page_blocks_team_section_members" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_team_section_members_image_idx" ON "contact_page_blocks_team_section_members" USING btree ("image_id");
  CREATE INDEX "contact_page_blocks_team_section_order_idx" ON "contact_page_blocks_team_section" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_team_section_parent_id_idx" ON "contact_page_blocks_team_section" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_team_section_path_idx" ON "contact_page_blocks_team_section" USING btree ("_path");
  CREATE INDEX "contact_page_blocks_testimonials_items_order_idx" ON "contact_page_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_testimonials_items_parent_id_idx" ON "contact_page_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_testimonials_items_avatar_idx" ON "contact_page_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "contact_page_blocks_testimonials_order_idx" ON "contact_page_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "contact_page_blocks_testimonials_parent_id_idx" ON "contact_page_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "contact_page_blocks_testimonials_path_idx" ON "contact_page_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "contact_page_hero_hero_image_idx" ON "contact_page" USING btree ("hero_image_id");
  CREATE INDEX "contact_page_meta_meta_image_idx" ON "contact_page" USING btree ("meta_image_id");
  CREATE INDEX "home_page_shown_in_order_idx" ON "home_page_shown_in" USING btree ("order");
  CREATE INDEX "home_page_shown_in_parent_idx" ON "home_page_shown_in" USING btree ("parent_id");
  CREATE INDEX "home_page_shown_in_value_idx" ON "home_page_shown_in" USING btree ("value");
  CREATE INDEX "home_page_blocks_call_to_action_order_idx" ON "home_page_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "home_page_blocks_call_to_action_parent_id_idx" ON "home_page_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_call_to_action_path_idx" ON "home_page_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "home_page_blocks_card_links_links_order_idx" ON "home_page_blocks_card_links_links" USING btree ("_order");
  CREATE INDEX "home_page_blocks_card_links_links_parent_id_idx" ON "home_page_blocks_card_links_links" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_card_links_links_image_idx" ON "home_page_blocks_card_links_links" USING btree ("image_id");
  CREATE INDEX "home_page_blocks_card_links_order_idx" ON "home_page_blocks_card_links" USING btree ("_order");
  CREATE INDEX "home_page_blocks_card_links_parent_id_idx" ON "home_page_blocks_card_links" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_card_links_path_idx" ON "home_page_blocks_card_links" USING btree ("_path");
  CREATE INDEX "home_page_blocks_card_list_items_order_idx" ON "home_page_blocks_card_list_items" USING btree ("_order");
  CREATE INDEX "home_page_blocks_card_list_items_parent_id_idx" ON "home_page_blocks_card_list_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_card_list_items_image_idx" ON "home_page_blocks_card_list_items" USING btree ("image_id");
  CREATE INDEX "home_page_blocks_card_list_order_idx" ON "home_page_blocks_card_list" USING btree ("_order");
  CREATE INDEX "home_page_blocks_card_list_parent_id_idx" ON "home_page_blocks_card_list" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_card_list_path_idx" ON "home_page_blocks_card_list" USING btree ("_path");
  CREATE INDEX "home_page_blocks_column_section_columns_order_idx" ON "home_page_blocks_column_section_columns" USING btree ("_order");
  CREATE INDEX "home_page_blocks_column_section_columns_parent_id_idx" ON "home_page_blocks_column_section_columns" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_column_section_order_idx" ON "home_page_blocks_column_section" USING btree ("_order");
  CREATE INDEX "home_page_blocks_column_section_parent_id_idx" ON "home_page_blocks_column_section" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_column_section_path_idx" ON "home_page_blocks_column_section" USING btree ("_path");
  CREATE INDEX "home_page_blocks_comparison_order_idx" ON "home_page_blocks_comparison" USING btree ("_order");
  CREATE INDEX "home_page_blocks_comparison_parent_id_idx" ON "home_page_blocks_comparison" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_comparison_path_idx" ON "home_page_blocks_comparison" USING btree ("_path");
  CREATE INDEX "home_page_blocks_comparison_before_image_idx" ON "home_page_blocks_comparison" USING btree ("before_image_id");
  CREATE INDEX "home_page_blocks_comparison_after_image_idx" ON "home_page_blocks_comparison" USING btree ("after_image_id");
  CREATE INDEX "home_page_blocks_contact_form_order_idx" ON "home_page_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "home_page_blocks_contact_form_parent_id_idx" ON "home_page_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_contact_form_path_idx" ON "home_page_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "home_page_blocks_description_list_items_order_idx" ON "home_page_blocks_description_list_items" USING btree ("_order");
  CREATE INDEX "home_page_blocks_description_list_items_parent_id_idx" ON "home_page_blocks_description_list_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_description_list_order_idx" ON "home_page_blocks_description_list" USING btree ("_order");
  CREATE INDEX "home_page_blocks_description_list_parent_id_idx" ON "home_page_blocks_description_list" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_description_list_path_idx" ON "home_page_blocks_description_list" USING btree ("_path");
  CREATE INDEX "home_page_blocks_embed_map_order_idx" ON "home_page_blocks_embed_map" USING btree ("_order");
  CREATE INDEX "home_page_blocks_embed_map_parent_id_idx" ON "home_page_blocks_embed_map" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_embed_map_path_idx" ON "home_page_blocks_embed_map" USING btree ("_path");
  CREATE INDEX "home_page_blocks_faqs_items_order_idx" ON "home_page_blocks_faqs_items" USING btree ("_order");
  CREATE INDEX "home_page_blocks_faqs_items_parent_id_idx" ON "home_page_blocks_faqs_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_faqs_order_idx" ON "home_page_blocks_faqs" USING btree ("_order");
  CREATE INDEX "home_page_blocks_faqs_parent_id_idx" ON "home_page_blocks_faqs" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_faqs_path_idx" ON "home_page_blocks_faqs" USING btree ("_path");
  CREATE INDEX "home_page_blocks_featured_posts_order_idx" ON "home_page_blocks_featured_posts" USING btree ("_order");
  CREATE INDEX "home_page_blocks_featured_posts_parent_id_idx" ON "home_page_blocks_featured_posts" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_featured_posts_path_idx" ON "home_page_blocks_featured_posts" USING btree ("_path");
  CREATE INDEX "home_page_blocks_gallery_images_order_idx" ON "home_page_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "home_page_blocks_gallery_images_parent_id_idx" ON "home_page_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_gallery_images_image_idx" ON "home_page_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "home_page_blocks_gallery_order_idx" ON "home_page_blocks_gallery" USING btree ("_order");
  CREATE INDEX "home_page_blocks_gallery_parent_id_idx" ON "home_page_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_gallery_path_idx" ON "home_page_blocks_gallery" USING btree ("_path");
  CREATE INDEX "home_page_blocks_latest_posts_order_idx" ON "home_page_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX "home_page_blocks_latest_posts_parent_id_idx" ON "home_page_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_latest_posts_path_idx" ON "home_page_blocks_latest_posts" USING btree ("_path");
  CREATE INDEX "home_page_blocks_logo_cloud_logos_order_idx" ON "home_page_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "home_page_blocks_logo_cloud_logos_parent_id_idx" ON "home_page_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_logo_cloud_logos_logo_idx" ON "home_page_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "home_page_blocks_logo_cloud_order_idx" ON "home_page_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "home_page_blocks_logo_cloud_parent_id_idx" ON "home_page_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_logo_cloud_path_idx" ON "home_page_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "home_page_blocks_marquee_images_order_idx" ON "home_page_blocks_marquee_images" USING btree ("_order");
  CREATE INDEX "home_page_blocks_marquee_images_parent_id_idx" ON "home_page_blocks_marquee_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_marquee_images_image_idx" ON "home_page_blocks_marquee_images" USING btree ("image_id");
  CREATE INDEX "home_page_blocks_marquee_order_idx" ON "home_page_blocks_marquee" USING btree ("_order");
  CREATE INDEX "home_page_blocks_marquee_parent_id_idx" ON "home_page_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_marquee_path_idx" ON "home_page_blocks_marquee" USING btree ("_path");
  CREATE INDEX "home_page_blocks_media_order_idx" ON "home_page_blocks_media" USING btree ("_order");
  CREATE INDEX "home_page_blocks_media_parent_id_idx" ON "home_page_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_media_path_idx" ON "home_page_blocks_media" USING btree ("_path");
  CREATE INDEX "home_page_blocks_media_media_idx" ON "home_page_blocks_media" USING btree ("media_id");
  CREATE INDEX "home_page_blocks_pricing_table_plans_features_order_idx" ON "home_page_blocks_pricing_table_plans_features" USING btree ("_order");
  CREATE INDEX "home_page_blocks_pricing_table_plans_features_parent_id_idx" ON "home_page_blocks_pricing_table_plans_features" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_pricing_table_plans_order_idx" ON "home_page_blocks_pricing_table_plans" USING btree ("_order");
  CREATE INDEX "home_page_blocks_pricing_table_plans_parent_id_idx" ON "home_page_blocks_pricing_table_plans" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_pricing_table_order_idx" ON "home_page_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "home_page_blocks_pricing_table_parent_id_idx" ON "home_page_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_pricing_table_path_idx" ON "home_page_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "home_page_blocks_stats_items_order_idx" ON "home_page_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "home_page_blocks_stats_items_parent_id_idx" ON "home_page_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_stats_order_idx" ON "home_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "home_page_blocks_stats_parent_id_idx" ON "home_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_stats_path_idx" ON "home_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "home_page_blocks_team_section_members_order_idx" ON "home_page_blocks_team_section_members" USING btree ("_order");
  CREATE INDEX "home_page_blocks_team_section_members_parent_id_idx" ON "home_page_blocks_team_section_members" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_team_section_members_image_idx" ON "home_page_blocks_team_section_members" USING btree ("image_id");
  CREATE INDEX "home_page_blocks_team_section_order_idx" ON "home_page_blocks_team_section" USING btree ("_order");
  CREATE INDEX "home_page_blocks_team_section_parent_id_idx" ON "home_page_blocks_team_section" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_team_section_path_idx" ON "home_page_blocks_team_section" USING btree ("_path");
  CREATE INDEX "home_page_blocks_testimonials_items_order_idx" ON "home_page_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "home_page_blocks_testimonials_items_parent_id_idx" ON "home_page_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_testimonials_items_avatar_idx" ON "home_page_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "home_page_blocks_testimonials_order_idx" ON "home_page_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "home_page_blocks_testimonials_parent_id_idx" ON "home_page_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_testimonials_path_idx" ON "home_page_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "home_page_hero_hero_image_idx" ON "home_page" USING btree ("hero_image_id");
  CREATE INDEX "home_page_meta_meta_image_idx" ON "home_page" USING btree ("meta_image_id");
  CREATE INDEX "links_items_order_idx" ON "links_items" USING btree ("_order");
  CREATE INDEX "links_items_parent_id_idx" ON "links_items" USING btree ("_parent_id");
  CREATE INDEX "social_media_items_order_idx" ON "social_media_items" USING btree ("_order");
  CREATE INDEX "social_media_items_parent_id_idx" ON "social_media_items" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_shown_in" CASCADE;
  DROP TABLE "pages_blocks_call_to_action" CASCADE;
  DROP TABLE "pages_blocks_card_links_links" CASCADE;
  DROP TABLE "pages_blocks_card_links" CASCADE;
  DROP TABLE "pages_blocks_card_list_items" CASCADE;
  DROP TABLE "pages_blocks_card_list" CASCADE;
  DROP TABLE "pages_blocks_column_section_columns" CASCADE;
  DROP TABLE "pages_blocks_column_section" CASCADE;
  DROP TABLE "pages_blocks_comparison" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages_blocks_description_list_items" CASCADE;
  DROP TABLE "pages_blocks_description_list" CASCADE;
  DROP TABLE "pages_blocks_embed_map" CASCADE;
  DROP TABLE "pages_blocks_faqs_items" CASCADE;
  DROP TABLE "pages_blocks_faqs" CASCADE;
  DROP TABLE "pages_blocks_featured_posts" CASCADE;
  DROP TABLE "pages_blocks_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_latest_posts" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud" CASCADE;
  DROP TABLE "pages_blocks_marquee_images" CASCADE;
  DROP TABLE "pages_blocks_marquee" CASCADE;
  DROP TABLE "pages_blocks_media" CASCADE;
  DROP TABLE "pages_blocks_pricing_table_plans_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_table_plans" CASCADE;
  DROP TABLE "pages_blocks_pricing_table" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_team_section_members" CASCADE;
  DROP TABLE "pages_blocks_team_section" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_version_shown_in" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action" CASCADE;
  DROP TABLE "_pages_v_blocks_card_links_links" CASCADE;
  DROP TABLE "_pages_v_blocks_card_links" CASCADE;
  DROP TABLE "_pages_v_blocks_card_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_card_list" CASCADE;
  DROP TABLE "_pages_v_blocks_column_section_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_column_section" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form" CASCADE;
  DROP TABLE "_pages_v_blocks_description_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_description_list" CASCADE;
  DROP TABLE "_pages_v_blocks_embed_map" CASCADE;
  DROP TABLE "_pages_v_blocks_faqs_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faqs" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_latest_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee_images" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee" CASCADE;
  DROP TABLE "_pages_v_blocks_media" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_table_plans_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_table_plans" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_table" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_team_section_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team_section" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_rels" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "blog_page" CASCADE;
  DROP TABLE "contact_methods" CASCADE;
  DROP TABLE "contact_page_blocks_call_to_action" CASCADE;
  DROP TABLE "contact_page_blocks_card_links_links" CASCADE;
  DROP TABLE "contact_page_blocks_card_links" CASCADE;
  DROP TABLE "contact_page_blocks_card_list_items" CASCADE;
  DROP TABLE "contact_page_blocks_card_list" CASCADE;
  DROP TABLE "contact_page_blocks_column_section_columns" CASCADE;
  DROP TABLE "contact_page_blocks_column_section" CASCADE;
  DROP TABLE "contact_page_blocks_comparison" CASCADE;
  DROP TABLE "contact_page_blocks_contact_form" CASCADE;
  DROP TABLE "contact_page_blocks_description_list_items" CASCADE;
  DROP TABLE "contact_page_blocks_description_list" CASCADE;
  DROP TABLE "contact_page_blocks_embed_map" CASCADE;
  DROP TABLE "contact_page_blocks_faqs_items" CASCADE;
  DROP TABLE "contact_page_blocks_faqs" CASCADE;
  DROP TABLE "contact_page_blocks_featured_posts" CASCADE;
  DROP TABLE "contact_page_blocks_gallery_images" CASCADE;
  DROP TABLE "contact_page_blocks_gallery" CASCADE;
  DROP TABLE "contact_page_blocks_latest_posts" CASCADE;
  DROP TABLE "contact_page_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "contact_page_blocks_logo_cloud" CASCADE;
  DROP TABLE "contact_page_blocks_marquee_images" CASCADE;
  DROP TABLE "contact_page_blocks_marquee" CASCADE;
  DROP TABLE "contact_page_blocks_media" CASCADE;
  DROP TABLE "contact_page_blocks_pricing_table_plans_features" CASCADE;
  DROP TABLE "contact_page_blocks_pricing_table_plans" CASCADE;
  DROP TABLE "contact_page_blocks_pricing_table" CASCADE;
  DROP TABLE "contact_page_blocks_stats_items" CASCADE;
  DROP TABLE "contact_page_blocks_stats" CASCADE;
  DROP TABLE "contact_page_blocks_team_section_members" CASCADE;
  DROP TABLE "contact_page_blocks_team_section" CASCADE;
  DROP TABLE "contact_page_blocks_testimonials_items" CASCADE;
  DROP TABLE "contact_page_blocks_testimonials" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "home_page_shown_in" CASCADE;
  DROP TABLE "home_page_blocks_call_to_action" CASCADE;
  DROP TABLE "home_page_blocks_card_links_links" CASCADE;
  DROP TABLE "home_page_blocks_card_links" CASCADE;
  DROP TABLE "home_page_blocks_card_list_items" CASCADE;
  DROP TABLE "home_page_blocks_card_list" CASCADE;
  DROP TABLE "home_page_blocks_column_section_columns" CASCADE;
  DROP TABLE "home_page_blocks_column_section" CASCADE;
  DROP TABLE "home_page_blocks_comparison" CASCADE;
  DROP TABLE "home_page_blocks_contact_form" CASCADE;
  DROP TABLE "home_page_blocks_description_list_items" CASCADE;
  DROP TABLE "home_page_blocks_description_list" CASCADE;
  DROP TABLE "home_page_blocks_embed_map" CASCADE;
  DROP TABLE "home_page_blocks_faqs_items" CASCADE;
  DROP TABLE "home_page_blocks_faqs" CASCADE;
  DROP TABLE "home_page_blocks_featured_posts" CASCADE;
  DROP TABLE "home_page_blocks_gallery_images" CASCADE;
  DROP TABLE "home_page_blocks_gallery" CASCADE;
  DROP TABLE "home_page_blocks_latest_posts" CASCADE;
  DROP TABLE "home_page_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "home_page_blocks_logo_cloud" CASCADE;
  DROP TABLE "home_page_blocks_marquee_images" CASCADE;
  DROP TABLE "home_page_blocks_marquee" CASCADE;
  DROP TABLE "home_page_blocks_media" CASCADE;
  DROP TABLE "home_page_blocks_pricing_table_plans_features" CASCADE;
  DROP TABLE "home_page_blocks_pricing_table_plans" CASCADE;
  DROP TABLE "home_page_blocks_pricing_table" CASCADE;
  DROP TABLE "home_page_blocks_stats_items" CASCADE;
  DROP TABLE "home_page_blocks_stats" CASCADE;
  DROP TABLE "home_page_blocks_team_section_members" CASCADE;
  DROP TABLE "home_page_blocks_team_section" CASCADE;
  DROP TABLE "home_page_blocks_testimonials_items" CASCADE;
  DROP TABLE "home_page_blocks_testimonials" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "links_items" CASCADE;
  DROP TABLE "links" CASCADE;
  DROP TABLE "social_media_items" CASCADE;
  DROP TABLE "social_media" CASCADE;
  DROP TYPE "public"."enum_pages_shown_in";
  DROP TYPE "public"."enum_pages_blocks_column_section_columns_size";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_style";
  DROP TYPE "public"."enum_pages_blocks_marquee_style";
  DROP TYPE "public"."enum_pages_blocks_testimonials_animated";
  DROP TYPE "public"."enum_pages_hero_impact";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_shown_in";
  DROP TYPE "public"."enum__pages_v_blocks_column_section_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_style";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_style";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_animated";
  DROP TYPE "public"."enum__pages_v_version_hero_impact";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_blog_page_hero_impact";
  DROP TYPE "public"."enum_contact_page_blocks_column_section_columns_size";
  DROP TYPE "public"."enum_contact_page_blocks_logo_cloud_style";
  DROP TYPE "public"."enum_contact_page_blocks_marquee_style";
  DROP TYPE "public"."enum_contact_page_blocks_testimonials_animated";
  DROP TYPE "public"."enum_contact_page_hero_impact";
  DROP TYPE "public"."enum_home_page_shown_in";
  DROP TYPE "public"."enum_home_page_blocks_column_section_columns_size";
  DROP TYPE "public"."enum_home_page_blocks_logo_cloud_style";
  DROP TYPE "public"."enum_home_page_blocks_marquee_style";
  DROP TYPE "public"."enum_home_page_blocks_testimonials_animated";
  DROP TYPE "public"."enum_home_page_hero_impact";
  DROP TYPE "public"."enum_social_media_items_platform";`)
}
