import { Button } from "devextreme-react/button";
import 'devextreme/dist/css/dx.light.css';
import { inject, observer } from "mobx-react";
import React, { useRef, useState } from "react";
import LayoutStore from "./stores/layoutStore";
import themes from "devextreme/ui/themes";


export const App = inject("LayoutStore")(observer((props: { LayoutStore?: LayoutStore }) => {

    return (
        <>
            <div>Текст</div>
            <Button
                type="normal"
                text="SWITCH THEME"
                onClick={() => {
                    props.LayoutStore?.ToggleTheme();
                    themes.current(props.LayoutStore?.Theme!);
                }}
            />
        </>
    )
}));
