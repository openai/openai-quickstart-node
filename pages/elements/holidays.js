import React from "react";

import { Dropdown } from "@nextui-org/react";

export function Holidays() {
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
                    onChange={(e) => SetHolidayInput(e.target.value)}
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
    );
}