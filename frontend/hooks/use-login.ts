import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/authApiSlice";
import { setAuth } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "react-toastify";

export default function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  // update form dynamically
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event?.target;
    setFormData({ ...formData, [name]: value }); // Adjust the values to match the state
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // By default, when we submit a form, it refreshes the page. To prevent that, we use this line.

    login({ email, password })
      .unwrap()
      .then(() => {
        dispatch(setAuth());
        toast.success("Logged in");
        router.push("/dashboard");
      })
      .catch(() => {
        toast.error("Failed to log in");
      });
  };

  return {
    email,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
