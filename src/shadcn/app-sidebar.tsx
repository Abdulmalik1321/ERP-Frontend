/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react";
import { ChevronRight, File } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shadcn/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/shadcn/ui/sidebar";
import { Profile } from "@/components/Profile.tsx";
import { Company } from "@/components/Company";
import { systemContext } from "@/Router";

// Sample data
const data = [
  {
    title: "Finance",
    tree: [
      "Dashboard",
      [
        "Accounting",
        [
          "AR Accounts",
          "Customer Invoice",
          "Customer Payment",
          "Credit Note",
          "Debit Note",
        ],
        [
          "AP Accounts",
          "Supplier Invoice",
          "Supplier Payment",
          "Credit Note",
          "Debit Note",
        ],
        [
          "GL Accounts",
          "Journal",
          "Trial Balance",
          "Balance Sheet",
          "Profit & Loss",
          "Reports",
        ],
      ],
      ["Billing", "Invoice", "Return"],
    ],
  },
  {
    title: "HR",
    tree: ["Dashboard", "Employees", "Payroll"],
  },
  { title: "Sales", tree: ["Dashboard", "Sales", "Orders"] },
  {
    title: "Purchasing",
    tree: ["Dashboard", "purchasing", "Orders"],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Company />
      </SidebarHeader>
      <SidebarContent>
        {data.map((group, index) => (
          <SidebarGroup key={`${group}-${index}`}>
            <SidebarGroupLabel className="text-xl">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="pl-3">
              <SidebarMenu>
                {group.tree.map((item, index) => (
                  <Tree
                    key={`${item}-${index}`}
                    item={item}
                    parentPath={[group.title]}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Profile />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function Tree({
  item,
  parentPath = [],
}: {
  item: string | any[];
  parentPath: string[];
}) {
  const [name, ...items] = Array.isArray(item) ? item : [item];
  const { dispatch } = useContext(systemContext);

  if (!items.length) {
    return (
      <SidebarMenuButton
        onClick={() =>
          dispatch({ type: "breadCrumb", payload: [...parentPath, name] })
        }
        className="data-[active=true]:bg-transparent w-[100%] h-full"
      >
        <File />
        {name}
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform !size-5" />
            {name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="w-[95%]">
            {items.map((subItem, index) => (
              <Tree
                key={index}
                item={subItem}
                parentPath={[...parentPath, name]}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
