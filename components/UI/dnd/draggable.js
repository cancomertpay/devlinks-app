"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Draggable({ children, id, className, disabled }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      disabled,
    });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className={className || ""}
      {...attributes}
      {...listeners}
    >
      {children}
    </li>
  );
}
