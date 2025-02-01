import { LineItems } from "@/components/LineItems";
import { systemContext } from "@/Router";
import { Button } from "@/shadcn/ui/button";
import { Combobox } from "@/shadcn/ui/combobox";
import { DatePicker } from "@/shadcn/ui/date-picker";
import { Input } from "@/shadcn/ui/input";
import { useContext } from "react";

// function Field({ title, value }: { title: string; value: string }) {
//   return (
//     <div>
//       <p className="text-muted-foreground">{title}:</p>
//       <p>{value}</p>
//     </div>
//   );
// }

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

function renderField(value: string, type: string) {
  switch (type) {
    case "text":
      return <Input className="min-w-[200px] w-auto" placeholder={value} />;
    case "select":
      return <Combobox defaultValue={value} data={frameworks} />;
    case "date":
      return <DatePicker value={value} />;
    default:
      break;
  }
}
export function CreateDisplayEdit({
  type,
  action,
}: {
  type: string;
  action: string;
}) {
  const { state, dispatch } = useContext(systemContext);

  switch (action) {
    case "Create":
      return <div>Create</div>;
    case "Display":
      return (
        <div className="p-5">
          <div className="mb-20">
            <div className="flex gap-5 items-center mb-5">
              <p className="text-3xl">Primary Information</p>
              <Button
                variant="outline"
                className="h-fit"
                onClick={() => {
                  dispatch({
                    type: "breadCrumb",
                    payload: [type, "Edit"],
                  });
                }}
              >
                Edit
              </Button>
            </div>
            <div className="grid gap-5 grid-cols-5">
              {Object.keys(state.currentDocument).map((field: string) => {
                return !Array.isArray(state.currentDocument[field]) ? (
                  <div key={state.currentDocument[field].value}>
                    <p className="text-muted-foreground">
                      {state.currentDocument[field].title}:
                    </p>
                    <p>{state.currentDocument[field].value}</p>
                  </div>
                ) : (
                  <></>
                );
              })}
            </div>
          </div>
          <div className="mb-20 w-[82vw] overflow-scroll">
            <p className="text-3xl mb-5">Line Items</p>
            <LineItems data={state.currentDocument.lineItems} />
          </div>
        </div>
      );
    case "Edit":
      return (
        <div className="p-5">
          <div className="mb-20">
            <div className="flex gap-5 items-center mb-5">
              <p className="text-3xl">Primary Information</p>
              <Button
                variant="secondary"
                className="h-fit"
                onClick={() => {
                  dispatch({
                    type: "breadCrumb",
                    payload: [type, "Display"],
                  });
                }}
              >
                Save
              </Button>

              <Button
                variant="secondary"
                className="h-fit"
                onClick={() => {
                  dispatch({
                    type: "breadCrumb",
                    payload: [type, "Display"],
                  });
                }}
              >
                Cancel
              </Button>
            </div>
            <div className="grid gap-5 grid-cols-5">
              {Object.keys(state.currentDocument).map((field: string) => {
                return !Array.isArray(state.currentDocument[field]) ? (
                  <div key={state.currentDocument[field].value}>
                    <p className="text-muted-foreground">
                      {state.currentDocument[field].title}:
                    </p>
                    {renderField(
                      state.currentDocument[field].value,
                      state.currentDocument[field].type
                    )}
                  </div>
                ) : (
                  <></>
                );
              })}
            </div>
          </div>
          <div className="mb-20 w-[82vw] overflow-scroll">
            <p className="text-3xl mb-5">Line Items</p>
            <LineItems data={state.currentDocument.lineItems} />
          </div>
        </div>
      );

    default:
      break;
  }
}
