"use client";

import { getUserDevlinks, submitUserDevLinks } from "@/lib/actions/dashboard";
import { generateId } from "@/lib/utils/helpers";

import { createContext, useContext, useEffect, useState } from "react";

const DevlinksContext = createContext();

export const useDevlinksContext = () => {
  const context = useContext(DevlinksContext);
  if (context === undefined) {
    throw new Error(
      "useDevlinksContext must be used within a DevlinksProvider"
    );
  }
  return context;
};

export default function DevlinksProvider({ children }) {
  const [devlinksList, setDevlinksList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorField, setErrorField] = useState([]);
  const [isListEdited, setIsListEdited] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const throwError = (id, status, errorObj) => {
    const existingError = errorField.find((item) => item.id === id);

    if (existingError) {
      setErrorField((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status, field: errorObj } : item
        )
      );
    } else {
      setErrorField((prev) => [...prev, { id, status, field: errorObj }]);
    }
  };

  const removeError = (id) => {
    setErrorField((prev) => prev.filter((item) => item.id !== id));
  };

  const changeIsEditedValue = (value) => {
    setIsListEdited(value);
  };

  const addNewLink = () => {
    setIsListEdited(true);
    const id = generateId();
    setDevlinksList((prev) =>
      prev
        ? [...prev, { id, platform: "", link: "" }]
        : [{ id, platform: "", link: "" }]
    );
  };

  const removeLink = (id) => {
    setIsListEdited(true);
    removeError(id);

    if (devlinksList.length === 1) {
      setIsListEdited(false);
    }

    setDevlinksList((prev) => prev.filter((link) => link.id !== id));
  };

  const addItemIntoList = (fieldId, platform, link) => {
    const existingLink = devlinksList.find((item) => item.id === fieldId);
    if (existingLink) {
      setDevlinksList((prev) =>
        prev.map((item) =>
          item.id === fieldId
            ? {
                ...item,
                platform,
                link,
              }
            : item
        )
      );
    } else {
      setDevlinksList((prev) => [
        ...prev,
        {
          id: fieldId,
          platform,
          link,
        },
      ]);
    }
  };

  const reorderList = (newOrderedList) => {
    setIsListEdited(true);
    setDevlinksList(newOrderedList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    for (const link of devlinksList) {
      if (link.link.trim() === "") {
        throwError(link.id, true, {
          link: {
            error: true,
            message: "Can't be empty",
          },
        });
        return;
      } else if (link.link && !linkRegex.test(link.link)) {
        throwError(link.id, true, {
          link: {
            error: true,
            message: "Invalid URL",
          },
        });
        return;
      } else if (link.platform.trim() === "") {
        throwError(link.id, true, {
          platform: {
            error: true,
            message: "Can't be empty",
          },
        });
        return;
      }
    }

    setIsListEdited(false);
    await submitUserDevLinks(devlinksList);
  };

  useEffect(() => {
    if (
      isListEdited &&
      devlinksList.length > 0 &&
      !loading &&
      errorField.length === 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [isListEdited, devlinksList, loading, errorField]);

  useEffect(() => {
    setLoading(true);
    getUserDevlinks()
      .then((devlinks) => {
        setLoading(false);
        
        if (!devlinks) return;
        setDevlinksList(devlinks);
      })
      .catch((error) => {
        setLoading(false);
        throw new Error(error);
      });
  }, []);

  const value = {
    loading,
    devlinksList,
    isListEdited,
    isButtonDisabled,
    addNewLink,
    removeLink,
    errorState: errorField,
    throwError,
    removeError,
    handleSubmit,
    addItemIntoList,
    changeIsEditedValue,
    reorderList,
  };

  return (
    <DevlinksContext.Provider value={value}>
      {children}
    </DevlinksContext.Provider>
  );
}
