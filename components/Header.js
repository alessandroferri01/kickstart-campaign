import React from "react";
import { Menu, Segment } from "semantic-ui-react";

const Header = () => {
    return (
        <Menu style={{ marginTop: '2em' }}>
            <Menu.Item>
                <img style={{ marginRight: '10px' }} alt="logo" src='https://react.semantic-ui.com/logo.png' />
                CrowdCoin
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>
                    Campaigns
                </Menu.Item>
                <Menu.Item>
                    +
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default Header;