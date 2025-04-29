import { toast } from "sonner";

export function actionToast(actionData?: { error: boolean; message: string }) {
  console.log(actionData);

  if (actionData && actionData.error) {
    return toast.error("Error", {
      description: actionData.message,
    });
  }

  return toast.success("Success");
}
