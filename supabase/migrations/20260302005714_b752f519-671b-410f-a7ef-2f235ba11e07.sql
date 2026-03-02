-- Enable realtime for profiles table so admin gets notified of new registrations
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;