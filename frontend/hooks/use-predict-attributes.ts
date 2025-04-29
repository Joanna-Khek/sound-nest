import { useState, ChangeEvent, FormEvent } from "react";
import { usePredictAttributesMutation } from "@/redux/features/modelApiSlice";
import { toast } from "react-toastify";
import { PredictAttributesResponse } from "@/schemas/predictions";

export default function usePredictAttributes() {
  const [predictAttributes, { isLoading }] = usePredictAttributesMutation();

  const [formData, setFormData] = useState({
    prompt: "",
  });

  const [response, setResponse] = useState<PredictAttributesResponse | null>(
    null
  );

  const { prompt } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event?.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // By default, when we submit a form, it refreshes the page. To prevent that, we use this line.

    predictAttributes({ prompt })
      .unwrap()
      .then(() => {
        //toast.success("Attributes predicted successfully");
        console.log("Attributes predicted successfully");
      })
      .catch(() => {
        //toast.error("Failed to predict attributes");
        console.log("Failed to predict attributes");
      });

    // Get response from the API and update the state
    try {
      const responseData = await predictAttributes({ prompt }).unwrap();
      setResponse(responseData);
      toast.success("Attributes predicted successfully");
    } catch (error: any) {
      toast.error("Failed to predict attributes");
    }
  };

  return {
    prompt,
    response,
    isLoading,
    onChange,
    onSubmit,
  };
}
