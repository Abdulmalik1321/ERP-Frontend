/* eslint-disable @typescript-eslint/no-explicit-any */
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

export function LineItems(data: any) {
  //   console.log(Object.keys(data.data[0]));
  const titles = Object.keys(data.data[0]);

  return (
    <Table className="border">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className="bg-muted/50">
        <TableRow>
          {titles.map((title: string, index: number) => {
            return (
              <TableHead
                className={`${index === titles.length - 1 ? "text-right" : ""}`}
                key={title}
              >
                {data.data[0][title].title}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.map((item: any) => {
          const values = Object.keys(item);
          return (
            <TableRow key={item}>
              {values.map((value: string, index: number) => {
                return (
                  <TableCell
                    key={item[value].value}
                    className={`${
                      index === values.length - 1 ? "text-right" : ""
                    }`}
                  >
                    {item[value].value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={titles.length - 1}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
