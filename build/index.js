import React from 'react';
import { render, Text } from 'ink';
import { Select } from './components/Select';
const App = () => {
    const items = [
        {
            label: React.createElement(Text, { color: "white" }, "Refactor"),
            value: 'refactor',
        },
        {
            label: React.createElement(Text, { color: "white" }, "Fix"),
            value: 'fix',
        },
    ];
    return React.createElement(Select, { list: items, value: "refactor", onChange: () => { } });
};
render(React.createElement(App, null));
