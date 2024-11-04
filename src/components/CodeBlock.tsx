"use client";
import { ContextValue } from "@/app/page";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useEffect, useState } from "react";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { generateCode } from "@/lib/codeEngine";
import CopyButton from "@/components/CopyCode";

export interface ContextTypes {
  useHook: boolean;
  name: string;
  values: ContextValue[];
}

const customStyle: React.CSSProperties = {
  borderRadius: "12px",
  height: "600px",
  width: "600px",
};

export default function CodeBlock(props: ContextTypes) {
  const { useHook, name, values } = props;
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const newCode = generateCode({
      useHook: useHook,
      name: name,
      values: values,
    });

    setCode(newCode);
  }, [values, useHook, name]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between">
        <h1>{name}.tsx</h1>

        <CopyButton code={code} />
      </div>
      <SyntaxHighlighter
        wrapLines={true}
        language={"typescript"}
        style={atomDark}
        showLineNumbers={true}
        customStyle={customStyle}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
