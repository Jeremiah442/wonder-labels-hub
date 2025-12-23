-- Grant admin role to a specific email and ensure future signups for that email get admin

-- 1) Promote existing user (if present)
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::public.app_role
FROM auth.users u
WHERE lower(u.email) = lower('jmurungi2004@gmail.com')
ON CONFLICT (user_id, role) DO NOTHING;

-- 2) Update signup trigger to assign admin role for this email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');

  IF lower(NEW.email) = lower('jmurungi2004@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'customer');
  END IF;

  RETURN NEW;
END;
$$;
