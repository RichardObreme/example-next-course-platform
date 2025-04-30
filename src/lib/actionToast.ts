import { toast } from "sonner";

export function actionToast(actionData?: { error: boolean; message: string }) {
  if (actionData && actionData.error) {
    return toast.error("Error", {
      description: actionData.message,
    });
  }

  if (actionData && actionData.error === false) {
    return toast.success("Success", {
      description: actionData.message,
    });
  }

  return toast.success("Success");
}
