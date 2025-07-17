import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import BackButton from "../component/BackButton";

const blocks = [
  "ブロックA",
  "ブロックB",
  "ブロックC",
  "ブロックD",
  "ブロックE",
  "ブロックF",
  "ブロックG",
  "ブロックH",
];

function SortableItem({ id, disabled }: { id: string; disabled: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: disabled ? "default" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(!disabled ? listeners : {})}
      className="bg-gray-300 text-center p-4 rounded shadow font-semibold text-gray-800"
    >
      {id}
    </div>
  );
}

export default function GragDropPage() {
  const [items, setItems] = useState(blocks);
  const [isCustomize, setIsCustomize] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 border rounded p-4">
      <BackButton />
      <h2 className="text-sm font-semibold mb-4">コンテンツ並び替え</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-700">カスタマイズモード</div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isCustomize}
            onChange={() => setIsCustomize(!isCustomize)}
            className="sr-only"
          />
          <div className="relative">
            <div className="block w-10 h-6 bg-gray-300 rounded-full"></div>
            <div
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition ${
                isCustomize ? "translate-x-4" : ""
              }`}
            ></div>
          </div>
        </label>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        1.
        画面右上のトグルスイッチをクリックすると、カスタマイズモードがオンになります。
        <br />
        2.
        下記のブロック要素をドラッグアンドドロップすることで、表示順を変更できます。
      </p>

      <div className="mt-4 border border-gray-400 bg-white p-4 rounded">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-4 gap-4">
              {items.map((item) => (
                <SortableItem key={item} id={item} disabled={!isCustomize} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
