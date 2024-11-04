import { ContextTypes } from "@/components/CodeBlock";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const generateCode = (props: ContextTypes) => {
  const { useHook, name, values } = props;

  return ` // ${name}.tsx
import { createContext, useState, PropsWithChildren,${useHook ? " useContext" : ""} } from "react"

interface ${name}Type {
    ${values.map((v) => `${v.valueName}: ${v.valueType}`).join("\n    ")}
    ${values.map((v) => `set${capitalizeFirstLetter(v.valueName)}: (${v.valueName}: ${v.valueType}) => void`).join("\n    ")}
}
    
const ${name} = createContext<${name}Type | undefined>(undefined)

export const ${name}Provider = ({ children, ${values.map((v) => `${v.valueName}: ${v.valueName}InitialValue`)} }: PropsWithChildren<Omit<${name}Type, 'setValue'>>) => {
    ${values.map((v) => `const [${v.valueName}, set${capitalizeFirstLetter(v.valueName)}] = useState<${v.valueType}>(${v.valueName}InitialValue)`).join("\n    ")}

    return (
        <${name}.Provider value={{ ${values.map((v) => `${v.valueName}, set${capitalizeFirstLetter(v.valueName)} `)}}}>
            {children}
        </${name}.Provider>
    )
}
    
${
  useHook
    ? `
export const use${name} = () => {
    const context = useContext(${name})
    
    if(context === undefined) {
        throw new Error('use${name} must be used within a ${name}Provider')
    }
    
    return context
}`
    : ""
}`;
};
