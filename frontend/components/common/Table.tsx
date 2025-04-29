import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";

interface Column {
  id: string;
  label: string;
  render?: (value: any, row: any, extraProps?: any) => ReactNode; // <-- allow custom render per cell
}

interface TableProps {
  columns: Column[];
  data: { [key: string]: any }[]; // <-- better typing for data
  extraProps?: any; // Extra props for custom render
}

export default function TableList({
  columns = [],
  data = [],
  extraProps,
}: TableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.id} className="w-[100px] font-bold">
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx}>
            {columns.map((col) => (
              <TableCell key={col.id}>
                {col.render
                  ? col.render(row[col.id], row, extraProps) // If render exists, use it, else show plain text
                  : (row[col.id] as ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
