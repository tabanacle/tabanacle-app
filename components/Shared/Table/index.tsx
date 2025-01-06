import { FC } from "react";
import { PaginatedTableHeader } from "./TableTypes";

interface TableProps<T> {
  headers: Array<PaginatedTableHeader<T>>;
  paginator: Array<T>;
}

const Table: FC<TableProps<any>> = ({ headers, paginator }) => {
  function deepFind(
    obj: { id: number; order_number: string } | any,
    path: string | undefined
  ) {
    const paths = path?.split(".");
    let current = obj;
    let i;

    if (!paths) return "";

    // eslint-disable-next-line no-plusplus
    for (i = 0; i < paths.length; ++i) {
      if (!current[paths[i]] && current[paths[i]] !== 0) {
        return "";
      }
      current = current[paths[i]];
    }
    return current;
  }

  return (
    <div className="h-[calc(100dvh_-_30rem)] overflow-y-auto">
      <table className="w-full hidden lg:table">
        <thead className="h-3">
          <tr>
            {headers.map((header) => (
              <th
                key={header.id}
                // onClick={() => sortHeader(header)}
                className="border-b-0.1 border-black-20 py-0.8 px-1.2 h-4"
              >
                {header.renderLabel ? (
                  header?.renderLabel()
                ) : (
                  <p className="text-small text-black-40 text-left">
                    {header.label}
                  </p>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginator?.map((row) => (
            <tr key={row.id}>
              {headers.map((header) => {
                return (
                  <td
                    key={header.id}
                    className="border-b-0.1 border-black-04 py-0.8 px-1.2 h-4"
                  >
                    {header.render ? (
                      header.render?.(row)
                    ) : (
                      <p className="text-small text-black text-left">
                        {deepFind(row, header.value)}
                      </p>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex lg:hidden flex-col gap-1.6">
        {paginator?.map((row) => (
          <div className="bg-white border-0.1 border-black-10 p-1.6 flex flex-col gap-0.8 rounded-1.6">
            {headers.map((header, idx) => (
              <div
                className={`flex items-center gap-0.8 justify-between py-0.8 ${
                  idx ? "border-t-0.05 border-black-10" : ""
                }`}
              >
                <div className="">
                  {header.renderLabel ? (
                    header?.renderLabel()
                  ) : (
                    <p className="text-small text-black-40 text-left">
                      {header.label}
                    </p>
                  )}
                </div>

                <p className="text-small">
                  {header.render ? (
                    header.render?.(row)
                  ) : (
                    <p className="text-small text-black text-left">
                      {deepFind(row, header.value)}
                    </p>
                  )}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
