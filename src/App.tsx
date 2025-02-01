import { Separator } from "@radix-ui/react-separator";
import { AppSidebar } from "./shadcn/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./shadcn/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./shadcn/ui/sidebar";
import { LocalStorage } from "./utils";
import { ChangeEvent, useContext, useState } from "react";
import { systemContext } from "./Router";
import { FinanceDashboard } from "./pages/FinanceDashboard";
import { Input } from "./shadcn/ui/input";

import { debounce } from "lodash";
import { Loader2 } from "lucide-react";
import { DataList } from "./pages/DataLists";
import { CreateDisplayEdit } from "./pages/CreateDisplayEdit";

export function App() {
  const { state } = useContext(systemContext);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  LocalStorage("userInfo", {
    firstName: "Ahmed",
    lastName: "Mansor",
    email: "Ahmed@gmail.com",
    role: "Administrator",
    img: "https://res.cloudinary.com/dbgwe94vv/image/upload/v1730100571/fc00496c-599f-4c6c-b2a8-7d5e342f39e0_slujjf.jpg",
  });

  LocalStorage("companyInfo", {
    name: "Almanara",
    website: "https://www.almanara.com.sa/",
    img: "https://res.cloudinary.com/dbgwe94vv/image/upload/v1727784611/5678221a-64ad-405e-93f1-1c4b4808aa6d_aafnpo.png",
  });

  const invoices = {
    header: ["Date", "Invoice Number", "Status", "Method", "Amount"],
    data: [
      {
        date: { title: "Date", value: "01/01/2024", type: "date" },
        invoice: { title: "Invoice", value: "INV001", type: "text" },
        paymentStatus: {
          title: "Payment Status",
          value: "Paid",
          type: "select",
        },
        totalAmount: { title: "Total Amount", value: "$250.00", type: "text" },
        paymentMethod: {
          title: "Payment Method",
          value: "Credit Card",
          type: "select",
        },
        customer: { title: "Customer", value: "John Doe", type: "select" },
        arAccount: {
          title: "AR Account",
          value: "Accounts Receivable - 1001",
          type: "select",
        },
        lineItems: [
          {
            item: { title: "Item", value: "Product A" },
            quantity: { title: "Quantity", value: 2 },
            unitPrice: { title: "Unit Price", value: "$50.00" },
            total: { title: "Total", value: "$100.00" },
          },
          {
            item: { title: "Item", value: "Product B" },
            quantity: { title: "Quantity", value: 3 },
            unitPrice: { title: "Unit Price", value: "$50.00" },
            total: { title: "Total", value: "$150.00" },
          },
          {
            item: { title: "Item", value: "Product B" },
            quantity: { title: "Quantity", value: 3 },
            unitPrice: { title: "Unit Price", value: "$50.00" },
            total: { title: "Total", value: "$150.00" },
          },
          {
            item: { title: "Item", value: "Product B" },
            quantity: { title: "Quantity", value: 3 },
            unitPrice: { title: "Unit Price", value: "$50.00" },
            total: { title: "Total", value: "$150.00" },
          },
        ],
      },
      {
        date: { title: "Date", value: "01/01/2024" },
        invoice: { title: "Invoice", value: "INV002" },
        paymentStatus: { title: "Payment Status", value: "Pending" },
        totalAmount: { title: "Total Amount", value: "$150.00" },
        paymentMethod: { title: "Payment Method", value: "PayPal" },
        customer: { title: "Customer", value: "Jane Smith" },
        arAccount: { title: "AR Account", value: "Accounts Receivable - 1002" },
        lineItems: [
          {
            item: { title: "Item", value: "Service A" },
            quantity: { title: "Quantity", value: 1 },
            unitPrice: { title: "Unit Price", value: "$150.00" },
            total: { title: "Total", value: "$150.00" },
          },
        ],
      },
      {
        date: { title: "Date", value: "01/01/2024" },
        invoice: { title: "Invoice", value: "INV003" },
        paymentStatus: { title: "Payment Status", value: "Unpaid" },
        totalAmount: { title: "Total Amount", value: "$350.00" },
        paymentMethod: { title: "Payment Method", value: "Bank Transfer" },
        customer: { title: "Customer", value: "Alice Johnson" },
        arAccount: { title: "AR Account", value: "Accounts Receivable - 1003" },
        lineItems: [
          {
            item: { title: "Item", value: "Product C" },
            quantity: { title: "Quantity", value: 4 },
            unitPrice: { title: "Unit Price", value: "$87.50" },
            total: { title: "Total", value: "$350.00" },
          },
        ],
      },
      {
        date: { title: "Date", value: "01/01/2024" },
        invoice: { title: "Invoice", value: "INV004" },
        paymentStatus: { title: "Payment Status", value: "Paid" },
        totalAmount: { title: "Total Amount", value: "$450.00" },
        paymentMethod: { title: "Payment Method", value: "Credit Card" },
        customer: { title: "Customer", value: "Bob Brown" },
        arAccount: { title: "AR Account", value: "Accounts Receivable - 1004" },
        lineItems: [
          {
            item: { title: "Item", value: "Product D" },
            quantity: { title: "Quantity", value: 2 },
            unitPrice: { title: "Unit Price", value: "$225.00" },
            total: { title: "Total", value: "$450.00" },
          },
        ],
      },
      {
        date: { title: "Date", value: "01/01/2024" },
        invoice: { title: "Invoice", value: "INV005" },
        paymentStatus: { title: "Payment Status", value: "Paid" },
        totalAmount: { title: "Total Amount", value: "$550.00" },
        paymentMethod: { title: "Payment Method", value: "PayPal" },
        customer: { title: "Customer", value: "Mary Green" },
        arAccount: { title: "AR Account", value: "Accounts Receivable - 1005" },
        lineItems: [
          {
            item: { title: "Item", value: "Service B" },
            quantity: { title: "Quantity", value: 1 },
            unitPrice: { title: "Unit Price", value: "$550.00" },
            total: { title: "Total", value: "$550.00" },
          },
        ],
      },
      {
        date: { title: "Date", value: "01/01/2024" },
        invoice: { title: "Invoice", value: "INV006" },
        paymentStatus: { title: "Payment Status", value: "Pending" },
        totalAmount: { title: "Total Amount", value: "$200.00" },
        paymentMethod: { title: "Payment Method", value: "Bank Transfer" },
        customer: { title: "Customer", value: "Chris White" },
        arAccount: { title: "AR Account", value: "Accounts Receivable - 1006" },
        lineItems: [
          {
            item: { title: "Item", value: "Product E" },
            quantity: { title: "Quantity", value: 2 },
            unitPrice: { title: "Unit Price", value: "$100.00" },
            total: { title: "Total", value: "$200.00" },
          },
        ],
      },
      {
        date: { title: "Date", value: "01/01/2024" },
        invoice: { title: "Invoice", value: "INV007" },
        paymentStatus: { title: "Payment Status", value: "Unpaid" },
        totalAmount: { title: "Total Amount", value: "$300.00" },
        paymentMethod: { title: "Payment Method", value: "Credit Card" },
        customer: { title: "Customer", value: "David Black" },
        arAccount: { title: "AR Account", value: "Accounts Receivable - 1007" },
        lineItems: [
          {
            item: { title: "Item", value: "Product F" },
            quantity: { title: "Quantity", value: 3 },
            unitPrice: { title: "Unit Price", value: "$100.00" },
            total: { title: "Total", value: "$300.00" },
          },
        ],
      },
    ],
  };

  function renderComponent(breadcrumb: string[]) {
    console.log(`${breadcrumb[0]}-${breadcrumb[breadcrumb.length - 1]}`);

    switch (`${breadcrumb[0]}-${breadcrumb[breadcrumb.length - 1]}`) {
      case "Finance-Dashboard":
        return <FinanceDashboard />;
      case "Finance-Invoice":
        return <DataList data={invoices} type="Invoice" />;
      case "Invoice-Create":
      case "Invoice-Edit":
      case "Invoice-Display":
        return (
          <CreateDisplayEdit
            type="Invoice"
            action={breadcrumb[breadcrumb.length - 1]}
          />
        );
      default:
        return (
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        );
    }
  }
  const handelSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);

    console.log(search);
  };

  const debouncedOnChange = debounce(handelSearchInput, 500);

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex items-center border-b justify-between  px-4">
            <div className="flex h-16 shrink-0 items-center gap-2 ">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {state?.breadcrumb.map((item: string, index: number) => (
                    <BreadcrumbItem key={index}>
                      {index !== state.breadcrumb.length - 1 ? (
                        <>
                          <Breadcrumb>{item}</Breadcrumb>
                          <BreadcrumbSeparator className="hidden md:block" />
                        </>
                      ) : (
                        <BreadcrumbPage>{item}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="w-1/3 relative flex items-center">
              {loading ? (
                <Loader2 className="animate-spin size-8 absolute -left-10" />
              ) : (
                <></>
              )}
              <Input
                onChange={(e) => {
                  debouncedOnChange(e);
                  setLoading(true);
                }}
                className="w-full"
                placeholder="&#x1F50D; Search"
                type="search"
              />
            </div>
          </header>
          {renderComponent(
            state.breadcrumb
            // state.breadcrumb.at(0).replace(" ", "_").toLowerCase(),
            // state.breadcrumb.at(-1).replace(" ", "_").toLowerCase()
          )}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
