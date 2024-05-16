"use client";

import React, { useEffect, useState } from "react";
import allMenuList from "@/lib/all-menu-list";
import Image from "next/image";

function Dropdown({ name, onChange, onClick, value, error, errorMessage }) {
  if (!name) {
    throw new Error("Name is required for Dropdown component");
  } else if (!onChange) {
    throw new Error("onChange is required for Dropdown component");
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [onMouseEnter, setOnMouseEnter] = useState({ name: "", status: false });
  const [selectedValue, setSelectedValue] = useState({ name: "", icon: "" });
  const [hiddenInputValue, setHiddenInputValue] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMouseEnter = (fieldName) => {
    setOnMouseEnter((prev) =>
      prev.name === fieldName
        ? { name: "", status: true }
        : {
            name: fieldName,
            status: true,
          }
    );
  };

  const handleMouseLeave = (fieldName) => {
    setOnMouseEnter((prev) =>
      prev.name === fieldName
        ? { name: "", status: false }
        : {
            name: fieldName,
            status: false,
          }
    );
  };

  const handleselectedValue = (menuItem) => {
    if (!menuItem) {
      return;
    }

    setSelectedValue({ name: menuItem.name, icon: menuItem.icon });
    setHiddenInputValue(menuItem.name);
  };

  useEffect(() => {
    if (value) {
      const menuItem = allMenuList.find((item) => item.name === value);
      setSelectedValue(menuItem ? menuItem : { name: "", icon: "" });
      setHiddenInputValue(menuItem ? menuItem.name : "");
    }
  }, []);

  useEffect(() => {
    onChange(hiddenInputValue);
  }, [hiddenInputValue]);
  return (
    <div className="py-1 relative">
      <input type="hidden" name={"platform-" + name} value={hiddenInputValue} />
      <label
        htmlFor={"platform-" + name}
        className="text-xs text-neutral-dark-grey"
      >
        Platform
      </label>
      <div
        className={`w-full h-[48px] flex items-center justify-between cursor-pointer bg-white transition-all duration-300 ease-in-out rounded-lg py-3 px-3 border border-neutral-borders hover:border-primary-index hover:shadow-3xl ${
          dropdownOpen ? "!border-primary-index !shadow-3xl" : ""
        } ${error ? "border-error" : ""}`}
        onClick={toggleDropdown}
      >
        <div className="flex items-center justify-center gap-3">
          <span>
            {!selectedValue?.icon ? (
              <Image
                src={`/images/icon-link.svg`}
                alt={"Link icon"}
                width="16"
                height="16"
              />
            ) : (
              selectedValue?.icon
            )}
          </span>
          {error ? (
            <span className="text-error">{errorMessage}</span>
          ) : (
            <span className="text-neutral-dark-grey">
              {selectedValue?.name && selectedValue?.name}
            </span>
          )}
        </div>
        <span
          className={`transition-all duration-300 ease-in-out ${
            dropdownOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <Image
            src={`/images/icon-chevron-down.svg`}
            alt={"Dropdown icon"}
            width="14"
            height="14"
          />
        </span>
      </div>

      {dropdownOpen && (
        <ul className="absolute top-20 right-0 z-50 bg-white shadow-4xl py-3 px-4 w-full max-h-[15rem] rounded-lg border border-neutral-borders overflow-x-hidden overflow-y-scroll">
          {allMenuList.map((item, index, arr) => (
            <li
              key={index}
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={() => handleMouseLeave(item.name)}
              onClick={() => {
                handleselectedValue(item);
                toggleDropdown();
                onClick && onClick()
              }}
              className={`flex items-center gap-3 cursor-pointer border-b-2 border-neutral-borders py-3  ${
                index === 0 ? "pt-0" : ""
              } ${
                index === arr.length - 1 ? "border-t-2 border-none pb-0" : ""
              }`}
            >
              <span className="">
                {React.cloneElement(item.icon, {
                  color:
                    (onMouseEnter.name === item.name && onMouseEnter.status) ||
                    selectedValue?.name === item.name
                      ? "#633CFF"
                      : "#737373",
                  size: 16,
                })}
              </span>
              <span
                className={`transition-colors duration-300 ease-in-out
                ${
                  (onMouseEnter.name === item.name && onMouseEnter.status) ||
                  selectedValue?.name === item.name
                    ? "text-primary-index"
                    : "text-neutral-dark-grey"
                }
            `}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
