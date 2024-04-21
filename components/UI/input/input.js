import Image from "next/image";

function Input({
  type = "text",
  id,
  name,
  title,
  placeholder,
  error,
  errorMessage,
  ...rest
}) {
  if (!id) {
    throw new Error("Input component must have an id prop");
  } else if (!title) {
    throw new Error("Input component must have a title prop");
  } else if (!name) {
    throw new Error("Input component must have a name prop");
  }

  const uniqueId = id + "-" + name;
  return (
    <div className="py-1">
      <label htmlFor={uniqueId} className="text-xs text-neutral-dark-grey">
        {title}
      </label>
      <div className="relative">
        <input
          className={`w-full pl-10 text-neutral-dark-grey ring-neutral-borders ring-1 cursor-pointer bg-transparent outline-none transition-all duration-300 ease-in-out rounded-lg py-3 ${
            error
              ? "!ring-error !text-error hover:shadow-none hover:!ring-error/50 focus:ring-error focus:shadow-none "
              : "text-neutral-dark-grey ring-neutral-borders focus:ring-primary-index hover:ring-primary-index/50 focus:shadow-3xl hover:shadow-3xl"
          }`}
          type={type}
          name={title === "Link" ? name + "-link" : name}
          id={uniqueId}
          placeholder={placeholder}
          {...rest}
        />
        <span className="absolute top-1/2 left-3 transform -translate-y-1/2">
          {title === "Link" ? (
            <Image
              src={`/images/icon-link.svg`}
              alt={title}
              width="16"
              height="16"
            />
          ) : (
            <Image
              src={`/images/icon-${
                id === "confirm-password" ? "password" : id
              }.svg`}
              alt={title}
              width="16"
              height="16"
            />
          )}
        </span>
        {error && (
          <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xs lg:text-base text-error pl-2 lg:px-4 py-2 bg-neutral-light-grey">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
}

export default Input;
