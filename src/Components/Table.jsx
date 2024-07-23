import React from "react";
import { Fragment } from "react";

const Table = ({ data, config, keyFn }) => {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return (
        <Fragment key={column.label}>
          <th className="px-4 py-2 bg-gray-200 font-bold text-left">
            {column.header()}
          </th>
        </Fragment>
      );
    }

    return (
      <th
        className="px-4 py-2 bg-gray-200 font-bold text-left border-b-2 border-gray-300"
        key={column.label}
      >
        {column.label}
      </th>
    );
  });

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td className="px-4 py-2 border-b border-gray-300" key={column.label}>
          {column.render(rowData)}
        </td>
      );
    });

    return (
      <tr
        className="hover:bg-gray-100 transition-colors duration-300"
        key={keyFn(rowData)}
      >
        {renderedCells}
      </tr>
    );
  });

  return (
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr>{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
};

export default Table;
