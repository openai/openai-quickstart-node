import React from "react";

import { Dropdown } from "@nextui-org/react";

export function Morals() {
    const [selected, setSelected] = React.useState(new Set(["Select Moral"]));
    const selectedValue = 'Moral: ' + React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );
    const menuItems = [
        {
            "key": "Honesty",
            "content": "Honesty"
        },
        {
            "key": "Respect",
            "content": "Respect"
        },
        {
            "key": "Sharing",
            "content": "Sharing"
        },
        {
            "key": "Listening",
            "content": "Listening"
        },
        {
            "key":  "Work",
            "content": "Hard Work"
        },
        {
            "key": "Resilience",
            "content": "Resilience"
        },
        {
            "key":  "Judging",
            "content": "Not Judging"
        },
        {
            "key":  "Sorry",
            "content": "Saying Sorry"
        },
        {
            "key": "Responsibility",
            "content": "Responsibility"
        },
        {
            "key":  "Grateful",
            "content": "Being Grateful"
        },
        {
            "key":  "Help",
            "content": "Asking For Help"
        },
        {
            "key":  "Faith",
            "content": "Having Faith"
        },
        {
            "key": "Confidence",
            "content": "Confidence"
        },
        {
            "key": "Truthfulness",
            "content": "Truthfulness"
        },
        {
            "key": "Kindness",
            "content": "Kindness"
        },
        {
            "key": "Patience",
            "content": "Patience"
        },
        {
            "key": "Safety",
            "content": "Safety"
        },
        {
            "key": "Appreciation",
            "content": "Appreciation"
        }
    ];

    return (
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
                onChange={(e) => SetMoralInput(e.target.value)}
                name="moral"
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
    );
}