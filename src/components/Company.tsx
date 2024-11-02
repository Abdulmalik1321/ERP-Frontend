import { useContext } from "react";
import { systemContext } from "../Router";
export function Company() {
  const { state } = useContext(systemContext);

  return (
    <div className="flex items-center space-x-3 p-3">
      <img className="w-16" src={state.companyInfo.img} alt="Company Image" />
      {state.companyInfo.name ? (
        <h1 className="text-3xl">{state.companyInfo.name}</h1>
      ) : (
        <></>
      )}
    </div>
  );
}
