import { useEffect, useState } from "react";

export default function InputField(props) {

  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    setName(props.name);
    setValue(props.value);
  })

  return (
    <input
          style={{width: "-webkit-fill-available"}}
          type="text"
          name={name}
          onChange={props.onChange}
          placeholder={props.placeholder}
          value={value}
          />
  ) 
}