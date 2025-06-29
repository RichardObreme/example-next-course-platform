"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CourseSectionStatus } from "@/drizzle/schema";
import { ReactNode, useState } from "react";
import { SectionForm } from "./SectionForm";

type SectionFormDialogProps = {
  courseId: string;
  children: ReactNode;
  section?: {
    id: string;
    name: string;
    status: CourseSectionStatus;
  };
};

export default function SectionFormDialog({
  courseId,
  children,
  section,
}: SectionFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {section == null ? "New Section" : `Edit ${section.name}`}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <SectionForm
            courseId={courseId}
            section={section}
            onSuccess={() => setIsOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
