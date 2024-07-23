import React, { useEffect, useState, useRef } from "react";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import Panel from "./Panel";

const Dropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleClick = (option) => {
    setIsOpen((curr) => !curr);
    onChange(option);
  };

  const renderedOptions = options.map((option) => (
    <div
      className="hover:bg-sky-100 rounded cursor-pointer p-1"
      onClick={() => handleClick(option)}
      key={option.value}
    >
      {option.label}
    </div>
  ));

  const icon = <span>{isOpen ? <FaChevronLeft /> : <FaChevronDown />}</span>;
  return (
    <div ref={divEl} className="w-48 relative">
      {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}

      <Panel
        className="flex justify-between cursor-pointer items-center"
        onClick={() => setIsOpen((curr) => !curr)}
      >
        {value?.label || "Select..."} {icon}
      </Panel>
    </div>
  );
};

export default Dropdown;
