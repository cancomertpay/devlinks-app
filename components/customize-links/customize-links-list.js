import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  closestCorners,
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDevlinksContext } from "@/context/devlink-context";
import Droppable from "../UI/dnd/droppable";
import Draggable from "../UI/dnd/draggable";
import LinkForm from "./link-form";

export default function LinksList({ links }) {
  const { devlinksList, reorderList } = useDevlinksContext();

  const getLinkPosition = (id) =>
    devlinksList.findIndex((link) => link.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active?.id === over?.id) return;
    const originalPosition = getLinkPosition(active?.id);
    const newPosition = getLinkPosition(over?.id);
    reorderList(arrayMove(devlinksList, originalPosition, newPosition));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <SortableContext items={links} strategy={verticalListSortingStrategy}>
        <Droppable
          className={`min-h-[397px] md:max-h-[660px] lg:h-[490px] w-full md:overflow-auto ${
            links.length > 1 ? "pb-28" : ""
          }`}
        >
          {links?.map((devlink, index) => (
            <Draggable
              key={devlink.id}
              id={devlink.id}
              className="cursor-move touch-none"
              disabled={links.length === 1}
            >
              <LinkForm
                fieldId={devlink.id}
                index={index}
                platform={devlink.platform}
                link={devlink.link}
              />
            </Draggable>
          ))}
        </Droppable>
      </SortableContext>
    </DndContext>
  );
}
