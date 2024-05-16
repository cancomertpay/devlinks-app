"use client";
import { useDroppable } from "@dnd-kit/core";

export default function Droppable({ children, id, className }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };
  return (
    <ul ref={setNodeRef} style={style} className={className || ""}>
      {children}
    </ul>
  );
}
