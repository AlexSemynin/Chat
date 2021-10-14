import { useStores } from '../../index';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import themes from "devextreme/ui/themes";
import { Button } from 'devextreme-react';
import classes from './mainLayout.module.scss';

export default observer((props: React.PropsWithChildren<{}>) => {
    const { layoutStore } = useStores();
    useEffect(() => {
        themes.current(layoutStore.Theme);
    }, []);

    return (
        <div className={`${classes.AppWrapper} dx-theme-generic-typography`}>
            <header>
                <Button
                    text='switchTheme'
                    onClick={()=>{
                        layoutStore.ToggleTheme();
                    }}
                />
            </header>
            <main>{props.children}</main>
            <footer></footer>
        </div>
    )
});