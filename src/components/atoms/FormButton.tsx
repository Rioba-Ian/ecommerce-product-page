import React from "react";
import { useFormStatus } from "react-dom";
import Button from "./Button";
import { Loader2 } from "lucide-react";

export default function FormButton({ title }: { title: string }) {
 const status = useFormStatus();
 return <Button>{status.pending ? <Loader2 /> : title}</Button>;
}
