"use client";

import { useDevlinksContext } from "@/context/devlink-context";
import EmptyLinkContent from "./empty-link-content";
import Button from "../UI/button/button";
import LinksList from "./customize-links-list";
import LinkContainerSkeleton from "../UI/loading/links-container-skeleton";

export default function CustomizeLinks() {
  const { devlinksList, addNewLink, isButtonDisabled, loading, handleSubmit } =
    useDevlinksContext();

  return (
    <>
      <div className="px-6">
        <Button style="secondary" onClick={addNewLink} disabled={loading}>
          + Add new link
        </Button>
      </div>
      {/* The middle section absorbs the leftover height and scrolls on its
          own, which keeps Save at the bottom of the panel however tall the
          screen is. min-h-0 is what allows a flex child to scroll at all. */}
      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto px-6">
          {loading ? (
            <LinkContainerSkeleton />
          ) : devlinksList?.length > 0 ? (
            <LinksList links={devlinksList} />
          ) : (
            <EmptyLinkContent />
          )}
        </div>
        <div className="pt-5">
          <hr className="mb-5 border-neutral-borders" />
          <div className="px-6 md:text-end">
            <div className="md:inline-flex">
              <Button style="primary" type="submit" disabled={isButtonDisabled}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
