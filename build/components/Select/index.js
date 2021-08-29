import React from 'react';
import { Box, Spacer, Text } from 'ink';
import figures from 'figures';
export const Select = (props) => {
    const { list, value, onChange } = props;
    return (React.createElement(Box, null, list.map(item => (React.createElement(Box, { marginLeft: 3, key: item.value },
        React.createElement(Text, { color: "green" }, value === item.value ? figures.pointer : ' '),
        React.createElement(Spacer, null),
        typeof item.label === 'string' ? React.createElement(Text, { color: "white" }, item.value) : item.label)))));
};
