import { Input, Spacer } from "@nextui-org/react";
import { useState } from "react";
export function Child() {
    const [childInput, SetChildNameInput] = useState("");
    return (
        <>
            <Spacer y={2.5} />
            <Input clearable bordered 
                labelPlaceholder="Child's Name" 
                type="text"
                name="child"
                value={childInput} 
                onChange={(e) => SetChildNameInput(e.target.value)} 
            />
            <Spacer y={1.5} />
        </>
    );
}


