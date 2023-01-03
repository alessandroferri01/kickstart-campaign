import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link } from '../routes';

const Header = () => {
    return (
        <Menu style={{ marginTop: '2em' }}>
            <Link route="/">
                <a className="item">
                    <img style={{ marginRight: '10px' }} alt="logo" src='https://react.semantic-ui.com/logo.png' />
                    CrowdCoin
                </a>
            </Link>
            <Menu.Menu position="right">
                <Link route="/">
                    <a className="item">
                        Campaigns
                    </a>
                </Link>
                <Link route="/campaigns/new">
                    <a className="item">
                        +
                    </a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
};

export default Header;