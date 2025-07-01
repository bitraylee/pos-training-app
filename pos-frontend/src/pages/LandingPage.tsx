import { JSX, useState } from "react";

import AuthCard from "@components/AuthCard/AuthCard";


export default function LandingPage(): JSX.Element {
  const [context, setContext] = useState<"login" | "signup">("login");

  const toggleContext = ()=>{
    setContext(context==="login"? "signup" : "login")
  }
  return (
    <div className="pos-landing-page">
      <AuthCard context={context} toggleContext={toggleContext}/>
    </div>
  );
}
