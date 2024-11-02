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

import { debounce, method } from "lodash";
import { Loader2 } from "lucide-react";
import { DataList } from "./components/DataLists";

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
        date: "01/01/2024",
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
      },
      {
        date: "01/01/2024",
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
      },
      {
        date: "01/01/2024",
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
      },
      {
        date: "01/01/2024",
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
      },
      {
        date: "01/01/2024",
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
      },
      {
        date: "01/01/2024",
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
      },
      {
        date: "01/01/2024",
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
      },
    ],
  };

  function renderComponent(title: string, page: string[]) {
    console.log(`${title}-${page}`);

    switch (`${title}-${page}`) {
      case "finance-dashboard":
        return <FinanceDashboard />;
      case "finance-invoice":
        return <DataList data={invoices} />;
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
            state.breadcrumb.at(0).replace(" ", "_").toLowerCase(),
            state.breadcrumb.at(-1).replace(" ", "_").toLowerCase()
          )}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
