import { Button } from "devextreme-react/button";
import 'devextreme/dist/css/dx.light.css';
import React, { useRef, useState } from "react";
import themes from "devextreme/ui/themes";
import { useStores } from ".";


export const App = () => {
    const { layoutStore, locationInfo } = useStores();
    return (
        <>
            <div>Текст</div>
            <Button
                type="normal"
                text="SWITCH THEME"
                onClick={() => {
                    layoutStore.ToggleTheme();
                    themes.current(layoutStore.Theme!);
                }}
            />
        </>
    )
};
