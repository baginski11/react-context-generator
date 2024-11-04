"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CodeBlock from "@/components/CodeBlock";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface ContextValue {
  valueName: string;
  valueType: string;
}

export default function Home() {
  const [values, setValue] = useState<ContextValue[]>([]);
  const [useContextHook, setUseContextHook] = useState<boolean>(true);
  const [valueName, setValueName] = useState<string>("");
  const [valueType, setValueType] = useState<string>("");
  const [contextName, setContextName] = useState<string>("SampleContext");

  const addValue = () => {
    setValue([
      ...values,
      {
        valueName: valueName,
        valueType: valueType,
      },
    ]);
  };

  const deleteValue = (index: number) => {
    setValue(values.filter((_, i) => i !== index));
  };

  return (
    <main className="w-dvw h-dvh flex flex-col md:flex-row gap-4  p-32 md:justify-between ">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-2xl">React Context</h1>
          <p className="font-display font-medium">
            The quickest way to create a react context
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="context-name">Context name</Label>
          <Input
            id="context-name"
            placeholder="Context name"
            value={contextName}
            onChange={(v) => setContextName(v.target.value)}
          />

          <div
            className="flex items-center gap-2"
            style={
              {
                "--primary": "238.7 83.5% 66.7%",
                "--ring": "238.7 83.5% 66.7%",
              } as React.CSSProperties
            }
          >
            <Checkbox
              id="checkbox-use"
              checked={useContextHook}
              onCheckedChange={() => setUseContextHook(!useContextHook)}
            />
            <Label htmlFor="checkbox-use">Add useContext hook</Label>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-medium">Values</h1>
            <Input
              placeholder="Value name"
              value={valueName}
              onChange={(v) => setValueName(v.target.value)}
            />
            <Input
              placeholder="Value type"
              value={valueType}
              onChange={(v) => setValueType(v.target.value)}
            />
            <Button variant="outline" onClick={addValue}>
              Add value
            </Button>

            <h1 className="font-medium">Edit values</h1>
            {values.map((v, i) => (
              <div className="flex flex-row gap-2" key={i}>
                <Input value={v.valueName} disabled />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => deleteValue(i)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CodeBlock name={contextName} values={values} useHook={useContextHook} />
    </main>
  );
}
