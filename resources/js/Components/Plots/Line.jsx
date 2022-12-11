import React from "react";
import { Chart } from "react-charts";

export default function Line({ data }) {
    const primaryAxis = React.useMemo(
        () => ({
            getValue: (value) => value.primary,
            elementType: "line",
        }),
        []
    );

    const secondaryAxes = React.useMemo(
        () => [
            {
                getValue: (value) => value.secondary,
                elementType: "line",
            },
        ],
        []
    );

    console.log(primaryAxis);
    console.log(secondaryAxes);
    console.log(data);

    return (
        <Chart
            options={{
                initialHeight: 300,
                initialWidth: 300,
                data,
                primaryAxis,
                secondaryAxes,
            }}
        />
    );
}
