/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTablePagination } from "@/shadcn/ui/data-table-pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";

export function DataList({ data }: { data: any }) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          {data.header.map((item: any, index: number) => (
            <TableCell
              className={`${
                index === data.header.length - 1 ? "text-right" : ""
              }`}
              key={item}
            >
              {item}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.map((item: any) => (
          <TableRow className="cursor-pointer" key={item.invoice}>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.invoice}</TableCell>
            <TableCell>{item.paymentStatus}</TableCell>
            <TableCell>{item.paymentMethod}</TableCell>
            <TableCell className="text-right">{item.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="text-right">
            <DataTablePagination table={data} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
