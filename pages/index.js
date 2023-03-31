import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import React from "react";
import { Container, Card, Row, Col, Spacer } from "@nextui-org/react";

import { CssBaseline } from "@nextui-org/react";
import { useTheme, Text } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Radio } from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";

// import custom elements
import { Morals } from "./elements/morals.js";
import { Holidays } from "./elements/holidays.js";
import { Child } from "./elements/child.js";

import { holidayMenuItems } from "./utils/MenuItems";

export default function Home(props) {
  const { theme } = useTheme();

  const [childInput, SetChildNameInput] = useState("");
  const [moralInput, SetMoralInput] = useState("");
  const [result, setResult] = useState();
  const [holidayInput, SetHolidayInput] = React.useState(
    new Set(["Select Holiday"])
  );

  const selectedHoliday = React.useMemo(
    () => Array.from(holidayInput).join(", ").replace("_", " "),
    [holidayInput]
  );

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          child: childInput,
          moral: moralInput,
          holiday: selectedHoliday,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      SetChildNameInput("");
      SetMoralInput("");
      SetHolidayInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Tiny Tales</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main>
        <Container gap={0}>
          <Row gap={1}>
            <Col>
              <img src="/dog.png" />
              <h3>Generate your 2-minute bedtime story</h3>
              <form onSubmit={onSubmit}>
                <Input
                  clearable
                  bordered
                  labelPlaceholder="Child's Name"
                  type="text"
                  name="child"
                  value={childInput}
                  onChange={(e) => SetChildNameInput(e.target.value)}
                />

                <Radio.Group label="Story Types" className="story-type">
                  <Radio value="Morals">Morals</Radio>
                  <Radio value="Holidays">Holidays</Radio>
                </Radio.Group>

                {/* {Morals()} */}

                <span id="Holidays" className="story-dropdown">
                  <Dropdown>
                    <Dropdown.Button
                      flat
                      color="secondary"
                      css={{ tt: "capitalize" }}
                    >
                      {"Holiday: " + selectedHoliday}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      aria-label="Single selection actions"
                      color="secondary"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={holidayInput}
                      onSelectionChange={SetHolidayInput}
                      items={holidayMenuItems}
                    >
                      {(item) => (
                        <Dropdown.Item key={item.key}>
                          {item.content}
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </span>

                <input type="submit" value="Generate story" />
              </form>
              <div>{result}</div>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
