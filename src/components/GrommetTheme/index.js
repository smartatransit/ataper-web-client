import React from 'react';
import {Grommet} from "grommet";
import {brand_blue, brand_lighter_grey, brand_lightest_grey, brand_orange, brand_red} from "../../utils/colors";

const theme = {
    global: {
        colors: {
            active: brand_red,
            brand: brand_blue,
            border: {
                light: brand_lightest_grey,
                dark: brand_lighter_grey
            },
            control: {
                light: brand_blue,
                dark: brand_orange
            },
            focus: brand_orange
        }
    }
};

const GrommetTheme = ({children}) => (<Grommet theme={theme}>{children}</Grommet>);

export default GrommetTheme;