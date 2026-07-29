-- Designer feedback changed SID validation to 7 digits. The original
-- player_profiles check constraint allowed only 6 digits, causing a 400
-- PostgREST response when the app inserted a valid 7-digit SID.
alter table player_profiles
  drop constraint if exists player_profiles_student_id_check;

alter table player_profiles
  add constraint player_profiles_student_id_check
  check (student_id ~ '^[0-9]{7}$');
