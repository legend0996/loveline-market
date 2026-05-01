import type { ReactNode } from "react";

interface Column<T> {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (row: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  emptyState?: ReactNode;
}

export const Table = <T,>({ columns, data, rowKey, emptyState }: TableProps<T>) => {
  if (!data.length && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={[
                  "text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide",
                  column.className || "",
                ].join(" ")}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((row) => (
            <tr key={rowKey(row)} className="hover:bg-gray-50/50 transition-colors">
              {columns.map((column) => (
                <td key={String(column.key)} className="px-6 py-4 text-sm text-gray-700">
                  {column.render ? column.render(row) : String((row as any)[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
