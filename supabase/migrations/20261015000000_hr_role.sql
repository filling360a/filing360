-- New team role for recruiting. Run this on its own before the careers
-- migration: Postgres can't use a new enum value in the same transaction
-- that adds it.
alter type public.app_role add value if not exists 'hr';
