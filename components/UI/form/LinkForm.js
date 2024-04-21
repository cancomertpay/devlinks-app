import React from "react";
import Button from "../button/button";
import Input from "../input/input";
import Link from "next/link";
import Dropdown from "../input/dropdown";

function LinkForm({ action, name, disabled, index }) {
  if (!action) {
    throw new Error("Action is required for LinkForm component");
  } else if (!name) {
    throw new Error("Name is required for LinkForm component");
  } else if (!disabled) {
    throw new Error("Disabled is required for LinkForm component");
  }
  return (
    <form action={action} className="flex flex-col gap-5">
      <Dropdown name={name} />
      <Input
        id={"link-" + index}
        name={name}
        title={"Link"}
        type="text"
        placeholder="e.g. https://www.github.com/johnappleseed"
      />
      <Button style="primary" disabled={disabled}>
        Save
      </Button>
    </form>
  );
}

export default LinkForm;
