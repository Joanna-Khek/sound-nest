import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";

export default function useRegister() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event?.target;
    setFormData({ ...formData, [name]: value }); // Adjust the values to match the state
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // By default, when we submit a form, it refreshes the page. To prevent that, we use this line.

    register({ first_name, last_name, email, password, re_password })
      .unwrap()
      .then(() => {
        toast.success("Please check email to verify account");
        router.push("/auth/login");
      })
      .catch((error) => {
        if (error?.data) {
          // Handle specific field errors
          if (error.data.email) {
            const emailError = error.data.email[0];
            if (emailError.includes("email address already exists")) {
              toast.error("Account exists");
            } else {
              toast.error(`Email error: ${emailError}`);
            }
          } else if (error.data.re_password) {
            toast.error(
              `Password confirmation error: ${error.data.re_password[0]}`
            );
          } else if (error.data.password) {
            toast.error(`Password error: ${error.data.password[0]}`);
          } else if (error.data.first_name) {
            toast.error(`First name error: ${error.data.first_name[0]}`);
          } else if (error.data.last_name) {
            toast.error(`Last name error: ${error.data.last_name[0]}`);
          } else if (error.data.non_field_errors) {
            toast.error(error.data.non_field_errors[0]);
          } else {
            toast.error("Failed to register account");
          }
        } else {
          toast.error("Failed to register account");
        }
      });
  };

  return {
    first_name,
    last_name,
    email,
    password,
    re_password,
    isLoading,
    onChange,
    onSubmit,
  };
}
