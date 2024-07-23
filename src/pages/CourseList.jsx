import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Panel from "../Components/Panel";
import logo from "../assets/logo.png";
import drag from "../assets/drag.svg";
import three from "../assets/three.svg";

const data = [
  {
    id: "1",
    img: logo,
    title: "Interview preparation with JavaScript 2.0",
    price: 9000,
    type: "Course",
  },
  {
    id: "2",
    img: logo,
    title: "Aptitude - Averages, Mixtures & Allegation",
    price: 0,
    type: "Mock Test",
  },
  {
    id: "3",
    img: logo,
    title: "Aptitude - Simple & Compound Interest",
    price: 0,
    type: "Mock Test",
  },
  {
    id: "4",
    img: logo,
    title: "Aptitude - Partnership",
    price: 0,
    type: "Mock Test",
  },
  {
    id: "5",
    img: logo,
    title: "Aptitude - Time & Work",
    price: 0,
    type: "Mock Test",
  },
];

const SortableItem = ({ id, item, moveToTop, moveToBottom, deleteItem }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="draggable-item flex items-center justify-between bg-white border border-gray-300 rounded-md p-4 mb-4 mt-5"
    >
      <div className="flex items-center">
        <button className="mr-5" {...listeners}>
          <img src={drag} alt="drag" />
        </button>
        <img
          className="h-[4.68rem] w-[8.3rem] mr-4 object-cover rounded-lg"
          src={item.img}
          alt={item.title}
        />
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">{item.title}</h3>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-gray-500">
          {item.price === 0 ? "Free" : `₹${item.price}`}
        </p>
        <button
          className="bg-[#DBFFCE] text-black px-2 cursor-default py-1 rounded-md"
          onClick={() => {}}
        >
          {item.type}
        </button>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center p-2 text-gray-700 hover:text-black focus:outline-none"
            aria-label="Toggle menu" // Accessibility improvement
          >
            <img src={three} alt="" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={moveToTop}
              >
                Move to Top
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={moveToBottom}
              >
                Move to Bottom
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-red-700 hover:bg-gray-100"
                onClick={deleteItem}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CourseList = () => {
  const [items, setItems] = useState(data);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const moveToTop = (index) => {
    setItems((items) => {
      const newItems = [...items];
      const [movedItem] = newItems.splice(index, 1);
      newItems.unshift(movedItem);
      return newItems;
    });
  };

  const moveToBottom = (index) => {
    setItems((items) => {
      const newItems = [...items];
      const [movedItem] = newItems.splice(index, 1);
      newItems.push(movedItem);
      return newItems;
    });
  };

  const deleteItem = (index) => {
    setItems((items) => items.filter((_, i) => i !== index));
  };

  return (
    <Panel height="49rem" width="76.5rem" className="toLeft p-10 font-inter">
      <h2 className="font-bold text-[2.5rem] leading-[3.25rem] w-full tracking[-0.05em] text-black mt-1">
        Manage Bundle
      </h2>
      <p className="font-normal text-[1.25rem] leading-[1.5rem] tracking[-0.04em] text-[#4B4747] mt-2">
        Change orders of the products based on priority
      </p>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              item={item}
              moveToTop={() => moveToTop(index)}
              moveToBottom={() => moveToBottom(index)}
              deleteItem={() => deleteItem(index)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Panel>
  );
};

export default CourseList;
