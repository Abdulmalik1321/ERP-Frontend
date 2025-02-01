/* eslint-disable @typescript-eslint/no-explicit-any */
import { systemContext } from "@/Router";
import { Button } from "@/shadcn/ui/button";

import { DataTablePagination } from "@/shadcn/ui/data-table-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDown,
  EyeOff,
  PlusCircle,
} from "lucide-react";
import { useContext } from "react";
import { DataCard } from "./FinanceDashboard";

export function DataList({ data, type }: { data: any; type: string }) {
  const { dispatch } = useContext(systemContext);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 p-3">
        <div className="flex gap-4">
          <DataCard title="All Invoices" amount={1234} percentage={5.2} />
          <DataCard title="Open Invoices" amount={1234} percentage={-5.2} />
        </div>
        <div className="flex gap-4">
          <DataCard title="Overdue" amount={1234} percentage={5.2} />
          <DataCard title="Paid" amount={1234} percentage={5.2} />
        </div>
      </div>
      <div className="flex justify-between items-center my-3 px-6">
        <div>
          <h1 className="text-3xl">Invoices</h1>
          <p className="text-muted-foreground text-sm">
            Here you can see and manage your Invoices.
          </p>
        </div>

        <Button
          onClick={() =>
            dispatch({
              type: "breadCrumb",
              payload: [type, "Create"],
            })
          }
          size="sm"
          className="h-8 gap-1"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span>Crate {type}</span>
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {data.header.map((item: any, index: number) => (
              <TableCell
                className={`${
                  index === data.header.length - 1
                    ? "flex w-full justify-end"
                    : ""
                }`}
                key={item}
              >
                <div className="flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="m-0">
                        <span>{item}</span>
                        {/* {"column.getIsSorted()" === "desc" ? (
                          <ArrowDownIcon className="ml-2 h-4 w-4" />
                        ) : "column.getIsSorted()" === "asc" ? (
                          <ArrowUpIcon className="ml-2 h-4 w-4" />
                        ) : (
                          <ChevronsUpDown className="ml-2 h-4 w-4" />
                        )} */}
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => false}>
                        <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Asc
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => true}>
                        <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Desc
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => false}>
                        <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Hide
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((item: any) => (
            <TableRow
              className="cursor-pointer"
              key={item.invoice.value}
              onClick={() => {
                dispatch({
                  type: "currentDocument",
                  payload: item,
                });
                dispatch({
                  type: "breadCrumb",
                  payload: [type, "Display"],
                });
              }}
            >
              <TableCell>{item.date.value}</TableCell>
              <TableCell>{item.invoice.value}</TableCell>
              <TableCell>{item.paymentStatus.value}</TableCell>
              <TableCell>{item.paymentMethod.value}</TableCell>
              <TableCell className="text-right">
                {item.totalAmount.value}
              </TableCell>
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
    </>
  );
}
