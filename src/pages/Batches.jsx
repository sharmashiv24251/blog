import React from "react";
import Panel from "../Components/Panel";
import TablePage from "../Components/TablePage";

const Batches = () => {
  return (
    <Panel height="49rem" width="76.5rem" className="toLeft p-10 font-inter">
      <h2 className="font-bold text-[2.5rem] leading-[3.25rem] w-full tracking[-0.05em] text-black mt-1">
        Batches
      </h2>
      <p className="font-normal text-[1.25rem] leading-[1.5rem] tracking[-0.04em] text-[#4B4747] mt-2">
        Create learner’s batch and share information at the same time.{" "}
      </p>
      <TablePage />
    </Panel>
  );
};

export default Batches;
