import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import React from "react";
import { Container, Card, Row, Col, Spacer } from "@nextui-org/react";

import { CssBaseline } from "@nextui-org/react";
import { useTheme, Text } from '@nextui-org/react';
import { Input } from "@nextui-org/react";
import { Radio } from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";

// import custom elements
import { Morals } from './elements/morals.js';
import { Holidays } from './elements/holidays.js';
import { Child } from './elements/child.js';






export default function Home(props) {
  const { theme } = useTheme();

  const [childInput, SetChildNameInput] = useState("");
  const [moralInput, SetMoralInput] = useState("");
  const [holidayInput, SetHolidayInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ child: childInput, moral: moralInput, holiday: holidayInput }),
      });


      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      SetChildNameInput("");
      SetMoralInput("");
      SetHolidayInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }


  const [selected, setSelected] = React.useState(new Set(["Select Holiday"]));
  const selectedValue = 'Holiday: ' + React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const menuItems = [
    {
      "key": "Christmas",
      "content": "Christmas"
    },
    {
      "key": "Halloween",
      "content": "Halloween"
    },
    {
      "key": "Thanksgiving",
      "content": "Thanksgiving"
    },
    {
      "key": "Easter",
      "content": "Easter"
    },
    {
      "key": "Valentine's Day",
      "content": "Valentine's Day"
    },
    {
      "key": "Fourth of July",
      "content": "Fourth of July"
    },
    {
      "key": "Hanukkah",
      "content": "Hanukkah"
    },
    {
      "key": "Chinese New Year",
      "content": "Chinese New Year"
    },
    {
      "key": "St.Patrick's Day",
      "content": "St.Patrick's Day"
    },
    {
      "key": "New Year's Eve",
      "content": "New Year's Eve"
    },
    {
      "key": "Mother's Day",
      "content": "Mother's Day"
    },
    {
      "key": "Father's Day",
      "content": "Father's Day"
    },
    {
      "key": "Earth Day",
      "content": "Earth Day"
    },
    {
      "key": "Cinco de Mayo",
      "content": "Cinco de Mayo"
    },
    {
      "key": "Independence Day(for other countries)",
      "content": "Independence Day(for other countries)"
    },
    {
      "key": "Labor Day",
      "content": "Labor Day"
    },
    {
      "key": "Memorial Day",
      "content": "Memorial Day"
    },
    {
      "key": "Veterans Day",
      "content": "Veterans Day"
    },
    {
      "key": "International Women's Day",
      "content": "International Women's Day"
    },
    {
      "key": "International Day of Peace",
      "content": "International Day of Peace"
    },
    {
      "key": "World Health Day",
      "content": "World Health Day"
    },
    {
      "key": "World Children's Day",
      "content": "World Children's Day"
    },
    {
      "key": "World Environment Day",
      "content": "World Environment Day"
    },
    {
      "key": "World Animal Day",
      "content": "World Animal Day"
    }
  ];


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
          
          <Input clearable bordered
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
                    <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                      {selectedValue}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      aria-label="Single selection actions"
                      color="secondary"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selected}
                      onSelectionChange={setSelected}
                      // onSelectionChange={(e) => SetHolidayInput(selectedValue)}
                      onChange={(e) => SetHolidayInput(selectedValue)}
                      items={menuItems}>
                      {(item) => (
                        <Dropdown.Item
                          key={item.key}
                        >
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

