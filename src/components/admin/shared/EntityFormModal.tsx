import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormFieldConfig, FormValues } from "./entity-forms";

export type FormModalMode = "create" | "edit" | "view";

interface EntityFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: FormModalMode;
  entityName: string;
  fields: FormFieldConfig[];
  values: FormValues;
  onSubmit: (values: FormValues) => void;
}

export function EntityFormModal({
  open,
  onOpenChange,
  mode,
  entityName,
  fields,
  values: initialValues,
  onSubmit,
}: EntityFormModalProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const readOnly = mode === "view";

  useEffect(() => {
    if (open) setValues(initialValues);
  }, [open, initialValues]);

  const title =
    mode === "create" ? `Create ${entityName}` : mode === "edit" ? `Edit ${entityName}` : `View ${entityName}`;

  const set = (name: string, val: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (readOnly) return;
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[100] max-h-[90vh] overflow-y-auto sm:max-w-[560px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-display">{title}</DialogTitle>
            <DialogDescription>
              {mode === "create"
                ? `Fill in the details to add a new ${entityName.toLowerCase()}.`
                : mode === "edit"
                  ? `Update the ${entityName.toLowerCase()} details below.`
                  : `${entityName} record details.`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.colSpan === 2 ? "sm:col-span-2" : ""}
              >
                {field.type === "switch" ? (
                  <div className="flex items-center justify-between rounded-lg border border-border bg-surface-alt/40 px-3 py-2.5">
                    <Label htmlFor={field.name} className="text-[13px]">
                      {field.label}
                      {field.required && <span className="text-destructive"> *</span>}
                    </Label>
                    <Switch
                      id={field.name}
                      checked={values[field.name] === true}
                      onCheckedChange={(c) => set(field.name, c)}
                      disabled={readOnly}
                    />
                  </div>
                ) : (
                  <>
                    <Label htmlFor={field.name} className="text-[13px]">
                      {field.label}
                      {field.required && <span className="text-destructive"> *</span>}
                    </Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.name}
                        value={String(values[field.name] ?? "")}
                        onChange={(e) => set(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        disabled={readOnly}
                        className="mt-1.5 min-h-[80px]"
                      />
                    ) : field.type === "select" ? (
                      <Select
                        value={String(values[field.name] ?? "")}
                        onValueChange={(v) => set(field.name, v)}
                        disabled={readOnly}
                      >
                        <SelectTrigger id={field.name} className="mt-1.5">
                          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent className="z-[200]">
                          {field.options?.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                              {o.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type === "date" ? "date" : field.type}
                        value={String(values[field.name] ?? "")}
                        onChange={(e) => set(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        disabled={readOnly}
                        className="mt-1.5"
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {readOnly ? "Close" : "Cancel"}
            </Button>
            {!readOnly && (
              <Button type="submit">
                {mode === "create" ? `Create ${entityName}` : "Save Changes"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
