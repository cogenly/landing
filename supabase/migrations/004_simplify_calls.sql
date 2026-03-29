-- Simplify calls: add title, relax call_type
alter table calls add column if not exists title text;
alter table calls drop constraint if exists calls_call_type_check;
alter table calls alter column call_type drop not null;
